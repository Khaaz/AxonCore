// Event emitter for local event emitting.
import { EventEmitter } from 'eventemitter3';

import Utils from './Utils.js';

class Prompt {
    /**
   * @author VoidNulll
   * @param {Object} client The Axon client
   * @param {String} uID The user ID
   * @param {Object} channel The channel object
   *
   * @param {Object} [defaultOptions] The default options for the prompt.
   * @param {String[]} [defaultOptions.allowed=null] A array of strings allow to pass as the prompt
   * @param {Boolean} [options.allowedWildcard=false] Whether or not the message content can contain allowed or must match allowed.
   * @param {Boolean} [defaultOptions.caseInsensitive=false] Makes it so the prompt is case insensitive, returns the message content lowercased.
   * @param {Boolean} [defaultOptions.dontDeletePrompt=false] Whether or not you dont want the prompt to be deleted
   * @param {(Object|String)} [defaultOptions.invalidMessage] The message to send when a prompt is invalid
   * @param {Number} [defaultOptions.invalidMessageDelete=null] The time in milliseconds to wait before deleting the invalid message
   * @param {Number} [defaultOptions.timeout=10000] The time to wait for the prompt to timeout
   * @param {(Object|String)} [defaultOptions.timeoutMessage=Prompt timed out.] The message to send when the prompt times out.
   * @param {Number} [defaultOptions.deleteTimeoutMess=null] The time to wait in milliseconds before deleting the timeout message
   * @param {Boolean} [defaultOptions.resendWhenInvalid=false] Whether or not to resend when the prompt got a invalid returned message, does not send invalid message
   *
   * @example
   * let prompt = new Prompt(this.axon, msg.author.id, msg.channel, { timeoutMess: 'Be quicker next time' });
   *
   */
    constructor(client, uID, channel, defaultOptions) {
        this._userID = uID;
        this._channel = channel;
        this._axon = client;
        this._client = client.client;
        this._dOptions = {
            timeout: defaultOptions.timeout || 10000,
            timeoutMess: defaultOptions.timeoutMess || 'Prompt timed out',
        };
        this._promptEmitter = new EventEmitter();
        this._timedOut;
        this._ended;
    }

    /**
     * Runs the prompt.
     *
     * @param {(Object|String)} prompt The prompt you would like to send
     *
     * @param {Object} [options] The options for the prompt.
     * @param {String[]} [options.allowed=null] A array of strings allow to pass as the prompt
     * @param {Boolean} [options.allowedWildcard=false] Whether or not the message content can contain allowed or must match allowed.
     * @param {Boolean} [options.caseInsensitive=false] Makes it so the prompt is case insensitive, returns the message content lowercased.
     * @param {Boolean} [options.dontDeletePrompt=false] Whether or not you dont want the prompt to be deleted
     * @param {(Object|String)} [options.invalidMessage] The message to send when a prompt is invalid
     * @param {Number} [options.invalidMessageDelete=null] The time in milliseconds to wait before deleting the invalid message
     * @param {Number} [options.timeout=10000] The time to wait for the prompt to timeout
     * @param {(Object|String)} [options.timeoutMessage=Prompt timed out.] The message to send when the prompt times out.
     * @param {Number} [options.deleteTimeoutMess=null] The time to wait in milliseconds before deleting the timeout message
     * @param {Boolean} [options.resendWhenInvalid=false] Whether or not to resend when the prompt got a invalid returned message, does not send invalid message
     *
     * @example
     * let output = await prompt.run('Who would you like to wave to?', { timeout: 10000 });
     *
     * this.sendMessage(msg.channel, output.content);
     * @returns {Promise} The message object, or a reject error if timedout or message was invalid
     */
    run(prompt, options) {
        return new Promise(async(resolve, reject) => {
            // Send the prompt & store as a variable
            this._mess = await this._axon.AxonUtils.sendMessage(this._channel, prompt);
            // Timeout stuff (function is later)
            const allowedWords = [];
            this._actualOptions = options || {};
            for (const value in this._dOptions) {
                if (!options || !options[value]) {
                    this._actualOptions[value] = this._dOptions[value];
                }
            }
            const timeoutTime = (this._actualOptions && this._actualOptions.timeout);
            this._timeoutMess = (this._actualOptions && this._actualOptions.timeoutMess);
            // If allowed is part of the options...
            if (this._actualOptions.allowed) {
                for (const allowed of this._actualOptions.allowed) {
                    if (this._actualOptions.caseInsensitive === true) {
                        allowedWords.push(allowed.toLowerCase());
                    } else {
                        allowedWords.push(allowed);
                    }
                }
                this._actualOptions.allowed = allowedWords;
            }
            this._actualOptions.invalidMessage = this._actualOptions.invalidMessage || (this._actualOptions.allowed && `Invalid usage. You can say: \`\`\`\n${this._actualOptions.allowed.join(', ')}\`\`\``); // Default invalid message
            // Incase it detects invalid usage, it ends the function
            this._promptEmitter.on('ended', (msg) => resolve(this._onEnded(msg)));

            // When the event timedOut is sent.
            this._promptEmitter.on('timedOut', () => {
                this._onTimeout();
                reject('Prompt timed out');
            });

            // When the prompt ends as "invalid"

            this._promptEmitter.on('invalidEnd', () => reject(this._onInvalidEnd()));
            // Bind the events
            this._client.on('messageCreate', this._onMsgCreate.bind(this)); // Bind the event
            setTimeout(() => {
                if (this._ended === true) { // This is actually useful? // Probably not, lets see.
                    return;
                }
                return this._promptEmitter.emit('timedOut'); // Send the "timedOut" event
            }, timeoutTime);
        });
    }

    /**
     * Checker for this._onMsgCreate
     *
     * @param {Object} msg The message object to check against.
     */
    _checker(msg) {
        if (!this._actualOptions || !this._actualOptions.allowed) { // Options does not have allowed
            return true;// End the prompt successfully.
        }
        if (this._actualOptions.allowed) { // If options allowed, and they include (because its a array) the message content
            if (this._actualOptions.allowedWildcard === true && this._actualOptions.allowed) {
                for (const allowed of this._actualOptions.allowed) {
                    if ((this._actualOptions.caseInsensitive === true && msg.content.toLowerCase().includes(allowed)) || msg.content.includes(allowed)) {
                        return true;
                    }
                }
            } else if ((this._actualOptions.caseInsensitive && this._actualOptions.allowed.includes(msg.content.toLowerCase())) || this._actualOptions.allowed.includes(msg.content)) {
                return true;// End the prompt successfully.
            } else {
                return false;
            }
        }
    }

    _onInvalidEnd() {
        if (!this._actualOptions || !this._actualOptions.dontDeletePrompt || this._actualOptions.dontDeletePrompt !== true) {
            this._mess.delete(); // Delete the prompt
        }
        this._client.off('messageCreate', this._onMsgCreate);
        this._ended = true; // Set ended to true
    }

    _onEnded(msg) {
        if (!this._actualOptions || !this._actualOptions.dontDeletePrompt || this._actualOptions.dontDeletePrompt !== true) {
            this._mess.delete(); // Delete the prompt
        }
        this._ended = true;
        this._client.off('messageCreate', this._onMsgCreate);
        if (this._actualOptions && this._actualOptions.caseInsensitive === true) {
            msg.content = msg.content.toLowerCase();
        }
        return msg;
    }

    async _onTimeout() {
        if (this._actualOptions.deleteTimeoutMess === true) { // If the timeout message is supposed to be deleted
            const msg = await this._axon.AxonUtils.sendMessage(this._mess.channel, this._timeoutMess); // Create the timeout message
            await Utils.sleep(this._actualOptions.deleteTimeoutMess); // Wait...
            this._timedOut = true; // The prompt has timed out
            msg.delete(); // Delete the message
            return 'Prompt timed out';
        }
        this._axon.AxonUtils.sendMessage(this._mess.channel, this._timeoutMess); // Create the timeout message
        return 'Prompt timed out';
    }

    /**
     * Message event for prompt
     *
     * @param {Object} msg The message object
     */
    async _onMsgCreate(msg) { // When a message is created
        // Just in case...
        if (this._ended || this._timedOut) { // If the prompt ended or timed out
            return; // Stop
        }
        if (msg.author.id === this._userID && msg.channel.id === this._channel.id) { // If the author id and channel ids match
            const checked = this._checker(msg);
            if (checked === true) {
                this._promptEmitter.emit('ended', msg);
            } else if (checked === false) {
                this._promptEmitter.emit('invalidEnd');
                /* eslint-disable */
            } else {
                if (!this._actualOptions || !this._actualOptions.allowed) { // If no options, or they do not include allowed.
                    return; // Stop the event.
                }
                if (this._actualOptions.resendWhenInvalid) { // If the prompt is to resend when it is invalid
                    this._mess.delete(); // Delete the prompt
                    this._mess = await this._axon.AxonUtils.sendMessage(msg.channel, this._prompt); // resend the prompt
                    return; // Stop the event right here.
                }
                if (this._actualOptions.invalidMessageDelete) { // If the user wants it deleted after a certain amount of time
                    const message = await this._axon.AxonUtils.sendMessage(msg.channel, this._actualOptions.invalidMessage); // Create the invalid message
                    await Utils.sleep(this._actualOptions.invalidMessageDelete); // Pause for the time the user wants the message to stay up
                    message.delete(); // Delete the message
                    return this._promptEmitter.emit('invalidEnd'); // End the prompt as "invalid"
                } else {
                    this._axon.AxonUtils.sendMessage(msg.channel, this._actualOptions.invalidMessage); // Create the invalid message
                    return this._promptEmitter.emit('invalidEnd'); // End the prompt as "invalid"
                }
            } /* eslint-enable */
        }
    }
}

export default Prompt;
