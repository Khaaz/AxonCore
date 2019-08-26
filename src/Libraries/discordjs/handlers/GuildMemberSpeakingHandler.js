import Handler from '../../../Structures/Handler';

class GuildMemberSpeakingHandler extends Handler {
    handle(member) {
        return member.guild.id;
    }
}

export default GuildMemberSpeakingHandler;
