import AHandler from '../../../Structures/Event/AHandler';

class GuildRoleCreateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildRoleCreateHandler;
