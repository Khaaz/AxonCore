import Handler from '../Handler';

class GuildAvailableHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildAvailableHandler;
