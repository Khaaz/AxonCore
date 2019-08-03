import Loader from './Loader';

import Validater from '../Validater';
import Module from '../Module';

import AxonError from '../../Errors/AxonError';

/**
 * Load modules in AxonClient.
 * Validate the module validity entirely.
 *
 * @class ModuleLoader
 * @extends {Loader}
 */
class ModuleLoader extends Loader {
    // eslint-disable-next-line no-useless-constructor
    constructor(axonClient) {
        super(axonClient);
    }

    get axon() {
        return this.loadIn;
    }

    get logger() {
        return this.axon.logger;
    }

    /**
     * Load one module instance in the client.
     * Validate and correct the module before registering it.
     *
     * @param {Object<Module>} module - The module to load
     * @returns {Boolean}
     *
     * @memberof ModuleLoader
     */
    load(module) {
        if (!(module instanceof Module) ) {
            throw new AxonError(`Module: ${module.toString()} - Not a Module!`, 'INIT', 'AxonClient');
        }
        
        if (module.label.includes(' ') ) {
            throw new AxonError(`Module: ${module.label} - Module label may not have spaces!`, 'INIT', 'AxonClient');
        }

        if (this.axon.modules.has(module.label) ) {
            throw new AxonError(`Module: ${module.label} - Already registered!`, 'INIT', 'AxonClient');
        }
        
        if (!Validater.validModule(module) ) {
            return false;
        }

        this.registerModule(module);
        return true;
    }

    /**
     * Load all modules in the client.
     * Instantiate all modules.
     *
     * @param {Object<Module>} modules
     * @returns {Boolean}
     *
     * @memberof ModuleLoader
     */
    loadAll(modules) {
        if (Object.keys(modules).length === 0) {
            this.logger.error('Modules: No modules found.');
        }

        for (const Value of Object.values(modules) ) {
            const module = new Value(this.axon);
            this.load(module);
        }
        this.logger.init(`Initialised! | [AxonClient] | Modules loaded -${this.axon.modules.size}-`);
    }

    // **** REGISTERING **** //

    /**
    * Register a new module.
    * Initialise all module's commands (command, commandAliases) and events in AxonClient, then register the module.
    *
    * @param {Object<Module>} module
    *
    * @memberof ModuleLoader
    */
    registerModule(module) {
        /** Register all module's commands */
        for (const [label, cmd] of module.commands) {
            if (this.axon.commands.has(label) ) {
                throw new AxonError(`Command: ${label} already registered!`, 'INIT', module.label);
            }
            this.axon.commands.set(label, cmd); // Add the command in the commands Collection (references to module.commands.get(label))

            for (const alias of cmd.aliases) {
                if (this.axon.commandAliases.has(alias) ) {
                    throw new AxonError(`Command: ${label}) - Alias: ${alias} already registered!`, 'INIT', module.label);
                }
                this.axon.commandAliases.set(alias, label); // Add the commands aliases in aliases Map (references to the command label)
            }
        }

        /** Register all module's events */
        for (const listener of module.listeners.values() ) {
            this.axon.eventManager.registerListener(listener);
        }

        /** Register the module */
        this.axon.modules.set(module.label, module);
        this.logger._initModule(module);
    }

    /**
    * Unregister a module.
    * Remove the module from the client, remove all module's commands, commandAliases and events.
    *
    * @param {String} label - Label of the module to unregister
    *
    * @memberof ModuleLoader
    */
    unregisterModule(label) {
        const module = this.axon.modules.get(label);
        if (!module) {
            throw new AxonError(`Module: ${module.label} not registered!`, 'INIT', 'AxonClient');
        }

        /** Unregister all module's commands */
        for (const [l, cmd] of module.commands) {
            for (const alias of cmd.aliases) {
                this.axon.commandAliases.delete(alias);
            }
            this.axon.commands.delete(l);
        }

        /** Unregister all module's events */
        for (const listener of module.listeners.values() ) {
            this.axon.eventManager.unregisterListener(listener.eventName, listener.label);
        }

        /** Unregister the module */
        this.axon.modules.delete(module.label);
        this.logger.info(`Module: ${module.label} unregistered!`);
    }
}

export default ModuleLoader;


