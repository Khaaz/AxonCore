import AHandler from '../../../Structures/Event/AHandler';

class MessageHandler extends AHandler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageHandler;
