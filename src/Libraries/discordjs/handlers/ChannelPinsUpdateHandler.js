import Handler from '../../../Structures/Event/Handler';

class ChannelPinsUpdateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelPinsUpdateHandler;
