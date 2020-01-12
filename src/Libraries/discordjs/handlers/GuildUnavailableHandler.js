import AHandler from '../../../Structures/Event/AHandler';

class GuildUnavailableHandler extends AHandler {
    handle(guild) {
        return guild ? guild.id : null;
    }
}

export default GuildUnavailableHandler;
