import AHandler from '../../../Core/Event/AHandler';

class MessageUpdateHandler extends AHandler {
    handle( { message } ) {
        return (message && message.channel && message.channel.guild)
            ? message.channel.guild.id
            : null;
    }
}

export default MessageUpdateHandler;
