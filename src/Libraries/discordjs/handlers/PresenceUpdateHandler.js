import AHandler from '../../../Structures/Event/AHandler';

class PresenceUpdateHandler extends AHandler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default PresenceUpdateHandler;
