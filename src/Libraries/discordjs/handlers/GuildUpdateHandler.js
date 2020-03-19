import AHandler from '../../../Core/Event/AHandler';

class GuildUpdateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUpdateHandler;
