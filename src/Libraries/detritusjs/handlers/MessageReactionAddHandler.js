import AHandler from '../../../Structures/Event/AHandler';

class MessageReactionAddHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default MessageReactionAddHandler;
