
/**
 * Registry that holds all Commands.
 *
 * @author KhaaZ
 *
 * @class ListenerRegistry
 * @extends ARegistry<Listener>
 */
export declare class ListenerRegistry extends ARegistry<Listener> {
    /**
     * Creates an instance of ListenerRegistry
     */
    constructor(axon: AxonClient);
    /**
     * Register a Listener inside the ListenerRegistry
     *
     * @param label - The listener label
     * @param listener - The listener object
     * @memberof ListenerRegistry
     */
    register(label: string, listener: Listener): void;
    /**
     * Unregister a Listener from the ListenerRegistry
     *
     * @param label - The listener label
     * @param listener - The listener object
     * @memberof ListenerRegistry
     */
    unregister(label: string, listener?: Listener): void;
}
