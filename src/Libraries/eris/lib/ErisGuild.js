import Guild from '../../definitions/Guild';

/**
 * @typedef {import('eris').Guild} guild
 */

class ErisGuild extends Guild {
    /**
     * @param {guild} guild
     * @param {String} userID
     */
    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default ErisGuild;
