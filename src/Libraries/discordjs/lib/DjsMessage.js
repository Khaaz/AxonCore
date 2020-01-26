import Message from '../../definitions/Message';

class DjsMessage extends Message {
    // **** METHODS **** //

    delete(message) {
        return message.delete();
    }

    edit(message, content) {
        if (typeof content === 'object') {
            const msg = content.content || '';
            return message.edit(msg, content);
        }
        return message.edit(content);
    }
}

export default DjsMessage;
