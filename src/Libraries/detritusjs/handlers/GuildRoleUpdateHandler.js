import AHandler from '../../../Structures/Event/AHandler';

class GuildRoleUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildRoleUpdateHandler;
