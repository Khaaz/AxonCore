
/**
 * Extended Map with built in methods for ease of data manipulation.
 * Based on Eris.Collection
 *
 * @author KhaaZ
 *
 * @class Collection
 * @extends
 *
 * @prop {Class} baseObject - The base class for all items
 */
export declare class Collection<T> extends Map<string | number, T> {
    public baseObject: new (...args: any[] ) => T;
    /**
     * Creates an instance of Collection.
     * @memberof Collection
     */
    public constructor(base: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );

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

    /**
     * Return the first object to make the function evaluate true
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns The first matching object, or null if no match
     * @memberof Collection
     */
    public find(func: (i: T) => boolean): T;

    /**
     * Get a random object from the Collection
     *
     * @returns The random object, or null if there is no match
     * @memberof Collection
     */
    public random(): T;

    /**
     * Return all the objects that make the function evaluate true
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof Collection
     */
    public filter(func: (i: T) => boolean): T[];

    /**
     * Return an array with the results of applying the given function to each element
     *
     * @param func - A function that takes an object and returns something
     * @returns An array containing the results
     * @memberof Collection
     */
    public map<R>(func: (i: T) => R): R[];

    /**
    	 * Reduce values by function
     *
     * @param func - Function to execute on each element in the array
     * @param initialValue - Value to use as the first argument to the first call of the callback
     * @returns Accumulator
     * @memberof Collection
	 */
    public reduce<U>(func: (accumulator: U, val: T) => U, initialValue?: number): U;

    /**
     * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof Collection
     */
    public every(func: (i: T) => boolean): boolean;

    /**
     * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @param func - A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof Collection
     */
    public some(func: (i: T) => boolean): boolean;

    /**
     * Update an object
     *
     * @param key - The ID of the object
     * @param value - The updated object data
     * @returns The updated object
     * @memberof Collection
     */
    public update(key: string, value: T): T;

    /**
     * Remove an object
     *
     * @param {String} key - The ID of the object
     * @returns {T} The removed object, or null if nothing was removed
     *
     * @memberof Collection
     */
    public remove(key: string): T | null;

    /**
     * Map to array
     * [ value, value, value ]
     * @memberof Collection
     */
    public toArray(): T[];

    /**
     * Map to object
     * { key: value, key: value }
     * @memberof Collection
     */
    public toObject(): {[key: string]: T;};

    public toString(): `[Collection<Name>]`;

    /**
     * Apply a function to the Collection and returns a new Collection
     * @param key - The property to use as key for the new Collection
     * @param func - The function name to apply to the Collection
     * @param args - All the argument that need to be applied to the Collection
     * @returns A new Collection modified by the apply call
     */
    public apply<R>(key: string, func: 'from', args: [Array<R>, string] ): Collection<R>;
    public apply(key: string, func: 'add', args: [string, T, boolean?] ): Collection<T>;
    public apply(key: string, func: 'find' | 'filter', args: [(i: T) => boolean] ): Collection<T>;
    public apply(key: string, func: 'random' | 'toArray' | 'toObject'): Collection<T>;
    public apply<R>(key: string, func: 'map', args: [(i: T) => R] ): Collection<R>;
    public apply<U>(key: string, func: 'reduce', args: [(accumulator: U, val: T) => U, U] ): Collection<U>;
    public apply(key: string, func: 'update', args: [string, T] ): Collection<T>;
    public apply(key: string, func: 'remove', args: [string] ): Collection<T | null>;
}
