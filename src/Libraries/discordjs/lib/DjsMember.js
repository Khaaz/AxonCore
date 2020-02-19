import Member from '../../definitions/Member';

/**
 * @typedef {import('discord.js').GuildMember} GuildMember
 * @typedef {import('discord.js').Role} Role
 */

class DjsMember extends Member {
    // **** GETTERS / SETTERS **** //

    /**
     * @param {GuildMember} member
     * @returns {Array<String>}
     * @memberof DjsMember
     */
    getRoles(member) {
        return [...member.roles.keys()];
    }

    /**
     * @param {GuildMember} member
     * @returns {Array<Role>}
     * @memberof DjsMember
     */
    getRolesObject(member) {
        return [...member.roles.values()];
    }

    /**
     * @param {GuildMember} member
     * @param {String|Number|Array<String|Number>} permission
     * @returns {Boolean}
     * @memberof DjsMember
     */
    hasPermission(member, permission) {
        return member.hasPermission(permission);
    }
}

export default DjsMember;
