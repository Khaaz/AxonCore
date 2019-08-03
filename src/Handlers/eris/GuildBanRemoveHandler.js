import Handler from '../Handler';

class GuildBanRemoveHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanRemoveHandler;
