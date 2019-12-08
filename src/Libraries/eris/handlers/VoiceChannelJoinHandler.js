import Handler from '../../../Structures/Event/Handler';

class VoiceChannelJoinHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelJoinHandler;
