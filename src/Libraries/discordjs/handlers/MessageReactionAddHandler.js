import Handler from '../../../Structures/Handler';

class MessageReactionAddHandler extends Handler {
    handle(messageReaction) {
        return messageReaction.message.guild ? messageReaction.message.guild.id : null;
    }
}

export default MessageReactionAddHandler;
