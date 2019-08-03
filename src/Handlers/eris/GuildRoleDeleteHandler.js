import Handler from '../Handler';

class GuildRoleDeleteHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleDeleteHandler;
