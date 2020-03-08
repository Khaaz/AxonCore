import AHandler from '../../../Core/Event/AHandler';

class MessageReactionRemoveEmojiHandler extends AHandler {
    handle(message) {
        return (message.channel && message.channel.guild) ? message.channel.guild.id : null;
    }
}

export default MessageReactionRemoveEmojiHandler;
