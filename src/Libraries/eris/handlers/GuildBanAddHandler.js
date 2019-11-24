import Handler from '../../../Structures/Event/Handler';

class GuildBanAddHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanAddHandler;
