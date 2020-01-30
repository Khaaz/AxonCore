import defaultLang from '../Configs/lang.json';

/**
 * @typedef {import('../Langs/MessageManager').default} MessageManager
 * @typedef {Object.<string, AxonLanguageResponse>} Languages
 * @typedef {{
 * ERR_BOT_PERM?: String, ERR_CALLER_PERM?: String, ERR_DESTINATION_PERM?: String,
 * ERR_COOLDOWN?: String, ERR_GENERAL?: String, [key: String]: String|undefined
 * }} AxonLanguageResponse
 */

/**
 * Class dedicated to manage translations.
 * Holds all translations and get the message for the default lang or the specified lang.
 *
 * @author KhaaZ
 *
 * @class TranslationManager
 *
 * @prop {MessageManager} _manager
 * @prop {String} [lang='english'] - The default lang
 */
class TranslationManager {
    /**
     * Creates an instance of TranslationManager.
     *
     * @param {MessageManager} manager
     * @param {String} lang
     * @memberof TranslationManager
     */
    constructor(manager, lang) {
        this._manager = manager;

        this.lang = lang;
        
        if (!manager._messages[this.lang] ) {
            this.lang = 'english';
            manager._messages = defaultLang;
        }
    }

    /**
     * Returns all messages (all langs)
     *
     * @readonly
     * @type {Languages}
     * @memberof TranslationManager
     */
    get messages() {
        return this._manager.messages;
    }

    /**
     * Return all messages for the specified lang or the default lang if no specified lang.
     *
     * @param {String} lang
     * @returns {AxonLanguageResponse}
     * @memberof TranslationManager
     */
    getMessages(lang) {
        return this.messages[lang || this.lang];
    }

    /**
     * Return a specified message for the specified lang or the default lang if no specified lang
     *
     * @param {String} message
     * @param {String} lang
     * @returns {String}
     * @memberof TranslationManager
     */
    getMessage(message, lang) {
        return this.getMessages(lang)[message];
    }
}

export default TranslationManager;
