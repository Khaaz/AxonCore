import Handler from '../../../Structures/Handler';

class GuildUnavailableHandler extends Handler {
    handle(guild) {
        return guild ? guild.id : null;
    }
}

export default GuildUnavailableHandler;
