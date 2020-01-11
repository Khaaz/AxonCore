import Loader from './Loader';

import Validater from '../Validater';
import Module from '../Module';

import AxonError from '../../Errors/AxonError';

/**
 * Load modules in AxonClient.
 * Validate the module validity entirely.
 *
 * @author KhaaZ
 *
 * @class ModuleLoader
 * @extends Loader
 */
class ModuleLoader extends Loader {
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
     *
     * @memberof ModuleLoader
     */
    load(module) {
        if (!(module instanceof Module) ) {
            throw new AxonError('Not a Module!', 'MODULE-LOADER', module.toString() );
        }
        
        if (module.label.includes(' ') ) {
            throw new AxonError('Module label may not have spaces!', 'MODULE-LOADER', module.label);
        }
        
        if (!Validater.validModule(module) ) {
            throw new AxonError(`[${module.label}] Invalid Module (enable debugMode)!`, 'MODULE-LOADER', module.label);
        }

        /* Register the module */
        this.axon.modules.register(module.label, module);
        
        this.logger._initModule(module);
        return true;
    }

    /**
     * Load all modules in the client.
     * Instantiate all modules.
     *
     * @param {Module} modules
     * @returns {Boolean}
     *
     * @memberof ModuleLoader
     */
    loadAll(modules) {
        if (Object.keys(modules).length === 0) {
            this.logger.error('Modules: No modules found.');
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
        this.logger.init(`Initialised! | [AxonClient] | Modules loaded -${this.axon.modules.size}-`);
        return true;
    }

    /**
     * Unload a Module from the client
     *
     * @param {String} label - The Module label to unload
     * @returns {Boolean} Whether it worked
     *
     * @memberof ModuleLoader
     */
    unload(label) {
        this.axon.modules.unregister(label);
        return true;
    }
}

export default ModuleLoader;


