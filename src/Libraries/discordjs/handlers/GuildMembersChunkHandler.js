import AHandler from '../../../Core/Event/AHandler';

class GuildMembersChunkHandler extends AHandler {
    handle(members) {
        return members[0] ? members[0].guild.id : null;
    }
}

export default GuildMembersChunkHandler;
