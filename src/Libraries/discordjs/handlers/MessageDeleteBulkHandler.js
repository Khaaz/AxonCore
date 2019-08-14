import Handler from '../../../Structures/Handler';

class MessageDeleteBulkHandler extends Handler {
    handle(messages) {
        return (messages.length > 0 && messages[0].guild)
            ? messages.guild.id
            : null;
    }
}

export default MessageDeleteBulkHandler;
