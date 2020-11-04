import defaultLang from '../Configs/lang.json';

/**
 * @typedef {import('../Langs/MessageManager').default} MessageManager
 * @typedef {Object.<string, AxonLanguageResponse>} Languages
 * @typedef {{
 * [key: String]: String | AxonLanguageResponse
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
     * Return a specified message for the specified lang or for the default lang if no specified lang
     * If specified message doesn't exist in the specified lang return the specified message for the default lang instead.
     *
     * @param {String} message
     * @param {String} lang
     * @returns {String}
     * @memberof TranslationManager
     */
    getMessage(message, lang) {
        const paths = message.split('.');
        let toReturn = this.getMessages(lang) || this.getMessages(this.lang);

        for (const elem of paths) {
            if (!toReturn[elem] ) {
                return paths.reduce( (acc, e) => (acc = acc[e] ), this.getMessages(this.lang) );
            }
            toReturn = toReturn[elem];
        }
        return toReturn;
    }
}

export default TranslationManager;
