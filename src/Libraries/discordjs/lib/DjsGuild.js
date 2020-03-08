import Guild from '../../definitions/Guild';

/**
 * @typedef {import('discord.js').Guild} guild
 * @typedef {import('discord.js').GuildMember} GuildMember
 */

class DjsGuild extends Guild {
    /**
     * @param {guild} guild
     * @param {String} userID
     * @returns {GuildMember}
     * @memberof DjsGuild
     */
    getMember(guild, userID) {
        return guild.members.cache.get(userID);
    }
}

export default DjsGuild;
