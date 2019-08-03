import Handler from '../Handler';

class GuildMemberAddHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberAddHandler;
