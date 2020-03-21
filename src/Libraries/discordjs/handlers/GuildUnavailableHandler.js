import AHandler from '../../../Core/Event/AHandler';

class GuildUnavailableHandler extends AHandler {
    handle(guild) {
        return guild ? guild.id : null;
    }
}

export default GuildUnavailableHandler;
