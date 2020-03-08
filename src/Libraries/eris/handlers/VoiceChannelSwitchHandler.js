import AHandler from '../../../Core/Event/AHandler';

class VoiceChannelSwitchHandler extends AHandler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelSwitchHandler;
