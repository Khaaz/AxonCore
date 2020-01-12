import AHandler from '../../../Structures/Event/AHandler';

class GuildDeleteHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildDeleteHandler;
