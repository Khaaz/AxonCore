import AHandler from '../../../Core/Event/AHandler';

class GuildMemberRemoveHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMemberRemoveHandler;
