import AHandler from '../../../Core/Event/AHandler';

class InviteCreateHandler extends AHandler {
    handle(invite) {
        return invite.guild ? invite.guild.id : null;
    }
}

export default InviteCreateHandler;
