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
     * Creates a Command instance.
     *
     * @param {Object<Module>} module
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} AxonUtils - AxonUtils Object/Methods [GETTER: axon.AxonUtils]
     * @prop {Object} Utils - Utils Object/Methods [GETTER: axon.Utils]
     *
     * @prop {Object<Module>} module - Module object [GETTER: _module]
     *
     * @prop {Object} _cooldown - Map of current cooldown (global per user) [key: userID, value: Date.now()]
     *
     * @prop {String} label - Command label (name/id)
     * @prop {Array<String>} aliases - Array of commands aliases (including the command label)
     * @prop {Boolean} [enabled=module.enabled] - Is the command enabled?
     *
     * @prop {Boolean} [isSubcmd=false] - Command is a subcommand
     * @prop {Object<Command>} [parentCommand=NULL] - Reference to the parent command (if isSubcmd = true)
     * @prop {Boolean} [hasSubcmd=false] - Does the command have subcommands?
     * @prop {Boolean} [serverBypass=module.serverBypass] - Can the command be disabled?
     *
     * @prop {Array} subcmds - Array of subcommand objects (deleted after init)
     * @prop {Collection<Command>} [subCommands=NULL] - Collection of subcommands
     * @prop {Object<Map>} [subCommandsAliases=NULL] - Map of subcommand aliases
     *
     *
     * @prop {Object} infos - Default info about the command
     * @prop {Array} infos.owners - Command authors
     * @prop {String} infos.cmdName - Full command name
     * @prop {String} infos.description - Command description
     * @prop {String} infos.usage - Command usage
     * @prop {Array} infos.example - Array of command examples
     *
     * @prop {Object} options - Default options for the command
     * @prop {Number} [options.argsMin=0] - Minimum number of args required
     * @prop {Boolean} [options.invalidUsage=true] - Whether to trigger the help command on invalid usage (args required or no args given)
     * @prop {Boolean} [options.invalidPermissionMessage=false] - Whether to trigger an error message on invalid permission
     * @prop {Boolean} [options.deleteCommand=false] - Whether to delete the command input
     * @prop {Boolean} [options.guildOnly=true] - Whether the command can only be used in guilds
     * @prop {Boolean} [options.hidden=false] - Whether the command should be listed in the help commmand
     * @prop {Number} [options.cooldown=3000] - Cooldown for the command
     *
     * @prop {Object} permissions - Needed permissions of the bot/users
     * @prop {Array} [permissions.bot=[]] - Array or permissions needed by the bot to execute the command
     * @prop {Boolean} [permissions.serverMod=false] - Whether to limit the command to serverMod+
     * @prop {Boolean} [permissions.severAdmin=false] - Whether to limit the command to serverAdmin+
     * @prop {Array} [permissions.user.needed=[]] - All permissions needed by the user
     * @prop {Array} [permissions.user.bypass=[]] - Having one of these perms allows the user to use the command
     * @prop {Array} [permissions.usersID.needed=[]] - List of user ids that have permission to use the command (they need the other permissions too)
     * @prop {Array} [permissions.usersID.bypass=[]] - List of user ids that are allowed to use the command, regardless of other permissions
     * @prop {Array} [permissions.rolesID.needed=[]] - List of role ids needed
     * @prop {Array} [permissions.rolesID.bypass=[]] - Having one of these roles allows the user to use the command, regardless of other permissions
     * @prop {Array} [permissions.ChannelsID.needed=[]] - List of channel ids where the command is allowed
     * @prop {Array} [permissions.channelsID.bypass=[]] - Being in one of these channels allow the user to use the command, regardless of other permissions
     * @prop {Array} [permissions.staff.needed=[]] - List of bot.staff permissions needed to use the command (they need the other permissions too)
     * @prop {Array} [permissions.staff.bypass=[]] - Having one of these bot.staff permission allow to use the command, regardless of other permissions
     *
     * @prop {Object} template - Template object shortcut [GETTER: axon.configs.template]
     *
     * @memberof Command
     */
    constructor(module) {
        super(module.axon);

        this._module = module; // (module Object)

        /**
         * Handle Cooldown
         * User ID => Cooldown
         */
        this._cooldown = new Map();

        // Command main options
        this.label = 'label';
        this.aliases = []; // Includes label/main name of the command
        this.enabled = module.enabled; // Default to module state

        /**
         * Subcommand related
         * Default values
         */
        this.isSubcmd = false;
        this.parentCommand = null; // Reference to the parent command
        this.hasSubcmd = false;
        // temp var used to init subcommands
        this.subcmds = []; // Array of imported commands - deleted after init

        /**
         * Initiated if there are subcommands
         */
        this.subCommands = null; // Collection of subcommands
        this.subCommandsAliases = null; // Map of subcommand aliases

        /**
         * Bypass all perms - true = prevent the command to be disabled
         */
        this.serverBypass = module.serverBypass; // Default to module state

        /**
         * Info for the help command
         * All fields are required
         */
        this.infos = {
            owners: ['Owner'], // ['KhaaZ'] or ['KhaaZ', 'Jack']
            name: 'parentLabel label', // Full name of the command
            description: 'Description of the command.', // 'A cool command that does things.' <-- With the dot!
            usage: 'label [param] (optional param)', // Full usage of the command
            examples: ['example of command usage'], // ['', ...]
        };

        /**
         * Command options
         * Default values
         */
        this.options = {
            argsMin: 0, // Min args required
            invalidUsage: true, // Trigger the help command on invalid usage = args required or no args given
            invalidPermissionMessage: false, // Trigger an error message on invalid permission
            deleteCommand: false, // Delete input after trigger
            guildOnly: true, // Command only usable in guild
            hidden: false, // Don't list the command in the help command
            cooldown: 3000, // Cooldown between each usage of the same command
        };

        // Not gonna touch this ~Eleos
        /**
         * Handle permissions
         * bot perms
         * user perms
         *
         * Optional possible overrides for:
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
            custom: () => true, // function that take the message object as parameter and return a boolean
        };
    }

    //
    // ****** GETTER ******
    //

    get module() {
        return this._module;
    }

    get template() {
        return this.axon.configs.template;
    }

    get fullLabel() {
        let cmd = this; // eslint-disable-line
        const fullLabel = [this.label];
        while (cmd.parentCommand) {
            fullLabel.push(cmd.parentCommand.label);
            cmd = cmd.parentCommand;
        }
        return fullLabel.reverse().join(' ');
    }

    //
    // ****** MAIN - EXECUTE ******
    //

    /**
     * Execute a command - checks perms according to command options
     *
     * @param {Object} message - { msg, args, guildConf }
     * @returns {Promise}
     * @memberof Command
     */
    _execute(message) {
        const {
            msg, args, guildConf,
        } = message;

        if (!guildConf) { // DM EXECUTION
            if (this.options.guildOnly) { // guild only
                return Promise.resolve();
            }
        } else { // REGULAR EXECUTION
            /** Test for bot permissions */
            if (!this._checkPermsBot(msg.channel) ) {
                return this.sendBotPerms(msg.channel);
            }

            /** Permissions checkers */
            if (!this.canExecute(msg, guildConf) ) {
                /** Sends invalid perm message in case of invalid perm [option enabled] */
                if (!guildConf.modOnly && this.options.invalidPermissionMessage) {
                    return this.sendUserPerms(msg.channel, msg.member);
                }
                return Promise.resolve();
            }
        }

        /** Test for Cooldown - Send Cooldown message */
        const [cd, cooldown] = this._shouldCooldown(msg);
        if (cd) {
            if (cooldown.post) {
                cooldown.post = false;
                return this.sendCooldown(msg.channel, cd);
            }
            return Promise.resolve();
        }

        if (this.options.deleteCommand) { // delete input
            msg.delete();
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp( {
                msg, args, guildConf,
            } )
                .then( () => {
                    this._cooldown.set(msg.author.id, { time: Date.now(), post: true } );
                } );
        }

        return msg.command.execute(message)
            .then( () => {
                this._cooldown.set(msg.author.id, { time: Date.now(), post: true } );
            } );
    }

    /**
     * Execute method to override in all commands child.
     *
     * @param {Object} object - An Object with all arguments to use execute
     * @param {Object} [object.message] - The message Object
     * @param {Array<String>} [object.args] - The Array of arguments
     * @param {Object} [object.guildConf] - The guildConfig if it exists
     * @returns {Promise}
     * @memberof Command
     */
    async execute(object) { // eslint-disable-line
        throw new Error('Not implemented Exception!');
    }

    /**
     * Execute a command with disabled cooldown and permission checks. (Bot Owner/Staff only)
     *
     * @param {Object} message - { msg, args, guildConf }
     * @returns {Promise}
     * @memberof Command
     */
    _executeAdmin(message) {
        const {
            msg, args, guildConf, isOwner,
        } = message;

        /** Check bot perms */
        if (!this._checkPermsBot(msg.channel) ) {
            return this.sendBotPerms(msg.channel);
        }

        if (!isOwner
            && this.permissions.staff.needed.length > 0
            && this.permissions.staff.needed.filter(e => !this.axon.staff.owners.includes(e) ).length === 0) {
            return Promise.resolve();
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (args.length < this.options.argsMin && this.options.invalidUsage && !this.options.hidden) {
            return this.sendHelp( {
                msg, args, guildConf,
            } );
        }

        if (this.options.deleteCommand) { // delete input
            msg.delete();
        }

        return msg.command.execute(message);
    }

    /**
     * Send help message in the current channel with perm checks done before.
     * Call a custom sendHelp method if it exists, use the default one if it doesn't.
     *
     * @param {Object<Message>} {msg, guildconf} - The message object
     * @returns {Promise<Message>} Message Object
     * @memberof Command
     */
    sendHelp( { msg, guildConf } ) {
        // If a sendHelp method exists in the client, uses it instead.
        if (this.axon.sendHelp) {
            return this.axon.sendHelp(this, msg);
        }

        const prefix = (guildConf && guildConf.prefix.length > 0) ? guildConf.prefix[0] : this.axon.params.prefix[0];

        const embed = {};
        embed.author = {
            name: `Help for ${this.infos.name || this.fullLabel}`,
            icon_url: this.bot.user.avatarURL,
        };

        embed.color = this.template.embed.colors.help.length > 0 ? this.template.embed.colors.help : null;

        embed.description = `**Description:** ${this.infos.description}\n`;

        embed.description += `**Cooldown:** ${this.options.cooldown / 1000}s\n`;

        embed.description += `**Usage:** ${prefix}${this.infos.usage || this.fullLabel}\n`;

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

        if (this.infos.examples && this.infos.examples.length > 0) {
            this.infos.examples.length > 1
                ? embed.description += `\n**Examples:**\n${prefix}${this.infos.examples.join(`\n${prefix}`)}\n`
                : embed.description += `**Example:** ${prefix}${this.infos.examples.join(`\n${prefix}`)}\n`;
        }

        embed.fields = [];
        /** SubCommands */
        if (this.hasSubcmd) {
            const subcmds = this.subCommands.filter(e => !e.options.hidden).map(e => `${prefix}${e.infos.usage}`);
            if (subcmds.length > 0) {
                embed.fields.push( {
                    name: 'SubCommands:',
                    value: subcmds.join('\n'),
                    inline: true,
                } );
            }
        }

        /** Aliases */
        if (this.aliases.length > 1) {
            const aliases = this.aliases.filter(e => e !== this.label);
            embed.fields.push( {
                name: 'Aliases:',
                value: aliases.join('\n'),
                inline: true,
            } );
        }

        return this.sendMessage(msg.channel, { embed } );
    }

    //
    // ****** CHECKERS - Internal ******
    //

    /**
     * Checks the command cooldown of the user
     *
     * @param {Object<Message>} msg - The Message object
     * @returns {Boolean|Number} False if no cooldown / Cooldown time left if there is a cooldown
     * @memberof Command
     */
    _shouldCooldown(msg) {
        const cooldown = this._cooldown.get(msg.author.id);

        // No cooldown registered yet
        if (!cooldown) {
            return []; // doesn't cooldown
        }

        // Time spent since last uses <= cooldown chose for that command
        const curCD = Date.now() - cooldown.time;
        if (curCD <= this.options.cooldown) {
            return [curCD, cooldown]; // Return time left (does cooldown)
        }

        // Delete current time for this user.
        this._cooldown.delete(msg.author.id);

        return []; // Doesn't cooldown
    }

    /**
     * Permission checker - Does the user have permission to use the command or not?
     * Bypass - Only needs of of these permissions, doesn't check for other permissions
     * Needed - Needs all specified permissions => Goes through other checkers
     * ServerMod
     *
     * @param {Object<Message>} msg - The Message Object
     * @param {Object} guildConf - GuildConfig
     * @returns {Boolean} True if the user can execute command / False if not
     * @memberof Command
     */
    canExecute(msg, guildConf) {
        const { member, channel } = msg;
        // Bypass: if one of the perm is true => Exec the command
        if (this._checkPermsUserBypass(member)
            || this._checkUserBypass(member)
            || this._checkRoleBypass(member)
            || this._checkChannelBypass(channel)
            || this._checkStaffBypass(member) ) {
            return true;
        }

        if ( ( (guildConf.modOnly || this.permissions.serverMod) && !this.AxonUtils.isMod(member, guildConf) )
            || (this.permissions.serverAdmin && !this.AxonUtils.isAdmin(member) ) ) {
            return false;
        }

        // Needed: if one of the perms is false => doesn't exec the command
        if (!this._checkPermsUserNeeded(member)
            || !this._checkUserNeeded(member)
            || !this._checkRoleNeeded(member)
            || !this._checkChannelNeeded(channel)
            || !this._checkStaffNeeded(member) ) {
            return false;
        }

        // custom is a function that returns a boolean
        if (this.permissions.custom) {
            return this.permissions.custom(msg);
        }

        return true;
    }

    /**
     * Check bot permission
     * (= permissions in config)
     *
     * @param {Object<Channel>} channel
     * @returns {Boolean}
     * @memberof Command
     */
    _checkPermsBot(channel) {
        if (!this.permissions.bot.length) {
            return true;
        }
        return this.Utils.hasChannelPerms(channel, this.permissions.bot);
    }

    /**
     * Check user permissions [bypass]
     * (= permissions in config)
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
            if (member.permission.has(userPerm) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check user permissions [needed]
     * (= permissions in config)
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
            if (!member.permission.has(userPerm) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check roles IDs [bypass]
     * (= permissions in config)
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
     * (= permissions in config)
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
     * (= permissions in config)
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
            if (roles.find(role) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check roles IDs [needed]
     * (= permissions in config)
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
            if (!roles.find(role) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check channels IDs [bypass]
     * (= permissions in config)
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
     * (= permissions in config)
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
     * Check if the user is bot staff
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
     * Check if the user is bot staff
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
     * Send an error message in case of invalid bot permissions, delete it automatically after a delay.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Array<String>} [permissions=[]] - Optional array of permissions string
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendBotPerms(channel, permissions = [] ) {
        if (permissions.length === 0) {
            const member = channel.guild.members.get(this.bot.user.id);
            permissions = this.Utils.missingPerms(member, this.permissions.bot);
        }
        return this.sendError(
            channel,
            `${this.template.message.error.permBot} ${permissions.map(p => `\`${Enum.permissionsNames[p]}\``).join(', ')}.`,
            { delete: true, delay: 9000 }
        );
    }

    /**
     * Send an error message in case of invalid user permissions, delete it automatically after a delay.
     * Uses the template message in config/template.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object<Member>} member - The member object
     * @param {Array<String>} [permission=[]] - Optional array of permissions string
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendUserPerms(channel, member, permissions = [] ) {
        if (permissions.length === 0) {
            permissions = this.Utils.missingPerms(member, this.permissions.user.needed);
        }
        return this.sendError(
            channel,
            this.template.message.error.permSource
            + (permissions.length > 0 ? ` ${permissions.map(p => `\`${Enum.permissionsNames[p]}\``).join(', ')}.` : '.'),
            { delete: true, delay: 9000 }
        );
    }

    /**
     * Send an error message incase of invalid target permissions (serverMod/serverAdmin).
     * Uses the template message in config/template.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendTargetPerms(channel) {
        return this.sendError(channel, this.template.message.error.permTarget, { delete: true, delay: 9000 } );
    }

    /**
     * Send an error message in case of invalid cooldown, delete it automatically after a delay.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @returns {Promise<Message?>} Message Object
     * @memberof Command
     */
    sendCooldown(channel, time) {
        return this.sendError(
            channel,
            `${this.template.message.error.cooldown} **${Math.ceil( (this.options.cooldown - time) / 100) / 10}sec**...`,
            { delete: true, delay: 9000 },
        );
    }
}

export default Command;
