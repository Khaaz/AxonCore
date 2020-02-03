/**
 * Extended Map with built in methods foreaseof data manipulation.
 * Based on Eris.Collection
 *
 * @author KhaaZ
 *
 * @class Collection
 * @extends Map
 *
 * @prop {Class} baseObject - The base class for all items
 */
class Collection extends Map {
    /**
     * Creates an instance of Collection.
     *
     * @param {Object} options
     * @param {Class} [options.base=null]
     * @param {Array|Object} options.iterable
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
        this.baseObject = baseObject;
    }

    /**
     * Creates a collection from an array
     *
     * @static
     * @param {Array<Class>} array - The array of object
     * @param {String} key - The property to use as key
     * @returns {Collection<Class>} A newly created Collection
     * @memberof Collection
     */
    static from(array, key) {
        return new Collection( { base: array[0].constructor, iterable: array.map(e => [e[key], e] ) } );
    }

    /**
     * Map to array
     * [ value, value, value ]
     *
     * @returns {Array<Class>}
     * @memberof Collection
     */
    toArray() {
        return [...this.values()];
    }

    /**
     * Map to object
     * { key: value, key: value }
     *
     * @returns {Object<key:value>}
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
     * @param {Object} args - All the argument that need to be applied to the Collection
     * @returns {Collection} A new Collection modified by the apply call
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
     * @param {String} value - The ID of the object
     * @param {Object} key - The object data
     * @param {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {Class} The existing or newly created object
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
     * @param {Function} func - A function that takes an object and returns true if it matches
     * @returns {Class} The first matching object, or null if no match
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
     * @param {Function} func - A function that takes an object and returns something
     * @returns {Array} An array containing the results
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
     * @param {Function} func - A function that takes an object and returns true if it matches
     * @returns {Array<Class>} An array containing all the objects that matched
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
     * @param {Function} callbackFn - Function to execute on each element in the array
     * @param {Number} [initialValue=0] - Value to use as the first argument to the first call of the callback
     * @returns accumulator
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
     * @param {Function} func - A function that takes an object and returns true if it matches
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
     * Test if all elements passe the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param {Function} func - A function that takes an object and returns true if it matches
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
     * @param {Object} value - The updated object data
     * @param {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {Class} The updated object
     * @memberof Collection
     */
    update(key, value) {
        return this.add(key, value, true);
    }

    /**
    * Remove an object
    *
    * @param {String} key - The ID of the object
    * @returns {Class} The removed object, or null if nothing was removed
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
     * @returns {Class?} The random object, or null if there is no match
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
