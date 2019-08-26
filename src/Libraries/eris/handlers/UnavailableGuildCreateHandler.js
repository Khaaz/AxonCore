import Handler from '../../../Structures/Handler';

class UnavailableGuildCreateHandler extends Handler {
    handle(guild) {
        return guild.id;
    }
}

export default UnavailableGuildCreateHandler;
