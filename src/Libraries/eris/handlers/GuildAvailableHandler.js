import AHandler from '../../../Core/Event/AHandler';

class GuildAvailableHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildAvailableHandler;
