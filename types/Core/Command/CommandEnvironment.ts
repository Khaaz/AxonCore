import {
    COMMAND_EXECUTION_TYPES, CommandEnvironmentProps, CommandEnvironmentParams, LibMessage, GuildConfig, Command, LibTextableChannel,
} from '../../';

/**
 * CommandEnvironment structure. Contains all the environment used in command execution (all variables used in Command.execute).
 *
 * @author KhaaZ
 *
 * @class CommandEnvironment
 */
export declare class CommandEnvironment<T extends LibTextableChannel = LibTextableChannel> implements CommandEnvironmentProps {
    /** The raw message content */
    public raw: string;
    public msg: LibMessage<T>;
    public args: string[];
    public prefix: string;
    public command: string;
    public usedLabel: string;
    public guildConfig: GuildConfig | null;
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
    public setPrefix(prefix: string): this;

    /**
     * Set the guildConfig
     * @returns This CommandEnvironment
     * @memberof CommandEnvironment
     */
    public setGuildConfig(guildConfig: GuildConfig | null): this;

    /**
     * Set the command label from the command object
     * @returns This CommandEnvironment
     * @memberof CommandEnvironment
     */
    public setCommand(command: Command, usedLabel: string): CommandEnvironment;

    /**
     * Resolve the argument from the args string.
     * Uses the custom parser given in params
     * @param args - Arguments string
     * @memberof CommandEnvironment
     */
    public resolveArgs(parser: { parse: (args: string) => string[]; } | null, args: string): void;
}
