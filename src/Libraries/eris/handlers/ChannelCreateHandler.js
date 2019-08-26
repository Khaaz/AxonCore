import Handler from '../../../Structures/Handler';

class ChannelCreateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelCreateHandler;
