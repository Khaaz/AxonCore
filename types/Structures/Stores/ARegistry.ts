
/**
 * Abstract class to hold and manage a set of items.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ARegistry
 */
export declare class ARegistry<T> {
    /** The AxonClient */
    private _axon: AxonClient;
    /** The collection of items hold by the registry */
    public registry: Collection<T>;
    /**
     * Creates an instance of ARegistry.
     *
     * @param axon - The AxonClient
     * @param base - The base definition to use for the registry
     * @memberof ARegistry
     */
    constructor(axon: AxonClient, base: T);
    /**
     * Get the AxonClient
     *
     * @readonly
     * @memberof ARegistry
     */
    readonly axon: AxonClient;
    /**
     * Get the size of the registry
     *
     * @readonly
     * @memberof ARegistry
     */
    readonly size: number;
    /**
     * Check whether the item exist in the registry
     *
     * @returns Whether the item exists
     * @memberof ARegistry
     */
    has(key: string): boolean;
    /**
     * Get an item from the registry
     *
     * @returns The item
     * @memberof ARegistry
     */
    get(key: string): T | null;
    /**
     * Get the registry
     *
     * @returns The current registry
     * @memberof ARegistry
     */
    getAll(): Collection<T>;
    /**
     * Add an item to the registry
     *
     * @returns The registry
     * @memberof ARegistry
     */
    add(key: string, value: T): Collection<T>;
    /**
     * Remove an item from the registry
     *
     * @returns {Boolean} - Whether it could remove the item or not
     * @memberof ARegistry
     */
    remove(key: string): boolean;
    public [Symbol.iterator](): [string|number, T][];
    /**
     * Register correctly an item in the registry.
     *
     * @memberof ARegistry
     */
    public register(key: string, value: T): any; // Not implemented
    /**
     * Unregister correctly an item from the registry.
     *
     * @memberof ARegistry
     */
    public unregister(key: string, value: T): any; // Not implemented
}
