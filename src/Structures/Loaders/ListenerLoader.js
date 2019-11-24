import Loader from './Loader';

import Listener from '../Event/Listener';

import AxonError from '../../Errors/AxonError';

/**
 * Load listeners in a Module.
 * Validate the listener validity entirely.
 *
 * @class ListenerLoader
 * @extends {Loader}
 */
class ListenerLoader extends Loader {
    // eslint-disable-next-line no-useless-constructor
    constructor(module) {
        super(module);
    }

    /**
     * Returns the Module instance
     *
     * @readonly
     * @type {Object<Module>}
     * @memberof ListenerLoader
     */
    get module() {
        return this.loadIn;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Object<Logger>}
     * @memberof ListenerLoader
     */
    get logger() {
        return this.module.logger;
    }

    /**
     * Load one event instance in the module.
     * Validate and correct the event before registering it.
     *
     * @param {Object<Listener>} listener - The event to load
     * @returns {Boolean}
     *
     * @memberof ListenerLoader
     */
    load(listener) {
        if (!(listener instanceof Listener) ) {
            this.logger.error(`[Module(${this.module.label})] Listener: ${listener.toString()} - Not a Listener.`);
            return false;
        }

        if (listener.label.includes(' ') ) {
            this.logger.error(`[Module(${this.module.label})] Listener: ${listener.label} - Listener label may not have spaces`);
            return false;
        }
        if (this.module.listeners.has(listener.label) ) {
            this.logger.error(`[Module(${this.module.label})] Listener: ${listener.label} - You have already registered a listener in this module.`);
            return false;
        }

        this.registerListener(listener);
        return true;
    }

    /**
     * Load all events in the module.
     * Instantiate all events.
     *
     * @param {Object<Listener>} listeners
     * @returns {Boolean}
     *
     * @memberof ListenerLoader
     */
    loadAll(listeners) {
        if (listeners.default) {
            this.logger.error(`[Module(${this.module.label})] Listeners: No listeners found.`);
            return;
        }
        for (const Value of Object.values(listeners) ) {
            const listener = new Value(this.module);
            this.load(listener);
        }
    }

    // **** REGISTERING **** //

    /**
     * Register an event and add it to the module.
     *
     * @param {Object<Listener>} listener - Listener object
     *
     * @memberof ListenerLoader
     */
    registerListener(listener) {
        this.module.listeners.set(listener.label, listener); // add the event to the Collection of events.
    }

    /**
     * Remove an event from the module and event manager.
     *
     * @param {String} label - The event label
     * @returns {Boolean} True if successful / Error othewise
     *
     * @memberof ListenerLoader
     */
    unregisterListener(label) {
        const listener = this.module.listeners.get(label);
        if (!listener) {
            throw new AxonError(`Command: ${label} not registered!`, 'UNREGISTER-Listener', this.module.label);
        }
        this.module.listeners.delete(listener.label);
        this.module.axon.eventManager.unregisterListener(listener.eventName, listener.label);
        
        this.logger.info(`[Module(${this.label})] Listener: ${label} unregistered!`);
        return true;
    }
}

export default ListenerLoader;
