import AHandler from '../../../Core/Event/AHandler';

class GuildMemberUpdateHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberUpdateHandler;
