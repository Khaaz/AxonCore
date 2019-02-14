'use strict';

import Enums from './Enums';

/**
 * Utility Class for AxonCore
 *
 * AxonClient Specific methods
 * Internal uses + external
 * All methods useful for internal uses or AxonClient specific
 *
 * @author KhaaZ
 *
 * @class AxonUtils
 */
class AxonUtils {
    /**
     * Creates an AxonUtils instance.
     *
     * @param {Object<AxonClient>} axon
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} AxonUtils - AxonUtils Object/Methods [GETTER: axon.AxonUtils]
     * @prop {Object} Utils - Utils Object/Methods [GETTER: axon.Utils]
     *
     * @memberof AxonUtils
     */
    constructor(axon) {
        this._axon = axon;
    }

    //
    // ****** GETTER ******
    //

    get axon() {
        return this._axon;
    }

    get bot() {
        return this.axon.client;
    }

    get template() {
        return this.axon.configs.template;
    }

    get Logger() {
        return this.axon.Logger;
    }

    get Utils() {
        return this.axon.Utils;
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
                    username: opt ? opt : (`${type[0].toUpperCase() + type.slice(1)} - ${this.axon.client.user ? this.axon.client.user.username : ''}`),
                    avatarURL: this.axon.client.user ? this.axon.client.user.avatarURL : null,
                    embeds: [
                        embed,
                    ],
                })
                .catch(err => {
                    this.axon.Logger.error('[TriggerWebhook] Webhook issue\n' + err);
                });
        }
    }

    //
    // ****** CHECKERS ******
    //

    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @param {Object<Message>} msg
     * @param {Object} guildConf
     * @returns {Boolean} True if either one of the three is ignored / False if none
     * @memberof AxonClient
     */
    isIgnored(msg, guildConf) {
        return guildConf.ignoredUsers.find(u => u === msg.author.id) // User is ignored
            || guildConf.ignoredRoles.find(r => msg.member.roles && msg.member.roles.includes(r)) // Role is ignored
            || guildConf.ignoredChannels.find(c => c === msg.channel.id); // Channel is ignored
    }

    /**
     * Check if the module is disabled on the specified guild.
     *
     * @param {Object<Command>} command - The command object
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} True if disabled / Undefined if not
     * @memberof AxonClient
     */
    isModuleDisabled(command, guildConf) {
        return guildConf.modules.find(m => m === command.module.label);
    }

    /**
     * Check if the command is disabled on the specified guild.
     *
     * @param {Object<Command>} command - The command object
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} True if disabled / Undefined if not
     * @memberof AxonClient
     */
    isCommandDisabled(command, guildConf) {
        return guildConf.commands.find(c => c === command.label);
    }

    //
    // ****** BOT STAFF ******
    //

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
            if (rank.find(u => u === uID)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check is the user is an admin.
     *
     * @param {Object<Member>} member - The member object
     * @returns {Boolean} True if admin / False if not
     * @memberof AxonUtils
     */
    isAdmin(member) {
        for (const perm of Enums.adminPerms) {
            if (member.permission.has(perm)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if the user is a moderator or higher. Admins are also moderators.
     *
     * @param {Object<Member>} member - The member object
     * @param {Object} guildConf - The guild Config from the DB
     * @returns {Boolean} True if user is a mod / False if not
     * @memberof AxonUtils
     */
    isMod(member, guildConf) {
        if (guildConf.modUsers.find(u => u === member.id)) {
            return true;
        }

        const roles = member.roles;
        for (const role of guildConf.modRoles) {
            if (roles.find(r => r === role)) {
                return true;
            }
        }

        return this.isAdmin(member);
    }

    //
    // ****** MESSAGES METHODS ******
    //

    /**
     * Send a message.
     * Checks for bot permissions + message/embed length.
     * Doesn't support file uploads.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object|String} content - Message content: String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendMessage(channel, content, options = {}) {
        if (channel.guild && !this.Utils.hasChannelPerms(channel, ['sendMessages'])) { // check if bot has sendMessage perm in the channel.
            this.Logger.verbose(`No sendMessage perms [${channel.guild.name} - ${channel.guild.name}]!`);
            return Promise.resolve();
        }

        if (content instanceof Object && content.embed) {
            if (channel.guild && !this.Utils.hasChannelPerms(channel, ['embedLinks'])) { // check if bot has embedPermission perm in the channel.
                this.Logger.verbose(`No embedLinks perms [${channel.guild.name} - ${channel.guild.name}]!`);
                return Promise.resolve();
            }

            if (content.content && content.content.length > 2000) {
                throw new Error('[MESSAGE]: content > 2000');
            }

            if (content.embed.length > 6000) {
                throw new Error('[MESSAGE-EMBED]: embed > 6000');
            }
            if (content.embed.description && content.embed.description.length > 2048) {
                throw new Error('[MESSAGE-EMBED]: description > 2048');
            }
            if (content.embed.title && content.embed.title.length > 256) {
                throw new Error('[MESSAGE-EMBED]: title > 256');
            }
            if (content.embed.author && content.embed.author.name && content.embed.author.name.length > 256) {
                throw new Error('[MESSAGE-EMBED]: author > 256');
            }
            if (content.embed.footer && content.embed.footer.text && content.embed.footer.text.length > 2048) {
                throw new Error('[MESSAGE-EMBED]: footer > 2048');
            }
            if (content.embed.fields) {
                if (content.embed.fields.length > 25) {
                    throw new Error('[MESSAGE-EMBED]: fields > 25');
                }
                for (const field in content.embed.fields) {
                    if (field.name > 256 || field.value > 1024) {
                        throw new Error('[MESSAGE-EMBED]: field: name > 256 ; value > 1024');
                    }
                }
            }
        } else if (typeof content === 'string' && content.length > 2000) {
            throw new Error('[MESSAGE]: content > 2000');
        }

        if (typeof content !== 'object' || content === null) {
            content = { content: '' + content };
        }
        content.disableEveryone = !!options.disableEveryone;

        return channel.createMessage(content)
            .then(message => {
                /** Delete the message automatically */
                if (message && options.delete) {
                    if (options.delay) {
                        this.Utils.sleep(options.delay).then(() => message.delete().catch(console.log));
                    } else {
                        message.delete().catch(console.log);
                    }
                }
                return message;
            });
    }

    /**
     * Edit a message.
     * Checks for bot permissions + message embed/length.
     *
     * @param {Object<Message>} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    editMessage(message, content) {
        if (!message || !content) {
            return Promise.resolve();
        }
        if (content instanceof Object) {
            if (message.channel.guild && !this.Utils.hasChannelPerms(message.channel, ['embedLinks'])) { // check if bot has embedLinks perm in the channel.
                this.Logger.verbose(`No embedLinks perms [${message.channel.guild.name} - ${message.channel.guild.name}]!`);
                return Promise.resolve();
            }

            if (content.content.length > 2000) {
                throw new Error('[MESSAGE]: content > 2000');
            }

            if (content.embed.length > 6000) {
                throw new Error('[MESSAGE-EMBED]: embed > 6000');
            }
            if (content.embed.description && content.embed.description.length > 2048) {
                throw new Error('[MESSAGE-EMBED]: description > 2048');
            }
            if (content.embed.title && content.embed.title.length > 256) {
                throw new Error('[MESSAGE-EMBED]: title > 256');
            }
            if (content.embed.author && content.embed.author.name && content.embed.author.name.length > 256) {
                throw new Error('[MESSAGE-EMBED]: author > 256');
            }
            if (content.embed.footer && content.embed.footer.text && content.embed.footer.text.length > 2048) {
                throw new Error('[MESSAGE-EMBED]: footer > 2048');
            }
            if (content.embed.fields) {
                if (content.embed.fields.length > 25) {
                    throw new Error('[MESSAGE-EMBED]: fields > 25');
                }
                for (const field in content.embed.fields) {
                    if (field.name > 256 || field.value > 1024) {
                        throw new Error('[MESSAGE-EMBED]: field: name > 256 ; value > 1024');
                    }
                }
            }
        } else if (typeof content === 'string' && content.length > 2000) {
            throw new Error('[MESSAGE]: content > 2000');
        }

        return message.edit(content);
    }

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
            .then(chan => this.sendMessage(chan, content, options))
            .catch(this.Logger.verbose(`DM disabled/Bot blocked [${user.username}#${user.discriminator} - ${user.id}]!`));
    }

    /**
     * Send an error message. Adds an error emote to the content.
     * Checks for sendMessage permission.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - Error message content (String only)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendError(channel, content, options) {
        return this.sendMessage(channel, `${this.template.emote.error} ${content}`, options);
    }

    /**
     * Send a success message. Adds a success emote to the content.
     * Checks for sendMessage perms.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - Error message content (String only)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendSuccess(channel, content, options) {
        return this.sendMessage(channel, `${this.template.emote.success} ${content}`, options);
    }

    /**
     * Handles errors and sends an error message/log.
     * Calls sendError().
     *
     * @param {Object<Message>} msg - The message Object
     * @param {Object<Error>} err - The error message
     * @param {String} type - Type of error (api, db, internal)
     * @param {String} errMsg - Optional error message
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    error(msg, err, type, errMsg) {
        const typeList = Enums.typeError;

        errMsg = errMsg || this.template.message.error.general;

        if (err) {
            err.message = `Type: ${typeList[type.toLowerCase()]} | ${err.message}`;
            throw err;
        }
        this.Logger.emerg(`Unexpected error [${msg.channel.guild.name} - ${msg.channale.guild.id}]!\n${err.stack}`);
        return this.sendError(msg.channel, errMsg);
    }

    //
    // ****** GENERAL CLIENT METHODS ******
    //

    /**
     * Add/Remove a blacklisted user.
     * External method that can be called to add a user to the blacklist.
     *
     * @async
     * @param {String} userID - The id of the user to blacklist
     * @param {Boolean} [boolean=true] - Whether to add(true) or remove(false) the user to blacklist
     * @returns {Promise<Object>} The Axon Schema from the DB / Error
     * @memberof AxonClient
     */
    async updateBlacklistUser(userID, boolean = true) {
        if (boolean) {
            !this.axon.blacklistedUsers.has(userID) && this.axon.blacklistedUsers.add(userID);
        } else {
            this.axon.blacklistedUsers.has(userID) && this.axon.blacklistedUsers.delete(userID);
        }
        const blacklist = Array.from(this.axon.blacklistedUsers);
        try {
            const axon = await this.axon.DBprovider.updateBlacklistUser(blacklist);
            return axon;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Add/Remove a blacklisted guild.
     * External method that can be called to add a guild to the blacklist
     *
     * @async
     * @param {String} guildID - The id of the guild to blacklist
     * @param {Boolean} [boolean=true] - if add(true) or remove(false) the guild to blacklist
     * @returns {Promise<Object>} The Axon Schema from the DB / Error
     * @memberof AxonClient
     */
    async updateBlacklistGuild(userID, boolean = true) {
        if (boolean) {
            !this.axon.blacklistedGuilds.has(userID) && this.axon.blacklistedGuilds.add(userID);
        } else {
            this.axon.blacklistedGuilds.has(userID) && this.axon.blacklistedGuilds.delete(userID);
        }
        const blacklist = Array.from(this.axon.blacklistedUsers);
        try {
            const axon = await this.axon.DBprovider.updateBlacklistGuild(blacklist);
            return axon;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates the state of a module.
     * true = disable the module, false = enable the module
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The module label
     * @param {Boolean} [boolean=true] - If disable the module (false) or enable (true)
     * @returns {Promise<Object>} Updated guildSchema / Error
     * @memberof AxonClient
     */
    async updateGuildStateModule(guildID, label, boolean = true) {
        let conf;
        try {
            conf = await this.axon.getGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean
            ? conf.modules.includes(label) && (conf.modules = conf.modules.filter(c => c !== label))
            : !conf.modules.includes(label) && conf.modules.push(label);

        try {
            const newConf = await this.axon.DBprovider.updateModule(guildID, conf.modules);
            this.axon.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates the state of a command.
     * true = disable the command, false = enable the command.
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The command label
     * @param {Boolean} [boolean=true] - If disable the command (false) or enable (true)
     * @returns {Promise<Object>} Updated guildSchema / Error
     * @memberof AxonClient
     */
    async updateGuildStateCommand(guildID, label, boolean = true) {
        let conf;
        try {
            conf = await this.axon.getGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean
            ? conf.commands.includes(label) && (conf.commands = conf.commands.filter(c => c !== label))
            : !conf.commands.includes(label) && conf.commands.push(label);

        try {
            const newConf = await this.axon.DBprovider.updateCommand(guildID, conf.commands);
            this.axon.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates the state of an event.
     * true = disable the event, false = enable the event.
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The event label
     * @param {Boolean} [boolean=true] - If disable the event (false) or enable (true)
     * @returns {Promise<Object>} Updated guildSchema / Error
     * @memberof AxonClient
     */
    async updateGuildStateEvent(guildID, label, boolean = true) {
        let conf;
        try {
            conf = await this.axon.getGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean
            ? conf.events.includes(label) && (conf.events = conf.events.filter(c => c !== label))
            : !conf.events.includes(label) && conf.events.push(label);

        try {
            const newConf = await this.axon.DBprovider.updateEvent(guildID, conf.events);
            this.axon.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Enables or disables a module globally.
     *
     * @param {String} module - Module name
     * @param {Boolean} [state=true] - Whether to enable or disable
     * @memberof AxonClient
     */
    updateGlobalStateModule(module, state = true) {
        this.axon.modules.get(module).enabled = state;
        this.Logger.info(`Globally ${state ? 'enabled' : 'disabled'} module: ${module}.`);
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
        this.Logger.info(`Globally ${state ? 'enabled' : 'disabled'} command: ${command}.`);
    }
}


export default AxonUtils;
