import AHandler from '../../../Core/Event/AHandler';

class VoiceChannelLeaveHandler extends AHandler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelLeaveHandler;
