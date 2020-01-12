import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberUpdateHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberUpdateHandler;
