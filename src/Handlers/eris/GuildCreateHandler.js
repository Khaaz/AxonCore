import Handler from '../Handler';

class GuildCreateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildCreateHandler;
