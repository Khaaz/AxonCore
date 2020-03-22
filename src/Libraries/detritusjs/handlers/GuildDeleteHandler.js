import AHandler from '../../../Structures/Event/AHandler';

class GuildDeleteHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildDeleteHandler;
