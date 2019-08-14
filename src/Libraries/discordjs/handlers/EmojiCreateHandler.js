import Handler from '../../../Structures/Handler';

class EmojiCreateHandler extends Handler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiCreateHandler;
