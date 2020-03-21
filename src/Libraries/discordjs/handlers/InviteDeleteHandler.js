import AHandler from '../../../Core/Event/AHandler';

class InviteDeleteHandler extends AHandler {
    handle(invite) {
        return invite.guild ? invite.guild.id : null;
    }
}

export default InviteDeleteHandler;
