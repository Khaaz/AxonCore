import Command from './Command';
import Module from '../Module';

import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../Module').default} Module
 * @typedef {{
 * bot?: Array<String>, serverMod?: Boolean, serverManager?: Boolean, serverAdmin?: Boolean, serverOwner?: Boolean,
 * author?: {needed?: Array<String>, bypass?: Array<String>}, users?: {needed?: Array<String>, bypass?: Array<String>},
 * roles?: {needed?: Array<String>, bypass?: Array<String>}, channels?: {needed?: Array<String>, bypass?: Array<String>},
 * guilds?: {needed?: Array<String>, bypass?: Array<String>}, staff?: {needed?: Array<String>, bypass?: Array<String>}, custom?: (i: Message) => boolean
 * }} CommandPerms
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('../../Utility/Utils').default} Utils
 * @typedef {import('../../Utility/AxonUtils').default} AxonUtils
 * @typedef {import('../../Libraries/definitions/LibraryInterface').default} LibraryInterface
 * @typedef {import('../Models/GuildConfig').default} GuildConfig
 */

/**
 * CommandPermissions.
 * Holds permissions for a command and all necessary checkers.
 *
 * needed => needed to have **ALL** <NEEDED> permissions to execute the command
 * bypass => needed to have **ONE** <BYPASS> permission to execute the command
 *
 * @author KhaaZ
 *
 * @class CommandPermissions
 *
 * @prop {Array} [bot=[]] - Discord permissions that the bot needs to have in order to execute the command
 * @prop {Boolean} [serverMod=false] - Axoncore server moderator
 * @prop {Boolean} [serverManager=false] - Discord server manager (manageServer)
 * @prop {Boolean} [serverAdmin=false] - Discord server administrator (administrator)
 * @prop {Boolean} [serverOwner=false] - Discord server owner
 * @prop {Array<String>} [author.needed=[]] - Discord permissions that the user needs to have in order to execute the command
 * @prop {Array<String>} [author.bypass=[]] - Discord permissions that will allow the user to execute the command no matter what
 * @prop {Array<String>} [users.needed=[]] - Discord user ids that the user needs to have in order to execute the command
 * @prop {Array<String>} [users.bypass=[]] - Discord user ids that will allow the user to execute the command no matter what
 * @prop {Array<String>} [roles.needed=[]] - Discord role ids that the user needs to have in order to execute the command
 * @prop {Array<String>} [roles.bypass=[]] - Discord role ids that will allow the user to execute the command no matter what
 * @prop {Array<String>} [channels.needed=[]] - Discord channel ids that the user needs to have in order to execute the command
 * @prop {Array<String>} [channels.bypass=[]] - Discord channel ids that will allow the user to execute the command no matter what
 * @prop {Array<String>} [guilds.needed=[]] - Discord guild ids that the user needs to have in order to execute the command
 * @prop {Array<String>} [guilds.bypass=[]] - Discord guild ids that will allow the user to execute the command no matter what
 * @prop {Array<String>} [staff.needed=[]] - Axoncore staff ids that the user needs to have in order to execute the command
 * @prop {Array<String>} [staff.bypass=[]] - Axoncore staff ids that will allow the user to execute the command no matter what
 * @prop {Function} [custom=()=>true] Custom function that returns a boolean. True will let the command execute, False will prevent the command from executing
 */
class CommandPermissions {
    /**
     * Creates an instance of CommandPermissions.
     *
     * @param {Command|Module} command - The base command/module
     * @param {CommandPerms} [override={}] - The specific permissions for this command/module (format - CommandPermissions)
     * @param {Boolean} [useModuleDefault=false] - Whether to use or not the module's base permissions before applying override permissions
     * @memberof CommandPermissions
     */
    constructor(command, override = {}, useModuleDefault = false) {
        let isModule = false;
        if (!(command instanceof Command) ) {
            if (!(command instanceof Module) ) {
                throw new AxonError('First argument needs to be the Command.', 'CommandPermissions');
            } else {
                isModule = true;
            }
        }
        this._command = command;

        let base;
        if (useModuleDefault && !isModule && command.module.permissions) {
            base = Object.assign( {}, command.module.permissions);
            for (const key in override) {
                base[key] = override[key];
            }
        } else {
            base = override;
        }

        /**
         * @type {Array<String>}
         */
        this.bot = base.bot || [];
        this.serverMod = !!base.serverMod;
        this.serverManager = !!base.serverManager;
        this.serverAdmin = !!base.serverAdmin;
        this.serverOwner = !!base.serverOwner;
        
        /**
         * @type {{needed: Array<String>, bypass: Array<String>}}
         */
        this.author = {
            needed: (base.author && base.author.needed) || [],
            bypass: (base.author && base.author.bypass) || [],
        };
        
        /**
         * @type {{needed: Array<String>, bypass: Array<String>}}
         */
        this.users = {
            needed: (base.users && base.users.needed) || [],
            bypass: (base.users && base.users.bypass) || [],
        };
        /**
         * @type {{needed: Array<String>, bypass: Array<String>}}
         */
        this.roles = {
            needed: (base.roles && base.roles.needed) || [],
            bypass: (base.roles && base.roles.bypass) || [],
        };
        /**
         * @type {{needed: Array<String>, bypass: Array<String>}}
         */
        this.channels = {
            needed: (base.channels && base.channels.needed) || [],
            bypass: (base.channels && base.channels.bypass) || [],
        };
        /**
         * @type {{needed: Array<String>, bypass: Array<String>}}
         */
        this.guilds = {
            needed: (base.guilds && base.guilds.needed) || [],
            bypass: (base.guilds && base.guilds.bypass) || [],
        };
        
        /**
         * @type {{needed: Array<String>, bypass: Array<String>}}
         */
        this.staff = {
            needed: (base.staff && base.staff.needed) ? [...base.staff.needed] : [], // creates a new array to prevent using a reference
            bypass: (base.staff && base.staff.bypass) ? [...base.staff.bypass] : [], // creates a new array to prevent using a reference
        };
        
        /**
         * @type {(i: Message) => Boolean}
         */
        this.custom = base.custom || ( () => true);
    }

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     * @memberof CommandPermissions
     */
    get axon() {
        return this._command.axon;
    }

    /**
     * Return the Utils instance
     *
     * @readonly
     * @type {Utils}
     * @memberof CommandPermissions
     */
    get utils() {
        return this._command.utils;
    }

    /**
     * Returns the AxonUtils instance
     *
     * @readonly
     * @type {AxonUtils}
     * @memberof CommandPermissions
     */
    get axonUtils() {
        return this._command.axonUtils;
    }

    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @type {LibraryInterface}
     * @memberof CommandPermissions
     */
    get library() {
        return this.axon.library;
    }

    /**
     * Permission checker - Does the user have permission to use the command or not?
     * Bypass - Only needs of of these permissions, doesn't check for other permissions
     * Needed - Needs all specified permissions => Goes through other checkers
     * ServerMod
     *
     * @param {Message} msg - The Message Object
     * @param {GuildConfig} guildConf - GuildConfig
     * @returns {Array<Boolean, String|null>} True if the user can execute command / False if not. Second element is the missing permission || null
     * @memberof Command
     */
    canExecute(msg, guildConf) {
        // If DM
        if (!guildConf) {
            if (this.staff.needed.length && !this.staff.needed.includes(this.library.message.getAuthorID(msg)) ) {
                return [false, 'Bot Staff'];
            }
            return [true];
        }

        const member = this.library.message.getMember(msg);
        const channel = this.library.message.getChannel(msg);
        const guild = this.library.channel.getGuild(channel);

        // Bypass: if one of the perm is true => Exec the command
        if (this._checkPermsUserBypass(member)
            || this._checkUserBypass(member)
            || this._checkRoleBypass(member)
            || this._checkChannelBypass(channel)
            || this._checkGuildBypass(guild)
            || this._checkStaffBypass(member) ) {
            return [true];
        }

        // Needed: server staff
        if ( (guildConf.modOnly || this.serverMod) && !this.axonUtils.isServerMod(member, guildConf) ) {
            return [false, 'Server Mod'];
        }
        if (this.serverManager && !this.axonUtils.isServerManager(member) ) {
            return [false, 'Server Manager'];
        }
        if (this.serverAdmin && !this.axonUtils.isServerAdmin(member) ) {
            return [false, 'Server Admin'];
        }
        if (this.serverOwner && !this.axonUtils.isServerOwner(member, this.library.channel.getGuild(channel) ) ) {
            return [false, 'Server Owner'];
        }

        // Needed: if one of the perms is false => doesn't exec the command
        const perm = this._checkPermsUserNeeded(member); // discord permissions
        if (!perm[0] ) {
            return [false, this.library.enums.PERMISSIONS_NAMES[perm[1]]];
        }
        if (!this._checkUserNeeded(member) // ids
            || !this._checkRoleNeeded(member)
            || !this._checkChannelNeeded(channel)
            || !this._checkGuildNeeded(guild) ) {
            return [false, null];
        }
        if (!this._checkStaffNeeded(member) ) { // bot staff
            return [false, 'Bot Staff'];
        }
        // custom is a function that returns a boolean
        if (this.custom) {
            return [this.custom(msg), null];
        }
        
        return [true];
    }

    // **** SETTER **** //

    /**
     * Set the permissions the bot needs to have to execute this command.
     *
     * @param {Array<String>} [array=[]] - Array of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setBot(array = [], toAdd = false) {
        if (toAdd) {
            this.bot = [...this.bot, ...array];
        } else {
            this.bot = array;
        }
        return this;
    }

    /**
     * Set/unset the command to serverMod only.
     *
     * @param {Boolean} [boolean=true] - Whether to make the command serverMod only
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setServerMod(boolean = true) {
        this.serverMod = boolean;
        return this;
    }

    /**
     * Set/unset the command to serverManager only.
     *
     * @param {Boolean} [boolean=true] - Whether to make the command serverManager only
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setServerManager(boolean = true) {
        this.serverManager = boolean;
        return this;
    }

    /**
     * Set/unset the command to serverAdmin only.
     *
     * @param {Boolean} [boolean=true] - Whether to make the command serverAdmin only
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setServerAdmin(boolean = true) {
        this.serverAdmin = boolean;
        return this;
    }

    /**
     * Set/unset the command to serverOwner only.
     *
     * @param {Boolean} [boolean=true] - Whether to make the command serverOwner only
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setServerOwner(boolean = true) {
        this.serverOwner = boolean;
        return this;
    }

    /**
     * Set the permissions the user needs to have to execute this command.
     *
     * @param {{needed: Array<String>, bypass: Array<String>}} [object={ bypass: [], needed: [] }] - Object of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setAuthor(object = { bypass: [], needed: [] }, toAdd = false) {
        if (toAdd) {
            if (object.bypass.length > 0) {
                this.author.bypass = [...this.author.bypass, ...object.bypass];
            }
            if (object.needed.length > 0) {
                this.author.needed = [...this.author.needed, ...object.needed];
            }
        } else {
            if (object.bypass.length > 0) {
                this.author.bypass = object.bypass;
            }
            if (object.needed.length > 0) {
                this.author.needed = object.needed;
            }
        }
        return this;
    }

    /**
     * Set the user IDs the user needs to have to execute this command.
     *
     * @param {{needed: Array<String>, bypass: Array<String>}} [object={ bypass: [], needed: [] }] - Object of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setUsers(object = { bypass: [], needed: [] }, toAdd = false) {
        if (toAdd) {
            if (object.bypass.length > 0) {
                this.users.bypass = [...this.users.bypass, ...object.bypass];
            }
            if (object.needed.length > 0) {
                this.users.needed = [...this.users.needed, ...object.needed];
            }
        } else {
            if (object.bypass.length > 0) {
                this.users.bypass = object.bypass;
            }
            if (object.needed.length > 0) {
                this.users.needed = object.needed;
            }
        }
        return this;
    }

    /**
     * Set the role IDs the user needs to have to execute this command.
     *
     * @param {{needed: Array<String>, bypass: Array<String>}} [object={ bypass: [], needed: [] }] - Object of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setRoles(object = { bypass: [], needed: [] }, toAdd = false) {
        if (toAdd) {
            if (object.bypass.length > 0) {
                this.roles.bypass = [...this.roles.bypass, ...object.bypass];
            }
            if (object.needed.length > 0) {
                this.roles.needed = [...this.roles.needed, ...object.needed];
            }
        } else {
            if (object.bypass.length > 0) {
                this.roles.bypass = object.bypass;
            }
            if (object.needed.length > 0) {
                this.roles.needed = object.needed;
            }
        }
        return this;
    }

    /**
     * Set the channel IDs needed to be in to execute this command.
     *
     * @param {{needed: Array<String>, bypass: Array<String>}} [object={ bypass: [], needed: [] }] - Object of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setChannels(object = { bypass: [], needed: [] }, toAdd = false) {
        if (toAdd) {
            if (object.bypass.length > 0) {
                this.channels.bypass = [...this.channels.bypass, ...object.bypass];
            }
            if (object.needed.length > 0) {
                this.channels.needed = [...this.channels.needed, ...object.needed];
            }
        } else {
            if (object.bypass.length > 0) {
                this.channels.bypass = object.bypass;
            }
            if (object.needed.length > 0) {
                this.channels.needed = object.needed;
            }
        }
        return this;
    }

    /**
     * Set the guild IDs needed to be in to execute this command.
     *
     * @param {{needed: Array<String>, bypass: Array<String>}} [object={ bypass: [], needed: [] }] - Object of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setGuilds(object = { bypass: [], needed: [] }, toAdd = false) {
        if (toAdd) {
            if (object.bypass.length > 0) {
                this.guilds.bypass = [...this.guilds.bypass, ...object.bypass];
            }
            if (object.needed.length > 0) {
                this.guilds.needed = [...this.guilds.needed, ...object.needed];
            }
        } else {
            if (object.bypass.length > 0) {
                this.guilds.bypass = object.bypass;
            }
            if (object.needed.length > 0) {
                this.guilds.needed = object.needed;
            }
        }
        return this;
    }

    /**
     * Set the AxonCore staff members that can execute this command.
     *
     * @param {{needed: Array<String>, bypass: Array<String>}} [object={ bypass: [], needed: [] }] - Object of permissions
     * @param {Boolean} [toAdd=false] - Whether to add the permissions to the existing permissions
     * @returns {CommandPermissions}
     * @memberof CommandPermissions
     */
    setStaff(object = { bypass: [], needed: [] }, toAdd = false) {
        if (toAdd) {
            if (object.bypass.length > 0) {
                this.staff.bypass = [...this.staff.bypass, ...object.bypass];
            }
            if (object.needed.length > 0) {
                this.staff.needed = [...this.staff.needed, ...object.needed];
            }
        } else {
            if (object.bypass.length > 0) {
                this.staff.bypass = object.bypass;
            }
            if (object.needed.length > 0) {
                this.staff.needed = object.needed;
            }
        }
        return this;
    }

    // **** PERMISSIONS CHECKERS **** //


    /**
     * Check bot permission
     *
     * @param {Channel} channel
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkPermsBot(channel) {
        if (!this.bot.length) {
            return true;
        }
        return this.utils.hasChannelPerms(channel, this.bot);
    }

    /**
     * Check user permissions [bypass]
     *
     * @param {Member} member
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkPermsUserBypass(member) {
        if (!this.author.bypass.length) {
            return false;
        }

        for (const userPerm of this.author.bypass) {
            if (this.library.member.hasPermission(member, userPerm) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check user permissions [needed]
     *
     * @param {Member} member
     * @returns {[Boolean, String?]}
     *
     * @memberof CommandPermissions
     */
    _checkPermsUserNeeded(member) {
        if (!this.author.needed.length) {
            return [true];
        }
        for (const userPerm of this.author.needed) {
            if (!this.library.member.hasPermission(member, userPerm) ) {
                return [false, userPerm];
            }
        }
        return [true];
    }

    /**
     * Check userIDs [bypass]
     *
     * @param {Member} member
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkUserBypass(member) {
        if (!this.users.bypass.length) {
            return false;
        }
        return this.users.bypass.includes(this.library.member.getID(member) );
    }

    /**
     * Check userIDs [needed]
     *
     * @param {Member} member
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkUserNeeded(member) {
        if (!this.users.needed.length) {
            return true;
        }
        return this.users.needed.includes(this.library.member.getID(member) );
    }

    /**
     * Check roleIDs [bypass]
     *
     * @param {Member} member
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkRoleBypass(member) {
        if (!this.roles.bypass.length) {
            return false;
        }
        const roles = this.library.member.getRoles(member);
        for (const role of this.roles.bypass) {
            if (roles.includes(role) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check roleIDs [needed]
     *
     * @param {Member} member
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkRoleNeeded(member) {
        if (!this.roles.needed.length) {
            return true;
        }
        const roles = this.library.member.getRoles(member);
        for (const role of this.roles.needed) {
            if (!roles.includes(role) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check channelIDs [bypass]
     *
     * @param {Channel} channel
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkChannelBypass(channel) {
        if (!this.channels.bypass.length) {
            return false;
        }
        return this.channels.bypass.includes(this.library.channel.getID(channel) );
    }

    /**
     * Check channelIDs [needed]
     *
     * @param {Channel} channel
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkChannelNeeded(channel) {
        if (!this.channels.needed.length) {
            return true;
        }
        return this.channels.needed.includes(this.library.channel.getID(channel) );
    }

    /**
     * Check guildIDs [bypass]
     *
     * @param {Guild} guild
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkGuildBypass(guild) {
        if (!guild || !this.guilds.bypass.length) {
            return false;
        }
        return this.guilds.bypass.includes(this.library.guild.getID(guild) );
    }

    /**
     * Check guildIDs [needed]
     *
     * @param {Guild} guild
     * @returns {Boolean}
     * @memberof CommandPermissions
     */
    _checkGuildNeeded(guild) {
        if (!guild || !this.guilds.needed.length) {
            return true;
        }
        return this.guilds.needed.includes(this.library.guild.getID(guild) );
    }

    /**
     * Check if the user is bot staff [bypass]
     *
     * @param {Member} member
     * @returns {Boolean} True if Staff / False if not
     * @memberof CommandPermissions
     */
    _checkStaffBypass(member) {
        if (!this.staff.bypass.length) {
            return false;
        }
        return this.staff.bypass.includes(this.library.member.getID(member) );
    }

    /**
     * Check if the user is bot staff [needed]
     *
     * @param {Member} member
     * @returns {Boolean} True if Staff / False if not
     * @memberof CommandPermissions
     */
    _checkStaffNeeded(member) {
        if (!this.staff.needed.length) {
            return true;
        }
        return this.staff.needed.includes(this.library.member.getID(member) );
    }
}

export default CommandPermissions;
