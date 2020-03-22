import AHandler from '../../../Structures/Event/AHandler';

class PresenceUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default PresenceUpdateHandler;
