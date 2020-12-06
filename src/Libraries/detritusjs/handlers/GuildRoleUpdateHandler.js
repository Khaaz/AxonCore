import AHandler from '../../../Core/Event/AHandler';

class GuildRoleUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildRoleUpdateHandler;
