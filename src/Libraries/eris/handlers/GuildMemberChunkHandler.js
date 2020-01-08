import Handler from '../../../Structures/Event/Handler';

class GuildMemberChunkHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberChunkHandler;
