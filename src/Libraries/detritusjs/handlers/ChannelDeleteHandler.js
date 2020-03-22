import AHandler from '../../../Structures/Event/AHandler';

class ChannelDeleteHandler extends AHandler {
    handle( { channel } ) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default ChannelDeleteHandler;
