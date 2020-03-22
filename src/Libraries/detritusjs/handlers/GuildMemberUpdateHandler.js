import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMemberUpdateHandler;
