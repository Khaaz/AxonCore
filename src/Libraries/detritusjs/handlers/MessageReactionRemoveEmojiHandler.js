import AHandler from '../../../Core/Event/AHandler';

class MessageReactionRemoveEmojiHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default MessageReactionRemoveEmojiHandler;
