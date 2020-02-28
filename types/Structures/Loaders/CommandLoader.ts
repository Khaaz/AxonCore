import {
    ALoader, Command, Module, AxonClient, ALogger,
} from '../../';

/**
 * Load commands in a Module.
 * Validate the command validity entirely.
 *
 * @author KhaaZ
 *
 * @class CommandLoader
 * @extends ALoader<Command>
 */
export declare class CommandLoader extends ALoader<Command> {
    private _module: Module;
    /**
     * Creates an instance of CommandLoader
     * @param module
     */
    constructor(module: Module);
    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @memberof CommandLoader
     */
    readonly axon: AxonClient;
    /**
     * Returns the Logger instance
     *
     * @readonly
     * @memberof CommandLoader
     */
    readonly logger: ALogger;
    /**
     * Load one command instance in the module.
     * Validate and correct the command before registering it.
     *
     * @param command - The command to load
     * @param parent - The optional parent command
     * @memberof CommandLoader
     */
    load(command: Command, parent?: Command): boolean;
    /**
     * Load all commands in the module.
     * Instantiate all commands.
     *
     * @memberof CommandLoader
     */
    loadAll(commands: { [key: string]: Command; } ): boolean;
    /**
     * Init and construct/instance all subcommands of the given parent command
     *
     * @param parentCommand - The command Object
     * @memberof Command
     */
    loadSubCommands(parentCommand: Command): void;
    /**
     * Unload a Command from the client
     *
     * @param label - The Command label to unload
     * @returns Whether it worked
     * @memberof CommandLoader
     */
    unload(label: string): true;
    /**
     * Register a Command. Register its subcommands if it has any.
     *
     * @param command - Command object
     * @memberof CommandLoader
     */
    registerCommand(command: Command): void;
    /**
     * Register a SubCommand.Register its subcommands if it has any
     *
     * @param command - The subcommand to register
     * @param parent - The parent command
     * @memberof CommandLoader
     */
    registerSubCommand(command: Command, parent: Command): void;
    /**
     * Remove a command from the module and the global cache.
     *
     * @param fullLabel - Full command label
     * @returns True if successful / Error otherwise
     * @memberof CommandLoader
     */
    unregisterCommand(fullLabel: string): boolean;
    /**
     * Remove a subcommand from a command
     *
     * @param command - The parent Command
     * @param subCommand - The Subcommand to unregister
     * @memberof CommandLoader
     */
    unregisterSubCommand(command: Command, subCommand: Command): void;
}