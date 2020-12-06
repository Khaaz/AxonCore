import AHandler from '../../../Core/Event/AHandler';

class TypingStartHandler extends AHandler {
    handle( { guildId } ) {
        return guildId || null;
    }
}

export default TypingStartHandler;
