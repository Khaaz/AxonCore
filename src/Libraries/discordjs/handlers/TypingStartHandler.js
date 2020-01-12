import AHandler from '../../../Structures/Event/AHandler';

class TypingStartHandler extends AHandler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default TypingStartHandler;
