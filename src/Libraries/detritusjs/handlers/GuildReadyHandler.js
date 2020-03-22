import AHandler from '../../../Core/Event/AHandler';

class GuildReadyHandler extends AHandler {
    handle( { guild } ) {
        return guild.id;
    }
}

export default GuildReadyHandler;
