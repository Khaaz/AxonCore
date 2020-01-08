import Handler from '../../../Structures/Event/Handler';

class GuildMemberUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberUpdateHandler;
