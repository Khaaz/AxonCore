import Handler from '../../../Structures/Event/Handler';

class VoiceChannelSwitchHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelSwitchHandler;
