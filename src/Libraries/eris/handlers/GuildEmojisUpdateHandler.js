import AHandler from '../../../Structures/Event/AHandler';

class GuildEmojisUpdateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildEmojisUpdateHandler;
