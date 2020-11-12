import { Base, ListenerData, Module, GuildConfig } from '../../';

export declare class Listener extends Base implements ListenerData {
    /** Module instance */
    private _module: Module;
    public eventName: string;
    public label: string;

    public load: boolean;
    public enabled: boolean;
    public serverBypass: boolean;

    public info: {
        owners: string[];
        description: string;
        [s: string]: any;
    };

    /**
     * Creates an Listener instance.
     *
     * @param data - All events parameters
     * @memberof Listener
     */
    constructor(module: Module, data?: ListenerData);

    /**
     * Returns the parent Module instance
     *
     * @readonly
     * @memberof Listener
     */
    readonly module: Module;

    /**
     * Promisify the return execute return to prevent promise issue
     *
     * @param guildConfig - the guildConfig or undefined if not a guild event
     * @param args - Array of the events arguments
     * @memberof Listener
     */
    private _execute(guildConf: GuildConfig | null, ...args: any[] ): Promise<any>;

    /**
     * Main execute function, need to be overridden in child. The GuildConfig will always be the last parameter of an event
     *
     * @param args - Array of the events arguments (as separate parameters)
     * @param guildConfig - The guildConfig or undefined if not a guild event
     * @memberof Listener
     */
    public execute(...args: any[] ): Promise<any>;
}
