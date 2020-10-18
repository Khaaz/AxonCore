import AHandler from 'axoncore/src/Core/Event/AHandler';

class RawHandler extends AHandler {
    handle(payload) {
        if (payload.d) {
            if (payload.d.guild_id) {
                return payload.d.guild_id;
            }
            return payload.d.guild
                ? payload.d.guild.id
                : null;
        }
        return null;
    }
}

export default RawHandler;
