import Handler from '../../../Structures/Handler';

class EmojiUpdateHandler extends Handler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiUpdateHandler;
