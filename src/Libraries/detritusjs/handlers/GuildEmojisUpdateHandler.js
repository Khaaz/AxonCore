import AHandler from '../../../Core/Event/AHandler';

class GuildEmojisUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildEmojisUpdateHandler;
