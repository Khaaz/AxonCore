import AHandler from '../../../Core/Event/AHandler';

class VoiceStateUpdateHandler extends AHandler {
    handle( { voiceState } ) {
        return voiceState.guild.id || null;
    }
}

export default VoiceStateUpdateHandler;
