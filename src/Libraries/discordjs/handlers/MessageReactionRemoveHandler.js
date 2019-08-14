import Handler from '../../../Structures/Handler';

class MessageReactionRemoveHandler extends Handler {
    handle(messageReaction) {
        return messageReaction.message.guild ? messageReaction.message.guild.id : null;
    }
}

export default MessageReactionRemoveHandler;
