import { EventEmitter } from 'events';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 */

/**
 * Create a Prompt, waiting for specific input before resolving with the message Object
 *
 * @author VoidNull
 *
 * @class Prompt
 * @example let prompt = new Prompt(this.axon, msg.author.id, msg.channel, { timeoutMessage: 'Be quicker next time' });
 *
 * @prop {String} userID - The user ID that is bound to the current prompt
 * @prop {Channel} channel - The channel where the prompt is running
 * @prop {Boolean} timedOut - Whether the Prompt timed out
 * @prop {Boolean} ended - Whether the Prompt ended
 */
class Prompt {
    /**
     *
     * @param {AxonClient} client The Axon client
     * @param {String} uID The user ID
     * @param {Channel} channel The channel object
     *
     * @param {Object} [defaultOptions={}] The default options for the prompt.
     * @param {Array<String>} [defaultOptions.allowed=[]] An array of strings allow to pass as the prompt
     * @param {Boolean} [defaultOptions.wildcard=false] Whether or not the message content can contain allowed or must match allowed.
     * @param {Boolean} [defaultOptions.caseSensitive=true] Makes it so the prompt is case insensitive, returns the message lowercase content.
     * @param {Boolean} [defaultOptions.deletePrompt=true] Whether or not you want the prompt to be deleted
     * @param {Boolean} [defaultOptions.sendInvalid=true] Whether or not you want a message to be sent when invalid
     * @param {String} [defaultOptions.invalidMessage='Invalid Message!'] The message to send when a prompt is invalid
     * @param {Number|Boolean} [defaultOptions.deleteInvalidMessage=false] The time in milliseconds to wait before deleting the invalid message
     * @param {Number} [defaultOptions.timeout=10000] The time to wait for the prompt to timeout
     * @param {Boolean} [defaultOptions.sendTimeout=true] Whether or not you want a message to be sent when timeout
     * @param {String} [defaultOptions.timeoutMessage='Prompt timed out!'] The message to send when the prompt times out.
     * @param {Number} [defaultOptions.deleteTimeoutMsg=false] The time to wait in milliseconds before deleting the timeout message
     * @param {Boolean} [defaultOptions.resendWhenInvalid=false] Whether or not to resend when the prompt got a invalid returned message, does not send invalid message
     */
    constructor(client, uID, channel, defaultOptions = {} ) {
        this._axon = client;
        /**
         * The user ID that is bound to the current prompt
         * @type {String}
         */
        this.userID = uID;
        /**
         * The channel where the prompt is running
         * @type {Channel}
         */
        this.channel = channel;

        this._prompt = '';

        /**
         * @type {{
         * allowed: Array<String>, wildcard: Boolean, caseSensitive: Boolean, deletePrompt: Boolean, sendInvalid: Boolean,
         * invalidMessage: String, deleteInvalidMessage: Number|Boolean, timeoutTime: Number, sendTimeout: Boolean,
         * timeoutMessage: String, deleteTimeoutMsg: Number|Boolean, resendWhenInvalid: Boolean
         * }}
         */
        this._options = {
            allowed: [],
            wildcard: !!defaultOptions.wildcard, // false
            caseSensitive: defaultOptions.caseSensitive === undefined ? true : !!defaultOptions.caseSensitive, // true
            deletePrompt: defaultOptions.deletePrompt === undefined ? true : !!defaultOptions.deletePrompt, // true
            sendInvalid: defaultOptions.sendInvalid === undefined ? true : !!defaultOptions.sendInvalid, // true
            invalidMessage: defaultOptions.invalidMessage || 'Invalid Message!',
            deleteInvalidMessage: isNaN(defaultOptions.deleteInvalidMessage) ? false : defaultOptions.deleteInvalidMessage,
            timeoutTime: defaultOptions.timeout || 10000,
            sendTimeout: defaultOptions.sendTimeout === undefined ? true : !!defaultOptions.sendTimeout, // true
            timeoutMessage: defaultOptions.timeoutMessage || 'Prompt timed out!',
            deleteTimeoutMsg: isNaN(defaultOptions.deleteTimeoutMsg) ? false : defaultOptions.deleteTimeoutMsg,
            resendWhenInvalid: !!defaultOptions.resendWhenInvalid, // false
        };

        /**
         * @type {{
         * allowed: Array<String>, wildcard: Boolean, caseSensitive: Boolean, deletePrompt: Boolean, sendInvalid: Boolean,
         * invalidMessage: String, deleteInvalidMessage: Number|Boolean, timeoutTime: Number, sendTimeout: Boolean,
         * timeoutMessage: String, deleteTimeoutMsg: Number|Boolean, resendWhenInvalid: Boolean
         * }}
         */
        this._actualOptions = {};

        this._emitter = new EventEmitter();
        /**
         * Whether the Prompt timed out
         */
        this.timedOut = false;
        /**
         * Whether the prompt ended
         */
        this.ended = false;

        /**
         * @type {(msg: Message) => void}
         */
        this._boundEvent = this._onMsgCreate.bind(this);
    }

    /**
     * @type {AxonClient}
     * @readonly
     */
    get axon() {
        return this._axon;
    }

    /**
     * @type {BotClient}
     * @readonly
     */
    get client() {
        return this._axon.botClient;
    }

    /**
     * Runs the prompt.
     *
     * @param {String} prompt The prompt you would like to send
     *
     * @param {Object} [options={}] The options for the prompt.
     * @param {Array<String>} [options.allowed=[]] A array of strings allow to pass as the prompt
     * @param {Boolean} [options.wildcard=false] Whether or not the message content can contain allowed or must match allowed.
     * @param {Boolean} [options.caseSensitive=true] Makes it so the prompt is case insensitive, returns the message lowercase content.
     * @param {Boolean} [options.deletePrompt=true] Whether or not you want the prompt to be deleted
     * @param {Boolean} [defaultOptions.sendInvalid=true] Whether or not you want a message to be sent when invalid
     * @param {String} [options.invalidMessage='Invalid Message!'] The message to send when a prompt is invalid
     * @param {Number} [options.deleteInvalidMessage=false] The time in milliseconds to wait before deleting the invalid message
     * @param {Number} [options.timeoutTime=10000] The time to wait for the prompt to timeout
     * @param {Boolean} [defaultOptions.sendTimeout=true] Whether or not you want a message to be sent when timeout
     * @param {String} [options.timeoutMessage='Prompt timed out!'] The message to send when the prompt times out.
     * @param {Number} [options.deleteTimeoutMsg=false] The time to wait in milliseconds before deleting the timeout message
     * @param {Boolean} [options.resendWhenInvalid=false] Whether or not to resend when the prompt got a invalid returned message, does not send invalid message
     *
     * @example
     * const output = await prompt.run('Who would you like to wave to?', { timeout: 10000 });
     * this.sendMessage(msg.channel, output.content);
     *
     * @returns {Promise<Message>} The message object, or a reject error if timed out or message was invalid
     */
    run(prompt, options = {} ) {
        this.ended = false;
        this.timedOut = false;

        this._prompt = prompt;

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async(resolve, reject) => {
            this._message = await this.axon.axonUtils.sendMessage(this.channel, this._prompt);

            // Prepare options
            this._actualOptions = options;
            for (const value in this._options) {
                if (this._actualOptions[value] === null || this._actualOptions[value] === undefined) { // ignore options already setup
                    this._actualOptions[value] = this._options[value];
                }
            }

            if (!this._actualOptions.caseSensitive) {
                this._actualOptions.allowed = this._actualOptions.allowed.map(a => a.toLowerCase() );
            }

            this._actualOptions.invalidMessage = this._actualOptions.invalidMessage || `Invalid usage. You can say: \`\`\`\n${this._actualOptions.allowed.join(', ')}\`\`\``; // Default invalid message

            // listeners
            this._emitter.once('ended', (msg) => resolve(this._onEnded(msg) ) ); // In case it detects invalid usage, it ends the function
            this._emitter.once('timedOut', () => { // When the event timedOut is sent.
                this._onTimeout();
                reject('TIMEOUT');
            } );
            this._emitter.once('invalidEnd', () => reject(this._onInvalidEnd() ) ); // When the prompt ends as "invalid"

            // listen to the even, start the prompt
            this.client.on('messageCreate', this._boundEvent); // Bind the event

            this._startTimeout();
        } );
    }

    _startTimeout() {
        setTimeout( () => {
            if (this.ended === true) {
                return;
            }
            this._emitter.emit('timedOut');
            return; // Send the "timedOut" event
        }, this._actualOptions.timeoutTime);
    }

    _deletePrompt() {
        this._message.delete()
            .catch( () => { /* */ } );
    }

    /**
     * Checker for this._onMsgCreate
     *
     * @param {Message} msg The message object to check against.
     * @returns Whether the check completed successfully
     */
    _checker(msg) {
        if (this._actualOptions.allowed.length === 0) { // Options does not have allowed
            return true;// End the prompt successfully.
        }

        if (this._actualOptions.wildcard) {
            for (const allowed of this._actualOptions.allowed) {
                if (
                    (!this._actualOptions.caseSensitive && msg.content.toLowerCase().includes(allowed) )
                    || msg.content.includes(allowed)
                ) {
                    return true;
                }
            }
        } else if ( (this._actualOptions.caseInsensitive && this._actualOptions.allowed.includes(msg.content.toLowerCase() ) )
                || this._actualOptions.allowed.includes(msg.content) ) {
            return true;
        }
        
        return false;
    }

    _onInvalidEnd() {
        this.ended = true;
        if (this._actualOptions.deletePrompt) {
            this._deletePrompt();
        }
        this.client.off('messageCreate', this._boundEvent);
        return 'INVALID';
    }

    /**
     * @param {Message} msg
     */
    _onEnded(msg) {
        this.ended = true;

        if (this._actualOptions.deletePrompt) {
            this._deletePrompt();
        }
        this.client.off('messageCreate', this._boundEvent);

        if (!this._actualOptions.caseSensitive) {
            msg.content = msg.content.toLowerCase();
        }
        return msg;
    }

    async _onTimeout() {
        this.timedOut = true;
        if (this._actualOptions.sendTimeout) {
            const msg = await this.axon.axonUtils.sendMessage(this._message.channel, this._actualOptions.timeoutMessage); // Create the timeout message
            if (this._actualOptions.deleteTimeoutMsg) {
                await this.axon.utils.sleep(this._actualOptions.deleteTimeoutMsg);
                msg.delete(); // Delete the timeout message
            }
        }
        this.client.off('messageCreate', this._boundEvent);
    }

    /**
     * Message event for prompt
     * When a message is created
     *
     * @param {Message} msg The message object
     */
    async _onMsgCreate(msg) {
        if (this.ended || this.timedOut) { // If the prompt ended or timed out
            return;
        }
        if (msg.author.id !== this.userID || msg.channel.id !== this.channel.id) { // only listen to the userId in the channelID
            return;
        }
        const checked = this._checker(msg);
        if (checked) {
            this._emitter.emit('ended', msg);
        } else {
            if (this._actualOptions.sendInvalid) { // If you a message is to be sent on invalid
                const message = await this._axon.axonUtils.sendMessage(msg.channel, this._actualOptions.invalidMessage); // Create the invalid message
                if (this._actualOptions.deleteInvalidMessage) {
                    await this.axon.utils.sleep(this._actualOptions.deleteInvalidMessage);
                    message.delete(); // Delete the invalid message
                }
            }
            if (this._actualOptions.resendWhenInvalid) { // If the prompt is to resend when it is invalid
                this._deletePrompt();
                this._message = await this.axon.axonUtils.sendMessage(msg.channel, this._prompt); // resend the prompt
            } else {
                this._emitter.emit('invalidEnd');
            }
        }
    }
}

export default Prompt;
