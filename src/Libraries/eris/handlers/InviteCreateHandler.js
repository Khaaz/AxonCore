import AHandler from '../../../Structures/Event/AHandler';

class InviteCreateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default InviteCreateHandler;
