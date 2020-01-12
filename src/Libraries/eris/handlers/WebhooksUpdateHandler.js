import AHandler from '../../../Structures/Event/AHandler';

class WebhooksUpdateHandler extends AHandler {
    handle(data, channelID, guildID) {
        return guildID;
    }
}

export default WebhooksUpdateHandler;
