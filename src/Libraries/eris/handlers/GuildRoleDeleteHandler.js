import AHandler from '../../../Core/Event/AHandler';

class GuildRoleDeleteHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleDeleteHandler;
