import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberRemoveHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMemberRemoveHandler;
