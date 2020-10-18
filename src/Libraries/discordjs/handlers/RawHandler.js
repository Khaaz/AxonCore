import AHandler from 'axoncore/src/Core/Event/AHandler';

class RawHandler extends AHandler {
    handle(payload) {
        return payload.d.guild_id
            ? payload.d.guild_id
            : (payload.d.guild
                ? payload.d.guild.id
                : null);
    }
}

export default RawHandler;
