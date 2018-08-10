'use strict';

import Base from './Base';

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
     * @prop {Object<AxonClient>} bot - Getter _module.bot
     * @prop {Object<Module>} _module - The module object
     * @prop {Object<Module>} module - GETTER _module
     * @prop {Object} _cooldown - Map of current cooldown (global per user) [key: userID, value: Date.now()]
     * @prop {Object} Resolver - [GETTER] Resolver object to access reolver methods
     * @prop {Object} Util - [GETTER] Util object to access utils methods
     * @prop {Object} Template - [GETER] Template object to access templating property
     * @prop {String} label - The command label (name/id)
     * @prop {Array<String>} aliases - Array of commands aliases **including the command label
     * @prop {Boolean} enabled - if the command is enabled | default: true (enabled)
     * @prop {Boolean} isSubcmd - if the command is a subcommand | default: false (not a subcommand)
     * @prop {Object<Command>} parentCommand - if isSubcommand, references to the parent Command | default to null
     * @prop {Boolean} hasSubcmd - if the command has a subcommand | default: false (doesnt have any subcommand)
     *      If hasSubcmd is true: import all subcommand at the begining of the file. Then use
     *      this.subcmds = [Array of subcmd object imported at begining of the file]
     * @prop {Array} subcmds - Array of subcommands Object imported from file directly at begining of parent command
     * @prop {Collection<Command>} subCommands - Map of subcommands if hasSubcmd = true / else null
     * @prop {Object<Map>} subCommandsAliases - Map of subcommands aliases if hasSubcmd = true / else null
     * @prop {Boolean} serverBypass - if the command can't be server disabled | default: false (can be disabled)
     *
     * @prop {Object} infos - Default infos about the command
     *  - owner(Array)  // ['Eleos'] OR ['Eleos', 'Ape']
     *  - cmdName(String) // 'mail' OR 'mail all' (for subcommmands)
     *  - description(String) // 'A cool command that does things'
     *  - examples(Array) // ['suggestion Hey can we add this thanks', ...]
     *  - arguments(Array) // ['id', 'user', 'channel', ...]
     *  - customArguments(String) // If not empty, this string will be used instead of arguments
     *
     * @prop {Object} options - Default options for the command
     *  - argsMin(Number)                   : 0 // min arg required
     *  - invalidUsage(Boolean)             : true // trigger help command on invalid usage = args required and no args given
     *  - invalidPermissionMessage(Boolean) : false // trigger error message on invalid permission
     *  - deleteCommand(Boolean)            : false // delete command input
     *  - guildOnly(Boolean)                : true // command usable only in guilds
     *  - hidden(Boolean)                   : false // commands totally hidden from help commmand
     *  - cooldown(Number)                  : 3000 // cooldown for the command
     *
     * @prop {Object} permissions - Default permissions for the bot/users
     *           - needed: needs to have all permissions in the Array to use the command
     *           - bypass: having at least one of the perms in the Array allow to use the command
     *  - bot(Array)                : [] // permissions needed by the bot to execute the command
     *  - serverMod(Boolean)        : false // if the command is limited to serverMod+
     *  - serverAdmin(Boolean)      : false // if the command is limited to serverAdmin+
     *  - user(Object)              : [] // permissions needed by the user to use the command
     *  - usersID(Object)           : [] // Array of usersIDs (global)
     *  - rolesID(Object)           : [] // Aray of rolesIDs (global)
     *  - channelsID(Object)        : [] // Array of channelsIDs (global)
     *  - staff(Array)              : [] // this.bot.staff.prop | this.bot.staff.prop.concat(this.bot.staff.prop)...
     *
     * @memberof Command
     */
    constructor(module) {
        super(module.axon);

        /**
         * [GETTER] - bot references to Axon Client
         * [GETTER] -  (private) module references to the module the command is in
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
         * Initiated only if subcommands
         * (here to keep track of names)
         */
        // this.subCommands = new Collection(Command) || {}; // create Map instance by default if there is subcmd so we can init subcmd easily
        // this.subCommandsAliases = new Map() || {}; // create Map instance by default if there is subcmd so we can init subcmd aliases easily

        /**
         * Bypass all perms - true = prevent the command to be server disabled
         */
        this.serverBypass = module.serverBypass; // default to module state

        /**
         * Infos - Help commands
         * All fields are required
         */
        this.infos = {
            owners: [], // ['Eleos'] OR ['Eleos', 'Ape']
            name: '', // 'mail' OR 'mail all' (for subcommmands)
            description: '', // 'A cool command that does things.' <-- With the dot!
            examples: [], // ['suggestion Hey can we add this thanks', ...]
            arguments: [], // [['argument name', needed?], [..., ...]] for example: [['id', true], ['name', false]]
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
            guildOnly: false, // command usable only in guild
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
     * @param {Object} message - msg, args, guildConf
     * @returns {Promise}
     * @memberof Command
     */
    _execute(message) {
        const { msg, args, guildConf } = message;

        /** Test for Mod Only / serverMod command | serverAdmin command */
        if (((guildConf.modOnly || this.permissions.serverMod) && !this.AxonUtils.isMod(msg.member, guildConf)) || (this.permissions.serverAdmin && !this.AxonUtils.isAdmin(msg.member))) {
            /** Sends invalid perm message in case of invalid perm [option enabled] */
            if (!guildConf.modOnly && this.options.invalidPermissionMessage) { // doesn't send back invalid perm if mod Only
                return this.sendUserPerms(msg.channel);
            }
            return Promise.resolve();
        }

        /** Test for bot permissions */
        if (!this._checkPermsBot(msg)) {
            return this.sendBotPerms(msg.channel);
        }

        /** Test for Cooldown - Send Cooldown message */
        const cd = this._shouldCooldown(msg);
        if (typeof (cd) === 'number') {
            return this.sendCooldown(msg.channel, cd);
        }

        /** Permissions checkers */
        if (!this.canExecute(msg)) {
            /** Sends invalid perm message in case of invalid perm [option enabled] */
            if (this.options.invalidPermissionMessage) {
                return this.sendUserPerms(msg.channel);
            }
            return Promise.resolve();
        }

        if (this.options.deleteCommand) { // delete input
            msg.delete();
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp({ msg, args })
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
     * @param {Object} message - msg, args, guildCOnf
     * @returns {Promise}
     * @memberof Command
     */
    _executeAdmin(message) {
        const { msg, args } = message;

        /** Check bot perms */
        if (!this._checkPermsBot(msg)) {
            return this.sendBotPerms(msg.channel);
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp({ msg, args });
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
     * @param {Object<Message>} msg - The message object
     * @returns {Promise}
     * @memberof Command
     */
    sendHelp({ msg /* args*/}) {
        return (this.axon.sendHelp ? this.axon.sendHelp(this, msg) : this.sendMessage(msg.channel, 'help for ' + this.label));
    }

    //
    // ****** CHECKERS - Internal ******
    //

    /**
     * Check command cooldown for the user
     *
     * @param {Object<Message>} msg - the Message object
     * @returns {Boolean|Number} false if no cooldown, cooldown time left if there is a cooldown
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
     *
     * @param {Object<Message>} msg - Message Object
     * @returns {Boolean} true: user can execute command
     * @memberof Command
     */
    canExecute(msg) {
        /** Bypass: if one of the perm is true => Exec the command */
        if (this._checkPermsUserBypass(msg)
            || this._checkUserBypass(msg)
            || this._checkRoleBypass(msg)
            || this._checkChannelBypass(msg)
            || this._checkStaffBypass(msg)) {
            return true;
        }

        /** Needed: if one of the perms is false => doesn't exec the command */
        if (!this._checkPermsUserNeeded(msg)
            || !this._checkUserNeeded(msg)
            || !this._checkRoleNeeded(msg)
            || !this._checkChannelNeeded(msg)
            || !this._checkStaffNeeded(msg)) {
            return false;
        }

        return true;
    }

    /**
     * Check bot permission
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsBot(msg) {
        if (!this.permissions.bot.length) {
            return true;
        }
        return this.AxonUtils.botHasPerms(msg.channel, this.permissions.bot);
    }

    /**
     * Check user permssions [bypass]
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsUserBypass(msg) {
        if (!this.permissions.user.bypass.length) {
            return false;
        }
        const user = msg.member;
        for (const userPerm of this.permissions.user.bypass) {
            if (user.permission.has(userPerm)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check user permissions [needed]
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsUserNeeded(msg) {
        if (!this.permissions.user.needed.length) {
            return true;
        }
        const user = msg.member;
        for (const userPerm of this.permissions.user.needed) {
            if (!user.permission.has(userPerm)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check roles IDs [bypass]
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkUserBypass(msg) {
        if (!this.permissions.usersID.bypass.length) {
            return false;
        }
        return this.permissions.usersID.bypass.includes(msg.author.id);
    }

    /**
     * Check user IDs [needed]
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkUserNeeded(msg) {
        if (!this.permissions.usersID.needed.length) {
            return true;
        }
        return this.permissions.usersID.needed.includes(msg.author.id);
    }

    /**
     * Check roles IDs [bypass]
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkRoleBypass(msg) {
        if (!this.permissions.rolesID.bypass.length) {
            return false;
        }
        const roles = msg.member.roles;
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
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkRoleNeeded(msg) {
        if (!this.permissions.rolesID.needed.length) {
            return true;
        }
        const roles = msg.member.roles;
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
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkChannelBypass(msg) {
        if (!this.permissions.channelsID.bypass.length) {
            return false;
        }
        return this.permissions.channelsID.bypass.includes(msg.channel.id);
    }

    /**
     * Check channels IDs [needed]
     * (= permssions in config)
     *
     * @param {Object<Message>} msg
     * @returns {Boolean}
     * @memberof Command
     */
    _checkChannelNeeded(msg) {
        if (!this.permissions.channelsID.needed.length) {
            return true;
        }
        return this.permissions.channelsID.needed.includes(msg.channel.id);
    }

    /**
     * Check if the user is Bot staff
     *
     * @param {Object<Message>} msg - The message Object
     * @returns {Boolean} true if Staff / false if not
     * @memberof Command
     */
    _checkStaffBypass(msg) {
        if (!this.permissions.staff.bypass.length) {
            return false;
        }
        return this.permissions.staff.bypass.includes(msg.author.id);
    }

    /**
     * Check if the user is Bot staff
     *
     * @param {Object<Message>} msg - The message Object
     * @returns {Boolean} true if Staff / false if not
     * @memberof Command
     */
    _checkStaffNeeded(msg) {
        if (!this.permissions.staff.needed.length) {
            return true;
        }
        return this.permissions.staff.needed.includes(msg.author.id);
    }

    //
    // ****** EXTERNAL ******
    //

    /**
     * Send an error message for invalid Bot permissions
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendBotPerms(channel) {
        return this.sendError(channel, this.Template.message.error.permBot);
    }

    /**
     * Send an error message for Source user permissions
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendUserPerms(channel) {
        return this.sendError(channel, this.Template.message.error.permSource)
            .then((msg) => {
                if (msg) {
                    setTimeout(() => msg.delete(), 9000);
                }
            });
    }

    /**
     * Send an error message for Destination user permissions
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendDestPerms(channel) {
        return this.sendError(channel, this.Template.message.error.permDest)
            .then((msg) => {
                if (msg) {
                    setTimeout(() => msg.delete(), 9000);
                }
            });
    }

    /**
     * Send an error message for invalid cooldown
     * timeout // delay and auto delete message
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendCooldown(channel, time) {
        return this.sendError(channel, this.Template.message.error.cooldown + ` - **${Math.ceil(time / 100) / 10}sec** remaining..`)
            .then((msg) => {
                if (msg) {
                    setTimeout(() => msg.delete(), 5000);
                }
            });
    }
}

export default Command;
