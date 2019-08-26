import Handler from '../../../Structures/Handler';

class WebhookUpdateHandler extends Handler {
    handle(channel) {
        return channel.guild ? channel.guild.id : null;
    }
}

export default WebhookUpdateHandler;
