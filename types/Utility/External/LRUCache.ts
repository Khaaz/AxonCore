import { Store } from '../../';

/**
 * @author KhaaZ
 * @class Node
 */
declare class Node<T> {
    public key: string;
    public value: T;
    public next: Node<T>;
    public prev: Node<T>;
    /**
     * Creates an instance of Node
     */
    constructor(key: string, value: T, next?: Node<T>, prev?: Node<T>)
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
 * @extends Store<Node<T>>
 */
export declare class LRUCache<T> extends Store<T> {
    /** Maximum size of the LRU */
    public limit: number;
    public head: Node<T> | null;
    public tail: Node<T> | null;
    /**
     * Creates an instance of LRUCache.
     *
     * @param limit - Max number of elements in the cache
     * @param options - Options used to construct the cache
     * @memberof LRUCache
     */
    constructor(limit: number, options: { iterable?: {[key: string]: T;} | [string, T][]; } );

    /**
     * Retrieve a value from the LRU cache
     * @memberof LRUCache
     */
    public get(key: string): T | null;
    /**
     * Add a value in the LRU cache.
     * @memberof LRUCache
     */
    public set(key: string, value: T): this;
    /**
     * Delete an element from the LRU cache
     * @memberof LRUCache
     */
    public delete(key: string): boolean;
    /**
     * Empty the LRUCache entirely
     * @memberof LRUCache
     */
    public clear(): void;
    private _ensureLimit(): void;

    public [Symbol.iterator](): IterableIterator<[string, T]>;
}
