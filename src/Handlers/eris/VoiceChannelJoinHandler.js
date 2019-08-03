import Handler from '../Handler';

class VoiceChannelJoinHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelJoinHandler;
