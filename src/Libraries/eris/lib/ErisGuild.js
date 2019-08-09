import Guild from '../../definitions/Guild';

class ErisGuild extends Guild {
    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default ErisGuild;
