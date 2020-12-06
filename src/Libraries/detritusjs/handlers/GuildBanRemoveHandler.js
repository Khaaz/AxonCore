import AHandler from '../../../Core/Event/AHandler';

class GuildBanRemoveHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildBanRemoveHandler;
