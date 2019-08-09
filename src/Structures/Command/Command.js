import Base from '../Base';

import CommandPermissions from './CommandPermissions';
import CommandOptions from './CommandOptions';
import CommandCooldown from './CommandCooldown';
import CommandContext from './CommandContext';
import CommandResponse from './CommandResponse';

import AxonError from '../../Errors/AxonError';
import AxonCommandError from '../../Errors/AxonCommandError';

/**
 * AxonCore - Command contructor
 *
 * @author KhaaZ
 *
 * @class Command
 * @extends Base
 *
 * @prop {Object<Module>} module - Module object [GETTER: _module]
 *
 * @prop {Object<CommandCooldown>} _cooldown - Cooldown Object for the command (manage all command cooldowns)
 *
 * @prop {String} label - Command label (name/id)
 * @prop {Array<String>} [aliases=[]] - Array of commands aliases (including the command label)
 *
 * @prop {Boolean} [enabled=module.enabled] - Is the command enabled?
 * @prop {Boolean} [serverBypass=module.serverBypass] - Can the command be disabled?
 *
 * @prop {Boolean} [isSubcmd=false] - Command is a subcommand
 * @prop {Object<Command>} [parentCommand=null] - Reference to the parent command (if isSubcmd = true)
 * @prop {Boolean} [hasSubcmd=false] - Does the command have subcommands?
 * @prop {Array} subcmds - Array of subcommand objects (deleted after init)
 * @prop {Collection<Command>} [subCommands=null] - Collection of subcommands
 * @prop {Object<Map>} [subCommandsAliases=null] - Map of subcommand aliases
 *
 * @prop {Object} infos - Default info about the command
 * @prop {Array} [infos.owners] - Command authors
 * @prop {String} [infos.cmdName] - Full command name
 * @prop {String} [infos.description] - Command description
 * @prop {String} [infos.usage] - Command usage
 * @prop {Array} [infos.example] - Array of command examples
 *
 * @prop {Object<CommandOptions>} options - Options Object for the command (manage all command options)
 * @prop {Object<CommandPermissions>} permissions - Permissions Object for the command (manage all command permissions)
 *
 * @prop {Object} template - Template object shortcut [GETTER: axon.configs.template]
 * @prop {Object} fullLabel - Get the full label of the command (whole command label through thecommands tree)
 */
class Command extends Base {
    /**
     * Creates a Command instance.
     * Handles execution of this command.
     * Overrides the execute method. Execute method will be called everytime the command is called.
     *
     * @param {Object<Module>} module
     *
     * @memberof Command
     */
    constructor(module) {
        super(module.axon);

        this._module = module; // (module Object)

        this._cooldown = new CommandCooldown(this);

        // Command main options
        this.label = 'label';
        this.aliases = []; // Includes label/main name of the command
        this.enabled = module.enabled; // Default to module state

        /** Subcommands */
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

        /** Bypass all perms - true = prevent the command to be disabled */
        this.serverBypass = module.serverBypass; // Default to module state

        /** Command infos (help command) */
        this.infos = {
            owners: ['Owner'], // ['KhaaZ'] or ['KhaaZ', 'Jack']
            name: 'parentLabel label', // Full name of the command
            description: 'Description of the command.', // 'A cool command that does things.' <-- With the dot!
            usage: 'label [param] (optional param)', // Full usage of the command
            examples: ['example of command usage'], // ['', ...]
        };

        this.options = new CommandOptions(this);
        
        this.permissions = new CommandPermissions(this);
    }

    // **** GETTER **** //

    get module() {
        return this._module;
    }

    get template() {
        return this.axon.configs.template;
    }

    get library() {
        return this.axon.library;
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

    // **** MAIN **** //

    /**
     * Process the command, and executes it if it can (permissions, options etc..).
     *
     * @param {Object} params - { msg, args, guildConfig, isAdmin, isOwner }
     * @returns {Promise<CommandContext>} Return a CommandContext or throw an AxonCommandError.
     *
     * @memberof Command
     */
    _process(params) {
        const {
            msg, args, guildConfig, isAdmin, isOwner,
        } = params;

        const userID = this.library.message.getAuthorID(msg);
        const channel = this.library.message.getChannel(msg);

        if (!guildConfig) { // DM EXECUTION
            if (this.options.isGuildOnly() ) { // guild only
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                } ).resolveAsync();
            }
        } else { // REGULAR EXECUTION
            /** Permissions checkers */
            if (!this.permissions._checkPermsBot(channel) ) {
                this.sendBotPerms(channel);
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    invalidBotPermissions: true,
                } ).resolveAsync();
            }

            /** Permissions checkers */
            if (!isAdmin && !this.permissions.canExecute(msg, guildConfig) ) {
                /** Sends invalid perm message in case of invalid perm [option enabled] */
                if (this.options.shouldSendInvalidPermissionMessage(guildConfig) ) {
                    this.sendUserPerms(channel, this.library.message.getMember(msg) );
                }
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    invalidUserPermissions: true,
                } ).resolveAsync();
            }
        }

        if (isAdmin) {
            if (!isOwner && !this.axonUtils.isBotOwner(userID)
                && this.permissions.staff.needed.length > 0
                && this.permissions.staff.needed.filter(e => !this.axon.staff.owners.includes(e) ).length === 0) { // ONLY FOR OWNER
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    invalidUserPermissions: true,
                } ).resolveAsync();
            }
        } else {
            /** Test for Cooldown - Send Cooldown message */
            const [timeLeft, shouldSendCDMessage] = this._cooldown.shouldCooldown(userID);
            if (timeLeft) {
                if (shouldSendCDMessage) {
                    this.sendCooldown(channel, timeLeft);
                }
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    onCooldown: true,
                } ).resolveAsync();
            }
        }

        /** Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (this.options.shouldSendInvalidUsageMessage(args) ) {
            return this.sendHelp( {
                msg, args, guildConfig, isAdmin, isOwner,
            } )
                .then( () => {
                    isAdmin && this._cooldown.shouldSetCooldown() && this._cooldown.setCooldown(userID);
                    return new CommandContext(this, msg, {
                        executed: false,
                        executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                        invalidUsage: true,
                    } ).resolveAsync();
                } );
        }

        if (this.options.shouldDeleteCommand() ) { // delete input
            this.library.message.delete(msg).catch(this.logger.warn);
        }

        return this._execute(params);
    }

    _preExecute() {
        // pre execute hoks
    }

    /**
     * Execute the command.
     * Get the CommandResponse fromthe command execution or create it in case of errors.
     * Create the CommandContext and returns it.
     *
     * @param {Object} { msg, args, guildConfig, isAdmin, isOwner }
     * @returns {CommandContext}
     *
     * @memberof Command
     */
    _execute( {
        msg, args, guildConfig, isAdmin, isOwner,
    } ) {
        const context = new CommandContext(this, msg, {
            executed: true,
            executionType:
            CommandContext.getExecutionType(isAdmin, isOwner),
        } );
        
        return this.execute( { msg, args, guildConfig } )
            /** Successful and failed execution + catched errors (this.error()) */
            .then( (response) => {
                !isAdmin && this._cooldown.shouldSetCooldown(response) && this._cooldown.setCooldown(this.library.message.getAuthorID(msg) );
                
                return context.addResponseData(response);
            } )
            /** UNEXPECTED ERRORS ONLY (non catched) */
            .catch(err => {
                !isAdmin && this._cooldown.shouldSetCooldown() && this._cooldown.setCooldown(this.library.message.getAuthorID(msg) );

                context.addResponseData(new CommandResponse( { success: false, triggerCooldown: true, error: err } ) );
                throw new AxonCommandError(context, err);
            } );
    }

    /**
     * Execute method to override in all commands child.
     *
     * @param {Object} object - An Object with all arguments to use execute
     * @param {Object<Message>} [object.message] - The Eris message Object
     * @param {Array<String>} [object.args] - The Array of arguments
     * @param {Object<GuildConfig>} [object.guildConfig] - The guildConfig if it exists
     *
     * @returns {Promise<CommandResponse>} Returns a CommandResponse that will be used to create the CommandContext
     *
     * @memberof Command
     */
    async execute({ msg, args, guildConfig }) { // eslint-disable-line
        throw new AxonError('Not implemented Exception.', `${this.module}: ${this.fullLabel}`);
    }

    _postExecute() {
        // post exec hooks
    }

    // **** HELPERS **** //

    /**
     * Send help message in the current channel with perm checks done before.
     * Call a custom sendHelp method if it exists, use the default one if it doesn't.
     *
     * @param {Object<Message>} { msg, guildConfig, isAdmin, isOwner } - The message object
     * @returns {Promise<CommandContext>} Message Object
     * @memberof Command
     */
    sendHelp( { msg, guildConfig, isAdmin, isOwner } ) {
        /** OVERRIDE default sendHelp with a CUSTOM in AxonClient */
        if (this.axon.sendHelp) {
            return this.axon.sendHelp(this, { msg, guildConfig, isAdmin, isOwner } );
        }

        const prefix = (guildConfig && guildConfig.getPrefixes().length > 0) ? guildConfig.getPrefixes()[0] : this.axon.settings.prefixes[0];

        const embed = {};
        embed.author = {
            name: `Help for ${this.infos.name || this.fullLabel}`,
            icon_url: this.bot.user.avatarURL,
        };

        embed.color = typeof this.template.embed.colors.help === 'string'
            ? parseInt(this.template.embed.colors.help, 16) || null
            : this.template.embed.colors.help;

        embed.description = `**Description:** ${this.infos.description}\n`;

        embed.description += `**Cooldown:** ${this.options.cooldown / 1000}s\n`;

        embed.description += `**Usage:** ${prefix}${this.infos.usage || this.fullLabel}\n`;

        let perm;
        if (this.permissions.serverOwner) {
            perm = '`Server Owner`';
        } else if (this.permissions.serverAdmin) {
            perm = '`Server Admin`';
        } else if (this.permissions.serverManager) {
            perm = '`Server Manager`';
        } else if (this.permissions.serverMod) {
            perm = '`Server Mod`';
        } else if (this.permissions.user.needed.length > 0) {
            perm = this.permissions.user.needed
                .map(p => `\`${this.library.enums.PERMISSIONS_NAMES[p]}\``)
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

        return this.sendMessage(msg.channel, { embed } )
            .then( () => new CommandContext(this, msg, {
                executed: true,
                executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                helpExecution: true,
            } ).resolveAsync() );
    }

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
            permissions = this.utils.missingPerms(member, this.permissions.bot);
        }
        return this.sendError(
            channel,
            `${this.template.message.error.permBot} ${permissions.map(p => `\`${this.library.enums.PERMISSIONS_NAMES[p]}\``).join(', ')}.`,
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
            permissions = this.utils.missingPerms(member, this.permissions.user.needed);
        }
        return this.sendError(
            channel,
            this.template.message.error.permSource
            + (permissions.length > 0 ? ` ${permissions.map(p => `\`${this.library.enums.PERMISSIONS_NAMES[p]}\``).join(', ')}.` : '.'),
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
