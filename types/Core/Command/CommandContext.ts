import {
    Command, LibMessage, COMMAND_EXECUTION_STATE, COMMAND_EXECUTION_TYPES, CommandResponse,
} from '../../';

export declare class CommandContext {
    /** Raw input */
    public raw: string;
    /** The command full label */
    public commandLabel: string;
    /** The module name */
    public moduleLabel: string;

    /** Whether the command was actually executed or not */
    public executed: boolean;
    public helpExecution: boolean;
    /** The state of execution (no error, cooldown, invalid usage, invalid permission) */
    public executionState: COMMAND_EXECUTION_STATE;
    /** The type of execution (Owner, Admin, Regular) */
    public executionType: COMMAND_EXECUTION_TYPES;
    /** Whether the command was successfully executed or not */
    public success?: boolean;
    /** Optional error object in case of bad command execution */
    public error?: Error | null;

    /** Whether the command was executed in DM or not */
    public dm: boolean;
    /** Context: guild where the command was executed ID */
    public guildID: string | null;
    /** Context: guild where the command was executed name */
    public guildName: string | null;

    /** Context: channel where the command was executed ID */
    public channelID: string;
    /** Context: channel where the command was executed name */
    public channelName?: string;

    /** Context: user that called the command ID */
    public callerID: string | null;
    /** Context: user that called the command name */
    public callerName: string | null;

    /** The execution time */
    public calledAt: Date;

    /**
     * Creates an instance of CommandContext.
     *
     * @param data.executionState - no error, cooldown, invalid usage, invalid permissions...
     * @param data.executionType - Regular, admin, owner execution
     * @memberof CommandContext
     */
    constructor(command: Command, triggerMessage: LibMessage, data?: { executed?: boolean; helpExecution?: string; executionState?: COMMAND_EXECUTION_STATE; executionType?: COMMAND_EXECUTION_TYPES; } );

    /**
     * Add the command response data to the command context object.
     * Add the state of the command success and optionally the error.
     *
     * @param commandResponse - CommandResponse object obtained or created after the command execution
     * @memberof CommandContext
     */
    public addResponseData(commandResponse?: CommandResponse): this;
    /**
     * Return the type of command execution based of the execution context.
     * Admin, Owner or Regular execution.
     *
     * @static
     * @memberof CommandContext
     */
    static getExecutionType(isAdmin: boolean, isOwner: boolean): COMMAND_EXECUTION_TYPES;
    /**
     * By default returns the Command Context asynchronously.
     *
     * @memberof CommandContext
     */
    public resolve(): Promise<this>;
    /**
     * Returns the Command Context wrapped in a Promise (asynchronously)
     *
     * @memberof CommandContext
     */
    public resolveAsync(): Promise<this>;
    /**
     * Returns the Command Context (synchronously)
     *
     * @memberof CommandContext
     */
    public resolveSync(): this;
}
