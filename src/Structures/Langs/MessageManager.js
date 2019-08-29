import TranslationManager from './TranslationManager';
import MessageParser from './MessageParser';

class MessageManager {
    constructor(axonClient, messages) {
        this._axon = axonClient;

        this._messages = messages;
    
        this.translation = new TranslationManager(axonClient, messages);
        this.parser = new MessageParser();

        // creating method for every message to make access easier
        for (const message in this.translation.getMessages() ) {
            this[message] = (args, lang) => this.get(message, args, lang);
        }
    }

    get messages() {
        return this.translation._messages;
    }

    getMessages(lang) {
        return this.translation.getMessages(lang);
    }

    getMessage(message, lang) {
        return this.translation.getMessage(message, lang);
    }

    get(message, args, lang) {
        return this.parser.parse(this.translation.getMessage(message, lang), args);
    }
}

export default MessageManager;
