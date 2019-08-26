import Guild from '../../definitions/Guild';

class DjsGuild extends Guild {
    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default DjsGuild;
