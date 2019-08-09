import Handler from '../../../Structures/Handler';

class WebhooksUpdateHandler extends Handler {
    handle(data, channelID, guildID) {
        return guildID;
    }
}

export default WebhooksUpdateHandler;
