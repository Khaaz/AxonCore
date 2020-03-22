import AHandler from '../../../Structures/Event/AHandler';

class GuildRoleDeleteHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildRoleDeleteHandler;
