import AHandler from '../../../Structures/Event/AHandler';

class ChannelUpdateHandler extends AHandler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelUpdateHandler;
