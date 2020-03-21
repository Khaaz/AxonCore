import AHandler from '../../../Core/Event/AHandler';

class MessageDeleteHandler extends AHandler {
    handle(message) {
        return message.channel.guild ? message.channel.guild.id : null;
    }
}

export default MessageDeleteHandler;
