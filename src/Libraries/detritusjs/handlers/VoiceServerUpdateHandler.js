import AHandler from '../../../Core/Event/AHandler';

class VoiceServerUpdateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default VoiceServerUpdateHandler;
