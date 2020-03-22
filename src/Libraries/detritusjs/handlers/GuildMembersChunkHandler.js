import AHandler from '../../../Structures/Event/AHandler';

class GuildMembersChunkHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default GuildMembersChunkHandler;
