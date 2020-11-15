import CommandEnvironment from './Command/CommandEnvironment';
import { COMMAND_EXECUTION_TYPES } from '../Utility/Constants/AxonEnums';

/**
 * @typedef {import('../AxonClient').default} AxonClient
 * @typedef {import('../Libraries/definitions/LibraryInterface').default} LibraryInterface
 * @typedef {import('./Models/GuildConfig').default} GuildConfig
 */

/**
 * Class responsible to call the correct command and correct execution flow when needed.
 * Dispatch to the correct command on message create event.
 * Handles prefix resolving and command resolving.
 *
 * @author KhaaZ
 *
 * @class CommandDispatcher
 *
 * @prop {AxonClient} _axon
 * @prop {RegExp} mentionFormatter
 */
class CommandDispatcher {
    /**
     * Creates an instance of CommandDispatcher.
     *
     * @param {AxonClient} axon
     * @memberof CommandDispatcher
     */
    constructor(axon) {
        this._axon = axon;
        this.mentionFormatter = /<@!/g;
    }

    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @type {LibraryInterface}
     * @memberof CommandDispatcher
     */
    get library() {
        return this._axon.library;
    }

    /**
     * Dispatches the messageCreate event to:
     * - end of execution if:
     *      - no prefix
     *      - no command
     *      - no permissions
     * - command execution with different execution flow:
     *      - Owner execution
     *      - Admin execution
     *      - Regular execution
     *      - DM execution
     *
     * @param {Message} msg - Message Object from Eris
     * @returns {Promise<void>}
     * @memberof CommandDispatcher
     */
    async dispatch(msg) {
        const executionType = this.getExecutionType(msg);

        const env = new CommandEnvironment( { msg, executionType } );

        /* Extract necessary attribute from lib Core */
        const author = this.library.message.getAuthor(msg);
        const guild = this.library.message.getGuild(msg);

        /* ignore cached blacklisted users */
        if (!env.isAdmin && this._axon.axonConfig.isBlacklistedUser(this.library.user.getID(author) ) ) {
            return;
        }

        let guildConfig = null;
        
        /* GUILD execution only */
        if (guild) {
            /* ignore cached blacklisted guilds */
            if (!env.isAdmin && this._axon.axonConfig.isBlacklistedGuild(this.library.guild.getID(guild) ) ) {
                return;
            }

            /*
             * Get guild Conf from cache or DB
             * Raise error eventually
             */
            try {
                guildConfig = await this._axon.guildConfigs.getOrFetch(this.library.guild.getID(guild) );
            } catch (err) {
                this._axon.log('FATAL', err.stack, { guild } );
                return;
            }
        }
        env.setGuildConfig(guildConfig);
        
        /* Formatting mention to replace <!@ mention to <@ mentions (uniform mentions) */
        const content = this.library.message
            .getContent(msg)
            .replace(this.mentionFormatter, '<@');
        this.library.message.setContent(msg, content);

        const prefix = this.resolvePrefix(msg, guildConfig, env.isAdmin, env.isOwner);
        if (!prefix) {
            return;
        }
        env.setPrefix(prefix);

        /* IN GUILD | NOT ADMIN | Check if the user/role/channel is ignored in the guild */
        if (guildConfig && !env.isAdmin && guildConfig.isIgnored(msg) ) {
            return;
        }
        
        const args = msg.content.substring(prefix.length).split(' ');
        let label = args.shift().toLowerCase();

        /* Call Help if first arg = 'help' */
        const onHelp = label === 'help';
        if (onHelp) {
            /* If no additional args: send FullHelp */
            if (args.length === 0) {
                this._axon.executor.help(null, env);
                return;
            }
            /* Otherwise resolve the command we want to send the help for */
            label = args.shift();
        }

        /* Resolve command (and subcommand if needed) */
        const command = this._axon.commandRegistry.resolve(label, args, guildConfig);
        if (!command) { // command doesn't exist or not globally enabled
            return;
        }
        env.setCommand(command, label);
        env.resolveArgs(null, args.join(' ') );

        /* Send help for the resolved command */
        if (onHelp) {
            this._axon.executor.help(command, env);
            return;
        }

        /* Execute the command */
        this._axon.executor.command(command, env);
        return;
    }

    // **** UTILITIES **** //

    /**
     * Give the execution type: Owner or Admin execution.
     * It uses the global admin and owner prefixes and checks for the BotStaff rank of the caller.
     *
     * @param {Message} msg
     * @returns {COMMAND_EXECUTION_TYPES} The execution type
     * @memberof CommandDispatcher
     */
    getExecutionType(msg) {
        const content = this.library.message.getContent(msg);
        const authorID = this.library.message.getAuthorID(msg);

        if (content.startsWith(this._axon.settings.ownerPrefix) && !!this._axon.axonUtils.isBotOwner(authorID) ) { // Owner prefix + user is owner
            return COMMAND_EXECUTION_TYPES.OWNER;
        } if (content.startsWith(this._axon.settings.adminPrefix) && !!this._axon.axonUtils.isBotAdmin(authorID) ) { // admin prefix + user is admin+ (admin/owner)
            return COMMAND_EXECUTION_TYPES.ADMIN;
        }
        return COMMAND_EXECUTION_TYPES.REGULAR;
    }

    /**
     * Resolves the prefix for the guild of the message.
     * Will resolve the owner or admin prefix if it's an owner or admin execution.
     * It will otherwise regularly resolve the prefix for this particular guild.
     *
     * @param {Message} msg - The message object
     * @param {GuildConfig} [guildConfig] - The guildConfig Object
     * @param {Boolean} [isAdmin=false] - Whether admin prefix was used
     * @param {Boolean} [isOwner=false] - Whether owner prefix was used
     * @returns {String?} The prefix if found / Undefined if not
     * @memberof CommandDispatcher
     */
    resolvePrefix(msg, guildConfig, isAdmin = false, isOwner = false) {
        return (isOwner && this._axon.settings.ownerPrefix)
            || (isAdmin && this._axon.settings.adminPrefix)
            || this.resolveGuildPrefix(msg, guildConfig);
    }

    /**
     * Resolves the prefix for the guild of the message.
     * If the message starts with one of the guild prefixes it returns the prefix, otherwise it returns undefined.
     * Global prefixes will only take over if no prefix are specified in this guild.
     *
     * @param {Message} msg - The message object
     * @param {GuildConfig} [guildConfig] - The guildConfig Object
     * @returns {String?} The prefix if found / Undefined if not
     * @memberof CommandDispatcher
     */
    resolveGuildPrefix(msg, guildConfig) {
        const prefixes = (this.library.message.getGuild(msg) && guildConfig && guildConfig.getPrefixes().length)
            ? guildConfig.getPrefixes() // guild prefixes
            : this._axon.settings.prefixes; // default prefixes
        
        const content = this.library.message.getContent(msg);
        const clientMention = this.library.client.getMention();

        return (content.startsWith(`${clientMention} `) && `${clientMention} `) // prefix = bot mention
            || prefixes.find(prefix => content.startsWith(prefix) );
    }
}

export default CommandDispatcher;
