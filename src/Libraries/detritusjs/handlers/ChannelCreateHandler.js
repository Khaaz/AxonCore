import AHandler from '../../../Core/Event/AHandler';

class ChannelCreateHandler extends AHandler {
    handle( { channel } ) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelCreateHandler;
