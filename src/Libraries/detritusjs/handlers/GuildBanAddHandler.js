import AHandler from '../../../Core/Event/AHandler';

class GuildBanAddHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildBanAddHandler;
