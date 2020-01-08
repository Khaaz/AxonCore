import Handler from '../../../Structures/Event/Handler';

class GuildUnavailableHandler extends Handler {
    handle(guild) {
        return guild ? guild.id : null;
    }
}

export default GuildUnavailableHandler;
