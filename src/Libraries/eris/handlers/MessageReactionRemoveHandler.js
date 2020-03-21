import AHandler from '../../../Core/Event/AHandler';

class MessageReactionRemoveHandler extends AHandler {
    handle(message) {
        return message.channel.guild ? message.channel.guild.id : null;
    }
}

export default MessageReactionRemoveHandler;
