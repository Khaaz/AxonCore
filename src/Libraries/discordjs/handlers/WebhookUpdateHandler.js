import AHandler from '../../../Structures/Event/AHandler';

class WebhookUpdateHandler extends AHandler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default WebhookUpdateHandler;
