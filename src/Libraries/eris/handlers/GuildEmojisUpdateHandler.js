import Handler from '../../../Structures/Event/Handler';

class GuildEmojisUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildEmojisUpdateHandler;
