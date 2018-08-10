'use strict';

import util from 'util';

/**
 * Base Class with default methods used by all Commands / Modules / Events
 * toString
 * toJson
 * inspect
 *
 * Based of Eris.Base
 * 
 * @author KhaaZ
 * 
 * @class Base
 */
class Base {
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

    get Resolver() {
        return this.axon.Resolver;
    }

    get AxonUtils() {
        return this.axon.AxonUtils;
    }

    get Utils() {
        return this.axon.Utils;
    }

    //
    // ****** METHODS ******
    //

    /**
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param {Object<User>} user - user object to get the DM channel
     * @param {Object|String} content - string or object (embed)
     * @returns
     * @memberof Command
     */
    sendDM(user, content) {
        return this.AxonUtils.sendDM(user, content);
    }

    /**
     * Send a message.
     * Check for bot permissions + message/embed length
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {Object/String} content - Message content, String or Embed Object
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendMessage(channel, content) {
        return this.AxonUtils.sendMessage(channel, content);
    }

    /**
     * Edit a message
     *
     * @param {Object<Message>} message - The message object to edit
     * @param {Object/String} content - Object (embed) or String
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    editMessage(message, content) {
        return this.AxonUtils.editMessage(message, content);
    }

    /**
     * Send an error message. Add the error emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - error message content (String only)
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendError(channel, content) {
        return this.AxonUtils.sendError(channel, content);
    }

    /**
     * Send a success message. Add the success emote to the content
     * Check for sendMessage perms
     *
     * @param {Object<Channel>} channel - The channel Object
     * @param {String} content - error message content (String only)
     * @returns {Promise<Message?>}
     * @memberof Command
     */
    sendSuccess(channel, content) {
        return this.AxonUtils.sendSuccess(channel, content);
    }

    /**
     * Handle errors (send error message/log)
     * Call sendError
     *
     * @param {Object<Message>} msg - The message Object
     * @param {Object<Error>} err - The error message
     * @param {String} type - Type of error (api, db, internal)
     * @param {String} errMsg - optional error message
     * @returns {Promise}
     * @memberof Command
     */
    error(msg, err, type, errMsg) {
        return this.AxonUtils.error(msg, err, type, errMsg);
    }

    //
    // ****** MISC ******
    //

    toString() {
        return this.constructor.name;
    }

    toJSON() {
        const base = {};
        for(const key in this) {
            if(!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_')) {
                if(!this[key]) {
                    base[key] = this[key];
                } else if(this[key] instanceof Set) {
                    base[key] = Array.from(this[key]);
                } else if(this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values());
                } else if(typeof this[key].toJSON === 'function') {
                    base[key] = this[key].toJSON();
                } else {
                    base[key] = this[key];
                }
            }
        }
        return base;
    }

    [util.inspect.custom]() {
        // http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new {[this.constructor.name]: class {}}[this.constructor.name]();
        for(const key in this) {
            if(this.hasOwnProperty(key) && !key.startsWith('_') && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
}


export default Base;
