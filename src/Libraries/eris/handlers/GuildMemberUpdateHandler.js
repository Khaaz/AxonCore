import Handler from '../../../Structures/Handler';

class GuildMemberUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberUpdateHandler;
