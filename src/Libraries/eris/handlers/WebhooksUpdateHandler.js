import AHandler from '../../../Core/Event/AHandler';

class WebhooksUpdateHandler extends AHandler {
    handle(data, channelID, guildID) {
        return guildID;
    }
}

export default WebhooksUpdateHandler;
