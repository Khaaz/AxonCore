import Base from './Base';

import Collection from '../Utility/Collection';
import Handler from './Handler';

/**
 * Event Manager class
 *
 * @author KhaaZ
 *
 * @class EventManager
 * @extends {Base}
 */

class EventManager extends Base {
    /**
     * Creates an EventManager instance.
     * @param {Object<AxonClient>} axon
     *
     * @prop {Object} _listeners - Object that links an event name to an array of event objects { eventName: [Event, Event] }
     * @prop {Collection<Object>} _handlers - Collection of handler keyed to the event name [key: eventName, value: Handler]
     * @memberof EventManager
     */
    constructor(axon) {
        super(axon);
        // For each eventName => Array of Event Obj
        this._listeners = {};
        // For each eventName => One Function
        this._handlers = new Collection( { base: Handler } );

        // this.HANDLERS = this.axon.libInterface.HANDLERS;
    }

    get HANDLERS() {
        return this.axon.library.HANDLERS;
    }

    // **** GETTERS **** //

    get events() {
        return this._handlers;
    }

    /**
     * Get all functions bound to the event passed in parameters.
     *
     * @param {String} eventName - The Eris event name
     * @returns {Array} Array of the functions bound to the event
     * @memberof EventManager
     */
    getListeners(eventName) {
        return this._listeners[eventName];
    }

    // **** BINDERS **** //
    /** Called by AxonClient */

    /**
     * Bind all listeners to a handler.
     * Create and register a handler for each event.
     * Called by AxonClient in start method.
     * If the bot is ready, also call bindHandlers()
     *
     * @memberof EventManager
     */
    bindListeners() {
        // Create handler for each event
        for (const event in this._listeners) {
            this.registerHandler(event);
        }
        // Bind Handlers to the event emission if bot is ready
        if (this.bot.ready) {
            this.bindHandlers();
        }
    }

    /**
     * Bind every handler to the correct event emitter
     *
     * @memberof EventManager
     */
    bindHandlers() {
        // bind handler to event emission
        for (const [event, handler] of this._handlers) {
            this.bot.on(event, handler._handle);
            this.logger._initEvent(true, handler);
        }
    }

    // **** REGISTERERS **** //

    /**
     * Register a listener for the given discord event.
     * Add the Listener in the array of Listener for each discord event.
     * Called by ModuleLoader when registering an event.
     *
     * @param {Object<Listener>} listener - Event Object
     *
     * @memberof EventManager
     */
    registerListener(listener) {
        /** Doesn't load the listener */
        if (!listener.load) {
            return null;
        }
        this._listeners[listener.eventName] = this._listeners[listener.eventName] || [];
        // Remove/replace if already existing
        const index = this._listeners[listener.eventName].findIndex(l => l.label === listener.label);
        if (index > -1) {
            this._listeners[listener.eventName].splice(index, 1);
        }
        // Add Listener
        this._listeners[listener.eventName].push(listener);
        this.logger._initEvent(false, listener);
        return this._listeners[listener.eventName];
    }

    /**
     * Register a handler.
     * Remove the current event listener if the handler already exists.
     * Create a new handler from the array of listeners for the given event.
     *
     * @param {String} event - The Event name
     * @returns {Object} The new Handler created
     *
     * @memberof EventManager
     */
    registerHandler(event) {
        const HandlerClass = this.HANDLERS[event];
        if (!HandlerClass) {
            this.logger.error(`EventManager: Event ${event} is not a valid event name!`);
            return null;
        }

        let handler = this._handlers.get(event);
        if (handler) {
            /** Remove the current event if any registered */
            this.bot.off(event, handler._handle);
        }

        handler = new HandlerClass(this.axon, event, this._listeners[event] );

        this._handlers.set(event, handler);

        return handler;
    }

    /**
     * Register an event handler and start listen to this event.
     * Recreate a handler and bind it to the event emitter.
     *
     * @param {String} event - The Discord event name to register
     * @returns {Object} The Handler Object
     *
     * @memberof EventManager
     */
    registerEvent(event) {
        const handler = this.registerHandler(event);
        this.bot.on(event, handler._handle);
        return handler;
    }

    // **** UNREGISTERERS **** //
    
    /**
     * Unregister a listener.
     * Recreate the handler and listen to the updated handler
     *
     * @param {String} event - Name of the event
     * @param {String} label - Name of the listener
     * @returns {Boolean} True if worked / False if label or event doesn't exist
     * @memberof EventManager
     */
    unregisterListener(event, label) {
        if (!this._listeners[event] ) {
            return false;
        }
        const index = this._listeners[event].findIndex(e => e.label === label);
        if (index > -1) {
            this._listeners[event].splice(index, 1);
        } else {
            return false;
        }

        const res = this.unregisterHandler(event);
        if (!res) {
            return false;
        }
        this.registerEvent(event);
        this.logger.info(`EventManager: Listener ${label} for ${event} unregistered!`);
        return true;
    }

    /**
     * Unregister a handler. Unregister the event and delete the handler.
     *
     * @param {String} event - Name of the event
     * @returns {Boolean} True if worked / False if event doesn't exist
     * @memberof EventManager
     */
    unregisterHandler(event) {
        const res = this.unregisterEvent(event);
        if (!res) {
            return false;
        }
        this._handlers.delete(event);
        return true;
    }

    /**
     * Unregister the given event without deleting the handler.
     * Just stop listening to the event emitter.
     *
     * @param {String} event - Name of the event
     * @returns {Boolean} True if worked / False if event doesn't exist
     * @memberof EventManager
     */
    unregisterEvent(event) {
        const handler = this._handlers.get(event);
        if (!handler) {
            return false;
        }
        this.bot.off(event, handler._handle);
        this.logger.info(`EventManager: ${event} unregistered!`);
        return true;
    }
}

export default EventManager;
