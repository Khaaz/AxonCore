import AHandler from '../../../Structures/Event/AHandler';

class MessageDeleteBulkHandler extends AHandler {
    handle( { messages } ) {
        const firstMessage = messages.first();
        return (messages.size > 0 && firstMessage && firstMessage.channel && firstMessage.channel.guild)
            ? messages.channel.guild.id
            : null;
    }
}

export default MessageDeleteBulkHandler;
