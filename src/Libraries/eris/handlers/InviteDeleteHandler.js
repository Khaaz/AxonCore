import AHandler from '../../../Core/Event/AHandler';

class InviteDeleteHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default InviteDeleteHandler;
