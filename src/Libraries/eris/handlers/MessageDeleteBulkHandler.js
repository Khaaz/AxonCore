import AHandler from '../../../Core/Event/AHandler';

class MessageDeleteBulkHandler extends AHandler {
    handle(messages) {
        return (messages.length > 0 && messages[0].channel && messages[0].channel.guild)
            ? messages.channel.guild.id
            : null;
    }
}

export default MessageDeleteBulkHandler;
