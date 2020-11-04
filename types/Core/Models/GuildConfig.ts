import { AModel } from './AModel';
import {
    GuildConfigRaw, AxonClient, GConfig, LibMessage, LibMember, Module, Command, Listener, updateDBVal,
} from '../../';

/**
 * Default GuildConfig data structure used in AxonCore.
 * This class can be extended and changed as you want.
 * All methods flagged with "is used internally" can be overridden but need to keep the same name.
 *
 * @author KhaaZ
 *
 * @class GuildConfig
 * @extends AModel
 */
export declare class GuildConfig extends AModel implements GuildConfigRaw {
    public guildID: string;
    public prefixes: string[];

    public createdAt: Date;
    public updatedAt: Date;

    public modules: string[];
    public commands: string[];
    public listeners: string[];

    public ignoredUsers: string[];
    public ignoredRoles: string[];
    public ignoredChannels: string[];

    public modOnly: boolean;
    public modRoles: string[];
    public modUsers: string[];

    /**
     * Creates an instance of GuildConfig.
     *
     * @param values - DB values for the current guild
     * @memberof GuildConfig
     */
    constructor(axon: AxonClient, values: GConfig);

    /**
     * Get guild prefixes for this guild.
     *
     * @memberof GuildConfig
     */
    public getPrefixes(): string[];
    /**
     * Check if the user/role/channel is ignored on the specified guild.
     * *used internally*
     *
     * @returns True if either one of the three is ignored
     * @memberof GuildConfig
     */
    public isIgnored(msg: LibMessage): boolean;
    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @returns True if the user is one of the ignored users
     *
     * @memberof GuildConfig
     */
    public isUserIgnored(userID: string): boolean
    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @returns True if the member has one of the ignored roles
     * @memberof GuildConfig
     */
    public isRoleIgnored(member: LibMember): boolean;
    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @returns True if the channel is one of the ignored channels
     * @memberof GuildConfig
     */
    public isChannelIgnored(channelID: string): boolean;
    /**
     * Check if the module is disabled on the specified guild.
     *
     * *used internally*
     *
     * @param module - The module object
     * @returns Whether the module is disabled or not
     * @memberof GuildConfig
     */
    public isModuleDisabled(module: Module): boolean;
    /**
     * Check if the command is disabled on the specified guild.
     *
     * *used internally*
     *
     * @param command - The command object
     * @returns Whether the command is disabled or not
     * @memberof GuildConfig
     */
    public isCommandDisabled(command: Command): boolean;
    /**
     * Check if the listener is disabled on the specified guild.
     *
     * *used internally*
     *
     * @param listener - The listener object
     * @returns Whether the listener is disabled or not
     * @memberof GuildConfig
     */
    public isListenerDisabled(listener: Listener): boolean;
    /**
     * Whether the guild is set up to mod only or not.
     *
     * *used internally*
     * @memberof GuildConfig
     */
    public isModOnly(): boolean;
    /**
     * Whether the role ID is in the guild mod roles.
     *
     * *used internally*
     *
     * @memberof GuildConfig
     */
    public isModRole(roleID: string): boolean;
    /**
     * Whether the user ID is in the guild mod users.
     *
     * *used internally*
     *
     * @memberof GuildConfig
     */
    public isModUser(userID: string): boolean;
    /**
     * Update the guild config in the cache and DB.
     *
     * *not used internally*
     *
     * @param guildConfig - Guild schema Object
     * @returns Updated guildSchema
     * @memberof GuildConfig
     */
    public update(guildConfig: GuildConfig): Promise<this | null>;
    /**
     * Register prefixes for this guild.
     *
     * *not used internally*
     *
     * @param prefixArr - The array of prefix
     * @returns Updated guildConfig / error
     * @memberof GuildConfig
     */
    public updatePrefixes(prefixArr: string[] ): Promise<this|null>;
    /**
     * Updates the state of a module.
     *
     * *not used internally*
     *
     * @param label - The module label
     * @param boolean - Whether to enable (true) the module or disable (false) it.
     * @returns Updated guildConfig / Error
     * @memberof GuildConfig
     */
    public updateStateModule(label: string, boolean: boolean): Promise<this|null>;
    /**
     * Updates the state of a command.
     *
     * *not used internally*
     *
     * @param label - The command label
     * @param boolean - Whether to enable (true) the command or disable (false) it.
     * @returns Updated guildConfig / Error
     * @memberof GuildConfig
     */
    public updateStateCommand(label: string, boolean: boolean): Promise<this|null>;
    /**
     * Updates the state of a listener.
     *
     * *not used internally*
     *
     * @param label - The listener label
     * @param boolean - Whether to enable (true) the listener or disable (false) it.
     * @returns Updated guildConfig / Error
     * @memberof GuildConfig
     */
    public updateStateListener(label: string, boolean: boolean): Promise<this|null>;
    /**
     * Updates the state of a mod role.
     *
     * *not used internally*
     *
     * @param roleID - The role ID
     * @param boolean - Whether to add (true) the role or remove (false) it.
     * @returns Updated guildConfig / Error
     * @memberof GuildConfig
     */
    public updateStateModRole(roleID: string, boolean: boolean): Promise<this|null>;
    /**
     * Updates the state of a mod user.
     *
     * *not used internally*
     *
     * @param userID - The user ID
     * @param boolean - Whether to add (true) the user or remove (false) it.
     * @returns Updated guildConfig / Error
     * @memberof GuildConfig
     */
    public updateStateModUser(userID: string, boolean: boolean): Promise<this|null>;

    protected _req(key: string, value: updateDBVal): Promise<this|null>
}
