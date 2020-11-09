import {
    Base, Listener, Collection, AHandler, AxonClient,
} from '../../';

/**
 * Event Manager class
 *
 * @author KhaaZ
 *
 * @class EventManager
 * @extends Base
 */
export declare class EventManager extends Base {
    /**
     * Object that links an event name to an array of Listener objects
     */
    private _events: {[EventName: string]: Listener[];};
    /**
     * Collection of handler keyed to the event name
     */
    private _handlers: Collection<AHandler>;
    /**
     * Creates an EventManager instance.
     *
     * @memberof EventManager
     */
    constructor(axon: AxonClient);
    // GETTERS
    /**
     * Returns all Handlers base
     *
     * @readonly
     * @memberof EventManager
     */
    readonly HANDLERS: object;
    /**
     * Returns Collection of every handlers for every Discord event
     *
     * @readonly
     * @memberof EventManager
     */
    readonly handlers: Collection<AHandler>;

    /**
     * Get all functions bound to the event passed in parameters.
     *
     * @param eventName - The library event name
     * @returns Array of the functions bound to the event
     * @memberof EventManager
     */
    public getListeners(eventName: string): Listener[];
    /**
     * Bind all listeners to a handler.
     * Create and register a handler for each event.
     * Called by AxonClient in start method.
     * If the bot is ready, also call bindHandlers()
     * @memberof EventManager
     */
    public bindListeners(): void;
    /**
     * Bind every handler to the correct Discord event and start listening to this event.
     * @memberof EventManager
     */
    public bindHandlers(): void;

    /**
     * Register a listener for the given discord event.
     * Add the Listener in the array of Listener for each discord event.
     * Called by ModuleLoader when registering an event.
     *
     * @param listener - The Listener Object
     * @returns Array of the functions bound to the event
     *
     * @memberof EventManager
     */
    public registerListener(event: Listener): Listener[];
    /**
     * Register a handler.
     * Remove the current event listener if the handler already exists.
     * Create a new handler from the array of listeners for the given event.
     *
     * @param event - The Discord event name
     * @returns The new Handler created
     * @memberof EventManager
     */
    public registerHandler(event: string): AHandler;
    /**
     * Register an event handler and start listen to this event.
     * Recreate a handler and bind it to the event emitter.
     *
     * @param event - The Discord event name to register
     * @returns The Handler Object
     * @memberof EventManager
     */
    public registerEvent(event: string): object;

    /**
     * Unregister a listener.
     * Recreate the handler without the unregistered listener and listen to the updated handler
     *
     * @param event - Name of the Discord event
     * @param label - Label of the listener
     * @returns True if worked / False if label or event doesn't exist
     * @memberof EventManager
     */
    public unregisterListener(event: string, label: string): boolean;
    /**
     * Unregister a handler. Unregister the event and delete the handler.
     *
     * @param event - Name of the Discord event
     * @returns True if worked / False if event doesn't exist
     * @memberof EventManager
     */
    public unregisterHandler(event: string): boolean;
    /**
     * Unregister the given event without deleting the handler.
     * Just stop listening to the discord event emitted.
     *
     * @param event - Name of the Discord event
     * @returns True if worked / False if event doesn't exist
     * @memberof EventManager
     */
    public unregisterEvent(event: string): boolean;
}
