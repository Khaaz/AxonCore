import AHandler from '../../../Core/Event/AHandler';

class VoiceStateUpdateHandler extends AHandler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceStateUpdateHandler;
