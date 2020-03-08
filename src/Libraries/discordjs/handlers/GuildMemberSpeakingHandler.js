import AHandler from '../../../Core/Event/AHandler';

class GuildMemberSpeakingHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberSpeakingHandler;
