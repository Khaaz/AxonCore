import AHandler from '../../../Structures/Event/AHandler';

class InviteDeleteHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default InviteDeleteHandler;
