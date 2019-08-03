import Handler from '../Handler';

class GuildMemberRemoveHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberRemoveHandler;
