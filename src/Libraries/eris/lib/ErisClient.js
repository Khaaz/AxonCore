import Client from '../../definitions/Client';

/**
 * @typedef {import('eris').Client} client
 * @typedef {import('eris').Guild} Guild
 * @typedef {'online' | 'idle' | 'dnd' | 'invisible'} status
 * @typedef {{
 * name?: String, url?: String, type: 0|1|2|3|4
 * }} ErisPresenceGame
 * @typedef {{
 * id: String, type: Number, content: String, channel_id: String, author: { bot: true, id: String, username: String, avatar: String|null, discriminator: '0000'},
 * attachments: Array<RawAttachment>, embeds: Array<import('eris').EmbedOptions>, mentions: Array<RawUser>, mention_roles: Array<String>, pinned: false,
 * mention_everyone: boolean, tts: boolean, timestamp: String, edited_timestamp: null, flags: Number, nonce: null, webhook_id: String
 * }} WebhookResponse
 * @typedef {{
 * url: String, filename: String, id: String, size: Number, proxy_url: String, height?: Number, width?: Number
 * }} RawAttachment
 * @typedef {{
 * id: String, username: String, avatar: String, discriminator: String
 * }} RawUser
 */

class ErisClient extends Client {
    /**
     * @returns {client}
     */
    get client() {
        return this.lib.botClient;
    }

    /**
     * @returns {String}
     */
    getAvatar() {
        return this.getUser() ? this.getUser().avatarURL : null;
    }

    /**
     * @param {Guild} guild
     */
    getMember(guild) {
        return guild.members.get(this.client.user.id);
    }

    // **** METHODS **** //

    connect() {
        return this.client.connect();
    }

    /**
     * @param {status} status
     * @param {ErisPresenceGame} game
     */
    setPresence(status, game) {
        return this.client.editStatus(status, game);
    }

    /**
     * @param {String} id
     * @param {String} token
     * @param {WebhookResponse} data
     */
    triggerWebhook(id, token, data) {
        return this.client
            ? this.client.executeWebhook(id, token, data)
            : super.triggerWebhook(id, token, data);
    }
}

export default ErisClient;
