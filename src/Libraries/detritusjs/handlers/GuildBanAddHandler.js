import AHandler from '../../../Structures/Event/AHandler';

class GuildBanAddHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildBanAddHandler;
