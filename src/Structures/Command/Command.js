import Base from '../Base';

import CommandPermissions from './CommandPermissions';
import CommandOptions from './CommandOptions';
import CommandCooldown from './CommandCooldown';
import CommandContext from './CommandContext';
import CommandResponse from './CommandResponse';

import AxonError from '../../Errors/AxonError';
import AxonCommandError from '../../Errors/AxonCommandError';

import { COMMAND_EXECUTION_STATE } from '../../Utility/Constants/AxonEnums';

/**
 * @typedef {import('../Module').default} Module
 * @typedef {import('../../Utility/Collection').default<Command>} CommandCollection
 * @typedef {{embeds: Object.<string, number>, emotes: Object.<string, string>}} AxonTemplate
 * @typedef {import('../../Libraries/definitions/LibraryInterface').default} LibraryInterface
 * @typedef {import('../DataStructure/GuildConfig').default} GuildConfig
 */

/**
 * AxonCore - Command constructor
 *
 * @author KhaaZ
 *
 * @class Command
 * @extends Base
 *
 * @prop {Module} _module - Module object
 *
 * @prop {CommandCooldown} _cooldown - Cooldown Object for the command (manage all command cooldowns)
 *
 * @prop {String} label - Command label (name/id)
 * @prop {Array<String>} [aliases=[]] - Array of commands aliases (including the command label)
 *
 * @prop {Boolean} [enabled=module.enabled] - Whether the command is enabled
 * @prop {Boolean} [serverBypass=module.serverBypass] - Whether the command can be disabled
 *
 * @prop {Boolean} [isSubcmd=false] - Whether the command IS a subcommand
 * @prop {Command} [parentCommand=null] - Reference to the parent command (if isSubcmd = true)
 * @prop {Boolean} [hasSubcmd=false] - Whether the command HAS subcommands
 * @prop {Array<Object>} subcmds - Array of subcommand objects (deleted after init)
 * @prop {CommandCollection} [subCommands=null] - Collection of subcommands
 * @prop {Map} [subCommandsAliases=null] - Map of subcommand aliases
 *
 * @prop {Object} infos - Default info about the command
 * @prop {Array<String>} [infos.owners] - Command authors
 * @prop {String} [infos.name] - Full command name
 * @prop {String} [infos.description] - Command description
 * @prop {String} [infos.usage] - Command usage
 * @prop {Array<String>} [infos.example] - Array of command examples
 *
 * @prop {CommandOptions} options - Options Object for the command (manage all command options)
 * @prop {CommandPermissions} permissions - Permissions Object for the command (manage all command permissions)
 */
class Command extends Base {
    /**
     * Creates a Command instance.
     * Handles execution of this command.
     * Overrides the execute method. Execute method will be called every time the command is called.
     *
     * @param {Module} module
     * @param {Object} [data={}] - All command parameters
     * @param {String} [data.label] - The command label
     * @param {Array<String>} [data.aliases] - The command aliases
     * @param {Boolean} [data.isSubcmd] - Whether the command IS a subcommand
     * @param {Boolean} [data.hasSubcmd] - Whether the command HAS subcommands
     * @param {Boolean} [data.enabled] - Whether the command is enabled
     * @param {Boolean} [data.serverBypass] - Whether the command can be server disabled
     * @param {Array<new (...args[]: any) => Command>} [data.subcmds] - List of subcommands class to be added in the Command
     * @param {Object} [data.infos]
     * @param {Array<String>} [data.infos.owners] - Who created the command
     * @param {String} [data.infos.description] - The command description
     * @param {Array<String>} [data.infos.examples] - Command examples
     * @param {String} [data.infos.usage] - The command usage
     * @param {String} [data.infos.name] - The full command name
     * @param {CommandOptions|Object} [data.options] - The command options
     * @param {CommandPermissions|Object} [data.permissions] - The command permissions
     * @memberof Command
     */
    constructor(module, data = {} ) {
        super(module.axon);

        this._module = module;

        this._cooldown = new CommandCooldown(this);

        /* Command main options */
        this.label = data.label || null;
        this.aliases = data.aliases || []; // Includes label/main name of the command
        this.enabled = data.enabled !== undefined ? data.enabled : module.enabled; // Default to module state

        /* Subcommands */
        this.isSubcmd = data.isSubcmd || false;
        this.parentCommand = null; // Reference to the parent command - affected at instantiation
        this.hasSubcmd = data.hasSubcmd || false;
        // temp var used to init subcommands
        this.subcmds = data.subcmds || []; // Array of imported commands - deleted after init

        /**
         * @type {CommandCollection}
         */
        /* Inited if there are subcommands */
        this.subCommands = null; // Collection of subcommands

        /**
         * @type {AxonTemplate}
         */
        /* Bypass all perms - true = prevent the command to be disabled */
        this.serverBypass = data.serverBypass !== undefined ? data.serverBypass : module.serverBypass; // Default to module state

        /* Command infos (help command) */
        this.infos = data.infos || {
            owners: [], // ['KhaaZ'] or ['KhaaZ', 'Jack']
            name: null, // Full name of the command
            description: null, // 'A cool command that does things.'
            usage: null, // Full usage of the command
            examples: [], // Some usages examples
        };

        if (data.options) {
            if (data.options instanceof CommandOptions) {
                this.options = data.options;
            } else {
                this.options = new CommandOptions(this, data.options);
            }
        } else {
            this.options = new CommandOptions(this);
        }

        if (data.permissions) {
            if (data.permissions instanceof CommandPermissions) {
                this.permissions = data.permissions;
            } else {
                this.permissions = new CommandPermissions(this, data.permissions);
            }
        } else {
            this.permissions = new CommandPermissions(this);
        }
    }

    // **** GETTER **** //

    /**
     * Returns the parent module instance
     *
     * @readonly
     * @type {Module}
     * @memberof Command
     */
    get module() {
        return this._module;
    }

    /**
     * Returns the template object
     *
     * @readonly
     * @type {AxonTemplate}
     * @memberof Command
     */
    get template() {
        return this.axon.template;
    }

    /**
     * Returns the library Interface instance
     *
     * @readonly
     * @type {LibraryInterface}
     * @memberof Command
     */
    get library() {
        return this.axon.library;
    }

    /**
     * Returns the full label for this command (label + all parent labels)
     *
     * @readonly
     * @type {String}
     * @memberof Command
     */
    get fullLabel() {
        if (!this.parentCommand) {
            return this.label;
        }
        return `${this.parentCommand.fullLabel} ${this.label}`;
    }

    // **** MAIN **** //

    /**
     * Process the command, and executes it if it can (permissions, options etc..).
     *
     * @param {Object} params
     * @param {Message} params.msg
     * @param {Array<String>} params.args
     * @param {GuildConfig} params.guildConfig
     * @param {Boolean} params.isAdmin
     * @param {Boolean} params.isOwner
     * @returns {Promise<CommandContext>} Return a CommandContext or throw an AxonCommandError.
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
            /* Permissions checkers */
            if (!this.permissions._checkPermsBot(channel) ) {
                this.sendBotPerms(channel);
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    executionState: COMMAND_EXECUTION_STATE.INVALID_PERMISSIONS_BOT,
                } ).resolveAsync();
            }

            /* Permissions checkers */
            if (!isAdmin) {
                const canExecute = this.permissions.canExecute(msg, guildConfig);
                if (!canExecute[0] ) {
                /* Sends invalid perm message in case of invalid perm [option enabled] */
                    if (this.options.shouldSendInvalidPermissionMessage(guildConfig) ) {
                        this.sendUserPerms(channel, this.library.message.getMember(msg), this.options.invalidPermissionMessageTimeout, canExecute[1] );
                    }
                    return new CommandContext(this, msg, {
                        executed: false,
                        executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                        executionState: COMMAND_EXECUTION_STATE.INVALID_PERMISSIONS_USER,
                    } ).resolveAsync();
                }
            }
        }

        if (isAdmin) {
            if (!isOwner && !this.axonUtils.isBotOwner(userID)
                && this.permissions.staff.needed.length > 0
                && this.permissions.staff.needed.filter(e => !this.axon.staff.owners.includes(e) ).length === 0) { // ONLY FOR OWNER
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    executionState: COMMAND_EXECUTION_STATE.INVALID_PERMISSIONS_USER,
                } ).resolveAsync();
            }
        } else {
            /* Test for Cooldown - Send Cooldown message */
            const [timeLeft, shouldSendCDMessage] = this._cooldown.shouldCooldown(userID);
            if (timeLeft) {
                if (shouldSendCDMessage) {
                    this.sendCooldown(channel, timeLeft);
                }
                return new CommandContext(this, msg, {
                    executed: false,
                    executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                    executionState: COMMAND_EXECUTION_STATE.COOLDOWN,
                } ).resolveAsync();
            }
        }

        /* Sends invalid usage message in case of invalid usage (not enough argument) [option enabled] */
        if (!this.options.hasCorrectArgs(args) ) {
            const ctx = new CommandContext(this, msg, {
                executed: false,
                executionType: CommandContext.getExecutionType(isAdmin, isOwner),
                executionState: COMMAND_EXECUTION_STATE.INVALID_USAGE,
            } );
            
            isAdmin && this._cooldown.shouldSetCooldown() && this._cooldown.setCooldown(userID);
            if (this.options.shouldSendInvalidUsageMessage(args) ) {
                return this.sendHelp( {
                    msg, args, guildConfig, isAdmin, isOwner,
                } )
                    .then( () => ctx.resolveSync() );
            }
            return ctx.resolveAsync();
        }

        /** Doesn't delete the input if any other condition didn't pass through. */
        if (this.options.shouldDeleteCommand() ) {
            this.library.message.delete(msg).catch(this.logger.warn);
        }

        return this._execute(params);
    }

    _preExecute() {
        // pre execute hooks
    }

    /**
     * Execute the command.
     * Get the CommandResponse from the command execution or create it in case of errors.
     * Create the CommandContext and returns it.
     *
     * @param {Object} object { msg, args, guildConfig, isAdmin, isOwner }
     * @param {Message} object.msg
     * @param {Array<String>} object.args
     * @param {GuildConfig} object.guildConfig
     * @param {Boolean} object.isAdmin
     * @param {Boolean} object.isOwner
     * @returns {CommandContext}
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
            /* Successful and failed execution + caught errors (this.error()) */
            .then( (response) => {
                this._cooldown.shouldSetCooldown(response) && this._cooldown.setCooldown(this.library.message.getAuthorID(msg) );
                
                return context.addResponseData(response);
            } )
            /* UNEXPECTED ERRORS ONLY (non caught) */
            .catch(err => {
                !isAdmin && this._cooldown.shouldSetCooldown() && this._cooldown.setCooldown(this.library.message.getAuthorID(msg) );

                context.addResponseData(new CommandResponse( { success: false, triggerCooldown: true, error: err } ) );
                throw new AxonCommandError(context, err);
            } );
    }

    /**
     * Override this method in all Command child.
     * Main method - command logic being executed when the command is actually ran.
     *
     * @param {Object} object - An Object with all arguments to use execute
     * @param {Message} [object.message] - The message Object
     * @param {Array<String>} [object.args] - The Array of arguments
     * @param {GuildConfig} [object.guildConfig] - The guildConfig if it exists
     *
     * @returns {Promise<CommandResponse>} Returns a CommandResponse that will be used to create the CommandContext
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
     * @param {Object} object { msg, guildConfig, isAdmin, isOwner }
     * @param {Message} object.msg
     * @param {GuildConfig} object.guildConfig
     * @param {Boolean} object.isAdmin
     * @param {Boolean} object.isOwner
     * @returns {Promise<CommandContext>}
     * @memberof Command
     */
    sendHelp( { msg, guildConfig, isAdmin, isOwner } ) {
        /* OVERRIDE default sendHelp with a CUSTOM in AxonClient */
        if (this.axon.sendHelp) {
            return this.axon.sendHelp(this, { msg, guildConfig, isAdmin, isOwner } );
        }

        const prefix = (guildConfig && guildConfig.getPrefixes().length > 0) ? guildConfig.getPrefixes()[0] : this.axon.settings.prefixes[0];

        const embed = {};
        embed.author = {
            name: `Help for ${this.infos.name || this.fullLabel}`,
            icon_url: this.library.client.getAvatar(),
        };

        embed.color = typeof this.template.embeds.help === 'string'
            ? parseInt(this.template.embeds.help, 16) || null
            : this.template.embeds.help;

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
        /* SubCommands */
        if (this.hasSubcmd) {
            const subcmds = this.subCommands.getAll().filter(e => !e.options.hidden).map(e => `${prefix}${e.infos.usage}`);
            if (subcmds.length > 0) {
                embed.fields.push( {
                    name: 'SubCommands:',
                    value: subcmds.join('\n'),
                    inline: true,
                } );
            }
        }

        /* Aliases */
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
     * @param {Channel} channel - The channel Object
     * @param {Array<String>} [permissions=[]] - Optional array of permissions string
     * @memberof Command
     */
    sendBotPerms(channel, permissions = [] ) {
        if (permissions.length === 0) {
            const member = this.library.client.getMember(this.library.channel.getGuild(channel) );
            permissions = this.utils.missingPerms(member, this.permissions.bot);
        }
        return this.sendError(
            channel,
            // eslint-disable-next-line new-cap
            this.l.ERR_BOT_PERM( {
                permissions: permissions.map(p => `\`${this.library.enums.PERMISSIONS_NAMES[p]}\``).join(', '),
            } ),
            { delete: true, delay: 9000 },
        );
    }

    /**
     * Send an error message in case of invalid user permissions, delete it automatically after a delay.
     * Uses the template message in config/template.
     *
     * @param {Channel} channel - The channel object
     * @param {Member} member - The member object
     * @param {Number} [deleteTimeout] - The permission message deletion timeout, if `null` the the message will not delete
     * @param {String} [missingPermission] - The missing permission
     * @memberof Command
     */
    // eslint-disable-next-line no-magic-numbers
    sendUserPerms(channel, member, deleteTimeout = 9000, missingPermission = null) {
        const options = deleteTimeout === null ? { delete: false } : { delete: true, delay: deleteTimeout };
        return this.sendError(
            channel,
            this.options.getInvalidPermissionMessage(channel, member, missingPermission),
            options,
        );
    }

    /**
     * Send an error message in case of invalid target permissions (serverMod/serverAdmin).
     * Uses the template message in config/template.
     *
     * @param {Channel} channel - The channel Object
     * @memberof Command
     */
    sendTargetPerms(channel) {
        // eslint-disable-next-line new-cap
        return this.sendError(channel, this.l.ERR_DESTINATION_PERM(), { delete: true, delay: 9000 } );
    }

    /**
     * Send an error message in case of invalid cooldown, delete it automatically after a delay.
     *
     * @param {Channel} channel - The channel Object
     * @param {Number} time - How long since the last command
     * @memberof Command
     */
    sendCooldown(channel, time) {
        return this.sendError(
            channel,
            // eslint-disable-next-line new-cap
            this.l.ERR_COOLDOWN( { cooldown: Math.ceil( (this.options.cooldown - time) / 100) / 10 } ),
            { delete: true, delay: 9000 },
        );
    }
}

export default Command;
