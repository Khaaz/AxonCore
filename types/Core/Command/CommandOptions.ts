import {
    ACommandOptions, Command, LibTextableChannel, LibMember, MessageManagerType, GuildConfig, Module,
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
    
    public invalidPermissionMessage: ( (channel?: LibTextableChannel, member?: LibMember) => string) | null;
    public sendPermissionMessage: boolean;
    public invalidPermissionMessageTimeout: number;

    public argsMin: number;
    public invalidUsageMessage: string | null;
    public sendUsageMessage: boolean;

    public deleteCommand: boolean;
    public guildOnly: boolean;

    public hidden: boolean;
    public cooldown: number;
    public userLock: boolean;

    /**
     * Creates an instance of CommandOptions.
     *
     * @param command - The base command
     * @param override - The specific options for this command (format - CommandOptions)
     * @param useModuleDefault - Whether to use or not the module's base options before applying override permissions
     * @memberof CommandOptions
     */
    constructor(command: Command | Module, override: ACommandOptions, useModuleDefault?: boolean);

    /**
     * Returns the MessageManager instance
     *
     * @readonly
     * @memberof CommandOptions
     */
    readonly l: MessageManagerType;

    /**
     * Whether the command is guild only or not
     *
     * @memberof CommandOptions
     */
    public isGuildOnly(): boolean;
    /**
     * Whether the userLock option is enabled or not.
     *
     * @memberof CommandOptions
     */
    shouldUserLock(): boolean;
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
