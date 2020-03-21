import AHandler from '../../../Core/Event/AHandler';

class GuildMemberRemoveHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberRemoveHandler;
