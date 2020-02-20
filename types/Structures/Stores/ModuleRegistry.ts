
/**
 * Registry that holds all Modules.
 *
 * @author KhaaZ
 *
 * @class ModuleRegistry
 * @extends ARegistry<Module>
 */
export declare class ModuleRegistry extends ARegistry<Module> {
    /**
     * Creates an instance of ModuleRegistry
     */
    constructor(axon: AxonClient);
    /**
     * Register a Module inside the ModuleRegistry
     *
     * @param label - The module label
     * @param module - The module object
     *
     * @memberof ModuleRegistry
     */
    register(label: string, module: Module): void;
    /**
     * Unregister a Module from the ModuleRegistry
     *
     * @param label - The module label
     * @param module - The module object
     * @memberof ModuleRegistry
     */
    unregister(label: string, module?: Module): void;
}
