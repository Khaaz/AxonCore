import AHandler from '../../../Core/Event/AHandler';

class GuildRoleCreateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleCreateHandler;
