import Handler from '../../../Structures/Event/Handler';

class ChannelUpdateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelUpdateHandler;
