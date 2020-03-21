import AHandler from '../../../Core/Event/AHandler';

class EmojiUpdateHandler extends AHandler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiUpdateHandler;
