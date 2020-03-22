import AHandler from '../../../Core/Event/AHandler';

class GuildMemberAddHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMemberAddHandler;
