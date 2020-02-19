import Message from '../../definitions/Message';

/**
 * @typedef {import('discord.js').Message} message
 * @typedef {{
 * content?: String, tts?: Boolean, nonce?: String, embed?: Embed|import('discord.js').MessageEmbed|import('discord.js').MessageEmbedOptions, disableEveryone?: Boolean,
 * files?: Array<import('discord.js').FileOptions|import('discord.js').BufferResolvable|import('discord.js').MessageAttachment>, code?: String|Boolean,
 * split?: Boolean|import('discord.js').SplitOptions, reply?: import('discord.js').UserResolvable
 * }} DjsContent
 * @typedef {import('../../../Utility/Discord/Embed').default} Embed
 */

class DjsMessage extends Message {
    // **** METHODS **** //

    /**
     * @param {message} message
     */
    delete(message) {
        return message.delete();
    }

    /**
     * @param {message} message
     * @param {String|DjsContent} content
     * @returns {Promise<message>}
     */
    edit(message, content) {
        if (typeof content === 'object') {
            const msg = content.content || '';
            return message.edit(msg, content);
        }
        return message.edit(content);
    }
}

export default DjsMessage;
