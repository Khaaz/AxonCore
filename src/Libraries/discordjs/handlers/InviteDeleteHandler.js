import AHandler from '../../../Structures/Event/AHandler';

class InviteDeleteHandler extends AHandler {
    handle(invite) {
        return invite.guild ? invite.guild.id : null;
    }
}

export default InviteDeleteHandler;
