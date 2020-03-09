import {
    COMMAND_EXECUTION_TYPES, CommandEnvironmentProps, CommandEnvironmentParams, LibMessage, GuildConfig, Command,
} from '../../';

/**
 * CommandEnvironment structure. Contains all the environment used in command execution (all variables used in Command.execute).
 *
 * @author KhaaZ
 *
 * @class CommandEnvironment
 */
export declare class CommandEnvironment implements CommandEnvironmentProps {
    /** The raw message content */
    public raw: string;
    public command: string;
    public msg: LibMessage;
    public args: string[];
    public prefix: string;
    public guildConfig: GuildConfig;
    public executionType: COMMAND_EXECUTION_TYPES;
    /**
     * Creates an instance of CommandEnvironment.
     * @memberof CommandEnvironment
     */
    constructor(data: CommandEnvironmentParams);

    /**
     * Whether this is an admin execution environment (owner or admin)
     * @readonly
     * @memberof CommandEnvironment
     */
    readonly isAdmin: boolean;

    /**
     * Whether this is an owner execution environment
     * @readonly
     * @memberof CommandEnvironment
     */
    readonly isOwner: boolean;

    /**
     * Set the prefix
     * @returns This CommandEnvironment
     * @memberof CommandEnvironment
     */
    public setPrefix(prefix: string): CommandEnvironment;

    /**
     * Set the guildConfig
     * @returns This CommandEnvironment
     * @memberof CommandEnvironment
     */
    public setGuildConfig(guildConfig: GuildConfig): CommandEnvironment;

    /**
     * Set the command lavel from the command object
     * @returns This CommandEnvironment
     * @memberof CommandEnvironment
     */
    public setCommand(command: Command): CommandEnvironment;

    /**
     * Resolve the argument from the args string.
     * Uses the custom parser given in params
     * @param args - Arguments string
     * @memberof CommandEnvironment
     */
    public resolveArgs(parser: object, args: string): void;
}
