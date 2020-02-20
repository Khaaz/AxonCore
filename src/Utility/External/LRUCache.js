/* eslint-disable max-classes-per-file */
import Collection from '../Collection';

/**
 * @template T
 * @author KhaaZ
 * @class Node
 */
class Node {
    /**
     * Creates an instance of Node
     * @param {String} key
     * @param {T} [value]
     * @param {Node<T>} [next]
     * @param {Node<T>} [prev]
     */
    constructor(key, value, next = null, prev = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

/**
 * Least Recently Used cache implementation.
 * Read and Write operations are in O(1)
 *
 * https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
 *
 * @author KhaaZ
 *
 * @class LRUCache
 *
 * @template T
 *
 * @prop {Number} limit - Maximum size of the LRU
 * @prop {Number} size - Current size of the LRU
 * @prop {Node<T>} head
 * @prop {Node<T>} tail
 * @prop {Collection<T>} _cache - The Collection holding the cache (private, handled by the LRU structure)
 */
class LRUCache {
    /**
     * Creates an instance of LRUCache.
     *
     * @param {Number} limit - Max number of element in the Collection
     * @param {Object} options - Options used to construct the Collection
     * @param {new (...args: Array<any> ) => T} [options.base=null]
     * @param {Object.<string, T>|Array<[string, T]>} [options.iterable=null]
     * @memberof LRUCache
     */
    constructor(limit, options = {} ) {
        const { iterable = null } = options;
        this.limit = limit;
        this.size = 0;
        
        /**
         * @type {Node<T>}
         */
        this.head = null;
        /**
         * @type {Node<T>}
         */
        this.tail = null;
        
        /**
         * @type {Collection<T>}
         */
        this._cache = new Collection( { base: options.base } );
        
        if (iterable && Array.isArray(iterable) ) {
            for (const elem of iterable) {
                this.set(elem[0], elem[1] );
            }
        } else if (iterable && iterable instanceof Object) {
            for (const elem of Object.entries(iterable) ) {
                this.set(elem[0], elem[1] );
            }
        }
    }

    /**
     * Add a value in the LRU cache.
     *
     * @param {String} key
     * @param {T} value
     * @memberof LRUCache
     */
    set(key, value) {
        if (!this.head) {
            this.head = this.tail = new Node(key, value);
        } else {
            const node = new Node(key, value, this.head);
            this.head.prev = node;
            this.head = node;
        }
  
        // Update the cache map
        this._cache.set(key, this.head);
        this.size++;
    }

    /**
     * Retrieve a value from the LRU cache
     *
     * @param {String} key
     * @returns {T} value
     * @memberof LRUCache
     */
    get(key) {
        const node = this._cache.get(key);
        if (node) {
            const { value } = node;

            // move to top
            this.remove(key);
            this.set(key, value);
  
            return value;
        }
        return null;
    }

    /**
     * Remove an element from the LRUCache
     *
     * @param {String} key
     * @memberof LRUCache
     */
    remove(key) {
        const node = this._cache.get(key);
  
        if (node.prev !== null) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
  
        if (node.next !== null) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
  
        this._cache.delete(key);
        this.size--;
    }

    /**
     * Empty the LRUCache entirely
     * @memberof LRUCache
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this._cache = new Collection();
    }

    _ensureLimit() {
        if (this.size === this.limit) {
            this.remove(this.tail.key);
        }
    }

    /**
     * Execute a function against every element of the Collection
     *
     * @template K
     *
     * @param {(value: T, key: K, map: Map<K, T>) => void} fn
     * @memberof LRUCache
     */
    forEach(fn) {
        this._cache.forEach(fn);
    }

    /**
     * Return the first object to make the function evaluate true
     *
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {T} The first matching object, or null if no match
     * @memberof LRUCache
     */
    find(func) {
        return this._cache.find(func);
    }

    /**
     * Return an array with the results of applying the given function to each element
     *
     * @template R
     *
     * @param {(i: T) => R} func - A function that takes an object and returns something
     * @returns {Array<R>} An array containing the results
     * @memberof LRUCache
     */
    map(func) {
        return this._cache.map(func);
    }

    /**
     * Return all the objects that make the function evaluate true
     *
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {Array<T>} An array containing all the objects that matched
     * @memberof LRUCache
     */
    filter(func) {
        return this._cache.filter(func);
    }

    /**
     * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
     * @memberof LRUCache
     */
    some(func) {
        return this._cache.some(func);
    }

    /**
     * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param {(i: T) => boolean} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
     * @memberof LRUCache
     */
    every(func) {
        return this._cache.every(func);
    }

  
    // To iterate over LRU with a 'for...of' loop
    *[Symbol.iterator]() {
        let node = this.head;
        while (node) {
            yield node;
            node = node.next;
        }
    }
}

export default LRUCache;
