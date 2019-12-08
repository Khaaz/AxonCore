import Handler from '../../../Structures/Event/Handler';

class MessageHandler extends Handler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageHandler;
