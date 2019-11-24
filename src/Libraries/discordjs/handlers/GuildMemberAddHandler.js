import Handler from '../../../Structures/Event/Handler';

class GuildMemberAddHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberAddHandler;
