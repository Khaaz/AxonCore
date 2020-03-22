import AHandler from '../../../Core/Event/AHandler';

class GuildMemberUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMemberUpdateHandler;
