import { EventEmitter } from 'events';
import NotImplementedException from '../../../Errors/NotImplementedException';
import Collection from '../../Collection';
import TimeoutQueue from './TimeoutQueue';

/**
 * @typedef {import('../../../AxonClient').default} AxonClient
 * @typedef {import('../../../Libraries/definitions/LibraryInterface').default} LibraryInterface
 * @typedef {{
 * id: String, collected: Map<String, T>, options: Object, resolve: (T) => Promise<T>, reject: (T) => Promise<T>),
 * }} CollectorContainer<T>
 */

/**
 * Base Collector class
 * Collect a specific number of an element.
 * Resolve with a Collection of the element collected.
 * Timeout if needed.
 * It is advised to only use one instance per Collector type.
 * This Collector handles using only one Collector instance with many collectors running.
 *
 * @template T
 *
 * @class Collector
 * @extends {EventEmitter}
 * @prop {AxonClient} _axon - The AxonClient instance
 * @prop {Collection<CollectorContainer<T>>} collectors - Collection of CollectorContainer
 * @prop {TimeoutQueue} timeoutQueue - The current timeout queue sorted with the first timeout due at the top of the queue
 * @prop {Number} _INCREMENT - Unique increment count used to generate ids
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

        this.collectors = new Collection();
        this.timeoutQueue = new TimeoutQueue();

        this._INCREMENT = 0;
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
     * The current INCREMENT count.
     * Reset at 9999
     *
     * @readonly
     * @type {Number}
     * @memberof Collector
     */
    get INCREMENT() {
        // eslint-disable-next-line no-magic-numbers
        this._INCREMENT === 9999
            ? this._INCREMENT = 0
            : this._INCREMENT += 1;
        return this._INCREMENT;
    }

    /**
     * Generate a unique ID by using the current timestamp and appending a count (INCREMENT)
     *
     * @returns {String} The unique ID generated
     * @memberof Collector
     */
    _genID() {
        const timestamp = `${Date.now()}`;
        
        let inc = `${this.INCREMENT}`;
        for (let i = inc.length; i < 4; i++) {
            inc = `0${inc}`;
        }
        return `${timestamp}${inc}`;
    }

    /**
     * Run this Collector with the given options
     *
     * @param {Object} [options={}]
     * @param {Number} options.timeout - Number of milliseconds before timing out
     * @param {Number} options.count - Number of elements to collect before resolving
     * @returns {Promise<Map<String, T>>} - Map of elements resolved
     * @memberof Collector
     */
    run(options = {} ) {
        return this._run( {
            timeout: options.timeout || 10000,
            count: options.count || 10,
        } );
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

    
    _run(options) {
        const promise = new Promise( (resolve, reject) => {
            this._preRun(options, resolve, reject);
        } );

        return promise
            .then( (e) => {
                this._postRun();
                return e;
            } )
            .catch( (e) => {
                this._postRun();
                throw e;
            } );
    }

    _preRun(options, resolve, reject) {
        const id = this._genID();
        this.collectors.set(id, {
            id,
            collected: new Map(),
            options,
            resolve,
            reject,
        } );

        const timestamp = Date.now() + options.timeout;
        this.timeoutQueue.add(id, timestamp);

        if (!this.running) {
            this.setListeners();
            this.timeout();
            this.running = true;
        }
    }

    _postRun() {
        if (this.collectors.size === 0) {
            this.unsetListeners();
            clearInterval(this._intervalID);
            this.running = false;
        }
    }

    /**
     * Handles checking for timeout via setInterval
     *
     * @memberof Collector
     */
    timeout() {
        if (this.timeoutQueue.isEmpty() ) {
            return;
        }
        
        this._intervalID = setInterval( () => {
            while (this.timeoutQueue.peek() && Date.now() > this.timeoutQueue.peek().timeout) {
                const { id }  = this.timeoutQueue.getNext();
                this.emit('timeout', id);
            }
        }, 100);
    }

    /**
     * Fired to collect an element
     * @event Collector#collect
     * @param {Array<CollectorContainer<T>>} collectors - The collectors that will collect the element
     * @param {Object} obj
     * @param {String} obj.id - The collected element id
     * @param {T} obj.collected - The collected element
     * @memberof Collector
     */

    /**
     * Handles on collect action
     *
     * @param {Array<CollectorContainer>} collectors
     * @param {Object} param - { id, collected }
     * @param {String} param.id - The collected element id
     * @param {T} collected - Element collected
     * @memberof Collector
     */
    onCollect(collectors, { id, collected } ) {
        for (const c of collectors) {
            c.collected.set(id, collected);
            if (c.collected.size === c.options.count) {
                this.collectors.delete(c.id);
                c.resolve(c.collected);
            }
        }
    }

    /**
     * Fired on timeout for a CollectorContainer
     * @event Collector#timeout
     * @param {String} id - The id of the CollectorContainer that timed out
     */

    /**
     * Handles on timeout action
     *
     * @param {String} id
     * @memberof Collector
     */
    onTimeout(id) {
        const c = this.collectors.get(id);
        if (!c) {
            return;
        }

        this.collectors.delete(c.id);
        c.reject(c.collected);
    }
}

export default Collector;
