import Validater from '../Structures/Validater';

/**
 * AxonCore Utility Class.
 *
 * AxonCore specific methods + internal uses
 *
 * @author KhaaZ
 *
 * @class AxonUtils
 *
 * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
 * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.botClient]
 * @prop {Object} logger - Logger Object/Methods [GETTER: axon.logger]
 * @prop {Object} utils - Utils Object/Methods [GETTER: axon.utils]
 */
class AxonUtils {
    /**
     * Creates an AxonUtils instance.
     *
     * @param {Object<AxonClient>} axon
     *
     * @memberof AxonUtils
     */
    constructor(axon) {
        this._axon = axon;
    }

    // **** GETTER **** //

    get axon() {
        return this._axon;
    }

    get bot() {
        return this.axon.botClient;
    }

    get template() {
        return this.axon.configs.template;
    }

    get logger() {
        return this.axon.logger;
    }

    get utils() {
        return this.axon.utils;
    }

    //
    // ****** MISC ******
    //

    /**
     * Triger an Axon Webhook.
     * Works directly with axon._configs._tokens. [GETTER: axon.webhooks]
     *
     * @param {String} type - Type of the webhook [status, loader, error, misc]
     * @param {Object} embed - Embed object
     * @param {String} opt - Optional string to use as bot username
     * @memberof AxonUtils
     */
    triggerWebhook(type, embed, opt) {
        const wh = this.axon.webhooks[type];
        if (wh && wh.id && wh.token && wh.id.length > 0 && wh.token.length) {
            this.bot.executeWebhook(
                wh.id,
                wh.token,
                {
                    username: opt ? opt : (`${type[0].toUpperCase() + type.slice(1)} - ${this.axon.botClient.user ? this.axon.botClient.user.username : ''}`),
                    avatarURL: this.axon.botClient.user ? this.axon.botClient.user.avatarURL : null,
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
     *
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
     *
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
     *
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
     * @param {Object<Member>} member - The member object
     * @param {Object} guildConfig - The guild Config from the DB
     * @returns {Boolean} True if user is a mod / False if not
     *
     * @memberof AxonUtils
     */
    isServerMod(member, guildConfig) {
        if (guildConfig.isModUser(member.id) ) {
            return true;
        }

        const { roles } = member;
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
     * @param {Object<Member>} member - The member object
     * @returns {Boolean} True if admin / False if not
     *
     * @memberof AxonUtils
     */
    isServerManager(member) {
        return member.permission.has('manageGuild');
    }

    /**
     * Check is the user is an admin (administrator permission).
     * Owner is automatically Admin.
     *
     * @param {Object<Member>} member - The member object
     * @returns {Boolean} True if admin / False if not
     *
     * @memberof AxonUtils
     */
    isServerAdmin(member) {
        return member.permission.has('administrator');
    }

    /**
     * Check is the user is the server owner.
     *
     * @param {Object<Member>} member - The member object
     * @returns {Boolean} True if admin / False if not
     *
     * @memberof AxonUtils
     */
    isServerOwner(member, guild) {
        return guild.ownerID === member.id;
    }

    // **** MESSAGES METHODS **** //

    /**
     * Message the targeted user if the bot is able to retrieve their DM channel.
     * Reject promise if not
     *
     * @param {Object<User>} user - User object to get the DM channel
     * @param {Object/String} content - String or object (embed)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendDM(user, content, options) {
        return this.bot.getDMChannel(user.id)
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
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object|String} content - Message content: String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to deletethe message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     *
     * @memberof AxonUtils
     */
    sendMessage(channel, content, options = {} ) {
        if (channel.guild && !this.utils.hasChannelPerms(channel, ['sendMessages'] ) ) { // check if bot has sendMessage perm in the channel.
            this.logger.verbose(`No sendMessage perms [${channel.guild.name} - ${channel.guild.name}]!`);
            return Promise.resolve(false);
        }

        if (channel.guild && content.embed && !this.utils.hasChannelPerms(channel, ['embedLinks'] ) ) { // check if bot has embedPermission perm in the channel.
            /** @TODO message for missing embed perm? - checked at command permissions level? */
            this.logger.verbose(`No embedLinks perms [${channel.guild.name} - ${channel.guild.name}]!`);
            return Promise.resolve(false);
        }

        if (!Validater.checkMessageValidity(content) ) { // will throw
            return Promise.resolve(false);
        }

        if (typeof content !== 'object' || content === null) {
            content = { content: `${content}` };
        }
        content.disableEveryone = !!options.disableEveryone;

        return channel.createMessage(content)
            .then(message => {
                /** Delete the message automatically */
                if (message && options.delete) {
                    if (options.delay) {
                        this.utils.sleep(options.delay).then( () => message.delete().catch(this.logger.warn) );
                    } else {
                        message.delete().catch(this.logger.warn);
                    }
                }
                return message;
            } );
    }

    /**
     * Edit a message.
     * Checks for bot permissions + message embed/length.
     *
     * @param {Object<Message>} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>} Message Object
     *
     * @memberof AxonUtils
     */
    editMessage(message, content) {
        if (!Validater.checkMessageValidity(content) ) { // will throw
            return Promise.resolve(false);
        }

        if (message.channel.guild && content.embed && !this.utils.hasChannelPerms(message.channel, ['embedLinks'] ) ) { // check if bot has embedPermission perm in the channel.
            /** @TODO message for missing embed perm? - checked at command permissions level? */
            this.logger.verbose(`No embedLinks perms [${message.channel.guild.name} - ${message.channel.guild.name}]!`);
            return Promise.resolve(false);
        }

        return message.edit(content);
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
        this.logger.info(`Globally ${state ? 'enabled' : 'disabled'} module: ${module}.`);
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
        this.logger.info(`Globally ${state ? 'enabled' : 'disabled'} command: ${command}.`);
    }
}


export default AxonUtils;
