import Handler from '../../../Structures/Event/Handler';

class GuildMemberUpdateHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberUpdateHandler;
