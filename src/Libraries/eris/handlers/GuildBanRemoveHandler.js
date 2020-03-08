import AHandler from '../../../Core/Event/AHandler';

class GuildBanRemoveHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanRemoveHandler;
