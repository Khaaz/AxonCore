import { Store } from '../';

/**
 * Custom Store that uses Map as cache.
 * Enforces that a single object type exists in a Collection.
 *
 * @author KhaaZ
 *
 * @class Collection
 * @extends Store<T>
 */
export declare class Collection<T> extends Store<T> {
    /** The base class for all items */
    public baseObject: new (...args: any[] ) => T;
    /**
     * Creates an instance of Collection.
     * @memberof Collection
     */
    constructor(options?: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );

    /**
     * Creates a collection from an array
     * @static
     * @param array - The array of object
     * @param key - The property to use as key
     * @returns A newly created Collection
     * @memberof Collection
     */
    static from<R>(array: R[], key: string): Collection<R>;

    /**
     * Add an object
     * If baseObject, add only if instance of baseObject
     * If no baseObject, add
     *
     * @param key - The ID of the object
     * @param value - The object data
     * @param replace - Whether to replace an existing object with the same ID
     * @returns The existing or newly created object
     * @memberof Collection
     */
    public add(key: string, value: T, replace?: boolean): T;

    public toString(): string;
}
