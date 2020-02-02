import TranslationManager from './TranslationManager';
import MessageParser from './MessageParser';

/**
 * Holds all messages.
 * Used as an interface to get the message in the correct lang and parse arguments from the message.
 *
 * @author KhaaZ
 *
 * @class MessageManager
 *
 * @prop {AxonClient} _axon
 * @prop {Object} _message - All messages (all langs)
 * @prop {TranslationManager} translation
 * @prop {MessageParser} parser
 */
class MessageManager {
    /**
     * Creates an instance of MessageManager.
     * Dynamically create one method for each message so we can use <this>.MESSAGE_CONSTANT() directly. It will actually call the get method.
     *
     * @param {AxonClient} axonClient
     * @param {Object} messages
     * @memberof MessageManager
     */
    constructor(axonClient, messages, baseLang) {
        this._axon = axonClient;

        this._messages = messages;
    
        this.translation = new TranslationManager(this, baseLang);
        this.parser = new MessageParser();

        // creating method for every message to make access easier
        for (const message in this.translation.getMessages() ) {
            this[message] = (args, lang) => this.get(message, args, lang);
        }
    }

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @type {Object}
     * @memberof MessageManager
     */
    get messages() {
        return this._messages;
    }

    /**
     * All message from the given lang (or default lang)
     *
     * @param {String} lang
     * @returns {Object} Object with all messages
     * @memberof MessageManager
     */
    getMessages(lang) {
        return this.translation.getMessages(lang);
    }

    /**
     * The message in the given lang (or default lang)
     *
     * @param {String} message
     * @param {String} lang
     * @returns {String} The message
     * @memberof MessageManager
     */
    getMessage(message, lang) {
        return this.translation.getMessage(message, lang);
    }

    /**
     * Get the message in the correct lang, parsed to replace {{key}} with the correct argument
     *
     * @param {String} message
     * @param {Object} args
     * @param {String} lang
     * @returns {String} The actual message
     * @memberof MessageManager
     */
    get(message, args, lang) {
        return this.parser.parse(this.translation.getMessage(message, lang), args);
    }
}

export default MessageManager;
