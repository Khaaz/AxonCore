import Handler from '../Handler';

class GuildRoleUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildRoleUpdateHandler;
