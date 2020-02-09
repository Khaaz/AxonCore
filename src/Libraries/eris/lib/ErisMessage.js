import Message from '../../definitions/Message';

/**
 * @typedef {import('eris').Message} message
 * @typedef {{
 * content?: String, tts?: Boolean, disableEveryone?: Boolean, embed?: Embed|EmbedOptions, file?: MessageFile|Array<MessageFile>
 * }} ErisContent
 * @typedef {import('eris').EmbedOptions} EmbedOptions
 * @typedef {import('eris').MessageFile} MessageFile
 */

class ErisMessage extends Message {
    // **** METHODS **** //

    /**
     * @param {message} message
     */
    delete(message) {
        return message.delete();
    }

    /**
     * @param {message} message
     * @param {ErisContent} content
     */
    edit(message, content) {
        return message.edit(content);
    }
}

export default ErisMessage;
