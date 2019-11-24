import Handler from '../../../Structures/Event/Handler';

class MessageReactionRemoveHandler extends Handler {
    handle(messageReaction) {
        return messageReaction.message.guild ? messageReaction.message.guild.id : null;
    }
}

export default MessageReactionRemoveHandler;
