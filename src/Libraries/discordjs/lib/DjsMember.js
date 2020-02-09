import Member from '../../definitions/Member';

/**
 * @typedef {import('discord.js').GuildMember} GuildMember
 */

class DjsMember extends Member {
    // **** GETTERS / SETTERS **** //

    /**
     * @param {GuildMember} member
     */
    getRoles(member) {
        return [...member.roles.keys()];
    }

    /**
     * @param {GuildMember} member
     */
    getRolesObject(member) {
        return [...member.roles.values()];
    }

    /**
     * @param {GuildMember} member
     * @param {String|Number|Array<String|Number>} permission
     */
    hasPermission(member, permission) {
        return member.hasPermission(permission);
    }
}

export default DjsMember;
