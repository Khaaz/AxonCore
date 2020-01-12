import ALoader from './ALoader';
import Listener from '../Event/Listener';

import AxonError from '../../Errors/AxonError';

/**
 * Load listeners in a Module.
 * Validate the listener validity entirely.
 *
 * @class ListenerLoader
 * @extends ALoader
 */
class ListenerLoader extends ALoader {
    constructor(module) {
        super(module.axon);
        this._module = module;
    }

    /**
     * Returns the Module instance
     *
     * @readonly
     * @type {Module}
     * @memberof ListenerLoader
     */
    get axon() {
        return this.loadIn;
    }

    /**
     * Returns the Module instance
     *
     * @readonly
     * @type {Module}
     *
     * @memberof CommandLoader
     */
    get module() {
        return this._module;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Logger}
     * @memberof ListenerLoader
     */
    get logger() {
        return this.module.logger;
    }

    /**
     * Load one event instance in the module.
     * Validate and correct the event before registering it.
     *
     * @param {Listener} listener - The event to load
     * @returns {Boolean}
     *
     * @memberof ListenerLoader
     */
    load(listener) {
        if (!(listener instanceof Listener) ) {
            throw new AxonError(`[${listener.toString()}] Not a Listener!`, 'LISTENER-LOADER', this.module.label);
        }

        if (listener.label.includes(' ') ) {
            throw new AxonError(`[${listener.label}] Listener label may not have spaces!`, 'LISTENER-LOADER', this.module.label);
        }
        
        this.axon.listeners.register(listener.label, listener);
        return true;
    }

    /**
     * Load all events in the module.
     * Instantiate all events.
     *
     * @param {Listener} listeners
     * @returns {Boolean}
     *
     * @memberof ListenerLoader
     */
    loadAll(listeners) {
        if (listeners.default) {
            this.logger.error(`[Module(${this.module.label})] Listeners: No listeners found.`);
            return false;
        }
        for (const Value of Object.values(listeners) ) {
            const listener = new Value(this.module);
            try {
                this.load(listener);
            } catch (err) {
                this.logger.error(err);
            }
        }
        return true;
    }

    /**
     * Unload a Listener from the client
     *
     * @param {String} label - The Listener label to unload
     * @returns {Boolean} Whether it worked
     *
     * @memberof ListenerLoader
     */
    unload(label) {
        this.axon.listeners.unregister(label);
        return true;
    }
}

export default ListenerLoader;
