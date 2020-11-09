import {
    AxonClient, LibraryInterface, LibMessage, GuildConfig, COMMAND_EXECUTION_TYPES,
} from '../';

/**
 * Class responsible to call the correct command and correct execution flow when needed.
 * Dispatch to the correct command on message create event.
 * Handles prefix resolving and command resolving.
 *
 * @author KhaaZ
 *
 * @class CommandDispatcher
 */
export declare class CommandDispatcher {
    private _axon: AxonClient;
    public mentionFormatter: RegExp;
    /**
     * Creates an instance of CommandDispatcher.
     *
     * @memberof CommandDispatcher
     */
    constructor(axon: AxonClient);
    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @memberof CommandDispatcher
     */
    readonly library: LibraryInterface;
    /**
     * Dispatches the messageCreate event to:
     * - end of execution if:
     *      - no prefix
     *      - no command
     *      - no permissions
     * - command execution with different execution flow:
     *      - Owner execution
     *      - Admin execution
     *      - Regular execution
     *      - DM execution
     *
     * @param msg - Message Object from Eris
     * @memberof CommandDispatcher
     */
    public dispatch(msg: LibMessage): Promise<void>;
    /**
     * Give the execution type: Owner or Admin execution.
     * It uses the global admin and owner prefixes and checks for the BotStaff rank of the caller.
     *
     * @memberof CommandDispatcher
     */
    public getExecutionType(msg: LibMessage): COMMAND_EXECUTION_TYPES;
    /**
     * Resolves the prefix for the guild of the message.
     * Will resolve the owner or admin prefix if it's an owner or admin execution.
     * It will otherwise regularly resolve the prefix for this particular guild.
     *
     * @param msg - The message object
     * @param guildConfig - The guildConfig Object
     * @param isAdmin - Whether admin prefix was used
     * @param isOwner - Whether owner prefix was used
     * @returns The prefix if found / Undefined if not
     * @memberof CommandDispatcher
     */
    public resolvePrefix(msg: LibMessage, guildConfig?: GuildConfig, isAdmin?: boolean, isOwner?: boolean): string;
    /**
     * Resolves the prefix for the guild of the message.
     * If the message starts with one of the guild prefixes it returns the prefix, otherwise it returns undefined.
     * Global prefixes will only take over if no prefix are specified in this guild.
     *
     * @param msg - The message object
     * @param guildConfig - The guildConfig Object
     * @returns The prefix if found / Undefined if not
     * @memberof CommandDispatcher
     */
    public resolveGuildPrefix(msg: LibMessage, guildConfig?: GuildConfig): string;
}
