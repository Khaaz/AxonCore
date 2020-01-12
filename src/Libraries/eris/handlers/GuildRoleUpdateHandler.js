import AHandler from '../../../Structures/Event/AHandler';

class GuildRoleUpdateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleUpdateHandler;
