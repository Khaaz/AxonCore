import AHandler from '../../../Structures/Event/AHandler';

class ChannelPinUpdateHandler extends AHandler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelPinUpdateHandler;
