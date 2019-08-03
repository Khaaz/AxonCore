import Handler from '../Handler';

class MessageUpdateHandler extends Handler {
    handle(message) {
        return message.channel.guild ? message.channel.guild.id : null;
    }
}

export default MessageUpdateHandler;
