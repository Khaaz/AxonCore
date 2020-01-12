import AHandler from '../../../Structures/Event/AHandler';

class MessageUpdateHandler extends AHandler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageUpdateHandler;
