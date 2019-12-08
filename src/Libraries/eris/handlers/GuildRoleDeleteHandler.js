import Handler from '../../../Structures/Event/Handler';

class GuildRoleDeleteHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleDeleteHandler;
