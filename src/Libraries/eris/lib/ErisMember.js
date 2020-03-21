import Member from '../../definitions/Member';

/**
 * @typedef {import('eris').Member} member
 * @typedef {
    'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' |
    'addReactions' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'stream' | 'readMessages' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' |
    'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'externalEmojis' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' |
    'voiceDeafenMembers' | 'voiceMoveMembers' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageWebhooks' | 'manageEmojis'
    } ErisPermissions
    @typedef {import('eris').Role} Role
 */

class ErisMember extends Member {
    // **** GETTERS / SETTERS **** //

    /**
     * @param {member} member
     * @returns {Array<String>}
     * @memberof ErisMember
     */
    getRoles(member) {
        return member.roles;
    }

    /**
     * @param {member} member
     * @returns {Array<Role>}
     * @memberof ErisMember
     */
    getRolesObject(member) {
        const { guild } = member;
        return member.roles.map(r => guild.roles.get(r) );
    }

    /**
     * @param {member} member
     * @param {ErisPermissions} permission
     * @returns {Boolean}
     * @memberof ErisMember
     */
    hasPermission(member, permission) {
        return member.permission.has(permission);
    }
}

export default ErisMember;
