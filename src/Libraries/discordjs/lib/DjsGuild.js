import Guild from '../../definitions/Guild';

/**
 * @typedef {import('discord.js').Guild} guild
 */

class DjsGuild extends Guild {
    /**
     * @param {guild} guild
     * @param {String} userID
     */
    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default DjsGuild;
