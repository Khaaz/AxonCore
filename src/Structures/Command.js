'use strict';

import Base from './Base';

// Utility
import Resolver from '../Utility/Resolver';
import Utils from '../Utility/Utils';
import Enum from '../Utility/Enums';

// Error
import AxonError from '../Errors/AxonError';
//import AxonCommandError from './Errors/AxonCommandError';

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
     * @prop {Object<AxonClient>} bot - The bot Object
     * @prop {Object<Module>} module - The module object
     * @prop {Object} _cooldown - Map of current cooldown (global per user) [key: userID, value: Date.now()]
     * @prop {Object} Resolver - Resolver object to access reolver methods
     * @prop {Object} Util - Util object to access utils methods
     * @prop {Object} Template
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
        super();
        
        /**
         * bot references to Axon Client
         * module references to the module the command is in
         */
        this.bot = module._client;
        this.module = module; //(module Object)

        /**
         * Handle Cooldown
         * User ID => Cooldown
         */
        this._cooldown = {};

        /**
         * ShortCut - Reusable class
         * Resolver / Util / Template
         */
        this.Resolver = Resolver;
        this.Utils = Utils;
        this.Template = this.bot._configs.template;

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
        //this.subCommands = new Collection(Command) || {}; // create Map instance by default if there is subcmd so we can init subcmd easily
        //this.subCommandsAliases = new Map() || {}; // create Map instance by default if there is subcmd so we can init subcmd aliases easily

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
            cmdName: '', // 'mail' OR 'mail all' (for subcommmands)
            description: '', // 'A cool command that does things.' <-- With the dot!
            examples: [], // ['suggestion Hey can we add this thanks', ...]
            arguments: [] // [['argument name', optional?], [..., ...]] for example: [['id', false], ['name', true]]
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
            cooldown: 3000 // cooldown between each usage of the same command
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
                bypass: [] // optional | example: ['manageMessage','manageRole'] -- needs one of the two :: aka having one of the perm allow to use the command -- bypass everything
            },
            usersID: {
                needed: [], // optional
                bypass: [] // optional -- bypass everything
            },
            rolesID: {
                needed: [], // optional
                bypass: [] // optional -- bypass everything
            },
            channelsID: {
                needed: [], // optional
                bypass: [] // optional -- bypass everything
            },
            staff: {
                needed: [], // optional
                bypass: [] // optional -- bypass everything
            }, // [this.bot.staff.owner, this.bot.staff.admins] Owner - admins - contribs - regs | bypass no matter what
            
            //custom: function();
        };
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
        const {msg, args, guildConf} = message;

        /** Test for Mod Only / serverMod command | serverAdmin command */
        if ( ((guildConf.modOnly || this.permissions.serverMod ) && !this.isUserMod(msg.member, guildConf)) || this.permissions.serverAdmin && !this.isUserAdmin(msg.member) ) {
            /** Sends invalid perm message in case of invalid perm [option enabled] */
            if (!guildConf.modOnly && this.options.invalidPermissionMessage ) { // doesn't send back invalid perm if mod Only
                return this.sendUserPerms(msg.channel);
            }
            return Promise.resolve();
        }

        /** Test for bot permissions */
        if ( this.permissions.bot.length && !this._checkPermsBot(msg) ) {
            return this.sendBotPerms(msg.channel);
        }

        /** Test for Cooldown - Send Cooldown message */
        const cd = this._shouldCooldown(msg);
        if (typeof(cd) === 'number') {
            return this.sendCooldown(msg.channel, cd);
        }

        /**
         * Permissions checkers
         * bypass - one of the perms (override) => doesn't go through others chercker
         * needed - all perms => still go through other checkers
         */

        let bypass = false;
        /** Bypass: if one of the perm is true => Exec the command */
        if ( this._checkPermsUserBypass(msg) || this._checkUserBypass(msg) || this._checkRoleBypass(msg) || this._checkChannelBypass(msg) || this._checkStaffBypass(msg) ) { // permission bypass perms
            bypass = true;
        }
        
        /** Needed: if one of the perms is false => doesn't exec the command */
        if ( !bypass && !(this._checkPermsUserNeeded(msg) && this._checkUserNeeded(msg) && this._checkRoleNeeded(msg) && this._checkChannelNeeded(msg) && this._checkStaffNeeded(msg)) ) {
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
            return this.sendHelp({msg, args})
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
        if ( !this._checkPermsBot(msg) ) {
            return this.sendBotPerms(msg.channel);
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp({msg, args});
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

        if(this.options.guildOnly) { //guild only
            return Promise.resolve();
        }

        /** Test for Cooldown - Send Cooldown message */
        const cd = this._shouldCooldown(msg);
        if (typeof(cd) === 'number') {
            return this.sendCooldown(msg.channel, cd);
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp({msg, args})
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
     *
     * @param {Object<Message>} msg - The message object
     * @returns {Promise}
     * @memberof Command
     */
    sendHelp({msg, /*args*/}) {
        return this.sendMessage(msg.channel, 'help for ' + this.label);
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
        if ( curCD <= this.options.cooldown) {
            return curCD; // return time left (does cooldown)
        }

        // delete current time for this user.
        delete this._cooldown[msg.author.id];
        
        return false; // doesn't cooldown
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
        const botUser = msg.channel.guild.members.get(this.bot.user.id);
        for (const botPerm of this.permissions.bot) {
            if (!botUser.permission.has(botPerm) ) {
                return false;
            }
        }
        return true;
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
            if (user.permission.has(userPerm) ) {
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
            if (user.permission.has(userPerm) ) {
                return true;
            }
        }
        return false;
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
            if (roles.find(role) ) {
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
        for (const role of this.permissions.rolesID.bypass) {
            if (roles.find(role) ) {
                return true;
            }
        }
        return false;
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
     * Check if the user is a mod or higher (admins are always mod)
     *
     * @param {Object<Member>} member - the member object
     * @param {Object} guildConf - the guild Config from the DB
     * @returns {Boolean} true if user is a mod / false if not
     * @memberof Command
     */
    isUserMod(member, guildConf) {
        if ( guildConf.modUsers.find(u => u === member.id) ) {
            return true;
        }

        const roles = member.roles;
        for ( const role of guildConf.modRoles ) {
            if (roles.find(r => r === role) ) {
                return true;
            }
        }

        if (this.isUserAdmin(member)) {
            return true;
        }

        return false;
    }

    /**
     * Check is the user is an Admin
     *
     * @param {Object<Member>} member - The member object
     * @returns {Boolean} true if admin / false if not
     * @memberof Command
     */
    isUserAdmin(member) {
        for (const perm of Enum.adminPerms) {
            if (member.permission.has(perm)) {
                return true;
            }
        }
        return false;
    }

    /**
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param {Object<User>} user - user object to get the DM channel
     * @param {Object|String} content - string or object (embed)
     * @returns
     * @memberof Command
     */
    sendDM(user, content) {
        return this.bot.getDMChannel(user.id)
            .then(chan => {
                return this.sendMessage(chan, content);
            })
            .catch(err => {
                return Promise.reject('DM disabled or bot blocked' + err);
            });
    }
    /**
     * Send a message.
     * Check for bot permissions + message/embed length
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object/String} content - Message content, String or Embed Object
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendMessage(channel, content) {
        let botUser;
        if (channel.guild) {
            botUser = channel.guild.members.get(this.bot.user.id);
            if (!botUser.permission.has('sendMessages') ) { // check if bot has sendMessage perm in the channel.
                return Promise.resolve();
            }
        }
        if (content instanceof Object) {

            if (channel.guild && !botUser.permission.has('embedLinks') ) { // check if bot has embedPermission perm in the channel.
                return Promise.resolve();
            }

            if (content.embed.length > 6000) {
                throw new AxonError('[EMBED]: embed > 6000', this.module.label, this.label);
            }
            if (content.embed.description && content.embed.description.length > 2048) {
                throw new AxonError('[EMBED]: description > 2048', this.module.label, this.label);
            }
            if (content.embed.title && content.embed.title.length > 256) {
                throw new AxonError('[EMBED]: title > 256', this.module.label, this.label);
            }
            if (content.embed.author && content.embed.author.name && content.embed.author.name.length > 256) {
                throw new AxonError('[EMBED]: author > 256', this.module.label, this.label);
            }
            if (content.embed.footer && content.embed.footer.text && content.embed.footer.text.length > 2048) {
                throw new AxonError('[EMBED]: footer > 2048', this.module.label, this.label);
            }
            if (content.embed.fields) {
                if (content.embed.fields.length > 25) {
                    throw new AxonError('[EMBED]: fields > 25', this.module.label, this.label);
                }
                for (const field in content.embed.fields) {
                    if (field.name > 256 || field.value > 1024) {
                        throw new AxonError('[EMBED]: field: name > 256 ; value > 1024', this.module.label, this.label);
                    }
                }
            }
        } else {
            if (content.length > 2000) {
                throw new AxonError('[EMBED]: content > 2000', this.module.label, this.label);
            }
        }

        return this.bot.createMessage(channel.id, content);
    }

    /**
     * Edit a message
     *
     * @param {Object<Message>} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    editMessage(message, content) {
        if (!message || !content) {
            return Promise.resolve();
        }
        if (content instanceof Object) {

            if (message.channel.guild && !message.channel.guild.members.get(this.bot.user.id).permission.has('embedLinks') ) { // check if bot has embedPermission perm in the channel.
                return Promise.resolve();
            }

            if (content.embed.length > 6000) {
                throw new AxonError('[EMBED]: embed > 6000', this.module.label, this.label);
            }
            if (content.embed.description && content.embed.description.length > 2048) {
                throw new AxonError('[EMBED]: description > 2048', this.module.label, this.label);
            }
            if (content.embed.title && content.embed.title.length > 256) {
                throw new AxonError('[EMBED]: title > 256', this.module.label, this.label);
            }
            if (content.embed.author && content.embed.author.name && content.embed.author.name.length > 256) {
                throw new AxonError('[EMBED]: author > 256', this.module.label, this.label);
            }
            if (content.embed.footer && content.embed.footer.text && content.embed.footer.text.length > 2048) {
                throw new AxonError('[EMBED]: footer > 2048', this.module.label, this.label);
            }
            if (content.embed.fields) {
                if (content.embed.fields.length > 25) {
                    throw new AxonError('[EMBED]: fields > 25', this.module.label, this.label);
                }
                for (const field in content.embed.fields) {
                    if (field.name > 256 || field.value > 1024) {
                        throw new AxonError('[EMBED]: field: name > 256 ; value > 1024', this.module.label, this.label);
                    }
                }
            }
        } else {
            if (content.length > 2000) {
                throw new AxonError('[EMBED]: content > 2000', this.module.label, this.label);
            }
        }

        return message.edit(content);
    }

    /**
     * Send an error message. Add the error emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - error message content (String only)
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendError(channel, content) {
        return this.sendMessage(channel, this.Template.emote.error + ' ' + content);
    }

    /**
     * Send a success message. Add the success emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - error message content (String only)
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendSuccess(channel, content) {
        return this.sendMessage(channel, this.Template.emote.success + ' ' + content);
    }

    /**
     * Handle errors (send error message/log)
     * Call sendError
     *
     * @param {Object<Message>} msg - The message Object
     * @param {Object<Error>} err - The error message
     * @param {String} type - Type of error (api, db, internal)
     * @param {String} errMsg - optional error message
     * @returns {Promise}
     * @memberof Command
     */
    error(msg, err, type, errMsg) {

        const typeList = {
            api: 'API request error',
            db: 'DB error - failed to retrieve from the DB',
            internal: 'Internal error - internal method'
        };

        errMsg = errMsg || this.Template.message.error.general;

        this.sendError(msg.channel, errMsg);
        
        if (err) {
            err.message = `Type: ${typeList[type.toLowerCase()]} | ${err.message}`;
            throw err;
        }
        throw new Error(`Type: ${typeList[type.toLowerCase()]}`);
    }

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
                if(msg) {
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
                if(msg) {
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
        return this.sendError(channel, this.Template.message.error.cooldown + ` - **${Math.ceil(time/100)/10}sec** remaining..`)
            .then((msg) => {
                if(msg) {
                    setTimeout(() => msg.delete(), 5000);
                }
            });
    }
}

export default Command;
