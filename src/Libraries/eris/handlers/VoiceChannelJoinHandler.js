import AHandler from '../../../Structures/Event/AHandler';

class VoiceChannelJoinHandler extends AHandler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceChannelJoinHandler;
