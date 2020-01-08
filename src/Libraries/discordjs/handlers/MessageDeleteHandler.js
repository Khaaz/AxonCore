import Handler from '../../../Structures/Event/Handler';

class MessageDeleteHandler extends Handler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageDeleteHandler;
