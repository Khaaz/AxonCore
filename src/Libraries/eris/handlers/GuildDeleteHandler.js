import Handler from '../../../Structures/Handler';

class GuildDeleteHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildDeleteHandler;
