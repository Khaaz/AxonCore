import Client from '../../definitions/Client';
import AxonError from '../../../Errors/AxonError';

/**
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 * @typedef {import('discord.js').Client} botClient
 * @typedef {import('discord.js').Guild} Guild
 * @typedef {import('discord.js').PresenceStatus} PresenceStatus
 * @typedef {{
 * name?: String, url?: String, type?: ActivityType | 0 | 1 | 2 | 3 | 4
 * }} DjsPresenceGame
 * @typedef {import('discord.js').ActivityType} ActivityType
 * @typedef {{
 * username?: String, avatarURL?: String, embeds?:Array<Embed|import('discord.js').MessageEmbed|import('discord.js').MessageEmbedOptions>
 * content?: String, tts?: Boolean, nonce?: String, disableEveryone?: Boolean,
 * files?: Array<import('discord.js').FileOptions|import('discord.js').BufferResolvable|import('discord.js').MessageAttachment>, code?: String|Boolean,
 * split?: Boolean|import('discord.js').SplitOptions}} DjsWebhookContent
 * @typedef {import('../../../Utility/Discord/Embed').default} Embed
 * @typedef {{
 * id: String, type: Number, content: String, channel_id: String, author: { bot: true, id: String, username: String, avatar: String|null, discriminator: '0000'},
 * attachments: Array<RawAttachment>, embeds: Array<import('discord.js').MessageEmbedOptions>, mentions: Array<RawUser>, mention_roles: Array<String>, pinned: false,
 * mention_everyone: boolean, tts: boolean, timestamp: String, edited_timestamp: null, flags: Number, nonce: null, webhook_id: String
 * }} WebhookResponse
 * @typedef {{
 * url: String, filename: String, id: String, size: Number, proxy_url: String, height?: Number, width?: Number
 * }} RawAttachment
 * @typedef {{
 * id: String, username: String, avatar: String, discriminator: String
 * }} RawUser
 * @typedef {import('discord.js').GuildMember} GuildMember
 * @typedef {import('discord.js').Presence} Presence
 */

class DjsClient extends Client {
    /**
     * @param {LibraryInterface} lib
     * @param {String} token
     * @memberof DjsClient
     */
    constructor(lib, token) {
        super(lib);
        if (!token) {
            throw new AxonError('No token provided! Please provide a token through AxonOptions!', 'DjsClient');
        }
        this._token = token;
    }

    /**
     * @readonly
     * @type {botClient}
     */
    get client() {
        return this.lib.botClient;
    }

    /**
     * @returns {String}
     */
    getAvatar() {
        return this.getUser() ? this.getUser().avatarURL() : null;
    }

    /**
     * @param {Guild} guild
     * @returns {GuildMember}
     */
    getMember(guild) {
        return guild.me;
    }
    // **** METHODS **** //

    /**
     * @returns {Promise<String>}
     */
    connect() {
        return this.client.login(this._token);
    }

    /**
     * @param {PresenceStatus} status
     * @param {DjsPresenceGame} game
     * @returns {Promise<Presence>}
     */
    setPresence(status, game) {
        return this.client.user.setPresence( {
            status,
            activity: game,
        } );
    }

    /**
     * @param {String} id
     * @param {String} token
     * @param {DjsWebhookContent} data
     * @returns {WebhookResponse}
     */
    triggerWebhook(id, token, data) {
        return this.client
            ? this.client.api.webhooks(id, token).post( {
                data,
                query: { wait: true },
                auth: false,
            } )
            : super.triggerWebhook(id, token, data);
    }
}

export default DjsClient;
