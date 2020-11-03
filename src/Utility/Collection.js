import Store from './Store';

/**
 * Custom Store that uses Map as cache.
 * Enforces that a single object type exists in a Collection.
 *
 * @author KhaaZ
 *
 * @template T
 * @class Collection
 * @extends Store<T>
 * @prop {T} baseObject - The base class for all items
 */
class Collection extends Store {
    /**
     * Creates an instance of Collection.
     *
     * @param {Object} options
     * @param {new (...args) => T} [options.base=null]
     * @param {Array<[string, T]> | {[key: string]: T}} options.iterable
     *
     * @memberof Collection
     */
    constructor(options = {} ) {
        const { base: baseObject = null, iterable } = options;
        if (iterable && Array.isArray(iterable) ) {
            super(new Map(iterable) );
        } else if (iterable && iterable instanceof Object) {
            super(new Map(Object.entries(iterable) ) );
        } else {
            super(new Map() );
        }
        /**
         * @type {new (...args) => T}
         */
        this.baseObject = baseObject;
    }

    /**
     * Creates a collection from an array
     *
     * @template R
     * @static
     * @param {Array<R>} array - The array of object
     * @param {String} key - The property to use as key
     * @returns {Collection<R>} A newly created Collection
     * @memberof Collection
     */
    static from(array, key) {
        return new Collection( { base: array[0].constructor, iterable: array.map(e => [e[key], e] ) } );
    }

    /**
     * Add an object
     * If baseObject, add only if instance of baseObject
     * If no baseObject, add
     *
     * @param {String} key - The ID of the object
     * @param {T} value - The object data
     * @param {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {T} The existing or newly created object
     * @memberof Collection
     */
    add(key, value, replace) {
        const existing = this.get(key);
        if (existing && !replace) {
            return existing;
        }
        if (this.baseObject && !(value instanceof this.baseObject) ) {
            return null;
        }

        this.set(key, value);
        return value;
    }

    toString() {
        return `[Collection<${this.baseObject && this.baseObject.name}>]`;
    }
}

export default Collection;
