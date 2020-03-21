import AHandler from '../../../Core/Event/AHandler';

class ChannelPinUpdateHandler extends AHandler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelPinUpdateHandler;
