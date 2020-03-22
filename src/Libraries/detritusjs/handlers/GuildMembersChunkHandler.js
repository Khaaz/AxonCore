import AHandler from '../../../Core/Event/AHandler';

class GuildMembersChunkHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMembersChunkHandler;
