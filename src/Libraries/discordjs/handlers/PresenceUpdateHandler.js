import Handler from '../../../Structures/Handler';

class PresenceUpdateHandler extends Handler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default PresenceUpdateHandler;
