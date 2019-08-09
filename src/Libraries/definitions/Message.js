/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

class Message {
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Message') {
            throw new NoAbstractInstanceException();
        }
    }
    
    // **** GETTERS / SETTERS **** //

    getID(message) {
        return message.id;
    }

    getContent(message) {
        return message.content;
    }

    setContent(message, content) {
        message.content = content;
    }

    getAuthor(message) {
        return message.author;
    }

    getAuthorID(message) {
        return this.getAuthor(message).id;
    }

    getMember(message) {
        return message.member;
    }

    getMemberID(message) {
        return this.getMember(message) ? this.getMember(message).id : null;
    }

    getChannel(message) {
        return message.channel;
    }

    getChannelID(message) {
        return this.getChannel(message).id;
    }

    getChannelName(message) {
        return this.getChannel(message).name;
    }

    getGuild(message) {
        return message.channel.guild;
    }

    getGuildID(message) {
        return this.getGuild(message) ? this.getGuild(message).id : null;
    }

    getGuildName(message) {
        return this.getGuild(message) ? this.getGuild(message).name : null;
    }

    // **** METHODS **** //

    /**
     * Delete the message
     *
     * @param {Object<Message>} message
     * @returns {Promise}
     *
     * @memberof Message
     */
    delete(message) {
        throw new NotImplementedException();
    }

    /**
     * Edit the message
     *
     * @param {Object<Message>} message
     * @param {String|Object} content
     * @returns {Promise<Message>}
     *
     * @memberof Message
     */
    edit(message, content) {
        throw new NotImplementedException();
    }
}

export default Message;
