import Handler from '../../../Structures/Handler';

class GuildMemberChunkHandler extends Handler {
    handle(members) {
        return members[0] ? members[0].guild.id : null;
    }
}

export default GuildMemberChunkHandler;
