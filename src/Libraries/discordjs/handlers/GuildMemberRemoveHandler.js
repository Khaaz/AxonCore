import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberRemoveHandler extends AHandler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberRemoveHandler;
