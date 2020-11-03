/**
 * Generic class that expose all data manipulation methods.
 * A Store can be constructed with any Key => Value structure (Map like object).
 * It exposes all methods similar to aarray methods in one place.
 *
 * @author KhaaZ
 * @class Store
 * @prop {Map} cache - Key => Value Data structure
 */
export declare class Store<T> {
    /** Key => Value data structure */
    public cache: Map<string, T>;

    /**
     * Current size of the cache
     * @readonly
     * @memberof Store
     */
    readonly size: number;

    /**
     * Iterator over `cache.entries`
     * @memberof Store
     */
    public entries(): IterableIterator<[string, T]>;
    /**
     * Iterator over `cache.keys`
     * @memberof Store
     */
    public keys(): IterableIterator<string>;
    /**
     * Iterator over `cache.values`
     * @memberof Store
     */
    public values(): IterableIterator<T>;
    /**
     * Iterator over cache
     * @memberof Store
     */
    public [Symbol.iterator](): IterableIterator<[string, T]>;
    /**
     * Whether an element exists in the store
     * @memberof Store
     */
    public has(key: string): boolean;
    /**
     * Get an element by key in the store
     * @memberof Store
     */
    public get(key: string): T | null;
    /**
     * Set an element in the store
     * @returns Current store
     * @memberof Store
     */
    public set(key: string, value: T): this;
    /**
     * Delete an element by key in the store
     * @returns Whether the element was deleted or not
     * @memberof Store
     */
    public delete(key: string): boolean;
    /**
     * `Store.cache` to array
     * @memberof Store
     */
    public toArray(): T[];
    /**
     * `Store.cache` to object
     * @memberof Store
     */
    public toObject(): { [key: string]: T; };
    /**
     * The first value of the store
     * @returns The first element
     * @memberof Store
     */
    public first(): T;
    /**
     * Execute a function over each element of the Store in a synchronous fashion
     * @param func A function that takes an object and do something on it
     * @returns The current store
     * @memberof Store
     */
    public forEach(func: (i: T) => void): this;
    /**
     * Execute a function over each element of the Store in an asynchronous fashion
     * @param func A function that takes an object and do something on it
     * @returns The current store
     * @memberof Store
     */
    public forEachAsync(func: (i: T) => Promise<void>): Promise<this>;
    /**
     * Removes from the Store all element that satisfy the function in parameter
     * @returns The current store
     * @memberof Store
     */
    public sweep(func: (value: T, key: string) => boolean): this;
    /**
     * Removes from the Store all element that satisfy the function in parameter
     * @returns All deleted elements
     * @memberof Store
     */
    public removeAll(func: (value: T, key: string) => boolean): T[];
    /**
     * Removes an element from the Store
     * @param {String} key - The ID of the object
     * @returns {T} The removed object, or null if nothing was removed
     * @memberof Store
     */
    public remove(key: string): T | null;
    /**
     * Return the first object to make the function evaluate true
     * @param func A function that takes an object and returns true if it matches
     * @returns The first matching object, or null if no match
     * @memberof Store
     */
    public find(func: (i: T) => boolean): T;
    /**
     * Return an array with the results of applying the given function to each element
     * @param func A function that takes an object and returns something
     * @returns An array containing the results
     * @memberof Store
     */
    public map<R>(func: (i: T) => R): R[];
    /**
     * Return all the objects that make the function evaluate true
     * @param func A function that takes an object and returns true if it matches
     * @returns An array containing all the objects that matched
     * @memberof Store
     */
    public filter(func: (i: T) => boolean): T[];
    /**
     * Reduce values by function
     * @param func Function to execute on each element in the array
     * @param initialValue Value to use as the first argument to the first call of the callback
     * @returns Accumulator
     * @memberof Store
     */
    public reduce<U>(func: (accumulator: U, val: T) => U, initialValue?: number): U;
    /**
     * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
     * @param func A function that takes an object and returns true if it matches
     * @returns Whether or not any of the elements returned true
     * @memberof Store
     */
    public some(func: (i: T) => boolean): boolean
    /**
     * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
     * @param func A function that takes an object and returns true if it matches
     * @returns Whether or not all of the elements returned true
     * @memberof Store
     */
    public every(func: (i: T) => boolean): boolean
    /**
     * Get a random object from the store
     * @returns The random object, or null if there is no match
     * @memberof Store
     */
    public random(): T;

    /**
     * Apply a function to the Store and returns a new Store.
     * Usable over: `map`, `filter`, `toArray`
     * @param key The property to use as key for the new Store
     * @param func The function name to apply to the Store
     * @param fn A function that takes an object and returns it (map) or true if it matches (filter)
     */
    public apply<R>(key: string, func: 'map', fn: (i: T) => R): Store<R>;
    public apply(key: string, func: 'filter', fn: (i: T) => boolean): Store<T>;
    public apply(key: string, func: 'toArray'): Store<T>;

    public toString(): string;
}
