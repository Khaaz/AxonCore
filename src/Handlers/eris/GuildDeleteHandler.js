import Handler from '../Handler';

class GuildDeleteHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildDeleteHandler;
