import ARegistry from './ARegistry';

import Module from '../Module';
import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 */

/**
 * Registry that holds all Modules.
 *
 * @author KhaaZ
 *
 * @class ModuleRegistry
 * @extends ARegistry<Module>
 */
class ModuleRegistry extends ARegistry {
    /**
     * Creates an instance of ModuleRegistry
     * @param {AxonClient} axon
     */
    constructor(axon) {
        super(axon, Module);
    }
    
    /**
     * Register a Module inside the ModuleRegistry
     *
     * @param {String} label - The module label
     * @param {Module} module - The module object
     *
     * @memberof ModuleRegistry
     */
    register(label, module) {
        if (this.registry.has(label) ) {
            throw new AxonError(`Register: Already registered!`, 'MODULE-REGISTRY', module.label);
        }

        // Initialise / register all module's commands and listeners
        module._init();

        this.add(label, module);
        this.axon.logger.info(`[MOD] => Registered: [${module.label}] | Commands loaded -${module.commands.size}-`);
    }

    /**
     * Unregister a Module from the ModuleRegistry
     *
     * @param {String} label - The module label
     * @param {Module} [module=null] - The module object
     * @memberof ModuleRegistry
     */
    unregister(label, module = null) {
        if (!module) {
            module = this.get(label);
        }
        if (!module) {
            throw new AxonError(`Unregister: Not registered!`, 'MODULE-REGISTRY', module.label);
        }

        /* Unregister all module's commands */
        for (const [l, cmd] of module.commands) {
            this.axon.commands.unregister(l, cmd);
        }

        /* Unregister all module's events */
        for (const [l, listener] of module.listeners) {
            this.axon.listeners.unregister(l, listener);
        }

        this.remove(label);
        this.axon.logger.info(`[MOD] => Unregistered: [${module.label}]`);
    }
}

export default ModuleRegistry;
