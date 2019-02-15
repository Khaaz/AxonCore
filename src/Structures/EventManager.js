'use strict';

import Base from './Base';

import Collection from '../Utility/Collection';

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
        this._handlers = new Collection();
    }

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

    /**
     * Bind all listeners to a handler.
     * Create and register a handler for each event.
     * If the bot is ready, also call bindHandlers()
     *
     * @memberof EventManager
     */
    bindListeners() {
        // Create handler for each event
        for (const event in this._listeners) {
            /** Doesn't register the handler if all listeners shouldn't be loaded */
            if (this._listeners[event].every(e => !e.load)) {
                break;
            }
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
            this.bot.on(event, handler.run);
            this.Logger._initEvent(true, handler);
        }
    }

    /**
     * Register a listener for the given event.
     * Add the event object in the array of event objects for each event.
     *
     * @param {Object<Event>} event - Event Object
     * @memberof EventManager
     */
    registerListener(event) {
        this._listeners[event.eventName] = this._listeners[event.eventName] || [];
        // Remove/replace if already existing
        const index = this._listeners[event.eventName].findIndex(l => l.label === event.label);
        if (index > -1) {
            this._listeners[event.eventName].splice(index, 1);
        }
        // Add Listener
        this._listeners[event.eventName].push(event);
        this.Logger._initEvent(false, event);
        return this._listeners[event.eventName];
    }

    /**
     * Register a handler.
     * Remove the current event listener if the handler already exists.
     * Create a new handler from the array of listeners for the given event.
     *
     * @param {String} event - The Event name
     * @returns {Object} The new Handler created
     * @memberof EventManager
     */
    registerHandler(event) {
        let handler = this._handlers.get(event);
        if (handler) {
            /** Remove the current event if any registered */
            this.bot.off(event, handler.run);
        }
        handler = {};
        handler.name = event;
        handler.size = this._listeners[event].length;
        handler.run = this.createHandler.bind(this, this._listeners[event]);
        this._handlers.set(event, handler);

        return handler;
    }

    /**
     * Register an event.
     * Recreate a handler and bind it to the event emitter.
     *
     * @param {String} event - The Event name to register
     * @returns {Object} The Handler Object
     * @memberof EventManager
     */
    registerEvent(event) {
        const handler = this.registerHandler(event);
        this.bot.on(event, handler.run);
        return handler;
    }

    /**
     * Create a handler function from all listeners.
     * Checks if the module/event is globally disabled.
     *
     * @param {Array} events - All listeners for this event
     * @param {Array} args - All arguments possibly passed to an event
     * @memberof EventManager
     */
    createHandler(events, ...args) {
        this._rootHandler(...args)
            .then(gConf => {
                for (const event of events) {
                    if (!event.load || !event.module.enabled || !event.enabled) { // globally disabled
                        continue;
                    }
                    // Ignore guild disabled Module/Event
                    if (gConf) {
                        if ((this.AxonUtils.isModuleDisabled(event.module, gConf) && !this.module.serverBypass)
                            || (this._isEventDisabled(event.label, gConf) && !this.serverBypass)) {
                            continue;
                        }
                    }
                    event._execute(gConf, ...args)
                        .then(() => {
                            if (this.axon.params.debugMode) {
                                this.Logger.verbose(`[EVENT](${event.eventName}) - ${event.label}`);
                            }
                        })
                        .catch(err => {
                            this.Logger.error(`[EVENT](${event.eventName}) - ${event.label}\n${err}`);
                        });
                }
            })
            .catch(null);
    }

    /**
     * Root function for all events.
     * Try to resolve the guild object and guildConfig.
     * If needed, test if the user is a bot or the guild is blacklisted and stop the event.
     * Check if the event is disabled in the given guild or not.
     *
     * @param {Array} args - All arguments possibly passed to an event
     * @returns {Promise<GuildConf?>}
     * @memberof EventManager
     */
    _rootHandler(...args) {
        return new Promise(async(resolve, reject) => {
            // Tries to resolve a guild
            let guild = undefined;
            if (args[0]) {
                if (args[0].guild) { // member or channel
                    if (args[0].user && args[0].user.bot) { // member | check not a bot
                        return;
                    }
                    guild = args[0].guild;
                } else if (args[0].channel) { // message
                    if (args[0].author && args[0].author.bot) { // message | check not a bot
                        return;
                    }
                    guild = args[0].channel.guild;
                } else if (args[0].ownerID) { // guild
                    guild = args[0];
                }
            }

            // Tries to resolve guildConf if there is a guild
            const guildConf = guild ? await this.axon.getGuildConf(guild.id) : undefined;

            // Ignore blacklisted guilds
            if (guild) {
                if (this.axon.blacklistedGuilds.has(guild.id)) {
                    reject();
                }
            }
            resolve(guildConf);
        });
    }

    /**
     * Check if the event is disabled on the given guild
     *
     * @param {String} label - The event label
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} True if disabled / Undefined if not
     * @memberof Event
     */
    _isEventDisabled(label, guildConf) {
        return guildConf.events.find(e => e === label);
    }

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
        if (!this._listeners[event]) {
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
        this.Logger.info(`Event: Listener ${label} for ${event} unregistered!`);
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
        this.bot.off(event, handler.run);
        this.Logger.info(`Event: ${event} unregistered!`);
        return true;
    }
}

export default EventManager;
