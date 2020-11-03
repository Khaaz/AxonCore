import { EventEmitter } from 'events';
import Collection from '../../Collection';

/**
 * Contains all elements collected respecting settings and options.
 * Emit end, timeout, collect events.
 *
 * @author KhaaZ
 *
 * @template T
 *
 * @class CollectorContainer
 * @extends {EventEmitter}
 *
 * @prop {Symbol} _id - Non serialisable id only used for internal usage.
 * @prop {Function} _filter - Custom filter function that the element need to validate in order to be collected
 * @prop {Number} timeout - The time before the collector times out in milliseconds
 * @prop {Number} count - The amount of elements to collect before automatically ending
 * @prop {Object} options - Other options
 * @prop {Collection<String, T>} collected - All collected elements
 */
class CollectorContainer extends EventEmitter {
    /**
     * Creates an instance of CollectorContainer.
     * Contains all elements that respect the container options
     *
     * @param {Object} [settings={}]
     * @param {Number} [settings.timeout=null] - The time before the collector times out in milliseconds
     * @param {Number} [settings.count=null] - The amount of elements to collect before automatically ending
     * @param {Function} [settings.filter=() => true)] - Custom filter function that the element need to validate in order to be collected
     * @param {Object} [options={}] - Other options
     *
     * @memberof CollectorContainer
     */
    constructor(settings = {}, options = {} ) {
        super();

        this._id = Symbol('id');

        this._filter = settings.filter !== undefined ? settings.filter : () => true;
        this.timeout = settings.timeout || null; // 0, undefined, null => null
        this.count = settings.count || null;

        this.options = options;
        
        this.collected = new Collection();
    }
    
    /**
     * The non serialisable id used to identify this container.
     *
     * @readonly
     * @type {Symbol}
     * @memberof CollectorContainer
     */
    get id() {
        return this._id;
    }

    /**
     * Fired when an element is collected
     * @event CollectorContainer#collect
     * @param {T} collected - The collected element
     * @memberof CollectorContainer
     */
    /**
     * Fired when the container ends
     * @event CollectorContainer#end
     * @memberof CollectorContainer
     */
    /**
     * Fired when the container timeout
     * @event CollectorContainer#timeout
     * @memberof CollectorContainer
     */
    /**
     * Fired when the container removes an element
     * @event CollectorContainer#remove
     * @param {Array<T>} elements - All the elements removed
     * @memberof CollectorContainer
     */

    /**
     * Collect an element. Emits 'collect' event.
     *
     * @param {String} id
     * @param {T} collected
     * @memberof CollectorContainer
     */
    collect(id, collected) {
        if (!this._filter(collected) ) {
            return;
        }

        this.collected.set(id, collected);
        this.emit('collect', collected);
        
        if (this.count !== null && this.isFull() ) {
            this.end();
        }
    }

    /**
     * Emits a raw event for this event
     * @param {(value: T, key: String) => Boolean} func
     * @memberof CollectorContainer
     */
    remove(filter) {
        const elements = this.collected.removeAll(filter);
        this.emit('remove', elements);
    }

    /**
     * Wether the container is full or not
     *
     * @returns {Boolean}
     * @memberof CollectorContainer
     */
    isFull() {
        return this.count ? this.collected.size >= this.count : false;
    }
    
    /**
     * Wait for the CollectorContainer to resolve.
     * Returns a Promise once the container ends or timeout.
     *
     * @returns {Promise<Collection<String, T>>}
     * @memberof CollectorContainer
     */
    wait() {
        return new Promise( (resolve, reject) => {
            this.on('end', () => resolve(this.collected) );
            this.on('timeout', () => reject(this.collected) );
        } );
    }

    /**
     * End the CollectorContainer. Emits 'end' event.
     *
     * @memberof CollectorContainer
     */
    end() {
        this.emit('end');
    }

    /**
     * Timeout the CollectorContainer. Emits 'timeout' event.
     *
     * @memberof CollectorContainer
     */
    break() {
        this.emit('timeout');
    }
}

export default CollectorContainer;
