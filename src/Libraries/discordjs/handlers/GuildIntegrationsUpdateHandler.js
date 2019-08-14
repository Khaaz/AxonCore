import Handler from '../../../Structures/Handler';

class GuildIntegrationsUpdateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildIntegrationsUpdateHandler;
