import AHandler from '../../../Core/Event/AHandler';

class EmojiCreateHandler extends AHandler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiCreateHandler;
