import ARegistry from './ARegistry';

import Module from '../Module';
import AxonError from '../../Errors/AxonError';

/**
 * Registry that holds all Modules.
 *
 * @author KhaaZ
 *
 * @class ModuleRegistry
 * @extends ARegistry
 */
class ModuleRegistry extends ARegistry {
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

        this.axon.log('INFO', `MODULE-REGISTRY - [Module(${module.label})] Module: ${label} unregistered!`);
    }
}

export default ModuleRegistry;
