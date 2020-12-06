import AHandler from '../../../Core/Event/AHandler';

class InviteCreateHandler extends AHandler {
    handle( { guildId } ) {
        return guildId;
    }
}

export default InviteCreateHandler;
