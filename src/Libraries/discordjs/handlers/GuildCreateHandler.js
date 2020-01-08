import Handler from '../../../Structures/Event/Handler';

class GuildCreateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildCreateHandler;
