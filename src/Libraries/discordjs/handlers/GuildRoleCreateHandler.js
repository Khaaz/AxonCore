import Handler from '../../../Structures/Handler';

class GuildRoleCreateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleCreateHandler;
