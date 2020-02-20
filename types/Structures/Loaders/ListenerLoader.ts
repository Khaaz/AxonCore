
/**
 * Load listeners in AxonClient.
 * Validate the listener entirely.
 *
 * @class ListenerLoader
 * @extends ALoader<AxonClient>
 */
export declare class ListenerLoader extends ALoader<AxonClient> {
    private _module: Module;
    /**
     * Creates an instance of ListenerLoader
     */
    constructor(module: Module);
    /**
     * Returns the Module instance
     *
     * @readonly
     * @memberof ListenerLoader
     */
    readonly axon: AxonClient;
    /**
     * Returns the Logger instance
     *
     * @readonly
     * @memberof ListenerLoader
     */
    readonly logger: ALogger;
    /**
     * Load one event instance in the module.
     * Validate and correct the event before registering it.
     *
     * @param listener - The event to load
     * @memberof ListenerLoader
     */
    load(listener: Listener): boolean;
    /**
     * Load all events in the module.
     * Instantiate all events.
     *
     * @memberof ListenerLoader
     */
    loadAll(listeners: { [key: string]: Listener; } ): boolean;
    /**
     * Unload a Listener from the client
     *
     * @param label - The Listener label to unload
     * @returns Whether it worked
     * @memberof ListenerLoader
     */
    unload(label: string): true;
}
