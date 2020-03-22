import AHandler from '../../../Structures/Event/AHandler';

class MessageReactionRemoveAllHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default MessageReactionRemoveAllHandler;
