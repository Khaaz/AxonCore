import Message from '../../definitions/Message';

/**
 * @typedef {import('eris').Message} message
 * @typedef {{
 * content?: String, tts?: Boolean, disableEveryone?: Boolean, embed?: Embed|EmbedOptions, file?: MessageFile|Array<MessageFile>
 * }} ErisContent
 * @typedef {import('eris').EmbedOptions} EmbedOptions
 * @typedef {import('eris').MessageFile} MessageFile
 */

class DetritusMessage extends Message {
    // **** METHODS **** //

    /**
     * @param {message} message
     * @returns {Promise<void>}
     * @memberof ErisMessage
     */
    delete(message) {
        return message.delete();
    }

    /**
     * @param {message} message
     * @param {ErisContent} content
     * @returns {Promise<message>}
     * @memberof ErisMessage
     */
    edit(message, content) {
        return message.edit(content);
    }
}

export default DetritusMessage;
