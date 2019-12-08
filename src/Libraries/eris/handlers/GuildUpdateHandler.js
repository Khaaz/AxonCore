import Handler from '../../../Structures/Event/Handler';

class GuildUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUpdateHandler;
