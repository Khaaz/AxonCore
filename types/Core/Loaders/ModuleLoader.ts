import { ALoader, AxonClient, ALogger, Module } from '../../';

/**
 * Load modules in AxonClient.
 * Validate the module validity entirely.
 *
 * @author KhaaZ
 *
 * @class ModuleLoader
 * @extends ALoader<AxonClient>
 */
export declare class ModuleLoader extends ALoader<AxonClient> {
    /**
     * Creates an instance of ModuleLoader
     * @param {AxonClient} axonClient
     */
    constructor(axonClient: AxonClient);
    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @memberof ModuleLoader
     */
    readonly axon: AxonClient;
    /**
     * Returns the Logger instance
     *
     * @readonly
     * @memberof ModuleLoader
     */
    readonly logger: ALogger;
    /**
     * Load one module instance in the client.
     * Validate and correct the module before registering it.
     *
     * @parammodule - The module to load
     * @memberof ModuleLoader
     */
    load(module: Module): boolean;
    /**
     * Load all modules in the client.
     * Instantiate all modules.
     *
     * @memberof ModuleLoader
     */
    loadAll(modules: { [key: string]: Module; } ): boolean;
    /**
     * Unload a Module from the client
     *
     * @param label - The Module label to unload
     * @returns Whether it worked
     * @memberof ModuleLoader
     */
    unload(label: string): true;
}
