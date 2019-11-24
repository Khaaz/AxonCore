import Handler from '../../../Structures/Event/Handler';

class GuildRoleCreateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleCreateHandler;
