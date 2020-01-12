import AHandler from '../../../Structures/Event/AHandler';

class VoiceStateUpdateHandler extends AHandler {
    handle(voiceState) {
        return voiceState.guild ? voiceState.guild.id : null;
    }
}

export default VoiceStateUpdateHandler;
