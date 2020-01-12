import AHandler from '../../../Structures/Event/AHandler';

class GuildBanRemoveHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanRemoveHandler;
