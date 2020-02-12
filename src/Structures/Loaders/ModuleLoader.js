import ALoader from './ALoader';
import Module from '../Module';

import Validator from '../Validator';

import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 */

/**
 * Load modules in AxonClient.
 * Validate the module validity entirely.
 *
 * @author KhaaZ
 *
 * @class ModuleLoader
 * @extends ALoader
 */
class ModuleLoader extends ALoader {
    /**
     * @param {AxonClient} axonClient
     */
    // eslint-disable-next-line no-useless-constructor
    constructor(axonClient) {
        super(axonClient);
    }

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     * @memberof ModuleLoader
     */
    get axon() {
        return this.loadIn;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Logger}
     * @memberof ModuleLoader
     */
    get logger() {
        return this.axon.logger;
    }

    /**
     * Load one module instance in the client.
     * Validate and correct the module before registering it.
     *
     * @param {Module} module - The module to load
     * @returns {Boolean}
     * @memberof ModuleLoader
     */
    load(module) {
        if (!(module instanceof Module) ) {
            throw new AxonError('Not a Module!', 'MODULE-LOADER', module.toString() );
        }
        
        if (module.label.includes(' ') ) {
            throw new AxonError('Module label may not have spaces!', 'MODULE-LOADER', module.label);
        }
        
        if (!Validator.validModule(module) ) {
            throw new AxonError(`[${module.label}] Invalid Module (enable debugMode)!`, 'MODULE-LOADER', module.label);
        }

        this.axon.moduleRegistry.register(module.label, module);
        return true;
    }

    /**
     * Load all modules in the client.
     * Instantiate all modules.
     *
     * @param {Object.<string, Module>} modules
     * @returns {Boolean}
     * @memberof ModuleLoader
     */
    loadAll(modules) {
        if (Object.keys(modules).length === 0) {
            this.logger.error('[AxonClient] Modules: No modules found.');
            return false;
        }

        for (const Value of Object.values(modules) ) {
            const module = new Value(this.axon);
            try {
                this.load(module);
            } catch (err) {
                this.logger.error(err);
            }
        }
        this.axon.log('INFO', `Initialised: [AxonClient] | Modules loaded -${this.axon.moduleRegistry.size}-`);
        return true;
    }

    /**
     * Unload a Module from the client
     *
     * @param {String} label - The Module label to unload
     * @returns {Boolean} Whether it worked
     * @memberof ModuleLoader
     */
    unload(label) {
        this.axon.moduleRegistry.unregister(label);
        return true;
    }
}

export default ModuleLoader;


