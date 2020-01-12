import AHandler from '../../../Structures/Event/AHandler';

class EmojiDeleteHandler extends AHandler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiDeleteHandler;
