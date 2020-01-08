import Handler from '../../../Structures/Event/Handler';

class GuildMemberSpeakingHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberSpeakingHandler;
