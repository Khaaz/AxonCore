import AHandler from '../../../Core/Event/AHandler';

class MessageReactionRemoveHandler extends AHandler {
    handle( { guildId } ) {
        return guildId | null;
    }
}

export default MessageReactionRemoveHandler;
