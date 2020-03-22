import AHandler from '../../../Structures/Event/AHandler';

class MessageDeleteHandler extends AHandler {
    handle( { message } ) {
        return (message && message.channel && message.channel.guild)
            ? message.channel.guild.id
            : null;
    }
}

export default MessageDeleteHandler;
