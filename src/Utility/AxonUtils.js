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
     *Creates an instance of AxonUtils.

     * @param {Object<AxonClient>} axon
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} Resolver - Resolver Object/Methods [GETTER: axon.Resolver]
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

    get Template() {
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
     * Triger an Axon Webhook
     * Works directly with axon._configs._tokens [GETTER: axon.webhooks]
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
    // ****** PERMISSIONS ******
    //

    /**
     * Check if the user has correct perm in targeted channel
     *
     * @param {Object<Channel>} channel - Channel object
     * @param {Array<String>} permissions - List of permissions to test
     * @param {Object<User>} [user=this.bot.user] - User to test
     * @returns {Boolean} True if user has permissions / False if not
     * @memberof AxonUtils
     */
    hasChannelPerms(channel, permissions, user = this.bot.user) {
        for (const perm of permissions) {
            if (!channel.permissionsOf(user.id).has(perm)) {
                return false;
            }
        }
        return true;
    }

    /**
     * List all missing perms for a user
     *
     * @param {Object<Member>} member
     * @param {Array<String>} [permissions=[]] - List of permissions to test
     * @returns {Array<String>} An array of missing permissions
     * @memberof AxonUtils
     */
    missingPerms(member, permissions = []) {
        const missing = [];
        for (const perm of permissions) {
            if (!member.permission.has(perm)) {
                missing.push(perm);
            }
        }
        return missing;
    }

    /**
     * Check if the member has correct perm to execute
     *
     * @param {Object<Member>} member - Member object
     * @param {Array<String>} permissions - List of permissions to test
     * @returns {Boolean} True if member has permissions / False if not
     * @memberof AxonUtils
     */
    hasPerms(member, permissions = []) {
        for (const perm of permissions) {
            if (!member.permission.has(perm)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if the user is bot owner
     *
     * @param {String} uID - the user ID
     * @returns {Boolean}
     * @memberof AxonUtils
     */
    isBotOwner(uID) {
        return this.axon.staff.owners.find(u => u === uID);
    }

    /**
     * Check if the user is bot admin
     *
     * @param {String} uID - the user ID
     * @returns {Boolean}
     * @memberof AxonUtils
     */
    isBotAdmin(uID) {
        return this.isBotOwner(uID) || this.axon.staff.admins.find(u => u === uID);
    }

    /**
     * Check if the user is bot staff
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
     * Check is the user is an Admin
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
     * Check if the user is a mod or higher (admins are always mod)
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
     * Check for bot permissions + message/embed length
     * Doesn't support file
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object/String} content - Message content, String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendMessage(channel, content, options = {}) {
        if (channel.guild && !this.hasChannelPerms(channel, ['sendMessages'])) { // check if bot has sendMessage perm in the channel.
            this.Logger.verbose(`No sendMessage perms [${channel.guild.name} - ${channel.guild.name}]!`);
            return Promise.resolve();
        }

        if (content instanceof Object && content.embed) {
            if (channel.guild && !this.hasChannelPerms(channel, ['embedLinks'])) { // check if bot has embedPermission perm in the channel.
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
     * Edit a message
     * Check for bot permissions + message embed/length
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
            if (message.channel.guild && !this.hasChannelPerms(message.channel, ['embedLinks'])) { // check if bot has embedLinks perm in the channel.
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
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param {Object<User>} user - User object to get the DM channel
     * @param {Object/String} content - String or object (embed)
     * @param {Object} options - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendDM(user, content, options) {
        return this.bot.getDMChannel(user.id)
            .then(chan => this.sendMessage(chan, content, options))
            .catch(this.Logger.verbose(`DM disabled/Bot blocked [${user.username}#${user.discriminator} - ${user.id}]!`));
    }

    /**
     * Send an error message. Add the error emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - Error message content (String only)
     * @param {Object} options - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendError(channel, content, options) {
        return this.sendMessage(channel, `${this.Template.emote.error} ${content}`, options);
    }

    /**
     * Send a success message. Add the success emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - Error message content (String only)
     * @param {Object} options - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @returns {Promise<Message?>} Message Object
     * @memberof AxonUtils
     */
    sendSuccess(channel, content, options) {
        return this.sendMessage(channel, `${this.Template.emote.success} ${content}`, options);
    }

    /**
     * Handle errors (send error message/log)
     * Call sendError
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

        errMsg = errMsg || this.Template.message.error.general;

        if (err) {
            err.message = `Type: ${typeList[type.toLowerCase()]} | ${err.message}`;
            throw err;
        }
        this.Logger.emerg(`Unexpected error [${msg.channel.guild.name} - ${msg.channale.guild.id}]!\n${err.stack}`);
        return this.sendError(msg.channel, errMsg);
    }
}


export default AxonUtils;
