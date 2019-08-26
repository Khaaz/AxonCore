import Handler from '../../../Structures/Handler';

class GuildUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildUpdateHandler;
