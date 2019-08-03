import Handler from '../Handler';

class GuildEmojisUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildEmojisUpdateHandler;
