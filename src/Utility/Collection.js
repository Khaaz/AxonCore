/**
 * Extended Map with built in methods for ease of data manipulation.
 * Based on Eris.Collection
 *
 * @author KhaaZ
 *
 * @class Collection
 * @extends Map<string|number,T>
 *
 * @template T
 * @prop {T} baseObject - The base class for all items
 */
class Collection extends Map {
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
            super(iterable);
        } else if (iterable && iterable instanceof Object) {
            super(Object.entries(iterable) );
        } else {
            super();
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
     * Map to array
     * [ value, value, value ]
     *
     * @returns {Array<T>}
     * @memberof Collection
     */
    toArray() {
        return [...this.values()];
    }

    /**
     * Map to object
     * { key: value, key: value }
     *
     * @returns {{[key:string]: T}}
     *
     * @memberof Collection
     */
    toObject() {
        const obj = {};
        for (const [key, value] of this.entries() ) {
            obj[key] = value;
        }
        return obj;
    }

    /**
     * Apply a function to the Collection and returns a new Collection
     *
     * @param {String} key - The property to use as key for the new Collection
     * @param {String} func - The function name to apply to the Collection
     * @param {Array} args - All the argument that need to be applied to the Collection
     * @returns {Collection<T>} A new Collection modified by the apply call
     * @memberof Collection
     */
    apply(key, func, ...args) {
        return new Collection( { base: this.baseObject, iterable: this[func](...args).map(e => [e[key], e] ) } );
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

    /**
     * Return the first object to make the function evaluate true
     *
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {T} The first matching object, or null if no match
     * @memberof Collection
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
     * @memberof Collection
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
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {Array<T>} An array containing all the objects that matched
     * @memberof Collection
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
     * @memberof Collection
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
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
     * @memberof Collection
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
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
     * @memberof Collection
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
     * Update an object
     *
     * @param {String} key - The ID of the object
     * @param {T} value - The updated object data
     * @returns {T} The updated object
     * @memberof Collection
     */
    update(key, value) {
        return this.add(key, value, true);
    }

    /**
     * Remove an object
     *
     * @param {String} key - The ID of the object
     * @returns {T} The removed object, or null if nothing was removed
     *
     * @memberof Collection
     */
    remove(key) {
        const item = this.get(key);
        if (!item) {
            return null;
        }
        this.delete(key);
        return item;
    }

    /**
     * Get a random object from the Collection
     *
     * @returns {T?} The random object, or null if there is no match
     * @memberof Collection
     */
    random() {
        if (!this.size) {
            return null;
        }
        return Array.from(this.values() )[Math.floor(Math.random() * this.size)];
    }

    toString() {
        return `[Collection<${this.baseObject.name}>]`;
    }
}

export default Collection;
