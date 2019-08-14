import Handler from '../../../Structures/Handler';

class EmojiDeleteHandler extends Handler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiDeleteHandler;
