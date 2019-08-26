import defaultLang from '../../Configs/lang.json';

class TranslationManager {
    constructor(axonClient, messages) {
        this._axon = axonClient;

        this.lang = axonClient.configs.bot.lang || 'english';
        
        if (!messages[this.lang] ) {
            this.lang = 'english';
            this._messages = defaultLang;
        } else {
            this._messages = messages;
        }
    }

    /**
     * Return all messages for the specified lang or the default lang if no specified lang.
     *
     * @param {String} lang
     * @returns
     * @memberof TranslationManager
     */
    getMessages(lang) {
        return this._messages[lang || this.lang];
    }

    /**
     * Return a specified message for the specified lang or the default lang if no specified lang
     *
     * @param {String} message
     * @param {String} lang
     * @returns
     * @memberof TranslationManager
     */
    getMessage(message, lang) {
        return this.getMessages(lang)[message];
    }
}

export default TranslationManager;
