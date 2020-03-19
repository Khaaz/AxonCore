import AHandler from '../../../Core/Event/AHandler';

class MessageDeleteHandler extends AHandler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageDeleteHandler;
