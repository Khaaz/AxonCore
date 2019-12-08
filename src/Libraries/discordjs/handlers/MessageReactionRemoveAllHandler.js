import Handler from '../../../Structures/Event/Handler';

class MessageReactionRemoveAllHandler extends Handler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageReactionRemoveAllHandler;
