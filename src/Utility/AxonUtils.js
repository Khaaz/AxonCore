import Validator from '../Structures/Validator';

/**
 * AxonCore Utility Class.
 *
 * AxonCore specific methods + internal uses
 *
 * @author KhaaZ
 *
 * @class AxonUtils
 *
 * @prop {AxonClient} _axon - Axon Client
 *
 */
class AxonUtils {
    /**
     * Creates an AxonUtils instance.
     *
     * @param {AxonClient} axon
     * @memberof AxonUtils
     */
    constructor(axon) {
        this._axon = axon;
    }

    // **** GETTER **** //

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     * @memberof AxonUtils
     */
    get axon() {
        return this._axon;
    }

    /**
     * Returns the BotClient instance
     *
     * @readonly
     * @type {BotClient}
     * @memberof AxonUtils
     */
    get bot() {
        return this.axon.botClient;
    }

    /**
     * Returns the template object
     *
     * @readonly
     * @type {Object}
     * @memberof AxonUtils
     */
    get template() {
        return this.axon.template;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Logger}
     * @memberof AxonUtils
     */
    get logger() {
        return this.axon.logger;
    }

    /**
     * Returns the Utils instance
     *
     * @readonly
     * @type {Utils}
     * @memberof AxonUtils
     */
    get utils() {
        return this.axon.utils;
    }

    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @type {LibraryInterface}
     * @memberof AxonUtils
     */
    get library() {
        return this.axon.library;
    }

    //
    // ****** MISC ******
    //

    /**
     * Trigger an Axon Webhook.
     * Works directly with axon._configs.webhooks.
     *
     * @param {String} type - Type of the webhook [status, loader, error, misc]
     * @param {Object} embed - Embed object
     * @param {String} opt - Optional string to use as bot username
     * @memberof AxonUtils
     */
    triggerWebhook(type, embed, opt) {
        const wh = this.axon.webhooks[type] || {};
        if (wh.id && wh.token && wh.id.length > 0 && wh.token.length) {
            this.library.client.triggerWebhook(
                wh.id,
                wh.token,
                {
                    username: opt ? opt : (`${type} - ${this.library.client.getUsername() || ''}`),
                    avatarURL: this.library.client.getAvatar(),
                    embeds: [embed],
                } )
                .catch(err => {
                    this.axon.logger.error(`[TriggerWebhook] Webhook issue\n${err}`);
                } );
        }
    }

    // **** BOT PERMISSIONS **** //

    /**
     * Check if the user is a bot owner.
     *
     * @param {String} uID - the user ID
     * @returns {Boolean}
     * @memberof AxonUtils
     */
    isBotOwner(uID) {
        return this.axon.staff.owners.find(u => u === uID);
    }

    /**
     * Check if the user is a bot admin.
     *
     * @param {String} uID - the user ID
     * @returns {Boolean}
     * @memberof AxonUtils
     */
    isBotAdmin(uID) {
        return this.isBotOwner(uID) || this.axon.staff.admins.find(u => u === uID);
    }

    /**
     * Check if the user is part of the bot staff.
     *
     * @param {String} uID - the user ID
     * @returns {Boolean}
     * @memberof AxonUtils
     */
    isBotStaff(uID) {
        for (const rank in this.axon.staff) {
            if (rank.find(u => u === uID) ) {
                return true;
            }
        }
        return false;
    }

    // **** SERVER PERMISSIONS **** //

    /**
     * Check if the user is a moderator or higher. Admins are also moderators.
     * Managers, Admins and Owner are automatically Mod.
     *
     * @param {Member} member - The member object
     * @param {Object} guildConfig - The guild Config from the DB
     * @returns {Boolean} True if user is a mod / False if not
     * @memberof AxonUtils
     */
    isServerMod(member, guildConfig) {
        if (guildConfig.isModUser(member.id) ) {
            return true;
        }

        const roles = this.library.member.getRoles(member);
        for (const role of roles) {
            if (guildConfig.isModRole(role) ) {
                return true;
            }
        }

        return this.isServerManager(member); // ServerOwner and Admins are automatically managers
    }

    /**
     * Check is the user is a server manager (manage server permission).
     * Admin and Owner are automatically Manager.
     *
     * @param {Member} member - The member object
     * @returns {Boolean} True if admin / False if not
     * @memberof AxonUtils
     */
    isServerManager(member) {
        return this.library.member.hasPermission(member, this.library.enums.DISCORD_LIB_PERMISSIONS.MANAGE_GUILD);
    }

    /**
     * Check is the user is an admin (administrator permission).
     * Owner is automatically Admin.
     *
     * @param {Member} member - The member object
     * @returns {Boolean} True if admin / False if not
     * @memberof AxonUtils
     */
    isServerAdmin(member) {
        return this.library.member.hasPermission(member, this.library.enums.DISCORD_LIB_PERMISSIONS.ADMINISTRATOR);
    }

    /**
     * Check is the user is the server owner.
     *
     * @param {Member} member - The member object
     * @returns {Boolean} True if admin / False if not
     * @memberof AxonUtils
     */
    isServerOwner(member, guild) {
        return this.library.guild.getOwnerID(guild) === this.library.member.getID(member);
    }

    // **** MESSAGES METHODS **** //

    /**
     * Message the targeted user if the bot is able to retrieve their DM channel.
     * Reject promise if not
     *
     * @param {User} user - User object to get the DM channel
     * @param {Object/String} content - String or object (embed)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to delete the message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendDM(user, content, options = {} ) {
        this.library.user.getDM(user)
            .then(chan => this.sendMessage(chan, content, options) )
            .catch(err => {
                this.logger.verbose(`DM disabled/Bot blocked [${user.username}#${user.discriminator} - ${user.id}]!`);
                throw err;
            } );
    }

    /**
     * Send a message.
     * Checks for bot permissions + message/embed length.
     * Doesn't support file uploads.
     *
     * @param {Channel} channel - The channel Object
     * @param {Object|String} content - Message content: String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to delete the message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendMessage(channel, content, options = {} ) {
        const guild = this.library.channel.getGuild(channel);
        if (guild && !this.utils.hasChannelPerms(channel, [this.library.enums.DISCORD_LIB_PERMISSIONS.SEND_MESSAGES] ) ) { // check if bot has sendMessage perm in the channel.
            this.logger.verbose(`No sendMessage perms [${this.library.channel.getGuildName(channel)} - ${this.library.channel.getName(channel)}]!`);
            return Promise.resolve(false);
        }

        if (guild && content.embed && !this.utils.hasChannelPerms(channel, [this.library.enums.DISCORD_LIB_PERMISSIONS.EMBED_LINKS] ) ) { // check if bot has embedPermission perm in the channel.
            /** @TODO message for missing embed perm? - checked at command permissions level? */
            this.logger.verbose(`No embedLinks perms [${this.library.channel.getGuildName(channel)} - ${this.library.channel.getName(channel)}]!`);
            return Promise.resolve(false);
        }

        if (!Validator.checkMessageValidity(content) ) { // will throw
            return Promise.resolve(false);
        }

        if (typeof content !== 'object' || content === null) {
            content = { content: `${content}` };
        }
        content.disableEveryone = !!options.disableEveryone;

        return this.library.channel.sendMessage(channel, content)
            .then(message => {
                /* Delete the message automatically */
                if (message && options.delete) {
                    if (options.delay) {
                        this.utils.sleep(options.delay).then( () => this.library.message.delete(message).catch(this.logger.warn) );
                    } else {
                        this.library.message.delete(message).catch(this.logger.warn);
                    }
                }
                return message;
            } );
    }

    /**
     * Edit a message.
     * Checks for bot permissions + message embed/length.
     *
     * @param {Message} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    editMessage(message, content) {
        if (!Validator.checkMessageValidity(content) ) { // will throw
            return Promise.resolve(false);
        }

        const channel = this.library.message.getChannel(message);
        if (this.library.message.getGuild(message) && content.embed && !this.utils.hasChannelPerms(channel, [this.library.enums.DISCORD_LIB_PERMISSIONS.EMBED_LINKS] ) ) { // check if bot has embedPermission perm in the channel.
            /** @TODO message for missing embed perm? - checked at command permissions level? */
            this.logger.verbose(`No embedLinks perms [${this.library.channel.getGuildName(channel)} - ${this.library.channel.getName(channel)}]!`);
            return Promise.resolve(false);
        }

        return this.library.message.edit(message, content);
    }

    // **** CLIENT METHODS **** //

    /**
     * Enables or disables a module globally.
     *
     * @param {String} module - Module name
     * @param {Boolean} [state=true] - Whether to enable or disable
     * @memberof AxonClient
     */
    updateGlobalStateModule(module, state = true) {
        this.axon.modules.get(module).enabled = state;
        this.log('NOTICE', `Globally ${state ? 'enabled' : 'disabled'} module: ${module}.`);
    }

    /**
     * Enables or disables a command globally.
     *
     * @param {String} command - Command name
     * @param {Boolean} [state=true] - Whether to enable or disable
     * @memberof AxonClient
     */
    updateGlobalStateCommand(command, state = true) {
        this.axon.commands.get(command).enabled = state;
        this.log('NOTICE', `Globally ${state ? 'enabled' : 'disabled'} command: ${command}.`);
    }
}


export default AxonUtils;
