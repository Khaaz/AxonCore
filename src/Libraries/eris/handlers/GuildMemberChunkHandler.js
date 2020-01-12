import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberChunkHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberChunkHandler;
