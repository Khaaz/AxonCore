import Handler from '../../../Structures/Handler';

class GuildMemberRemoveHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberRemoveHandler;
