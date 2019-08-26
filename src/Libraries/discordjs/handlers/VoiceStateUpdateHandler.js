import Handler from '../../../Structures/Handler';

class VoiceStateUpdateHandler extends Handler {
    handle(voiceState) {
        return voiceState.guild ? voiceState.guild.id : null;
    }
}

export default VoiceStateUpdateHandler;
