/* eslint-disable max-classes-per-file */
import Store from '../Store';

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
 * @template T
 * @class LRUCache
 * @extends Store<Node<T>>
 * @prop {Number} limit - Maximum size of the LRU
 * @prop {Node<T>} head
 * @prop {Node<T>} tail
 */
class LRUCache extends Store {
    /**
     * Creates an instance of LRUCache.
     *
     * @param {Number} limit - Max number of elements in the cache
     * @param {Object} options - Options used to construct the cache
     * @param {Object.<string, T>|Array<[string, T]>} [options.iterable=null]
     * @memberof LRUCache
     */
    constructor(limit, options = {} ) {
        super(new Map() );
        const { iterable = null } = options;
        
        this.limit = limit;
        
        /**
         * @type {Node<T>}
         */
        this.head = null;
        /**
         * @type {Node<T>}
         */
        this.tail = null;
        
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
     * Retrieve a value from the LRU cache
     *
     * @param {String} key
     * @returns {T} value
     * @memberof LRUCache
     */
    get(key) {
        const node = this.cache.get(key);
        if (node) {
            const { value } = node;

            // move to top
            this.delete(key);
            this.set(key, value);
  
            return value;
        }
        return null;
    }

    /**
     * Add a value in the LRU cache.
     *
     * @param {String} key
     * @param {T} value
     * @param {LRUCache<T>} - The current LRUCache
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
        this.cache.set(key, this.head);
        return this;
    }

    /**
     * Delete an element from the LRUCache
     *
     * @param {String} key
     * @returns {Boolean} - Wether it deleted the item or not
     * @memberof LRUCache
     */
    delete(key) {
        const node = this.cache.get(key);
  
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
  
        return this.cache.delete(key);
    }

    /**
     * Empty the LRUCache entirely
     * @memberof LRUCache
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.cache = new Map();
    }

    _ensureLimit() {
        if (this.size === this.limit) {
            this.delete(this.tail.key);
        }
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
