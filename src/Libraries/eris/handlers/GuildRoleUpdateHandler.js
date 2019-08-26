import Handler from '../../../Structures/Handler';

class GuildRoleUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleUpdateHandler;
