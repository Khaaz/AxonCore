import util from 'util';

import CommandResponse from './Command/CommandResponse';

import { TYPE_ERRORS } from '../Utility/Constants/AxonEnums';

/**
 * @typedef {import('../AxonClient').default} AxonClient
 * @typedef {import('../Loggers/ALogger').default} ALogger
 * @typedef {import('../Libraries/definitions/Resolver').default} Resolver
 * @typedef {import('../Utility/AxonUtils').default} AxonUtils
 * @typedef {import('../Utility/Utils').default} Utils
 * @typedef {import('../Langs/MessageManager').default} MessageManager
 * @typedef {import('./Module').default} Module
 * @typedef {import('./Command/Command').default} Command
 * @typedef {import('../Utility/Constants/AxonEnums').LOG_LEVELS} LOG_LEVELS
 * @typedef {{
 * title?: String, description?: String, url?: String, timestamp?: Date|String, color?: Number, footer?: { text: String, icon_url?: String },
 * image?: { url: String, height?: Number, width?: Number }, thumbnail?: { url: String, height?: Number, width?: Number },
 * fields?: Array<{ name: String, value: String, inline?: Boolean }>, author?: { name: String, url?: String, icon_url?: String }
 * }} EmbedBase
 * @typedef {import('../Utility/Discord/Embed').default} Embed
 * @typedef {{ content?: String, embed?: Embed|EmbedBase }} MessageObject
 */

/**
 * Base Class with default properties and utility methods used by all Commands / Modules / Events.
 *
 * @author KhaaZ
 *
 * @class Base
 *
 * @prop {AxonClient} _axon - AxonClient
 */
class Base {
    /**
     * Creates an instance of Base.
     *
     * @param {AxonClient} axonClient
     * @memberof Base
     */
    constructor(axonClient) {
        this._axon = axonClient;
    }

    // **** GETTER **** //

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     * @memberof Base
     */
    get axon() {
        return this._axon;
    }

    /**
     * Returns the bot client instance
     *
     * @readonly
     * @type {Client}
     * @memberof Base
     */
    get bot() {
        return this.axon.botClient;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {ALogger}
     * @memberof Base
     */
    get logger() {
        return this.axon.logger;
    }

    /**
     * Returns the Resolver class (Based on AxonClient.Resolver (default: use the current library Resolver))
     *
     * @readonly
     * @type {Resolver}
     * @memberof Base
     */
    get Resolver() {
        return this.axon.Resolver;
    }

    /**
     * Returns the AxonUtils instance
     *
     * @readonly
     * @type {AxonUtils}
     * @memberof Base
     */
    get axonUtils() {
        return this.axon.axonUtils;
    }

    /**
     * Returns the Utils instance
     *
     * @readonly
     * @type {Utils}
     * @memberof Base
     */
    get utils() {
        return this.axon.utils;
    }

    /**
     * Returns the MessageManager instance
     *
     * @readonly
     * @type {MessageManager}
     * @memberof Base
     */
    get l() {
        return this.axon.l;
    }

    /**
     * Get a module from AxonClient with the label
     *
     * @param {String} module - Module label
     * @returns {Module|null}
     * @memberof Base
     */
    getModule(module) {
        return this.axon.getModule(module);
    }

    /**
     * Get a command/subcommand from AxonClient with the full label
     *
     * @param {String} fullLabel - Full command (or subcommand) label
     * @returns {Command|null}
     * @memberof Base
     */
    getCommand(fullLabel) {
        return this.axon.getCommand(fullLabel);
    }

    /**
     * Log both to console and to the correct webhook
     *
     * @param {LOG_LEVELS} level - The LOG-LEVEL
     * @param {String|Error} content - The content or the error to log
     * @param {Object} [ctx=null] - Additional context to be passed to logger
     * @param {Guild|String} ctx.guild
     * @param {String} ctx.cmd
     * @param {User|String} ctx.user
     * @param {Boolean} [execWebhook=true] - Whether to execute the webhook
     * @memberof AxonClient
     */
    log(level, content, ctx = null, execWebhook = true) {
        this.axon.log(level, content, ctx, execWebhook);
    }
    // **** METHODS - API/SENDER **** //

    /**
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param {User} user - User object to get the DM channel
     * @param {String|MessageObject} content - String or object (embed)
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    sendDM(user, content) {
        return this.axonUtils.sendDM(user, content);
    }

    /**
     * Send a message.
     * Check for bot permissions + message/embed length
     * Doesn't support file
     *
     * @param {Channel} channel - The channel Object
     * @param {String|MessageObject} content - Message content, String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to delete the message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    sendMessage(channel, content, options = {} ) {
        return this.axonUtils.sendMessage(channel, content, options);
    }

    /**
     * Edit a message
     * Check for bot permissions + message embed/length
     *
     * @param {Message} message - The message object to edit
     * @param {MessageObject} content - Object (embed) or String
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    editMessage(message, content) {
        return this.axonUtils.editMessage(message, content);
    }

    /**
     * Send a success message. If the content is a string, suffix the success emote to the content.
     * Check for sendMessage perms.
     * Await for sendMessage to throw correctly potential errors.
     *
     * @param {Channel} channel - The channel Object
     * @param {String|MessageObject} content - Success message content
     * @param {Object} [options={}] - Additional options
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to delete the message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @param {Boolean} [options.triggerCooldown=true] - Whether the command should trigger cooldown or not
     * @returns {Promise<CommandResponse>} The successful Command Response
     * @memberof Base
     */
    async sendSuccess(channel, content, options = {} ) {
        const triggerCooldown = options.triggerCooldown !== false;
        if (typeof content === 'string') {
            await this.sendMessage(channel, `${this.template.emotes.success} ${content}`, options);
        } else {
            await this.sendMessage(channel, content, options);
        }
        return new CommandResponse( { success: true, triggerCooldown } );
    }

    /**
     * Send an error message. If the content is a string, suffix the error emote to the content.
     * Check for sendMessage perms.
     * Await for sendMessage to throw correctly potential errors.
     *
     * @param {Channel} channel - The channel Object
     * @param {String|MessageObject} content - Success message content
     * @param {Object} [options={}] - Additional options
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to delete the message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @param {Boolean} [options.triggerCooldown=false] - Whether the command should trigger cooldown or not
     * @param {Boolean} [options.error=null] - Whether the command should trigger cooldown or not
     * @returns {Promise<CommandResponse>} The non successful Command Response
     * @memberof Base
     */
    async sendError(channel, content, options = {} ) {
        const triggerCooldown = !!options.triggerCooldown;
        if (typeof content === 'string') {
            await this.sendMessage(channel, `${this.template.emotes.error} ${content}`, options);
        } else {
            await this.sendMessage(channel, content, options);
        }
        return new CommandResponse( { success: false, triggerCooldown, error: options.error } );
    }

    /**
     * Handles errors and sends an error message/log.
     * Calls sendError().
     *
     * @param {Message} msg - The message Object
     * @param {Error} err - The error message
     * @param {String} type - Type of error (api, db, internal)
     * @param {String} errMsg - Optional error message
     * @returns {Promise<CommandResponse>} The non successful Command Response
     * @memberof Base
     */
    error(msg, err, type, errMsg) {
        // eslint-disable-next-line new-cap
        errMsg = errMsg || this.l.ERR_GENERAL();

        if (err) {
            err.message = `Type: ${TYPE_ERRORS[type.toLowerCase()]} | ${err.message}`;
            throw err;
        }
        this.log('FATAL', `Unexpected error [${msg.channel.guild.name} - ${msg.channel.guild.id}]!\n${err.stack}`);
        return this.sendError(msg.channel, errMsg);
    }

    // **** GENERAL **** //
    /* eslint max-classes-per-file: ["warn", 2]*/
    /* eslint-disable no-prototype-builtins */

    /**
     * Custom toString method.
     *
     * @returns {String}
     * @memberof Base
     */
    toString() {
        return this.constructor.name;
    }

    /**
     * Custom toJSON method.
     * (Based of Eris')
     *
     * @returns {Object} JSON-like Object
     * @memberof Base
     */
    toJSON() {
        const base = {};
        for (const key in this) {
            if (!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_') ) {
                if (!this[key] ) {
                    base[key] = this[key];
                } else if (this[key] instanceof Set) {
                    base[key] = Array.from(this[key] );
                } else if (this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values() );
                } else if (typeof this[key].toJSON === 'function') {
                    base[key] = this[key].toJSON();
                } else {
                    base[key] = this[key];
                }
            }
        }
        return base;
    }

    /**
     * Custom inspect method
     * Doesn't list prefixed property and undefined property.
     * (Based of Eris')
     *
     * @returns {Object} Object to inspect without prefixed property and undefined property
     * @memberof Base
     */
    [util.inspect.custom]() {
        // http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new { [this.constructor.name]: class {} }[this.constructor.name]();
        for (const key in this) {
            if (this.hasOwnProperty(key) && !key.startsWith('_') && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
}


export default Base;
