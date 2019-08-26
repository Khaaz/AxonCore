import Handler from '../../../Structures/Handler';

class MessageReactionRemoveAllHandler extends Handler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageReactionRemoveAllHandler;
