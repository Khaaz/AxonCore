import Handler from '../../../Structures/Handler';

class VoiceChannelJoinHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelJoinHandler;
