import AHandler from '../../../Core/Event/AHandler';

class GuildBanAddHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanAddHandler;
