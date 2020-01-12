import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberChunkHandler extends AHandler {
    handle(members) {
        return members[0] ? members[0].guild.id : null;
    }
}

export default GuildMemberChunkHandler;
