import AHandler from '../../../Structures/Event/AHandler';

class GuildRoleCreateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleCreateHandler;
