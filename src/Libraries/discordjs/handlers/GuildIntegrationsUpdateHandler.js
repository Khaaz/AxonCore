import AHandler from '../../../Core/Event/AHandler';

class GuildIntegrationsUpdateHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildIntegrationsUpdateHandler;
