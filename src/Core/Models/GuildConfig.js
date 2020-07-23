/**
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('../Module').default} Module
 * @typedef {import('../Command/Command').default} Command
 * @typedef {import('../Event/Listener').default} Listener
 * @typedef {{
 * guildID?: String, prefixes?: Array<String>, createdAt?: Date, updatedAt?: Date, modules?: Array<String>
 * commands: Array<String>, eventListeners: Array<String>, ignoredUsers: Array<String>, ignoredRoles: Array<String>,
 * ignoredChannels: Array<String>, modOnly: Boolean, modRoles: Array<String>, modUsers: Array<String>
 * }} GConfig
 */

/**
 * Default GuildConfig data structure used in AxonCore.
 * This class can be extended and changed as you want.
 * All methods flagged with "is used internally" can be overridden but need to keep the same name.
 *
 * @author KhaaZ
 *
 * @class GuildConfig
 *
 * @prop {String} guildID
 * @prop {Array<String>} prefixes
 * @prop {Array<String>} modules - Guild disabled modules: Array of modules labels
 * @prop {Array<String>} commands - Guild disabled commands: Array of commands labels
 * @prop {Array<String>} listeners - Guild disabled listeners: Array of listeners labels
 * @prop {Date} createdAt - Creation of the guild Config
 * @prop {Date} updatedAt - Last update of the guild Config
 * @prop {Array<String>} ignoredUsers - Users that cannot use commands in this guild: Users ids
 * @prop {Array<String>} ignoredRoles - Roles that cannot use commands in this guild: Roles ids
 * @prop {Array<String>} ignoredChannels - Channels where commands cannot be used in this guild: Channels ids
 * @prop {Boolean} modOnly - Whether the guild accept commands from only mods+ or everyone
 * @prop {Array<String>} modRoles - Roles able to execute mod commands: Roles ids
 * @prop {Array<String>} modUsers - Users able to execute mod commands: Users ids
 */
class GuildConfig {
    /**
     * Creates an instance of GuildConfig.
     *
     * @param {AxonClient} axon
     * @param {GConfig} values - DB values for the current guild
     * @memberof GuildConfig
     */
    constructor(axon, values) {
        this._axon = axon;

        this.guildID = values.guildID || '';
        this.prefixes = values.prefixes || [];

        this.createdAt = values.createdAt || new Date();
        this.updatedAt = values.updatedAt || new Date();

        /* Disabled modules / commands / events */
        this.modules = values.modules || [];
        this.commands = values.commands || [];
        this.listeners = values.eventListeners || [];

        this.ignoredUsers = values.ignoredUsers || [];
        this.ignoredRoles = values.ignoredRoles || [];
        this.ignoredChannels = values.ignoredChannels || [];

        this.modOnly = values.modOnly || false;
        this.modRoles = values.modRoles || [];
        this.modUsers = values.modUsers || [];
    }

    //
    // **** CHECKER - used IN the framework **** //
    /* Can be overridden/changed but need to exists / keep the same name */
    //

    /**
     * Get guild prefixes for this guild.
     *
     * @returns {Array<String>}
     * @memberof GuildConfig
     */
    getPrefixes() {
        return (this.prefixes.length > 0) ? this.prefixes : (this._axon.settings.prefixes || [] );
    }

    /**
     * Check if the user/role/channel is ignored on the specified guild.
     * *used internally*
     *
     * @param {Message} msg
     * @returns {Boolean} True if either one of the three is ignored
     * @memberof GuildConfig
     */
    isIgnored(msg) {
        return this.isUserIgnored(this._axon.library.message.getAuthorID(msg) )
            || this.isRoleIgnored(this._axon.library.message.getMember(msg) )
            || this.isChannelIgnored(this._axon.library.message.getChannelID(msg) );
    }

    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @param {String} userID
     * @returns {Boolean} True if the user is one of the ignored users
     *
     * @memberof GuildConfig
     */
    isUserIgnored(userID) {
        return this.ignoredUsers.includes(userID); // User is ignored
    }

    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @param {Member} member
     * @returns {Boolean} True if the member has one of the ignored roles
     * @memberof GuildConfig
     */
    isRoleIgnored(member) {
        const roles = this._axon.library.member.getRoles(member);
        if (!roles || !(Array.isArray(roles) ) ) {
            return false;
        }
        return !!this.ignoredRoles.find(r => roles.includes(r) ); // Role is ignored
    }

    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @param {String} channelID
     * @returns {Boolean} True if the channel is one of the ignored channels
     * @memberof GuildConfig
     */
    isChannelIgnored(channelID) {
        return this.ignoredChannels.includes(channelID); // Channel is ignored
    }

    /**
     * Check if the module is disabled on the specified guild.
     * *used internally*
     *
     * @param {Module} module - The module object
     * @returns {Boolean} Whether the module is disabled or not
     * @memberof GuildConfig
     */
    isModuleDisabled(module) {
        return this.modules.includes(module.label);
    }

    /**
     * Check if the command is disabled on the specified guild.
     * *used internally*
     *
     * @param {Command} command - The command object
     * @returns {Boolean} Whether the command is disabled or not
     * @memberof GuildConfig
     */
    isCommandDisabled(command) {
        return this.commands.includes(command.label);
    }

    /**
     * Check if the listener is disabled on the specified guild.
     * *used internally*
     *
     * @param {Listener} listener - The listener object
     * @returns {Boolean} Whether the listener is disabled or not
     * @memberof GuildConfig
     */
    isListenerDisabled(listener) {
        return this.listeners.includes(listener.label);
    }

    /**
     * Whether the guild is set up to mod only or not.
     * *used internally*
     *
     * @returns {Boolean}
     * @memberof GuildConfig
     */
    isModOnly() {
        return this.modOnly;
    }

    /**
     * Whether the role ID is in the guild mod roles.
     * *used internally*
     *
     * @param {String} roleID
     * @returns {Boolean}
     * @memberof GuildConfig
     */
    isModRole(roleID) {
        return this.modRoles.includes(roleID);
    }

    /**
     * Whether the user ID is in the guild mod users.
     * *used internally*
     *
     * @param {String} userID
     * @returns {Boolean}
     * @memberof GuildConfig
     */
    isModUser(userID) {
        return this.modUsers.includes(userID);
    }

    //
    // **** UPDATER - never used directly IN the framework **** //
    /* Easily overridable. Can be changed as will (even methods name etc) */
    //

    /**
     * Update the guild config in the cache and DB.
     * *not used internally*
     *
     * @param {GConfig} guildConfig - Guild schema Object
     * @returns {Promise<GuildConfig>} Updated guildSchema
     * @memberof GuildConfig
     */
    async update(guildConfig) {
        if (guildConfig.guildID !== this.guildID) {
            return Promise.resolve(null);
        }
        for (const key in guildConfig) {
            this[key] = guildConfig[key];
        }
        this.updatedAt = new Date();
        const update = {};
        for (const [key, value] of Object.entries(this) ) {
            try {
                JSON.stringify(value);
                update[key] = value;
            } catch (e) {
                // There is nothing we can do here
            }
        }

        const newConf = await this._axon.DBProvider.saveGuild(this.guildID, update);
        return newConf ? this : null;
    }

    /**
     * Register prefixes for this guild.
     * *not used internally*
     *
     * @param {Array<String>} prefixArr - The array of prefix
     * @returns {Promise<GuildConfig|null>} Updated guildConfig / error
     * @memberof GuildConfig
     */
    updatePrefixes(prefixArr) {
        this.prefixes = prefixArr;
        return this._req('prefixes', this.prefixes);
    }

    /**
     * Updates the state of a module.
     * true = disable the module, false = enable the module
     * *not used internally*
     *
     * @param {String} label - The module label
     * @param {Boolean} [boolean=true] - Whether to enable (true) the module or disable (false) it.
     * @returns {Promise<GuildConfig|null>} Updated guildConfig / Error
     * @memberof GuildConfig
     */
    updateStateModule(label, boolean = true) {
        boolean
            ? this.modules.includes(label) && (this.modules = this.modules.filter(m => m !== label) )
            : !this.modules.includes(label) && this.modules.push(label);

        return this._req('modules', this.modules);
    }

    /**
     * Updates the state of a command.
     * true = disable the command, false = enable the command.
     * *not used internally*
     *
     * @param {String} label - The command label
     * @param {Boolean} [boolean=true] - Whether to enable (true) the command or disable (false) it.
     * @returns {Promise<GuildConfig|null>} Updated guildConfig / Error
     * @memberof GuildConfig
     */
    updateStateCommand(label, boolean = true) {
        boolean
            ? this.commands.includes(label) && (this.commands = this.commands.filter(c => c !== label) )
            : !this.commands.includes(label) && this.commands.push(label);

        return this._req('commands', this.commands);
    }

    /**
     * Updates the state of a listener.
     * true = disable the listener, false = enable the listener.
     * *not used internally*
     *
     * @param {String} label - The listener label
     * @param {Boolean} [boolean=true] - Whether to enable (true) the listener or disable (false) it.
     * @returns {Promise<GuildConfig|null>} Updated guildConfig / Error
     * @memberof GuildConfig
     */
    updateStateListener(label, boolean = true) {
        boolean
            ? this.listeners.includes(label) && (this.listeners = this.listeners.filter(e => e !== label) )
            : !this.listeners.includes(label) && this.listeners.push(label);

        return this._req('eventListeners', this.listeners);
    }

    /**
     * Updates the state of a mod role.
     * true = add the role, false = remove the role.
     * *not used internally*
     *
     * @param {String} roleID - The role ID
     * @param {Boolean} [boolean=true] - Whether to add (true) the role or remove (false) it.
     * @returns {Promise<GuildConfig|null>} Updated guildConfig / Error
     * @memberof GuildConfig
     */
    updateStateModRole(roleID, boolean = true) {
        boolean
            ? !this.modRoles.includes(roleID) && this.modRoles.push(roleID)
            : this.modRoles.includes(roleID) && (this.modRoles = this.modRoles.filter(c => c !== roleID) );

        return this._req('modRoles', this.modRoles);
    }

    /**
     * Updates the state of a mod user.
     * true = add the user, false = remove the user.
     * *not used internally*
     *
     * @param {String} userID - The user ID
     * @param {Boolean} [boolean=true] - Whether to add (true) the user or remove (false) it.
     * @returns {Promise<GuildConfig|null>} Updated guildConfig / Error
     * @memberof GuildConfig
     */
    updateStateModUser(userID, boolean = true) {
        boolean
            ? !this.modUsers.includes(userID) && this.modUsers.push(userID)
            : this.modUsers.includes(userID) && (this.modUsers = this.modUsers.filter(c => c !== userID) );

        return this._req('modUsers', this.modUsers);
    }

    async _req(key, value) {
        this.updatedAt = new Date();

        const newConf = await this._axon.DBProvider.updateGuild(key, this.guildID, value);
        return newConf ? this : null;
    }
}

export default GuildConfig;
