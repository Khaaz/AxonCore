'use strict';

import Base from './Base';
import Enum from '../Utility/Enums';

/**
 * AxonCore - Command contructor
 *
 * @author KhaaZ
 *
 * @class Command
 * @extends Base
 */
class Command extends Base {
    /**
     * Creates an instance of Command.
     *
     * @param {Object<Module>} module
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} Resolver - Resolver Object/Methods [GETTER: axon.Resolver]
     * @prop {Object} AxonUtils - AxonUtils Object/Methods [GETTER: axon.AxonUtils]
     * @prop {Object} Utils - Utils Object/Methods [GETTER: axon.Utils]
     *
     * @prop {Object<Module>} module - Module object [GETTER: _module]
     *
     * @prop {Object} _cooldown - Map of current cooldown (global per user) [key: userID, value: Date.now()]
     *
     * @prop {String} label - Command label (name/id)
     * @prop {Array<String>} aliases - Array of commands aliases (including the command label)
     * @prop {Boolean} [enabled=module.enabled] - Command enabled
     *
     * @prop {Boolean} [isSubcmd=false] - Command is a subcommand
     * @prop {Object<Command>} [parentCommand=NULL] - References to the parent Command (if isSubcmd = true)
     * @prop {Boolean} [hasSubcmd=false] - Command has a subcommand
     * @prop {Boolean} [serverBypass=module.serverBypass] - Command can't be server disabled
     *
     * @prop {Array} subcmds - Array of subcommands Object (deleted after init)
     * @prop {Collection<Command>} [subCommands=NULL] - Collection of subcommands
     * @prop {Object<Map>} [subCommandsAliases=NULL] - Map of subcommands aliases
     *
     *
     * @prop {Object} infos - Default infos about the command
     * @prop {Owner} infos.owner - Command owners/authors
     * @prop {String} infos.cmdName - Command name (full)
     * @prop {String} infos.description - Command description
     * @prop {String} infos.usage - Command usage
     * @prop {Array} infos.example - Array of command examples
     *
     * @prop {Object} options - Default options for the command
     * @prop {Number} [options.argsMin=0] - Minimum args required
     * @prop {Boolean} [options.invalidUsage=true] - Whether to trigger help command on invalid usage (args required and no args given)
     * @prop {Boolean} [options.invalidPermissionMessage=false] - Whether to trigger error message on invalid permission
     * @prop {Boolean} [options.deleteCommand=false] - Whether to delete the command input
     * @prop {Boolean} [options.guildOnly=true] - Whether the command is usable only in guilds
     * @prop {Boolean} [options.hidden=false] - Whether the command is hidden from help commmand ()
     * @prop {Number} [options.cooldown=3000] - Cooldown for the command
     *
     * @prop {Object} permissions - Default permissions for the bot/users
     * @prop {Array} [permissions.bot=[]] - Array or permissions needed by the bot to execute the command
     * @prop {Boolean} [permissions.serverMod=false] - Whether to limit the command to serverMod+
     * @prop {Boolean} [permissions.severAdmin=false] - Whether to limit the command to serverAdmin+
     * @prop {Array} [permissions.user.needed=[]] - All permissions needed by the user to execute
     * @prop {Array} [permissions.user.bypass=[]] - Having one of these perms allow the user to execute
     * @prop {Array} [permissions.usersID.needed=[]] - List of user ids that have permissions to execute
     * @prop {Array} [permissions.usersID.bypass=[]] - Having one of these id allow the user to execute
     * @prop {Array} [permissions.rolesID.needed=[]] - List of roles ids needed to execute
     * @prop {Array} [permissions.rolesID.bypass=[]] - Having one of these roles allow the user to execute
     * @prop {Array} [permissions.ChannelsID.needed=[]] - List of channels ids that allow to execute
     * @prop {Array} [permissions.channelsID.bypass=[]] - Being in one of these channels allow the user to execute
     * @prop {Array} [permissions.staff.needed=[]] - List of bot.staff permission needed to execute
     * @prop {Array} [permissions.staff.bypass=[]] - Having one of these bot.staff permission allow to execute
     *
     * @prop {Object} Template - Template object shortcut [GETTER: axon.configs.template]
     *
     * @memberof Command
     */
    constructor(module) {
        super(module.axon);

        /**
         * [GETTER] - bot references to Axon Client
         * [GETTER] - (private) module references to the module the command is in
         */
        this._module = module; // (module Object)

        /**
         * Handle Cooldown
         * User ID => Cooldown
         */
        this._cooldown = {};

        /**
         * ShortCut - Reusable class
         * Resolver [GETTER] / Util [GETTER] / Template [GETTER]
         */

        // Command main options
        this.label = 'label';
        this.aliases = []; // includes label/main name of the command
        this.enabled = module.enabled; // default to module state

        /**
         * Subcommands related
         * Default values
         */
        this.isSubcmd = false;
        this.parentCommand = null; // reference parent command
        this.hasSubcmd = false;
        // temp var used to init subcommands
        this.subcmds = []; // array of imported commands - deleted after init

        /**
         * Initiated if subcommands
         */
        this.subCommands = null; // Collection of Commands
        this.subCommandsAliases = null; // Map of Command Aliases

        /**
         * Bypass all perms - true = prevent the command to be server disabled
         */
        this.serverBypass = module.serverBypass; // default to module state

        /**
         * Infos - Help commands
         * All fields are required
         */
        this.infos = {
            owners: ['Owner'], // ['KhaaZ'] OR ['KhaaZ', 'Jack']
            name: 'parentLabel label', // full name of the command
            description: 'Description of the command.', // 'A cool command that does things.' <-- With the dot!
            usage: 'label [param] (optional param)', // full usage of the command
            examples: ['example of command usage'], // ['', ...]
        };

        /**
         * Commands options
         * Default values
         */
        this.options = {
            argsMin: 0, // min arg required
            invalidUsage: true, // trigger help command on invalid usage = args required and no args given
            invalidPermissionMessage: false, // trigger error message on invalid permission
            deleteCommand: false, // delete input after trigger
            guildOnly: true, // command usable only in guild
            hidden: false, // hide command from help command
            cooldown: 3000, // cooldown between each usage of the same command
        };

        /**
         * Handle permissions
         * bot perms
         * user perms
         *
         * Optional posible override for:
         *  - users ID
         *  - roles ID
         *  - channels Id
         *
         * Bot Staff override
         *
         * custom function for special permission case
         *
         * needed => needed to have all <NEEDED> permissions to execute the command
         * bypass => needed to have one <BYPASS> permissions to execute the command (override needed as well)
         */
        this.permissions = {
            bot: [],
            serverMod: false, // default false -- true = restricted to serverMod: someone with serverMod can use the command no matter what
            serverAdmin: false, // administrator / manageServer (Utility.Enums.adminPerms)
            user: {
                needed: [], // optional | example: ['manageMessage','manageRole'] -- needs both
                bypass: [], // optional | example: ['manageMessage','manageRole'] -- needs one of the two :: aka having one of the perm allow to use the command -- bypass everything
            },
            usersID: {
                needed: [], // optional
                bypass: [], // optional -- bypass everything
            },
            rolesID: {
                needed: [], // optional
                bypass: [], // optional -- bypass everything
            },
            channelsID: {
                needed: [], // optional
                bypass: [], // optional -- bypass everything
            },
            staff: {
                needed: [], // optional
                bypass: [], // optional -- bypass everything
            }, // [this.bot.staff.owner, this.bot.staff.admins] Owner - admins - contribs - regs | bypass no matter what

            // custom: function();
        };
    }

    //
    // ****** GETTER ******
    //

    get module() {
        return this._module;
    }

    get Template() {
        return this.axon.configs.template;
    }

    //
    // ****** MAIN - EXECUTE ******
    //

    /**
     * Execute command - checks perms according to comand options
     *
     * @param {Object} message - { msg, args, guildConf }
     * @returns {Promise}
     * @memberof Command
     */
    _execute(message) {
        const { msg, args, guildConf } = message;

        /** Test for bot permissions */
        if (!this._checkPermsBot(msg.channel)) {
            return this.sendBotPerms(msg.channel);
        }

        /** Permissions checkers */
        if (!this.canExecute(msg.channel, msg.member, guildConf)) {
            /** Sends invalid perm message in case of invalid perm [option enabled] */
            if (!guildConf.modOnly && this.options.invalidPermissionMessage) {
                return this.sendUserPerms(msg.channel, msg.member);
            }
            return Promise.resolve();
        }

        /** Test for Cooldown - Send Cooldown message */
        const cd = this._shouldCooldown(msg);
        if (typeof (cd) === 'number') {
            return this.sendCooldown(msg.channel, cd);
        }

        if (this.options.deleteCommand) { // delete input
            msg.delete();
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage) {
            return this.sendHelp({ msg, args, guildConf })
                .then(() => {
                    this._cooldown[msg.author.id] = Date.now();
                });
        }

        return msg.command.execute(message)
            .then(() => {
                this._cooldown[msg.author.id] = Date.now();
            });
    }

    /**
     * Execute the command with admin checkers (minimal)
     * no CD - no perms checkers
     *
     * @param {Object} message - { msg, args, guildConf }
     * @returns {Promise}
     * @memberof Command
     */
    _executeAdmin(message) {
        const { msg, args, guildConf, isOwner } = message;

        /** Check bot perms */
        if (!this._checkPermsBot(msg.channel)) {
            return this.sendBotPerms(msg.channel);
        }

        if (!isOwner
            && this.permissions.staff.needed.length > 0
            && this.permissions.staff.needed.filter(e => !this.axon.staff.owners.includes(e)).length === 0) {
            return Promise.resolve();
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp({ msg, args, guildConf });
        }

        if (this.options.deleteCommand) { // delete input
            msg.delete();
        }

        return msg.command.execute(message);
    }

    /**
     * Execute the command in DM - pass some checkers
     *
     * @param {Object<Message>} message
     * @returns {Promise}
     * @memberof Command
     */
    _executeDM(message) {
        const { msg, args } = message;

        if (this.options.guildOnly) { // guild only
            return Promise.resolve();
        }

        /** Test for Cooldown - Send Cooldown message */
        const cd = this._shouldCooldown(msg);
        if (typeof (cd) === 'number') {
            return this.sendCooldown(msg.channel, cd);
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp({ msg, args })
                .then(() => {
                    this._cooldown[msg.author.id] = Date.now();
                });
        }

        if (this.options.deleteCommand) {
            msg.delete();
        }

        return msg.command.execute(message)
            .then(() => {
                this._cooldown[msg.author.id] = Date.now();
            });
    }

    /**
     * Send Help message in the current channel
     * Perm checks were done before
     * Call custom sendHelp (Client method if it exist instead of default one)
     *
     * @param {Object<Message>} {msg, guildconf} - The message object
     * @returns {Promise<Message>} Message Object
     * @memberof Command
     */
    sendHelp({ msg, guildConf }) {
        const prefix = (guildConf && guildConf.prefix.length > 0) ? guildConf.prefix[0] : this.axon.params.prefix[0];

        const embed = {};
        embed.author = {
            name: `Help for ${this.infos.name}`,
            icon_url: this.bot.user.avatarURL,
        };

        embed.color = this.Template.embed.colors.help.length > 0 ? this.Template.embed.colors.help : null;

        embed.description = `**Description:** ${this.infos.description}\n`;

        embed.description += `**Cooldown:** ${this.options.cooldown / 1000}s\n`;

        embed.description += `**Usage:** ${prefix}${this.infos.usage}\n`;

        let perm;
        if (this.permissions.serverAdmin) {
            perm = '`Server Admin`';
        } else if (this.permissions.serverMod) {
            perm = '`Server Mod`';
        } else if (this.permissions.user.needed.length > 0) {
            perm = this.permissions.user.needed
                .map(p => `\`${Enum.permissionsNames[p]}\``)
                .join(', ');
        }

        if (perm) {
            embed.description += `**Required:** ${perm}\n`;
        }

        if (this.infos.examples.length > 0) {
            this.infos.examples.length > 1
                ? embed.description += `\n**Examples:**\n${prefix}${this.infos.examples.join(`\n${prefix}`)}\n`
                : embed.description += `**Example:** ${prefix}${this.infos.examples.join(`\n${prefix}`)}\n`;
        }

        embed.fields = [];
        /** SubCommands */
        if (this.hasSubcmd) {
            const subcmds = this.subCommands.filter(e => !e.options.hidden).map(e => `${prefix}${e.infos.usage}`);
            if (subcmds.length > 0) {
                embed.fields.push({
                    name: 'SubCommands:',
                    value: subcmds.join('\n'),
                    inline: true,
                });
            }
        }

        /** Aliases */
        if (this.aliases.length > 1) {
            const aliases = this.aliases.filter(e => e !== this.label);
            embed.fields.push({
                name: 'Aliases:',
                value: aliases.join('\n'),
                inline: true,
            });
        }

        return (this.axon.sendHelp ? this.axon.sendHelp(this, msg) : this.sendMessage(msg.channel, { embed }));
    }

    //
    // ****** CHECKERS - Internal ******
    //

    /**
     * Check command cooldown for the user
     *
     * @param {Object<Message>} msg - The Message object
     * @returns {Boolean|Number} False if no cooldown / Cooldown time left if there is a cooldown
     * @memberof Command
     */
    _shouldCooldown(msg) {
        const cooldown = this._cooldown[msg.author.id];

        // no cooldown registered yet
        if (!cooldown) {
            return false; // doesn't cooldown
        }

        // time spent since last uses <= cooldown chose for that command
        const curCD = Date.now() - cooldown;
        if (curCD <= this.options.cooldown) {
            return curCD; // return time left (does cooldown)
        }

        // delete current time for this user.
        delete this._cooldown[msg.author.id];

        return false; // doesn't cooldown
    }

    /**
     * Permission checker - Does the user has perm to exec command/not
     * Bypass - one of the perms (override) => doesn't go through others chercker
     * Needed - all perms => still go through other checkers
     * ServerMod
     *
     * @param {Object<Message>} msg - The Message Object
     * @param {Object} guildConf - GuildConfig
     * @returns {Boolean} True if the user can execute command / False if not
     * @memberof Command
     */
    canExecute(channel, member, guildConf) {
        /** Bypass: if one of the perm is true => Exec the command */
        if (this._checkPermsUserBypass(member)
            || this._checkUserBypass(member)
            || this._checkRoleBypass(member)
            || this._checkChannelBypass(channel)
            || this._checkStaffBypass(member)) {
            return true;
        }

        if (((guildConf.modOnly || this.permissions.serverMod) && !this.AxonUtils.isMod(member, guildConf))
            || (this.permissions.serverAdmin && !this.AxonUtils.isAdmin(member))) {
            return false;
        }

        /** Needed: if one of the perms is false => doesn't exec the command */
        if (!this._checkPermsUserNeeded(member)
            || !this._checkUserNeeded(member)
            || !this._checkRoleNeeded(member)
            || !this._checkChannelNeeded(channel)
            || !this._checkStaffNeeded(member)) {
            return false;
        }

        return true;
    }

    /**
     * Check bot permission
     * (= permssions in config)
     *
     * @param {Object<Channel>} channel
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsBot(channel) {
        if (!this.permissions.bot.length) {
            return true;
        }
        return this.AxonUtils.hasChannelPerms(channel, this.permissions.bot);
    }

    /**
     * Check user permssions [bypass]
     * (= permssions in config)
     *
     * @param {Object<Member>} member
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsUserBypass(member) {
        if (!this.permissions.user.bypass.length) {
            return false;
        }

        for (const userPerm of this.permissions.user.bypass) {
            if (member.permission.has(userPerm)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check user permissions [needed]
     * (= permssions in config)
     *
     * @param {Object<Member>} member
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsUserNeeded(member) {
        if (!this.permissions.user.needed.length) {
            return true;
        }
        for (const userPerm of this.permissions.user.needed) {
            if (!member.permission.has(userPerm)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check roles IDs [bypass]
     * (= permssions in config)
     *
     * @param {Object<Member>} member
     * @returns {Boolean}
     * @memberof Command
     */
    _checkUserBypass(member) {
        if (!this.permissions.usersID.bypass.length) {
            return false;
        }
        return this.permissions.usersID.bypass.includes(member.id);
    }

    /**
     * Check user IDs [needed]
     * (= permssions in config)
     *
     * @param {Object<Member>} member
     * @returns {Boolean}
     * @memberof Command
     */
    _checkUserNeeded(member) {
        if (!this.permissions.usersID.needed.length) {
            return true;
        }
        return this.permissions.usersID.needed.includes(member.id);
    }

    /**
     * Check roles IDs [bypass]
     * (= permssions in config)
     *
     * @param {Object<Member>} member
     * @returns {Boolean}
     * @memberof Command
     */
    _checkRoleBypass(member) {
        if (!this.permissions.rolesID.bypass.length) {
            return false;
        }
        const roles = member.roles;
        for (const role of this.permissions.rolesID.bypass) {
            if (roles.find(role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check roles IDs [needed]
     * (= permssions in config)
     *
     * @param {Object<Member>} member
     * @returns {Boolean}
     * @memberof Command
     */
    _checkRoleNeeded(member) {
        if (!this.permissions.rolesID.needed.length) {
            return true;
        }
        const roles = member.roles;
        for (const role of this.permissions.rolesID.needed) {
            if (!roles.find(role)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check channels IDs [bypass]
     * (= permssions in config)
     *
     * @param {Object<Channel>} channel
     * @returns {Boolean}
     * @memberof Command
     */
    _checkChannelBypass(channel) {
        if (!this.permissions.channelsID.bypass.length) {
            return false;
        }
        return this.permissions.channelsID.bypass.includes(channel.id);
    }

    /**
     * Check channels IDs [needed]
     * (= permssions in config)
     *
     * @param {Object<Channel>} channel
     * @returns {Boolean}
     * @memberof Command
     */
    _checkChannelNeeded(channel) {
        if (!this.permissions.channelsID.needed.length) {
            return true;
        }
        return this.permissions.channelsID.needed.includes(channel.id);
    }

    /**
     * Check if the user is Bot staff
     *
     * @param {Object<Member>} member - The Member Object
     * @returns {Boolean} True if Staff / False if not
     * @memberof Command
     */
    _checkStaffBypass(member) {
        if (!this.permissions.staff.bypass.length) {
            return false;
        }
        return this.permissions.staff.bypass.includes(member.id);
    }

    /**
     * Check if the user is Bot staff
     *
     * @param {Object<Member>} member - The Member Object
     * @returns {Boolean} True if Staff / False if not
     * @memberof Command
     */
    _checkStaffNeeded(member) {
        if (!this.permissions.staff.needed.length) {
            return true;
        }
        return this.permissions.staff.needed.includes(member.id);
    }

    //
    // ****** EXTERNAL ******
    //

    /**
     * Send an error message for invalid Bot permissions
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Array<String>} [permissions=[]] - Optional array of permissions string
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendBotPerms(channel, permissions = []) {
        if (permissions.length === 0) {
            const member = channel.guild.members.get(this.bot.user.id);
            permissions = this.AxonUtils.missingPerms(member, this.permissions.bot);
        }
        return this.sendError(
            channel,
            `${this.Template.message.error.permBot} ${permissions.map(p => `\`${Enum.permissionsNames[p]}\``).join(', ')}.`,
            { delete: true, delay: 9000 }
        );
    }

    /**
     * Send an error message for Source user permissions
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object<Member>} member - The member object
     * @param {Array<String>} [permission=[]] - Optional array of permissions string
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendUserPerms(channel, member, permissions = []) {
        if (permissions.length === 0) {
            permissions = this.AxonUtils.missingPerms(member, this.permissions.user.needed);
        }
        return this.sendError(
            channel,
            this.Template.message.error.permSource
            + (permissions.length > 0 ? ` ${permissions.map(p => `\`${Enum.permissionsNames[p]}\``).join(', ')}.` : '.'),
            { delete: true, delay: 9000 }
        );
    }

    /**
     * Send an error message for Destination user permissions
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendDestPerms(channel) {
        return this.sendError(channel, this.Template.message.error.permDest, { delete: true, delay: 9000 });
    }

    /**
     * Send an error message for invalid cooldown
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendCooldown(channel, time) {
        return this.sendError(
            channel,
            `${this.Template.message.error.cooldown} **${Math.ceil((this.options.cooldown - time) / 100) / 10}sec**...`,
            { delete: true, delay: 9000 },
        );
    }
}

export default Command;
