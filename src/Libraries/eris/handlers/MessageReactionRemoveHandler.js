import Handler from '../../../Structures/Event/Handler';

class MessageReactionRemoveHandler extends Handler {
    handle(message) {
        return message.channel.guild ? message.channel.guild.id : null;
    }
}

export default MessageReactionRemoveHandler;
