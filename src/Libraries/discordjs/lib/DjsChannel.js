import Channel from '../../definitions/Channel';

/**
 * @typedef {import('discord.js').Channel} channel
 * @typedef {import('discord.js').User} user
 * @typedef {{
 * content?: String, tts?: Boolean, nonce?: String, embed?: Embed|import('discord.js').MessageEmbed|import('discord.js').MessageEmbedOptions, disableEveryone?: Boolean,
 * files?: Array<import('discord.js').FileOptions|import('discord.js').BufferResolvable|import('discord.js').MessageAttachment>, code?: String|Boolean,
 * split?: Boolean|import('discord.js').SplitOptions, reply?: import('discord.js').UserResolvable, allowedMentions: Object
 * }} DjsContent
 * @typedef {import('../../../Utility/Discord/Embed').default} Embed
 * @typedef {import('discord.js').Message} message
 */

class DjsChannel extends Channel {
    // **** GETTERS / SETTERS **** //
    
    /**
     * @param {channel} channel
     * @param {user} user
     * @param {String|Number|Array<String|Number>} perm
     * @returns {Boolean}
     * @memberof DjsChannel
     */
    hasPermission(channel, user, perm) {
        return channel.permissionsFor(user.id).has(perm);
    }
    // **** METHODS **** //
    
    /**
     * @param {channel} channel
     * @param {string|DjsContent} content
     * @returns {Promise<message>}
     * @memberof DjsChannel
     */
    sendMessage(channel, content) {
        if (typeof content === 'object') {
            const message = content.content || '';
            return channel.send(message, content);
        }
        return channel.send(content);
    }
}

export default DjsChannel;
