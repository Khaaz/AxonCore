import Channel from '../../definitions/Channel';

/**
 * @typedef {{
 * everyone?: Boolean, roles?: boolean | String[], users?: boolean | String[]
 * }} AllowedMentions
 * @typedef {import('eris').GuildChannel} gchannel
 * @typedef {import('eris').User} User
 * @typedef {
   'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' |
   'addReactions' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'stream' | 'readMessages' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' |
   'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'externalEmojis' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' |
   'voiceDeafenMembers' | 'voiceMoveMembers' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageWebhooks' | 'manageEmojis'
   } ErisPermissions
 * @typedef {import('eris').TextableChannel} channel
 * @typedef {import('eris').Message} Message
 * @typedef {{
 * content?: String, tts?: Boolean, allowedMentions?: AllowedMentions, embed?: Embed|EmbedOptions, file: MessageFile|Array<MessageFile>
 * }} ErisContent
 * @typedef {import('../../../Utility/Discord/Embed').default} Embed
 * @typedef {import('eris').EmbedOptions} EmbedOptions
 * @typedef {import('eris').MessageFile} MessageFile
 */

class ErisChannel extends Channel {
    // **** GETTERS / SETTERS **** //
    
    /**
     * @param {gchannel} channel
     * @param {User} user
     * @param {ErisPermissions} perm
     * @returns {Boolean}
     * @memberof ErisChannel
     */
    hasPermission(channel, user, perm) {
        return channel.permissionsOf(user.id).has(perm);
        // djs: channel.permissionsFor(user.id).has(perm)
    }
    // **** METHODS **** //
    
    /**
     * @param {channel} channel
     * @param {ErisContent} content
     * @returns {Promise<Message>}
     * @memberof ErisChannel
     */
    sendMessage(channel, content) {
        if (typeof content === 'object') {
            const file = content.file || null;
            return channel.createMessage(content, file);
        }
        return channel.createMessage(content);
    }
}

export default ErisChannel;
