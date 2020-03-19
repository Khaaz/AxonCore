import {
    Base, CommandData, Module, CommandCooldown, CommandInfo, CommandOptions, CommandPermissions, CommandRegistry,
    AxonTemplate, LibraryInterface, CommandContext, CommandResponse, LibTextableChannel, LibMember, CommandEnvironment,
} from '../../';

/**
 * AxonCore - Command constructor
 *
 * @author KhaaZ
 *
 * @class Command
 * @extends Base
 */
export declare class Command extends Base implements CommandData {
    /**
     * Module object
     */
    private _module: Module;
    /**
     * Cooldown Object for the command (manage all command cooldowns)
     */
    private _cooldown: CommandCooldown;

    public label: string;
    public aliases: string[];
    public hasSubcmd: boolean;
    public enabled: boolean;
    public serverBypass: boolean;
    /** Reference to the parent command */
    public parentCommand: Command | null;
    /** Registry of subcommands */
    public subCommands: CommandRegistry | null;
    public info: CommandInfo;
    public options: CommandOptions;
    public permissions: CommandPermissions;

    // GETTERS
    /**
     * Returns the parent module instance
     *
     * @readonly
     * @memberof Command
     */
    readonly module: Module;
    /**
     * Returns the template object
     *
     * @readonly
     * @memberof Command
     */
    readonly template: AxonTemplate;
    /**
     * Returns the library Interface instance
     *
     * @readonly
     * @memberof Command
     */
    readonly library: LibraryInterface;
    /**
     * Returns the full label for this command (label + all parent labels)
     *
     * @readonly
     * @memberof Command
     */
    readonly fullLabel: string;

    /**
     * Creates a Command instance.
     * Handles execution of this command.
     * Overrides the execute method. Execute method will be called every time the command is called.
     *
     * @param data - All command parameters
     * @memberof Command
     */
    constructor(module: Module, data?: CommandData);

    /**
     * Returns all the subcommands for a command
     * @returns An array of Command class (non instantiated)
     * @memberof Command
     */
    init(): (new (...args: any[] ) => Command)[]

    _init(): boolean;

    // Internal
    /**
     * Process the command, and executes it if it can (permissions, options etc..).
     *
     * @returns Return a CommandContext or throw an AxonCommandError.
     * @memberof Command
     */
    private _process(env: CommandEnvironment): Promise<CommandContext>;
    private _preExecute(): void; // Blank function
    /**
     * Execute the command.
     * Get the CommandResponse from the command execution or create it in case of errors.
     * Create the CommandContext and returns it.
     * @memberof Command
     */
    private _execute(env: CommandEnvironment): Promise<CommandContext>;
    private _postExecute(): void; // Blank function

    // External
    /**
     * Override this method in all Command child.
     * Main method - command logic being executed when the command is actually ran.
     *
     * @param env - The Command Environment object with all variables needed for the Commandexecution
     * @returns Returns a CommandResponse that will be used to create the CommandContext
     * @memberof Command
     */
    public execute(env: CommandEnvironment): Promise<CommandResponse>; // Not implemented
    /**
     * Send help message in the current channel with perm checks done before.
     * Call a custom sendHelp method if it exists, use the default one if it doesn't.
     *
     * @memberof Command
     */
    public sendHelp(env: CommandEnvironment): Promise<CommandContext>;
    /**
     * Send an error message in case of invalid bot permissions, delete it automatically after a delay.
     *
     * @param channel - The channel Object
     * @param permissions - Optional array of permissions string
     * @memberof Command
     */
    public sendBotPerms(channel: LibTextableChannel, permissions?: string[] ): Promise<CommandResponse>;
    /**
     * Send an error message in case of invalid user permissions, delete it automatically after a delay.
     * Uses the template message in config/template.
     *
     * @param channel - The channel object
     * @param member - The member object
     * @param deleteTimeout - The permission message deletion timeout, if `null` the the message will not delete
     * @param missingPermission - The missing permission
     * @memberof Command
     */
    public sendUserPerms(channel: LibTextableChannel, member: LibMember, deleteTimeout?: number, missingPermission?: string): Promise<CommandResponse>;
    /**
     * Send an error message in case of invalid target permissions (serverMod/serverAdmin).
     * Uses the template message in config/template.
     *
     * @param channel - The channel Object
     * @memberof Command
     */
    public sendTargetPerms(channel: LibTextableChannel): Promise<CommandResponse>;
    /**
     * Send an error message in case of invalid cooldown, delete it automatically after a delay.
     *
     * @param channel - The channel Object
     * @param time - How long since the last command
     * @memberof Command
     */
    public sendCooldown(channel: LibTextableChannel, time: number): Promise<CommandResponse>;
}
