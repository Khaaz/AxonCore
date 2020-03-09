import {
    CommandPerms, Command, LibMessage, Module, AxonClient, Utils, AxonUtils, LibraryInterface, GuildConfig, LibTextableChannel, LibMember, LibGuild,
} from '../../';

/**
 * CommandPermissions.
 * Holds permissions for a command and all necessary checkers.
 *
 * needed => needed to have **ALL** <NEEDED> permissions to execute the command
 *
 * bypass => needed to have **ONE** <BYPASS> permission to execute the command
 *
 * @author KhaaZ
 *
 * @class CommandPermissions
 */
export declare class CommandPermissions implements CommandPerms {
    private _command: Command;

    public bot: string[]
    public serverMod: boolean;
    public serverManager: boolean;
    public serverAdmin: boolean;
    public serverOwner: boolean;
    public author: {
        needed: string[];
        bypass: string[];
    };
    public users: {
        needed: string[];
        bypass: string[];
    };
    public roles: {
        needed: string[];
        bypass: string[];
    };
    public channels: {
        needed: string[];
        bypass: string[];
    };
    public guilds: {
        needed: string[];
        bypass: string[];
    };
    public staff: {
        needed: string[];
        bypass: string[];
    };
    public custom: (msg: LibMessage) => boolean;
    /**
     * Creates an instance of CommandPermissions.
     *
     * @param command - The base command/module
     * @param override - The specific permissions for this command/module (format - CommandPermissions)
     * @param useModuleDefault - Whether to use or not the module's base permissions before applying override permissions
     * @memberof CommandPermissions
     */
    constructor(command: Command|Module, override?: CommandPerms, userModuleDefault?: boolean);
    // GETTERS
    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @memberof CommandPermissions
     */
    readonly axon: AxonClient;
    /**
     * Return the Utils instance
     *
     * @readonly
     * @memberof CommandPermissions
     */
    readonly utils: Utils;
    /**
     * Returns the AxonUtils instance
     *
     * @readonly
     * @memberof CommandPermissions
     */
    readonly axonUtils: AxonUtils;
    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @memberof CommandPermissions
     */
    readonly library: LibraryInterface;

    // METHODS

    /**
     * Permission checker - Does the user have permission to use the command or not?
     *
     * Bypass - Only needs of of these permissions, doesn't check for other permissions
     *
     * Needed - Needs all specified permissions => Goes through other checkers
     *
     * ServerMod
     *
     * @param msg - The Message Object
     * @param guildConf - GuildConfig
     * @returns True if the user can execute command / False if not. Second element is the missing permission || null
     * @memberof Command
     */
    public canExecute(msg: LibMessage, guildConf: GuildConfig): [false, string | null] | [true, null?];

    /**
     * Set the permissions the bot needs to have to execute this command.
     *
     * @param array - Array of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     * @memberof CommandPermissions
     */
    public setBot(array?: string[], toAdd?: boolean): CommandPermissions;
    /**
     * Set/unset the command to serverMod only.
     *
     * @param boolean - Whether to make the command serverMod only
     * @memberof CommandPermissions
     */
    public setServerMod(boolean?: boolean): CommandPermissions;
    /**
     * Set/unset the command to serverManager only.
     *
     * @param boolean - Whether to make the command serverManager only
     * @memberof CommandPermissions
     */
    public setServerManager(boolean?: boolean): CommandPermissions;
    /**
     * Set/unset the command to serverAdmin only.
     *
     * @param boolean - Whether to make the command serverAdmin only
     * @memberof CommandPermissions
     */
    public setServerAdmin(boolean?: boolean): CommandPermissions;
    /**
     * Set/unset the command to serverOwner only.
     *
     * @param boolean - Whether to make the command serverOwner only
     * @memberof CommandPermissions
     */
    public setServerOwner(boolean?: boolean): CommandPermissions;
    /**
     * Set the permissions the user needs to have to execute this command.
     *
     * @param object - Object of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     * @memberof CommandPermissions
     */
    public setAuthor(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
    /**
     * Set the user IDs the user needs to have to execute this command.
     *
     * @param object - Object of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     * @memberof CommandPermissions
     */
    public setUsers(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
    /**
     * Set the role IDs the user needs to have to execute this command.
     *
     * @param object - Object of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     * @memberof CommandPermissions
     */
    public setRoles(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
    /**
     * Set the channel IDs needed to be in to execute this command.
     *
     * @param object - Object of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     * @memberof CommandPermissions
     */
    public setChannels(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
    /**
     * Set the guild IDs needed to be in to execute this command.
     *
     * @param object - Object of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     */
    public setGuilds(object?: { bypass?: string[]; needed?: string; }, toAdd?: boolean): CommandPermissions;
    /**
     * Set the AxonCore staff members that can execute this command.
     *
     * @param object - Object of permissions
     * @param toAdd - Whether to add the permissions to the existing permissions
     * @memberof CommandPermissions
     */
    public setStaff(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;

    // CHECK FOR IF PERMISSIONS ARE MET

    /**
     * Check bot permission
     *
     * @memberof CommandPermissions
     */
    private _checkPermsBot(channel: LibTextableChannel): boolean;
    /**
     * Check user permissions [bypass]
     *
     * @memberof CommandPermissions
     */
    private _checkPermsUserBypass(member: LibMember): boolean;
    /**
     * Check user permissions [needed]
     *
     * @memberof CommandPermissions
     */
    private _checkPermsUserNeeded(member: LibMember): [true] | [false, string];
    /**
     * Check userIDs [bypass]
     *
     * @memberof CommandPermissions
     */
    private _checkUserBypass(member: LibMember): boolean;
    /**
     * Check userIDs [needed]
     *
     * @memberof CommandPermissions
     */
    private _checkUserNeeded(member: LibMember): boolean;
    /**
     * Check roleIDs [bypass]
     *
     * @memberof CommandPermissions
     */
    private _checkRoleBypass(member: LibMember): boolean;
    /**
     * Check roleIDs [needed]
     *
     * @memberof CommandPermissions
     */
    private _checkRoleNeeded(member: LibMember): boolean;
    /**
     * Check channelIDs [bypass]
     *
     * @memberof CommandPermissions
     */
    private _checkChannelBypass(channel: LibTextableChannel): boolean;
    /**
     * Check channelIDs [needed]
     *
     * @memberof CommandPermissions
     */
    private _checkChannelNeeded(channel: LibTextableChannel): boolean;
    /**
     * Check guildIDs [bypass]
     *
     * @memberof CommandPermissions
     */
    private _checkGuildBypass(guild: LibGuild): boolean;
    /**
     * Check guildIDs [needed]
     *
     * @memberof CommandPermissions
     */
    private _checkGuildNeeded(guild: LibGuild): boolean;
    /**
     * Check if the user is bot staff [bypass]
     *
     * @returns True if Staff / False if not
     * @memberof CommandPermissions
     */
    private _checkStaffBypass(member: LibMember): boolean;
    /**
     * Check if the user is bot staff [needed]
     *
     * @returns True if Staff / False if not
     * @memberof CommandPermissions
     */
    private _checkStaffNeeded(member: LibMember): boolean;
}
