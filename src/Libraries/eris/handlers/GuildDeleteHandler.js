import AHandler from '../../../Core/Event/AHandler';

class GuildDeleteHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildDeleteHandler;
