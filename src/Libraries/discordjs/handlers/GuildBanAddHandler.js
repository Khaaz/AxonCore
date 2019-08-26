import Handler from '../../../Structures/Handler';

class GuildBanAddHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanAddHandler;
