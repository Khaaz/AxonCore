import Handler from '../../../Structures/Handler';

class GuildMemberAddHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberAddHandler;
