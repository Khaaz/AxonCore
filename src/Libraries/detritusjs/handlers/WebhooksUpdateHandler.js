import AHandler from '../../../Core/Event/AHandler';

class WebhooksUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default WebhooksUpdateHandler;
