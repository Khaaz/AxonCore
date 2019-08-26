import Handler from '../../../Structures/Handler';

class GuildUnavailableHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUnavailableHandler;
