import {
    ACommandOptions, Command, LibTextableChannel, LibMember, MessageManager, GuildConfig,
} from '../../';

/**
 * CommandOptions.
 * Holds options for a command and all necessary checkers.
 *
 * @author KhaaZ
 *
 * @class CommandOptions
 */
export declare class CommandOptions implements ACommandOptions {
    private _command: Command;
    public guildOnly?: boolean;
    public argsMin?: number;

    public invalidUsageMessage: string;
    public invalidPermissionMessage: ( (channel: LibTextableChannel, member: LibMember) => string) | null;
    public sendPermissionMessage: boolean;
    public invalidPermissionMessageTimeout: number;

    public deleteCommand?: boolean;
    public hidden?: boolean;
    public userLock?: boolean;
    public cooldown?: number;

    /**
     * Creates an instance of CommandOptions.
     *
     * @param command - The base command
     * @param override - The specific options for this command (format - CommandOptions)
     * @param useModuleDefault - Whether to use or not the module's base options before applying override permissions
     * @memberof CommandOptions
     */
    constructor(command: Command, override: ACommandOptions, useModuleDefault?: boolean);

    /**
     * Returns the MessageManager instance
     *
     * @readonly
     * @memberof CommandOptions
     */
    readonly l: MessageManager;

    /**
     * Whether the command is guild only or not
     *
     * @memberof CommandOptions
     */
    public isGuildOnly(): boolean;
    /**
     * Whether the command is hidden or not
     *
     * @memberof CommandOptions
     */
    public isHidden(): boolean;

    /**
     * Whether args for this command are correct or not (enough args).
     *
     * @memberof CommandOptions
     */
    public hasCorrectArgs(args: string[] ): boolean;
    /**
     * Whether we should send an invalid usage message or not (help command)
     *
     * @memberof CommandOptions
     */
    public shouldSendInvalidUsageMessage(args: string[] ): boolean;
    /**
     * Whether we should send the invalid permission message or not
     *
     * @memberof CommandOptions
     */
    public shouldSendInvalidPermissionMessage(guildConfig: GuildConfig): boolean;
    /**
     * Whether we should delete the command or not
     *
     * @memberof CommandOptions
     */
    public shouldDeleteCommand(): boolean;
    /**
     * Get the invalid permission message
     *
     * @param channel - The guild channel
     * @param member - The guild member
     * @param permission - The missing permission
     */
    public getInvalidPermissionMessage(channel: LibTextableChannel, member: LibMember, permission: string): string;
    /**
     * Get the invalid usage message
     */
    public getInvalidUsageMessage(): string;
}
