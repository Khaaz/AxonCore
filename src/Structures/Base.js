'use strict';

import util from 'util';

/**
 * Base Class with default methods used by all Commands / Modules / Events. (Based on Eris.Base)
 *
 * @author KhaaZ
 *
 * @class Base
 */
class Base {
    /**
     * Creates an instance of Base.
     *
     * @param {Object<AxonClient>} axonClient
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} Resolver - Resolver Object/Methods [GETTER: axon.Resolver]
     * @prop {Object} AxonUtils - AxonUtils Object/Methods [GETTER: axon.AxonUtils]
     * @prop {Object} Utils - Utils Object/Methods [GETTER: axon.Utils]
     *
     * @memberof Base
     */
    constructor(axonClient) {
        this._axon = axonClient;
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

    get Logger() {
        return this.axon.Logger;
    }

    // backward compatiblity - if axon has a Resolver property - resolve it.
    get Resolver() {
        return this.axon.Resolver;
    }

    get AxonUtils() {
        return this.axon.AxonUtils;
    }

    get Utils() {
        return this.axon.Utils;
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

    //
    // ****** METHODS ******
    //

    /**
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param {Object<User>} user - User object to get the DM channel
     * @param {Object/String} content - String or object (embed)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    sendDM(user, content) {
        return this.AxonUtils.sendDM(user, content);
    }

    /**
     * Send a message.
     * Check for bot permissions + message/embed length
     * Doesn't support file
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object/String} content - Message content, String or Embed Object
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    sendMessage(channel, content, options) {
        return this.AxonUtils.sendMessage(channel, content, options);
    }

    /**
     * Edit a message
     * Check for bot permissions + message embed/length
     *
     * @param {Object<Message>} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    editMessage(message, content) {
        return this.AxonUtils.editMessage(message, content);
    }

    /**
     * Send an error message. Add the error emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - Error message content (String only)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    sendError(channel, content, options) {
        return this.AxonUtils.sendError(channel, content, options);
    }

    /**
     * Send a success message. Add the success emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - Error message content (String only)
     * @param {Object} [options={}] - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param {Object} [options.disableEveryone=true] - Whether to allow mentioning everyone or not
     * @param {Object} [options.delete=false] - Whether to deletethe message or not
     * @param {Object} [options.delay=null] - Delay after which the message will be deleted
     * @returns {Promise<Message?>} Message Object
     * @memberof Base
     */
    sendSuccess(channel, content, options) {
        return this.AxonUtils.sendSuccess(channel, content, options);
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
     * @memberof Base
     */
    error(msg, err, type, errMsg) {
        return this.AxonUtils.error(msg, err, type, errMsg);
    }

    //
    // ****** MISC ******
    //

    /**
     * ToString method.
     *
     * @returns {String}
     * @memberof Base
     */
    toString() {
        return this.constructor.name;
    }

    /**
     * ToJSON method.
     * (Taken from eris)
     *
     * @returns {Object} JSON-like Object
     * @memberof Base
     */
    toJSON() {
        const base = {};
        for (const key in this) {
            if (!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_')) {
                if (!this[key]) {
                    base[key] = this[key];
                } else if (this[key] instanceof Set) {
                    base[key] = Array.from(this[key]);
                } else if (this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values());
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
     * Inspect method
     * Doesn't list prefixed property and undefined property.
     * (Taken from eris)
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
