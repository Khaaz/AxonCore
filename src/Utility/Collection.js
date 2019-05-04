/**
 * Hold a bunch of something
 * Based on Eris.Collection
 *
 * @author KhaaZ
 *
 * @prop {Class} baseObject - The base class for all items
 * @extends Map
 */
class Collection extends Map {
    /**
     * Construct a Collection.
     *
     * @arg {Class} [baseObject=null] - The base class for all items
     * @arg {Object} iterable - Iterable to construct the Map from
     *
     * @prop {}
     */
    constructor(baseObject = null, iterable) {
        if (iterable && iterable instanceof Array) {
            super(iterable);
        } else if (iterable && iterable instanceof Object) {
            super(Object.entries(iterable) );
        } else {
            super();
        }
        this.baseObject = baseObject;
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
     * Add an object
     * If baseObject, add only if instance of baseObject
     * If no baseObject, add
     *
     * @arg {String} value - The ID of the object
     * @arg {Object} key - The object data
     * @arg {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {Class} The existing or newly created object
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
     * @arg {Function} func - A function that takes an object and returns true if it matches
     * @returns {Class?} The first matching object, or null if no match
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
     * @arg {Function} func - A function that takes an object and returns something
     * @returns {Array} An array containing the results
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
     * @arg {Function} func - A function that takes an object and returns true if it matches
     * @returns {Array<Class>} An array containing all the objects that matched
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
     * @arg {Function} callbackFn - Function to execute on each element in the array
     * @arg {Number} [initialValue=0] - Value to use as the first argument to the first call of the callback
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
     * @arg {Function} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
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
     * @arg {Function} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
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
     * @arg {String} key - The ID of the object
     * @arg {Object} value - The updated object data
     * @arg {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {Class} The updated object
     */
    update(key, value) {
        return this.add(key, value, true);
    }

    /**
    * Remove an object
    *
    * @arg {String} key - The ID of the object
    * @returns {Class?} The removed object, or null if nothing was removed
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
