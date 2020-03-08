import AHandler from '../../../Core/Event/AHandler';

class PresenceUpdateHandler extends AHandler {
    handle(member) {
        return member.guild ? member.guild.id : null;
    }
}

export default PresenceUpdateHandler;
