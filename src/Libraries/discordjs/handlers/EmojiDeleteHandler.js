import Handler from '../../../Structures/Event/Handler';

class EmojiDeleteHandler extends Handler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiDeleteHandler;
