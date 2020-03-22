import AHandler from '../../../Core/Event/AHandler';

class GuildDeleteHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildDeleteHandler;
