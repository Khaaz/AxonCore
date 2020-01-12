import AHandler from '../../../Structures/Event/AHandler';

class GuildCreateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildCreateHandler;
