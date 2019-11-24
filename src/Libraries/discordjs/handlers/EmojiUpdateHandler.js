import Handler from '../../../Structures/Event/Handler';

class EmojiUpdateHandler extends Handler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiUpdateHandler;
