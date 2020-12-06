import Guild from '../../definitions/Guild';

/**
 * @typedef {import('eris').Guild} guild
 * @typedef {import('eris').Member} Member
 */

class DetritusGuild extends Guild {
    /**
     * @param {guild} guild
     * @param {String} userID
     * @returns {Member}
     * @memberof ErisGuild
     */
    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default DetritusGuild;
