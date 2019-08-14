import Handler from '../../../Structures/Handler';

class GuildMemberUpdateHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberUpdateHandler;
