import AHandler from '../../../Core/Event/AHandler';

class GuildMemberAddHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberAddHandler;
