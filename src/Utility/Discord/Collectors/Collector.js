import { EventEmitter } from 'events';
import NotImplementedException from '../../../Errors/NotImplementedException';
import Collection from '../../Collection';
import SortedList from '../../External/SortedList';
import AxonError from '../../../Errors/AxonError';
import CollectorContainer from './CollectorContainer';

/**
 * @typedef {import('../../../AxonClient').default} AxonClient
 * @typedef {import('../../../Libraries/definitions/LibraryInterface').default} LibraryInterface
 * @typedef {import('./CollectorContainer').default} CollectorContainer
 * @typedef {{ id: String, timeout: Number }} Timeout
 */

/**
 * Base Collector class. Doesn't emit 'collect' event, this is up to subclass to implement the emition logic
 * Collect a specific number of an element.
 * Resolve with a Collection of the element collected.
 * Timeout if needed.
 * It is advised to only use one instance per Collector type.
 * This Collector handles using only one Collector instance with many containers running.
 *
 * @template T
 *
 * @class Collector
 * @extends {EventEmitter}
 * @prop {AxonClient} _axon - The AxonClient instance
 * @prop {Collection<CollectorContainer<T>>} containers - Collection of CollectorContainer
 * @prop {SortedList<Timeout>} timeoutQueue - The current timeout sorted with the first timeout due at the top of the queue
 * @prop {Boolean} running - Whether the Collector is currently running
 * @prop {String} _intervalID - setInterval ID used to clear setinterval
 */
class Collector extends EventEmitter {
    /**
     * Creates an instance of Collector.
     *
     * @param {AxonClient} axonClient
     * @memberof Collector
     */
    constructor(axonClient) {
        super();
        this._axon = axonClient;

        this.containers = new Collection();
        this.timeoutQueue = new SortedList( ( (toInsert, baseElement) => toInsert.timeout >= baseElement.timeout) );

        this.running = false;
        this._intervalID = null;

        this.on('collect', this.onCollect);
        this.on('timeout', this.onTimeout);
    }

    /**
     * The AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     * @memberof Collector
     */
    get axon() {
        return this._axon;
    }

    /**
     * The BotClient instance
     *
     * @readonly
     * @type {BotClient}
     * @memberof Collector
     */
    get bot() {
        return this._axon.botClient;
    }

    /**
     * The LibraryInterface instance
     *
     * @readonly
     * @type {LibraryInterface}
     * @memberof Collector
     */
    get lib() {
        return this._axon.library;
    }

    /**
     * Run this Collector and return a Promise with all elements collected. Main method (called by the user).
     * Should be overriden in any child that extends this class.
     *
     * @param {...any}
     * @returns {Promise<Map<String, T>>} - Map of elements resolved
     * @memberof Collector
     */
    run(...args) { // eslint-disable-line no-unused-vars
        throw new NotImplementedException();
    }

    /**
     * Run this Collector and return a container. Main method (called by the user).
     * Should be overriden in any child that extends this class.
     *
     * @param {...any}
     * @returns {CollectorContainer} - A CollectorContainer
     * @memberof Collector
     */
    collect(...args) { // eslint-disable-line no-unused-vars
        throw new NotImplementedException();
    }

    /**
     * Set all listeners to the relevant function (listen to the event)
     *
     * @memberof Collector
     */
    setListeners() {
        throw new NotImplementedException();
    }

    /**
     * Unset all listeners (stop listening)
     *
     * @memberof Collector
     */
    unsetListeners() {
        throw new NotImplementedException();
    }

    _makeArray(param) {
        if (param === undefined || param === null) {
            return [];
        }

        if (Array.isArray(param) ) {
            return param;
        }
        return Array(param);
    }

    /**
     * Runs the Collector with the given options and resolve once the task is finished with a Map of elements collected.
     * If a timeout is provided, will resolve with all elements collected until the timeout.
     * If no timeout is provided, will only resolve when enough element have been collected
     *
     * @param {Object} settings - Mandatory settings used by the collector
     * @param {Number} settings.count - Number of elements to collect before resolving
     * @param {Number} [settings.timeout=null] - Number of milliseconds before timing out
     * @param {Function} [settings.filter=() => true] - A filter function that an element need to pass to get collected
     * @param {Object} options - Additional options to pass to the collector
     * @returns {Promise<Map<String, T>>} - Map of elements resolved
     * @memberof Collector
     */
    _run(settings, options) {
        if (!settings.count) {
            throw new AxonError('Please specify a valid count limit.', 'Collector');
        }

        const container = this._preRun(settings, options);
    
        return container.wait()
            .then( (e) => {
                this._postRun(container.id);
                return e;
            } )
            .catch( (e) => {
                this._postRun(container.id);
                throw e;
            } );
    }

    /**
     * Runs the Collector with the given options and return a container object that can be used to manually control elements collected.
     * If no timeout nor count is provided, will run forever until the user manually stops the collector.
     *
     * @param {Object} settings - Mandatory settings used by the collector
     * @param {Number} [settings.count=null] - Number of elements to collect before resolving
     * @param {Number} [settings.timeout=null] - Number of milliseconds before timing out
     * @param {Function} [settings.filter=() => true] - A filter function that an element need to pass to get collected
     * @param {Object} options - Additional options to pass to the collector
     * @returns {CollectorContainer} - Map of elements resolved
     * @memberof Collector
     */
    _collect(settings, options) {
        const container = this._preRun(settings, options);
        
        container.on('end', () => {
            this._postRun(container.id);
        } );
        
        container.on('timeout', () => {
            this._postRun(container.id);
        } );

        return container;
    }

    _preRun(settings, options) {
        const container = new CollectorContainer(settings, options);
        this.containers.set(container.id, container);

        if (container.timeout !== null) {
            const timestamp = Date.now() + container.timeout;
            this.timeoutQueue.add( { id: container.id, timeout: timestamp } );
        }

        if (!this.running) {
            this.setListeners();
            this.timeout();
            this.running = true;
        }

        return container;
    }

    _postRun(id) {
        this.containers.delete(id);
        
        if (this.containers.size === 0) {
            this.unsetListeners();
            clearInterval(this._intervalID);
            this.running = false;
        }
    }

    /**
     * Handles checking for timeout via setInterval every 100 ms
     *
     * @memberof Collector
     */
    timeout() {
        if (this.timeoutQueue.isEmpty() ) {
            return;
        }
        
        this._intervalID = setInterval( () => {
            while (this.timeoutQueue.first() && (Date.now() > this.timeoutQueue.first().timeout) ) {
                const { id }  = this.timeoutQueue.shift();
                this.emit('timeout', id);
            }
        }, 100);
    }

    /**
     * Fired to collect an element
     * @event Collector#collect
     * @param {Array<CollectorContainer<T>>} containers - The containers that will collect the element
     * @param {Object} obj
     * @param {String} obj.id - The collected element id
     * @param {T} obj.collected - The collected element
     * @memberof Collector
     */

    /**
     * Handles on collect action
     *
     * @param {Array<CollectorContainer>} containers
     * @param {Object} param - { id, collected }
     * @param {String} param.id - The collected element id
     * @param {T} param.collected - Element collected
     * @memberof Collector
     */
    onCollect(containers, { id, collected } ) {
        for (const c of containers) {
            c.collect(id, collected);
        }
    }

    /**
     * Fired on timeout for a CollectorContainer
     * @event Collector#timeout
     * @param {String} id - The id of the CollectorContainer that timed out
     * @memberof Collector
     */

    /**
     * Handles on timeout action
     *
     * @param {String} id
     * @memberof Collector
     */
    onTimeout(id) {
        const c = this.containers.get(id);
        if (!c) {
            return;
        }

        console.log(c);
        c.break();
    }
}

export default Collector;
