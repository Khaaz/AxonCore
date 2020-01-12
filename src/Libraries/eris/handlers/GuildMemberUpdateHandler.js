import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberUpdateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberUpdateHandler;
