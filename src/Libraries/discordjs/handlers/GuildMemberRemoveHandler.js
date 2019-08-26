import Handler from '../../../Structures/Handler';

class GuildMemberRemoveHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberRemoveHandler;
