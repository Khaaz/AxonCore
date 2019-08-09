import Handler from '../../../Structures/Handler';

class GuildRoleDeleteHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleDeleteHandler;
