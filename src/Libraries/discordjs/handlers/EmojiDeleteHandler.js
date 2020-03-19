import AHandler from '../../../Core/Event/AHandler';

class EmojiDeleteHandler extends AHandler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiDeleteHandler;
