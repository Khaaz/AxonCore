import AHandler from '../../../Core/Event/AHandler';

class GuildMemberAddHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberAddHandler;
