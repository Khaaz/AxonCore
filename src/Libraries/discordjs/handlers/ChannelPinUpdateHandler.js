import Handler from '../../../Structures/Handler';

class ChannelPinUpdateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelPinUpdateHandler;
