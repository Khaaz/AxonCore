import AHandler from '../../../Structures/Event/AHandler';

class GuildBanAddHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildBanAddHandler;
