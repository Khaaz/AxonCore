import { AxonClient, Store } from '../../';

/**
 * Abstract class to hold and manage a set of items.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ARegistry
 * @extends Store
 */
export declare class ARegistry<T> extends Store<T> {
    /** The AxonClient */
    private _axon: AxonClient;
    /** The base definition to use for the registry */
    private _base: T
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
     * @readonly
     * @memberof ARegistry
     */
    readonly axon: AxonClient;
    /**
     * Returns the current registry
     * @readonly
     * @memberof ARegistry
     */
    readonly registry: Map<string, T>;
    /**
     * Check whether the item exists in the registry
     * @returns Whether the item exists
     * @memberof ARegistry
     */
    public has(key: string): boolean;
    /**
     * Get an item from the registry
     * @returns The item
     * @memberof ARegistry
     */
    public get(key: string): T|null;
    /**
     * Add an item to the registry
     * @returns The registry
     * @memberof ARegistry
     */
    public add(key: string, value: T): this;
    /**
     * Remove an item from the registry
     * @returns Whether it removed the item or not
     * @memberof ARegistry
     */
    public remove(key: string): boolean;
    /**
     * Register correctly an item in the registry
     * @memberof ARegistry
     */
    public register(key: string, value: T): any; // Not implemented
    /**
     * Unregister correctly an item from the registry.
     * @memberof ARegistry
     */
    public unregister(key: string, value: T): any; // Not implemented
}
