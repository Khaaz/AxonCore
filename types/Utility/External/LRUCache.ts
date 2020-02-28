import { Collection } from '../../';

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
 */
export declare class LRUCache<T> {
    /** Maximum size of the LRU */
    public limit: number;
    /** Current size of the LRU */
    public size: number;
    public head: Node<T> | null;
    public tail: Node<T> | null;
    /** The Collection holding the cache (private, handled by the LRU structure) */
    private _cache: Collection<T>;
    /**
     * Creates an instance of LRUCache.
     *
     * @param limit - Max number of element in the Collection
     * @param options - Options used to construct the Collection
     * @memberof LRUCache
     */
    constructor(limit: number, options: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );
    /**
     * Add a value in the LRU cache.
     *
     * @memberof LRUCache
     */
    public set(key: string, value: T): void;
    /**
     * Retrieve a value from the LRU cache
     *
     * @returns Value
     * @memberof LRUCache
     */
    public get(key: string): T | null;
    /**
     * Remove an element from the LRUCache
     *
     * @memberof LRUCache
     */
    public remove(key: string): void;
    /**
     * Empty the LRUCache entirely
     * @memberof LRUCache
     */
    public clear(): void;
    private _ensureLimit(): void;
    /**
     * Execute a function against every element of the Collection
     *
     * @memberof LRUCache
     */
    public forEach<K>(fn: (value: T, key: K, map: Map<K, T>) => void): void;
    /**
     * Return the first object to make the function evaluate true
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns The first matching object, or null if no match
     * @memberof LRUCache
     */
    public find(func: (i: T) => boolean): T;
    /**
     * Return an array with the results of applying the given function to each element
     *
     * @param func - A function that takes an object and returns something
     * @returns An array containing the results
     * @memberof LRUCache
     */
    public map<R>(func: (i: T) => R): R[];
    /**
     * Return all the objects that make the function evaluate true
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof LRUCache
     */
    public filter(func: (i: T) => boolean): T[];
    /**
     * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof LRUCache
     */
    public some(func: (i: T) => boolean): boolean;
    /**
     * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof LRUCache
     */
    public every(func: (i: T) => boolean): boolean;
    public [Symbol.iterator](): [string|number, T][];
}
