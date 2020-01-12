import AHandler from '../../../Structures/Event/AHandler';

class GuildUpdateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUpdateHandler;
