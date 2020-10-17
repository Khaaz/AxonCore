import TranslationManager from './TranslationManager';
import MessageParser from './MessageParser';
/**
 * @typedef {import('../AxonClient').default} AxonClient
 * @typedef {Object.<string, AxonLanguageResponse>} Languages
 * @typedef {{
 * ERR_BOT_PERM?: String, ERR_CALLER_PERM?: String, ERR_DESTINATION_PERM?: String,
 * ERR_COOLDOWN?: String, ERR_GENERAL?: String, [key: String]: String|undefined
 * }} AxonLanguageResponse
 * @typedef {import('../Langs/TranslationManager').default} TranslationManager
 */

/**
 * Holds all messages.
 * Used as an interface to get the message in the correct lang and parse arguments from the message.
 *
 * @author KhaaZ
 *
 * @class MessageManager
 *
 * @prop {AxonClient} _axon
 * @prop {Languages} _message - All messages (all langs)
 * @prop {TranslationManager} translation
 * @prop {MessageParser} parser
 */
class MessageManager {
    /**
     * Creates an instance of MessageManager.
     *
     * Accessing this class from <AxonClient>.l will allow you to use a proxy enabling you to directly
     * access the translation strings, calling the method when have reached the desired translation string, e.g.
     * ```js
     * this.axon.l.general.messages.greetings[2]({ user: 'Bsian' }, 'english');
     * ```
     * where your translation file would look like (or equivalent for folder translations)
     * ```json
     * {
     *   "english": {
     *     "general": {
     *       "messages": {
     *         "greetings": ["Hello there {{user}}", "Welcome {{user}}", "Is that {{user}}? Hi!", "{{user}}, nice to meet you"]
     *       }
     *     }
     *   }
     * }
     * ```
     *
     * @param {AxonClient} axonClient
     * @param {Languages} messages
     * @param {String} baseLang
     *
     * @memberof MessageManager
     */
    constructor(axonClient, messages, baseLang) {
        this._axon = axonClient;

        this._messages = messages;
    
        this.translation = new TranslationManager(this, baseLang);
        this.parser = new MessageParser();
    }

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @type {Languages}
     * @memberof MessageManager
     */
    get messages() {
        return this._messages;
    }

    /**
     * All message from the given lang (or default lang)
     *
     * @param {String} lang
     * @returns {AxonLanguageResponse} Object with all messages
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
     * @param {AxonLanguageResponse} args
     * @param {String} lang
     * @returns {String} The actual message
     * @memberof MessageManager
     */
    get(message, args, lang) {
        return this.parser.parse(this.translation.getMessage(message, lang), args);
    }
}

export default MessageManager;
