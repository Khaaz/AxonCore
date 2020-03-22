import AHandler from '../../../Structures/Event/AHandler';

class WebhooksUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default WebhooksUpdateHandler;
