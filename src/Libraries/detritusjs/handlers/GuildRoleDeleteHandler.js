import AHandler from '../../../Core/Event/AHandler';

class GuildRoleDeleteHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildRoleDeleteHandler;
