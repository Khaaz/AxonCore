import AxonError from '../Errors/AxonError';

/**
 * Generic class that expose all data manipulation methods.
 * A Store can be constructed with any Key => Value structure (Map like object)
 * Map-like object can be anything as long as it implements the following:
 * - `size` property
 * - `entries`, `values`, `keys` iterators
 * - `has`, `get`, `set`, `delete` methods
 * It exposes all methods similar to array methods in one place.
 *
 * @author KhaaZ
 *
 * @template T
 * @class Store
 * @prop {Map<string, T>} cache - Key => Value Data structure
 */
class Store {
    /**
     * Creates an instance of Store.
     *
     * @param {Map<string, T>} cache - Key => Value data structure
     * @memberof Store
     */
    constructor(cache) {
        this.cache = cache || new Map();
    }

    // Direct action on cache

    /**
     * Current size of the cache
     *
     * @readonly
     * @type {Number}
     * @memberof Store
     */
    get size() {
        return this.cache.size;
    }

    /**
     * Iterator over `cache.entries`
     *
     * @returns {IterableIterator<[string, T]>}
     * @memberof Store
     */
    entries() {
        return this.cache.entries();
    }

    /**
     * Iterator over `cache.keys`
     *
     * @returns {IterableIterator<String>}
     * @memberof Store
     */
    keys() {
        return this.cache.keys();
    }

    /**
     * Iterator over `cache.values`
     *
     * @returns {IterableIterator<T>}
     * @memberof Store
     */
    values() {
        return this.cache.values();
    }

    /**
     * Iterator over cache
     *
     * @returns {IterableIterator<[string, T]>;}
     * @memberof Store
     */
    [Symbol.iterator]() {
        return this.cache[Symbol.iterator]();
    }

    /**
     * Whether an element exists in the Store
     *
     * @param {String} key
     * @returns {Boolean}
     * @memberof Store
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * Get an element by key in the Store
     *
     * @param {String} key
     * @returns {T}
     * @memberof Store
     */
    get(key) {
        return this.cache.get(key);
    }

    /**
     * Set an element in the Store
     *
     * @param {String} key
     * @param {T} value
     * @returns {Store} - Current Store
     * @memberof Store
     */
    set(key, value) {
        this.cache.set(key, value);
        return this;
    }

    /**
     * Delete an element by key in the Store
     *
     * @param {String} key
     * @returns {Boolean} - Whether the element was deleted or not
     * @memberof Store
     */
    delete(key) {
        return this.cache.delete(key);
    }

    // General cache manipulation

    /**
     * `Store.cache` to array (simple array of value)
     *
     * @returns {Array<T>}
     * @memberof Store
     */
    toArray() {
        return [...this.values()];
    }

    /**
     * `Store.cache` to object
     *
     * @returns {Object.<string, T>}
     * @memberof Store
     */
    toObject() {
        const obj = {};
        for (const [key, value] of this.entries() ) {
            obj[key] = value;
        }
        return obj;
    }

    /**
     * The first value of the Store
     *
     * @returns {T} - The first element
     * @memberof Store
     */
    first() {
        return this.values().next().value;
    }

    /**
     * Apply a function to the Store and returns a new Store.
     * Usable over: `map`, `filter`, `toArray`.
     * Using apply with toArray is pretty much "cloning" the Store.
     *
     * @param {String} key - The property to use as key for the new Store
     * @param {String} func - The function name to apply to the Store
     * @param {...any} args - All the arguments that need to be applied to the function
     * @returns {Store<T>} A new Store modified by the apply call
     * @memberof Store
     */
    apply(key, func, ...args) {
        if (![
            'map',
            'filter',
            'toArray',
        ].includes(func) ) {
            throw new AxonError(`You can't use apply on function: ${func}.`, 'Store');
        }
        return new Store(new Map(this[func](...args).map(e => [e[key], e] ) ) );
    }

    /**
     * Execute a function over each element of the Store in a synchronous fashion
     *
     * @param {(i: T) => void} func - A function that takes an object and do something on it
     * @returns {Store} The current Store
     * @memberof Store
     */
    forEach(func) {
        for (const item of this.values() ) {
            func(item);
        }
        return this;
    }

    /**
     * Execute a function over each element of the Store in an asynchronous fashion
     *
     * @param {(i: T) => Promise<void>} func - A function that takes an object and do something on it
     * @returns {Promise<Store>} The current Store
     * @memberof Store
     */
    async forEachAsync(func) {
        for (const item of this.values() ) {
            await func(item);
        }
        return this;
    }

    /**
     * Removes from the Store all element that satisfy the function in parameter
     *
     * @param {(value: T, key: String) => Boolean} func
     * @returns {Store} - The current Store
     * @memberof Store
     */
    sweep(func) {
        for (const [key, val] of this.entries() ) {
            if (func(val, key) ) {
                this.delete(key);
            }
        }
        return this;
    }

    /**
     * Return the first object to make the function evaluate true
     *
     * @param {(i: T) => Boolean} func - A function that takes an object and returns true if it matches
     * @returns {T} The first matching object, or null if no match
     * @memberof Store
     */
    find(func) {
        for (const item of this.values() ) {
            if (func(item) ) {
                return item;
            }
        }
        return null;
    }

    /**
     * Return an array with the results of applying the given function to each element
     *
     * @template R
     * @param {(i: T) => R} func - A function that takes an object and returns something
     * @returns {Array<R>} An array containing the results
     * @memberof Store
     */
    map(func) {
        const arr = [];
        for (const item of this.values() ) {
            arr.push(func(item) );
        }
        return arr;
    }

    /**
     * Return all the objects that make the function evaluate true
     *
     * @param {(i: T) => Boolean} func - A function that takes an object and returns true if it matches
     * @returns {Array<T>} An array containing all the objects that matched
     * @memberof Store
     */
    filter(func) {
        const arr = [];
        for (const item of this.values() ) {
            if (func(item) ) {
                arr.push(item);
            }
        }
        return arr;
    }

    /**
     * Reduce values by function
     *
     * @template U
     * @param {(accumulator: U, val: T) => U} func - Function to execute on each element in the array
     * @param {Number} [initialValue=0] - Value to use as the first argument to the first call of the callback
     * @returns {U} Accumulator
     * @memberof Store
     */
    reduce(func, initialValue = 0) {
        const iter = this.values();
        let val;
        let result = initialValue === undefined ? iter.next().value : initialValue;
        while ( (val = iter.next().value) !== undefined) {
            result = func(result, val);
        }
        return result;
    }

    /**
     * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param {(i: T) => Boolean} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} Whether or not any of the elements returned true
     * @memberof Store
     */
    some(func) {
        for (const item of this.values() ) {
            if (func(item) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param {(i: T) => Boolean} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} Whether or not all of the elements returned true
     * @memberof Store
     */
    every(func) {
        for (const item of this.values() ) {
            if (!func(item) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get a random object from the Store
     *
     * @returns {T?} The random object, or null if there is no match
     * @memberof Store
     */
    random() {
        if (!this.size) {
            return null;
        }
        return this.toArray()[Math.floor(Math.random() * this.size)];
    }

    toString() {
        return `[Store<${this.baseObject.name}>]`;
    }
}

export default Store;
