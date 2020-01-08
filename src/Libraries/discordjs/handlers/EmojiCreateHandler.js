import Handler from '../../../Structures/Event/Handler';

class EmojiCreateHandler extends Handler {
    handle(emoji) {
        return emoji.guild.id;
    }
}

export default EmojiCreateHandler;
