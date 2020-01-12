import AHandler from '../../../Structures/Event/AHandler';

class MessageReactionRemoveAllHandler extends AHandler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageReactionRemoveAllHandler;
