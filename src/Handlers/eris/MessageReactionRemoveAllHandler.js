import Handler from '../Handler';

class MessageReactionRemoveAllHandler extends Handler {
    handle(message) {
        return message.channel.guild ? message.channel.guild.id : null;
    }
}

export default MessageReactionRemoveAllHandler;
