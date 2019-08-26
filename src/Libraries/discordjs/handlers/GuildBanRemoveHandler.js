import Handler from '../../../Structures/Handler';

class GuildBanRemoveHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanRemoveHandler;
