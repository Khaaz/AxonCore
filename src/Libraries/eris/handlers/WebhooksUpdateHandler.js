import Handler from '../../../Structures/Event/Handler';

class WebhooksUpdateHandler extends Handler {
    handle(data, channelID, guildID) {
        return guildID;
    }
}

export default WebhooksUpdateHandler;
