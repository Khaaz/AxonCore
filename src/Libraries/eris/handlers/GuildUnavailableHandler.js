import AHandler from '../../../Structures/Event/AHandler';

class GuildUnavailableHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUnavailableHandler;
