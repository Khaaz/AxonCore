import Handler from '../Handler';

class VoiceChannelLeaveHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelLeaveHandler;
