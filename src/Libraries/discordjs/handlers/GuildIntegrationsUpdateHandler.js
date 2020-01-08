import Handler from '../../../Structures/Event/Handler';

class GuildIntegrationsUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildIntegrationsUpdateHandler;
