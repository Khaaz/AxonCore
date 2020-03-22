import AHandler from '../../../Structures/Event/AHandler';

class GuildEmojisUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildEmojisUpdateHandler;
