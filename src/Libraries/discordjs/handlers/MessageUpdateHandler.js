import Handler from '../../../Structures/Handler';

class MessageUpdateHandler extends Handler {
    handle(message) {
        return message.guild ? message.guild.id : null;
    }
}

export default MessageUpdateHandler;
