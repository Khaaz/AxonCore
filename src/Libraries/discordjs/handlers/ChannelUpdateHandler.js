import Handler from '../../../Structures/Handler';

class ChannelUpdateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelUpdateHandler;
