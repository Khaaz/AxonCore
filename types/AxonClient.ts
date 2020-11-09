import { EventEmitter } from 'events';
import {
    AxonConfs, AxonParams, Info, AxonInfo, ALogger, AxonUtils, LibClient, LibraryInterface, Utils, ADBProvider, ModuleRegistry, CommandRegistry, ListenerRegistry, EventManager,
    GuildConfigCache, AxonConfig, ModuleLoader, CommandDispatcher, MessageManagerType, AxonStaffIDs, AxonOptions, Collection, AHandler, Listener, Resolver, Webhooks,
    AxonTemplate, Module, Command, LOG_LEVELS, Ctx, LibMessage, GuildConfig, DEBUG_FLAGS, Executor, ExtentionInitReturn, AxonLanguageResponse, DefaultLanguageResponse, LibDMChannel,
    CommandContext, AxonCommandError,
} from './';
import * as util from 'util';

export declare class AxonClient<L extends AxonLanguageResponse = DefaultLanguageResponse, DB extends ADBProvider = ADBProvider> extends EventEmitter {
    /** Configs (webhooks, template, custom) */
    private _configs: AxonConfs;
    /** Bot settings */
    public settings: AxonParams;
    /** General infos about the current application */
    public info: Info;
    public axoncore: AxonInfo;
    /** The Logger instance */
    public logger: ALogger;
    public extensions: ExtentionInitReturn;
    /** Util methods (AxonCore) */
    public axonUtils: AxonUtils;

    /** Discord library Client */
    private _botClient: LibClient;
    public library: LibraryInterface;
    /** Utils methods (general) */
    public utils: Utils;
    /** The DBProvider instance */
    public DBProvider: DB;

    /** Registry holding all modules */
    public moduleRegistry: ModuleRegistry;
    /** Registry holding all commands */
    public commandRegistry: CommandRegistry;
    /** Registry holding all listeners */
    public listenerRegistry: ListenerRegistry;
    /** The EventManager instance that handle all AxonCore listeners */
    public eventManager: EventManager;

    /** The Manager that handles GuildConfigs (cache / DB etc) */
    public guildConfigs: GuildConfigCache;

    /** Load, unload modules. */
    public moduleLoader: ModuleLoader;
    /** Dispatch commands onMessageCreate. */
    public dispatcher: CommandDispatcher;
    public executor: Executor;
    /** Message manager object accessible with `<AxonClient>.l` */
    private _messageManager: MessageManagerType<L>;

    /** Bot Staff (owners, admins, +...) */
    public staff: AxonStaffIDs;
    /** The AxonConfig object that handles globally blacklisted users and guilds */
    public axonConfig?: AxonConfig;

    /**
     * Creates an AxonClient instance.
     *
     * @param botClient - Eris or Discordjs Client instance
     * @param axonOptions - Axon options
     * @param modules - Object with all modules to add in the bot
     * @memberof AxonClient
     */
    constructor(botClient: LibClient, axonOptions?: AxonOptions, modules?: object);

    /**
     * Returns the bot client instance
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly botClient: LibClient;
    /**
     * Returns all event handlers in eventManager
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly handlers: Collection<AHandler>;
    /**
     * Returns all registered listeners for the discord event name
     *
     * @memberof AxonClient
     */
    public getListeners(eventName: string): Listener[];
    /**
     * Returns all the resolver for the default current library used.
     * Can be easily overridden with a custom Resolver by overriding this getter.
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly Resolver: Resolver;
    /**
     * Return the MessageManager instance
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly l: MessageManagerType<L>;
    /**
     * Return the webhooks config
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly webhooks: Webhooks;
    /**
     * Returns the template config
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly template: AxonTemplate;
    /**
     * Returns the custom config
     *
     * @readonly
     * @memberof AxonClient
     */
    readonly custom: object | null;

    /**
     * Get a module from AxonClient with the given label.
     *
     * @param module - Module label
     * @memberof AxonClient
     */
    public getModule(module: string): Module | null;
    /**
     * Get a command/subcommand from AxonClient with the given full label.
     *
     * @param fullLabel - Full command (or subcommand) label
     * @memberof AxonClient
     */
    public getCommand(fullLabel: string): Command | null;
    
    /**
     * Start AxonClient.
     * Start bot client.
     * Bind error listeners and event listeners.
     *
     * Calls custom onStart() method at the beginning.
     * Calls custom onReady() method when AxonClient is ready.
     *
     * @async
     * @memberof AxonClient
     */
    public start(): Promise<void>;
    /**
     * Override this method.
     * Method executed after the object is finished to be constructed (in the constructor)
     *
     * @memberof AxonClient
     */
    public onInit(): true;
    /**
     * Override this method.
     * Method executed at the beginning of the start method.
     *
     * @memberof AxonClient
     */
    public onStart(): Promise<true>;
    /**
     * Override this method.
     * Method executed at the end of the start method (when the AxonClient is ready).
     *
     * @memberof AxonClient
     */
    public onReady(): Promise<true>;
    /**
     * Log both to console and to the correct webhook
     *
     * @param level - The LOG-LEVEL
     * @param content - The content or the error to log
     * @param ctx - Additional context to be passed to logger
     * @param execWebhook - Whether to execute the webhook
     * @memberof AxonClient
     */
    public log(level: LOG_LEVELS, content: Error | string, ctx?: Ctx, execWebhook?: boolean): void;
    /**
     * Function executed on the global messageCreate event and dispatch to the correct command and execution
     *
     * @memberof AxonClient
     */
    private _onMessageCreate(msg: LibMessage): void;
    
    /**
     * Function executed when the bot client is ready.
     * Bind events and initialise client status/game.
     * @memberof AxonClient
     */
    private _onReady(): void;
    /**
     * Function ran on debug event.
     * Logs the debug event.
     * @memberof AxonClient
     */
    public onDebug(flag: DEBUG_FLAGS, d: string): void;
    /**
     * Initialize error listeners and webhooks.
     * Override this method to setup your own error listeners.
     * @memberof AxonClient
     */
    public initErrorListeners(): void;
    /**
     * Set the bot status. Override to setup your own status.
     * Called after the client ready event.
     * @memberof AxonClient
     */
    public initStatus(): void;


    /**
     * Send full help in DM.
     * Doesn't show commands that the user can't execute.
     * This method can be overridden in child.
     *
     * @param msg - The message object
     *
     * @memberof AxonClient
     */
    public sendFullHelp(msg: LibMessage<LibDMChannel>, guildConfig?: GuildConfig): Promise<void>;
    /**
     * Register a guild prefix.
     * Shortcut to guildConfig.registerPrefix()
     *
     * @param gID - The guild ID
     * @param prefixArr - The array of prefixes
     * @returns The guild Schema from the DB / Error if error
     *
     * @memberof AxonClient
     */
    public registerGuildPrefixes(gID: string, prefixArr: string[] ): Promise<GuildConfig>;
    /**
     * Custom toString method.
     *
     * @memberof AxonClient
     */
    public toString(): string;
    /**
     * Custom ToJSON method.
     * (Based of Eris')
     *
     * @returns JSON-like Object
     * @memberof AxonClient
     */
    public toJSON(): object;

    /**
     * Custom inspect method
     * Doesn't list prefixed property and undefined property.
     * (Based of Eris')
     *
     * @returns Object to inspect
     * @memberof AxonClient
     */
    public [util.inspect.custom](): object;
    on(event: 'debug', listener: (flags: DEBUG_FLAGS, debugMessage: string) => void): this;
    on(event: 'commandExecution', listener: (status: boolean, commandFullLabel: string, data: {
        msg: LibMessage;
        command: Command;
        guildConfig: GuildConfig;
        context: CommandContext;
    } ) => void): this;
    on(event: 'commandError', listener: (commandFullLabel: string, data: {
        msg: LibMessage;
        command: Command;
        guildConfig: GuildConfig;
        error: AxonCommandError;
    } ) => void): this;
    on(event: 'listenerExecution', listener: (status: boolean, eventName: string, listenerName: string, data: {
        listener: Listener;
        guildConfig: GuildConfig;
    } ) => void): this;
    on(event: 'listenerError', listener: (eventName: string, listenerName: string, data: {
        listener: Listener;
        guildConfig: GuildConfig;
        error: AxonCommandError;
    } ) => void): this;
}
