import Handler from '../../../Structures/Handler';

class GuildEmojisUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildEmojisUpdateHandler;
