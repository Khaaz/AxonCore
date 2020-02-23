
/**
 * AxonCore Module.
 * A Module holds commands and listeners.
 * It also has default CommandOptions and CommandPermissions that can potentially be used as base when creating a Command.
 *
 * @author KhaaZ
 *
 * @class Module
 * @extends Base
 */
export declare class Module extends Base {
    /**
     * Module label (name/id)
     */
    public label: string;
    /**
     * Whether the module is enabled or not
     */
    public enabled: boolean;
    /**
     * Whether the module can be disabled or not (will bypass guild disabled)
     */
    public serverBypass: boolean;
    
    /**
     * Default values potentially used for CommandOptions
     */
    public options: CommandOptions;
    /**
     * Default values potentially used for CommandPermissions
     */
    public permissions: CommandPermissions;

    /**
     * Default info about the module
     */
    public info: ModuleInfo;

    /**
     * Load all commands in the module / register / unregister
     */
    public commandLoader: CommandLoader;
    /**
     * Load all events in the module / register / unregister
     */
    public listenerLoader: ListenerLoader;

    /**
     * Creates a Module instance.
     *
     * @param client
     * @param data - All module parameters
     * @param data.label - The module label
     * @param data.enabled - Whether the module is enabled or not
     * @param data.serverBypass - Whether the module can be disabled in a server or not
     * @param data.info
     * @param data.info.name - The module name
     * @param data.info.description - The module description
     * @param data.info.category - The module category
     * @param data.options - The default options for all commands in this module
     * @param data.permissions - The default permissions for all commands in this module
     * @memberof Module
     */
    constructor(client: AxonClient, data?: ModuleData);

    /**
     * A Collection of all commands the module holds
     *
     * @readonly
     * @memberof Module
     */
    readonly commands: Collection<Command>;
    /**
     * A Collection of all listeners the module holds
     *
     * @readonly
     * @memberof Module
     */
    readonly listeners?: Collection<Listener>;

    /**
     * Override this method to returns { commands, listeners }
     *
     * @returns {Object.<string, Command|Listener>} An object containing commands and listeners to initialise. { commands, listeners}
     * @memberof Module
     */
    public init(): { commands?: {[key: string]: new (...args: any[] ) => Command;}; listeners?: {[key: string]: new (...args: any[] ) => Listener;}; };
    /**
     * Init a module with all commands and listeners.
     * @memberof Module
     */
    private _init(): void;
}
