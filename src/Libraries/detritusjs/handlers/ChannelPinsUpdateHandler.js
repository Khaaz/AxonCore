import AHandler from '../../../Structures/Event/AHandler';

class ChannelPinsUpdateHandler extends AHandler {
    handle( { channel } ) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelPinsUpdateHandler;
