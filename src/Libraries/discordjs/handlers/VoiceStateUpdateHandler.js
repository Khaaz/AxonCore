import Handler from '../../../Structures/Handler';

class VoiceStateUpdateHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default VoiceStateUpdateHandler;
