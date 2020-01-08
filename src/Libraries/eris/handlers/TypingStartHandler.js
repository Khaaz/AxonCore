import Handler from '../../../Structures/Event/Handler';

class TypingStartHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default TypingStartHandler;
