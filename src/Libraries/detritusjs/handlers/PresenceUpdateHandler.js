import AHandler from '../../../Core/Event/AHandler';

class PresenceUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default PresenceUpdateHandler;
