import Handler from '../../../Structures/Event/Handler';

class ChannelCreateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelCreateHandler;
