import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberSpeakingHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberSpeakingHandler;
