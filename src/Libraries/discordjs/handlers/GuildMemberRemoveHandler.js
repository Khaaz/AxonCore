import Handler from '../../../Structures/Event/Handler';

class GuildMemberRemoveHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberRemoveHandler;
