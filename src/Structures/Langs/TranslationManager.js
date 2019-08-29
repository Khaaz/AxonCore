import defaultLang from '../../Configs/lang.json';

/**
 * Class dedicated to manage translations.
 * Holds all translations and get the message for the default lang or the specified lang.
 *
 * @autho KhaaZ
 *
 * @class TranslationManager
 *
 * @prop {Object<MessageManager>} _manager
 * @prop {String} [lang='english'] - The default lang
 */
class TranslationManager {
    /**
     * Creates an instance of TranslationManager.
     *
     * @param {Object<MessageManager>} manager
     * @memberof TranslationManager
     */
    constructor(manager) {
        this._manager = manager;

        this.lang = manager._axon.configs.bot.lang || 'english';
        
        if (!manager._messages[this.lang] ) {
            this.lang = 'english';
            manager._messages = defaultLang;
        }
    }

    get messages() {
        return this._manager.messages;
    }

    /**
     * Return all messages for the specified lang or the default lang if no specified lang.
     *
     * @param {String} lang
     * @returns {Object}
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
