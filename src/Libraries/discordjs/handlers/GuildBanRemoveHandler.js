import Handler from '../../../Structures/Event/Handler';

class GuildBanRemoveHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanRemoveHandler;
