import Handler from '../../../Structures/Event/Handler';

class GuildUnavailableHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUnavailableHandler;
