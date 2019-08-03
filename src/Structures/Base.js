import util from 'util';

import CommandResponse from './Command/CommandResponse';

import { TYPE_ERRORS } from '../Utility/Constants/AxonEnums';

/**
 * Base Class with default properties and utility methods used by all Commands / Modules / Events.
 *
 * @author KhaaZ
 *
 * @class Base
 *
 * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
 * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.botClient]
 * @prop {Object} logger - Logger Object/Methods [GETTER: axon.logger]
 * @prop {Object} Resolver - Resolver Object/Methods [GETTER: axon.Resolver]
 * @prop {Object} axonUtils - AxonUtils Object/Methods [GETTER: axon.axonUtils]
 * @prop {Object} utils - Utils Object/Methods [GETTER: axon.utils]
 */
class Base {
    /**
     * Creates an instance of Base.
     *
     * @param {Object<AxonClient>} axonClient
     *
     * @memberof Base
     */
    constructor(axonClient) {
        this._axon = axonClient;
    }

    // **** GETTER **** //

    get axon() {
        return this._axon;
    }

    get bot() {
        return this.axon.botClient;
    }

    get logger() {
        return this.axon.logger;
    }

    get Resolver() { // used as a shortcut only if a Resolver exists as AxonClient property
        return this.axon.Resolver;
    }

    get axonUtils() {
        return this.axon.axonUtils;
    }

    get utils() {
        return this.axon.utils;
    }

    /**
     * Get a module from AxonClient with the label
     *
     * @param {String} module - Module label
     * @returns {Object<Module>|NULL}
     * @memberof Base
     */
    getModule(module) {
        return this.axon.getModule(module);
    }

    /**
     * Get a command/subcommand from AxonClient with the full label
     *
     * @param {String} fullLabel - Full command (or subcommand) label
     * @returns {Object<Command>|NULL}
     * @memberof Base
     */
    getCommand(fullLabel) {
        return this.axon.getCommand(fullLabel);
    }

    // **** METHODS - API/SENDER **** //

    /**
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param {Object<User>} user - User object to get the DM channel
     * @param {Object/String} content - String or object (embed)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Number} [options.delete=false] - Whether to deletethe message or not
     * @param {Boolean} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     *
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
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object/String} content - Message content, String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Number} [options.delete=false] - Whether to deletethe message or not
     * @param {Boolean} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     *
     * @memberof Base
     */
    sendMessage(channel, content, options = {} ) {
        return this.axonUtils.sendMessage(channel, content, options);
    }

    /**
     * Edit a message
     * Check for bot permissions + message embed/length
     *
     * @param {Object<Message>} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>} Message Object
     *
     * @memberof Base
     */
    editMessage(message, content) {
        return this.axonUtils.editMessage(message, content);
    }

    /**
     * Send a success message. If the content is a string, suffixe the success emote to the content.
     * Check for sendMessage perms.
     * Await for sendMessage to throw correctly potential errors.
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object|String} content - Success message content
     * @param {Object} [options={}] - Additional options
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to deletethe message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @param {Boolean} [options.triggerCooldown=true] - Whether the command shoudl trigger cooldown or not
     * @returns {Promise<CommandResponse>} The successful Command Response
     *
     * @memberof Base
     */
    async sendSuccess(channel, content, options = {} ) {
        const triggerCooldown = options.triggerCooldown !== undefined ? options.triggerCooldown : true;
        if (typeof content === 'string') {
            await this.sendMessage(channel, `${this.template.emote.success} ${content}`, options);
        } else {
            await this.sendMessage(channel, content, options);
        }
        return new CommandResponse( { success: true, triggerCooldown } );
    }

    /**
     * Send an error message. If the content is a string, suffixe the error emote to the content.
     * Check for sendMessage perms.
     * Await for sendMessage to throw correctly potential errors.
     *
     * @@param {Object<Channel>} channel - The channel Object
     * @param {Object|String} content - Success message content
     * @param {Object} [options={}] - Additional options
     * @param {Boolean} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Boolean} [options.delete=false] - Whether to deletethe message or not
     * @param {Number} [options.delay=null] - Delay after which the message will be deleted
     * @param {Boolean} [options.triggerCooldown=false] - Whether the command shoudl trigger cooldown or not
     * @param {Object|String} [options.error=null] - Whether the command shoudl trigger cooldown or not
     * @returns {Promise<CommandResponse>} The non successful Command Response
     *
     * @memberof Base
     */
    async sendError(channel, content, options = {} ) {
        const triggerCooldown = !!options.triggerCooldown;
        if (typeof content === 'string') {
            await this.sendMessage(channel, `${this.template.emote.error} ${content}`, options);
        } else {
            await this.sendMessage(channel, content, options);
        }
        return new CommandResponse( { success: false, triggerCooldown, error: options.error } );
    }

    /**
     * Handles errors and sends an error message/log.
     * Calls sendError().
     *
     * @param {Object<Message>} msg - The message Object
     * @param {Object<Error>} err - The error message
     * @param {String} type - Type of error (api, db, internal)
     * @param {String} errMsg - Optional error message
     * @returns {Promise<CommandResponse>} The non successful Command Response
     *
     * @memberof Base
     */
    error(msg, err, type, errMsg) {
        errMsg = errMsg || this.template.message.error.general;

        if (err) {
            err.message = `Type: ${TYPE_ERRORS[type.toLowerCase()]} | ${err.message}`;
            throw err;
        }
        this.logger.emerg(`Unexpected error [${msg.channel.guild.name} - ${msg.channale.guild.id}]!\n${err.stack}`);
        return this.sendError(msg.channel, errMsg);
    }

    // **** GENERAL **** //
    /* eslint max-classes-per-file: ["warn", 2]*/
    /* eslint-disable no-prototype-builtins */

    /**
     * Custom toString method.
     *
     * @returns {String}
     *
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
     *
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
     *
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
