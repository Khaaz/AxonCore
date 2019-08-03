import Handler from '../Handler';

class GuildUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUpdateHandler;
