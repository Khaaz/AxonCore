import Handler from '../../../Structures/Handler';

class ChannelPinsUpdateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelPinsUpdateHandler;
