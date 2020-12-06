import AHandler from '../../../Core/Event/AHandler';

class InviteDeleteHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default InviteDeleteHandler;
