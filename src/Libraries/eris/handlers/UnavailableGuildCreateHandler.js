import AHandler from '../../../Structures/Event/AHandler';

class UnavailableGuildCreateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default UnavailableGuildCreateHandler;
