import AHandler from '../../../Core/Event/AHandler';

class MessageDeleteBulkHandler extends AHandler {
    handle(messages) {
        return (messages.length > 0 && messages[0].guild)
            ? messages.guild.id
            : null;
    }
}

export default MessageDeleteBulkHandler;
