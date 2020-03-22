import AHandler from '../../../Core/Event/AHandler';

class GuildRoleCreateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildRoleCreateHandler;
