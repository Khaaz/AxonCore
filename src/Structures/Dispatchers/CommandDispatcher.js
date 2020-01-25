import ADispatcher from './ADispatcher';

/**
 * Class responsible to call the correct command and correct execution flow when needed.
 * Dispatch to the correct command on message create event.
 * Handles prefix resolving and command resolving.
 *
 * @author KhaaZ
 *
 * @class Dispatcher
 * @extends Dispatcher
 *
 * @prop {RegExp} mentionFormatter
 */
class CommandDispatcher extends ADispatcher {
    /**
     * Creates an instance of CommandDispatcher.
     *
     * @param {Object<AxonClient>} axon
     *
     * @memberof Dispatcher
     */
    constructor(axon) {
        super(axon);

        this.mentionFormatter = /<@!/g;
    }

    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @type {Object<LibraryInterface>}
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
     * @param {Object<Message>} msg - Message Object from Eris
     * @returns {Promise}
     *
     * @memberof CommandDispatcher
     */
    async dispatch(msg) {
        const { isAdmin, isOwner } = this.getExecutionType(msg);

        /* Extract necessary attribute from lib structures */
        const author = this.library.message.getAuthor(msg);
        const guild = this.library.message.getGuild(msg);


        /* ignore cached blacklisted users */
        if (!isAdmin && this._axon.axonConfig.isBlacklistedUser(this.library.user.getID(author) ) ) {
            return;
        }

        let guildConfig = null;
        
        /* GUILD execution only */
        if (guild) {
            /* ignore cached blacklisted guilds */
            if (!isAdmin && this._axon.axonConfig.isBlacklistedGuild(this.library.guild.getID(guild) ) ) {
                return;
            }

            /*
             * Get guild Conf from cache or DB
             * Raise error eventually
             */
            try {
                guildConfig = await this._axon.guildConfigs.getOrFetch(this.library.guild.getID(guild) );
            } catch (err) {
                this._axon.log('EMERG', err.stack, { guild } );
                return;
            }
        }
        
        const prefix = this.resolvePrefix(msg, guildConfig, isAdmin, isOwner);
        if (!prefix) {
            return;
        }
        /* msg.prefix doesn't exist. Adding it as reference */
        msg.prefix = prefix; // eslint-disable-line require-atomic-updates

        /* Formatting mention to replace <!@ mention to <@ mentions (uniformise mentions) */
        const content = this.library.message
            .getContent(msg)
            .replace(this.mentionFormatter, '<@');
        this.library.message.setContent(msg, content);

        /* IN GUILD | NOT ADMIN | Check if the user/role/channel is ignored in the guild */
        if (guildConfig && !isAdmin && guildConfig.isIgnored(msg) ) {
            return;
        }

        const args = msg.content.substring(prefix.length).split(' ');
        let label = args.shift().toLowerCase();

        /* Call Help if first arg = 'help' */
        const onHelp = label === 'help';
        if (onHelp) {
            /* If no additional args: send FullHelp */
            if (args.length === 0) {
                this._axon._execHelp(msg, args, null, guildConfig, { isAdmin, isOwner } );
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
        /* msg.command doesn't exist. Adding it as reference */
        msg.command = command; // eslint-disable-line require-atomic-updates

        /* Send help for the resolved command */
        if (onHelp) {
            this._axon._execHelp(msg, args, command, guildConfig, { isAdmin, isOwner } );
            return;
        }

        /* Execute the command */
        this._axon._execCommand(msg, args, command, guildConfig, { isAdmin, isOwner } );
        return;
    }

    // **** UTILITIES **** //

    /**
     * Give the execution type: Owner or Admin execution.
     * It uses the global admin and owner prefixes and checks for the BotStaff rank of the caller.
     *
     * @param {Object<Message>} msg
     * @returns {Object} { isAdmin: Boolean, isOwner: Boolean }
     *
     * @memberof CommandDispatcher
     */
    getExecutionType(msg) {
        const content = this.library.message.getContent(msg);
        const authorID = this.library.message.getAuthorID(msg);

        let isAdmin = false;
        let isOwner = false;

        if (content.startsWith(this._axon.settings.ownerPrefix) && !!this._axon.axonUtils.isBotOwner(authorID) ) { // Owner prefix + user is owner
            isOwner = true;
            isAdmin = true;
        } else if (content.startsWith(this._axon.settings.adminPrefix) && !!this._axon.axonUtils.isBotAdmin(authorID) ) { // admin prefix + user is admin+ (admin/owner)
            isAdmin = true;
        }
        
        return { isAdmin, isOwner };
    }

    /**
     * Resolves the prefix for the guild of the message.
     * Will resolve the owner or admin prefix if it's an owner or admin execution.
     * It will otherwise regularly resolve the prefix for this particular guild.
     *
     * @param {Object<Message>} msg - The message object
     * @param {Object<GuildConfig>} guildConfig - The guildConfig Object
     * @param {Boolean} [isAdmin=false] - The guildConfig Object
     * @param {Boolean} [isOwner=false] - The guildConfig Object
     * @returns {String?} The prefix if found / Undefined if not
     *
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
     * @param {Object<Message>} msg - The message object
     * @param {Object<GuildConfig>} guildConfig - The guildConfig Object
     * @returns {String?} The prefix if found / Undefined if not
     *
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
