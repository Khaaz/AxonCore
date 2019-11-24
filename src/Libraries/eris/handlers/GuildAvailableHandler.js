import Handler from '../../../Structures/Event/Handler';

class GuildAvailableHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildAvailableHandler;
