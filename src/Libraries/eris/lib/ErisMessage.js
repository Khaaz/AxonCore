import Message from '../../definitions/Message';

class ErisMessage extends Message {
    // **** METHODS **** //

    delete(message) {
        return message.delete();
    }

    edit(message, content) {
        return message.edit(content);
    }
}

export default ErisMessage;
