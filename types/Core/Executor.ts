import {
    DEBUG_FLAGS, AxonClient, LibMessage, Command, GuildConfig, CommandContext, AxonCommandError, Listener, CommandEnvironment,
} from '../';

/**
 * @param flags Debug flags used to have more information about the event
 * @param debugMessage Debug message with information about the situation
 */
type debugListener = (flags: DEBUG_FLAGS, debugMessage: string) => void;
/**
 * @param status If the command was successfully executed or not
 * @param commandFullLabel The command fullLabel
 * @param data.msg The message that triggered the command
 * @param data.command The command that was executed
 * @param data.guildConfig The GuildConfig
 * @param data.context The execution context
 */
type commandExecutionListener = (status: boolean, commandFullLabel: string, data: { msg: LibMessage; command: Command; guildConfig: GuildConfig; context: CommandContext;} ) => void;
/**
 * @param commandFullLabel the command fullLabel
 * @param data.msg The message that triggered the command
 * @param data.command The command that was executed
 * @param data.guildConfig The GuildConfig
 * @param data.error The error
 */
type commandErrorListener = (commandFullLabel: string, data: { msg: LibMessage; command: Command; guildConfig: GuildConfig; error: AxonCommandError; } ) => void;
/**
 * @param status Whether the listener was successfully executed or not
 * @param eventName The Discord event name
 * @param listenerName The listener label
 * @param data Additional information
 * @param data.listener The listener that was executed
 * @param data.guildConfig The GuildConfig object
 */
type listenerExecutionListener = (status: boolean, eventName: string, listenerName: string, data: { listener: Listener; guildConfig: GuildConfig; } ) => void;
/**
 * @param eventName The Discord event name
 * @param listenerName The Listener label
 * @param data Additional information
 * @param data.listener The listener that was executed
 * @param data.guildConfig The GuildConfig object
 * @param data.error The error
 */
type listenerErrorListener = (eventName: string, listenerName: string, data: { listener: Listener; guildConfig: GuildConfig; error: Error; } ) => void

/**
 * Exeutor class. Execute and handle execution of listeners and commands in the framework.
 * Will emit events depending on the execution
 * @class Executor
 */
export declare class Executor {
    private _axon: AxonClient;
    /**
     * Creates an instance of Executor.
     * @memberof Executor
     */
    constructor(axonClient: AxonClient);
    
    /**
     * Fired when a debug message needs to be sent
     * @event AxonClient#debug
     * @memberof Executor
     */
    on(event: 'debug', listener: debugListener): this;
    /**
     * Fired when a command is successfully ran
     * @event AxonClient#commandExecution
     * @memberof Executor
     */
    on(event: 'commandExecution', listener: commandExecutionListener): this;
    /**
     * Fired when a command fails
     * @event AxonClient#commandError
     * @memberof Executor
     */
    on(event: 'commandError', listener: commandErrorListener): this;
    /**
     *  Fired when a listener is executed
     * @event AxonClient#listenerExecution
     * @memberof Executor
     */
    on(event: 'listenerExecution', listener: listenerExecutionListener): this;
    /**
     * Fired when a listener errors
     * @event AxonClient#listenerError
     * @memberof Executor
     */
    on(event: 'listenerError', listener: listenerErrorListener): this;
    
    public listener(listener: Listener, guildConfig: GuildConfig, ...args: any[] ): void;
    public execCommand(command: Command, env: CommandEnvironment): void;
    public help(command: Command, env: CommandEnvironment): void;
}
