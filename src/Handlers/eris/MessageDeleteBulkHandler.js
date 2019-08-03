import Handler from '../Handler';

class MessageDeleteBulkHandler extends Handler {
    handle(messages) {
        return (messages.length > 0 && messages[0].channel && messages[0].channel.guild)
            ? messages.channel.guild.id
            : null;
    }
}

export default MessageDeleteBulkHandler;
