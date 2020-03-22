import AHandler from '../../../Core/Event/AHandler';

class MessageReactionRemoveAllHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default MessageReactionRemoveAllHandler;
