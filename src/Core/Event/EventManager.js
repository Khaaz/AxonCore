import Base from '../Base';

import Collection from '../../Utility/Collection';
import AHandler from './AHandler';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('./Listener').default} Listener
 */

/**
 * Event Manager class
 *
 * @author KhaaZ
 *
 * @class EventManager
 * @extends Base
 *
 * @prop {Object.<string, Array<Listener>} _events - Object that links an event name to an array of Listener objects { eventName: [Listener, Listener] }
 * @prop {Collection<AHandler>} _handlers - Collection of handler keyed to the event name [key: eventName, value: AHandler]
 */

class EventManager extends Base {
    /**
     * Creates an EventManager instance.
     *
     * @param {AxonClient} axon
     * @memberof EventManager
     */
    constructor(axon) {
        super(axon);
        // For each eventName => Array of Listener Obj
        /**
         * @type {Object.<string, Array<Listener>}
         */
        this._events = {};
        // For each eventName => One Function
        /**
         * @type {Collection<AHandler>}
         */
        this._handlers = new Collection( { base: AHandler } );
    }

    // **** GETTERS **** //

    /**
     * Returns all Handlers base
     *
     * @readonly
     * @type {Object}
     * @memberof EventManager
     */
    get HANDLERS() {
        return this.axon.library.HANDLERS;
    }

    /**
     * Returns Collection of every handlers for every Discord event
     *
     * @readonly
     * @type {Collection<AHandler>}
     * @memberof EventManager
     */
    get handlers() {
        return this._handlers;
    }

    /**
     * Get all functions bound to the event passed in parameters.
     *
     * @param {String} eventName - The library event name
     * @returns {Array<Listener>} Array of the functions bound to the event
     * @memberof EventManager
     */
    getListeners(eventName) {
        return this._events[eventName];
    }

    // **** BINDERS **** //
    /* Called by AxonClient */

    /**
     * Bind all listeners to a handler.
     * Create and register a handler for each event.
     * Called by AxonClient in start method.
     * If the bot is ready, also call bindHandlers()
     * @memberof EventManager
     */
    bindListeners() {
        // Create handler for each event
        for (const event in this._events) {
            this.registerHandler(event);
        }
        // Bind Handlers to the event emission if bot is ready
        if (this.bot.ready) {
            this.bindHandlers();
        }
    }

    /**
     * Bind every handler to the correct Discord event and start listening to this event.
     * @memberof EventManager
     */
    bindHandlers() {
        // bind handler to event emission
        for (const [event, handler] of this._handlers) {
            this.bot.on(event, handler._handle);
            this.logger.info(`[EVT] => Bound ${handler.size} listener${handler.size > 1 ? 's' : ''} for ${handler.name}`);
        }
    }

    // **** REGISTERS **** //

    /**
     * Register a listener for the given discord event.
     * Add the Listener in the array of Listener for each discord event.
     * Called by ModuleLoader when registering an event.
     *
     * @param {Listener} listener - The Listener Object
     * @returns {Array<Listener>} Array of the functions bound to the event
     *
     * @memberof EventManager
     */
    registerListener(listener) {
        /* Doesn't load the listener */
        if (!listener.load) {
            return null;
        }
        this._events[listener.eventName] = this._events[listener.eventName] || [];
        // Remove/replace if already existing
        const index = this._events[listener.eventName].findIndex(l => l.label === listener.label);
        if (index > -1) {
            this._events[listener.eventName].splice(index, 1);
        }
        // Add Listener
        this._events[listener.eventName].push(listener);
        return this._events[listener.eventName];
    }

    /**
     * Register a handler.
     * Remove the current event listener if the handler already exists.
     * Create a new handler from the array of listeners for the given event.
     *
     * @param {String} event - The Discord event name
     * @returns {AHandler} The new Handler created
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
            /* Remove the current event if any registered */
            this.bot.off(event, handler._handle);
        }

        handler = new HandlerClass(this.axon, event, this._events[event] );

        this._handlers.set(event, handler);

        return handler;
    }

    /**
     * Register an event handler and start listen to this event.
     * Recreate a handler and bind it to the event emitter.
     *
     * @param {String} event - The Discord event name to register
     * @returns {AHandler} The Handler Object
     * @memberof EventManager
     */
    registerEvent(event) {
        const handler = this.registerHandler(event);
        this.bot.on(event, handler._handle);
        return handler;
    }

    // **** UNREGISTER **** //
    
    /**
     * Unregister a listener.
     * Recreate the handler without the unregistered listener and listen to the updated handler
     *
     * @param {String} event - Name of the Discord event
     * @param {String} label - Label of the listener
     * @returns {Boolean} True if worked / False if label or event doesn't exist
     * @memberof EventManager
     */
    unregisterListener(event, label) {
        if (!this._events[event] ) {
            return false;
        }
        const index = this._events[event].findIndex(e => e.label === label);
        if (index > -1) {
            this._events[event].splice(index, 1);
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
     * @param {String} event - Name of the Discord event
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
     * Just stop listening to the discord event emitted.
     *
     * @param {String} event - Name of the Discord event
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
