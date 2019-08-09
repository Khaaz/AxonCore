import Handler from '../../../Structures/Handler';

class GuildMemberChunkHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberChunkHandler;
