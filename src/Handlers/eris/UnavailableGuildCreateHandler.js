import Handler from '../Handler';

class UnavailableGuildCreateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default UnavailableGuildCreateHandler;
