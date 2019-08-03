import Handler from '../Handler';

class MessageReactionAddHandler extends Handler {
    handle(message) {
        return message.channel.guild ? message.channel.guild.id : null;
    }
}

export default MessageReactionAddHandler;
