/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 */

class Message {
    /**
     * @param {LibraryInterface} lib
     */
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Message') {
            throw new NoAbstractInstanceException();
        }
    }
    
    // **** GETTERS / SETTERS **** //

    /**
     * Message ID
     * @returns {String}
     * @memberof Message
     */
    getID(message) {
        return message.id;
    }

    /**
     * Message content
     * @returns {String}
     * @memberof Message
     */
    getContent(message) {
        return message.content;
    }

    /**
     * Sets the message content
     * @param {String} content Updated message content
     * @memberof Message
     */
    setContent(message, content) {
        message.content = content; // Shouldn't this be returned?
    }

    /**
     * Message author
     * @memberof Message
     */
    getAuthor(message) {
        return message.author;
    }

    /**
     * Message author ID
     * @returns {String}
     * @memberof Message
     */
    getAuthorID(message) {
        return this.getAuthor(message).id;
    }

    /**
     * Member who sent the message
     * @memberof Message
     */
    getMember(message) {
        return message.member;
    }

    /**
     * Member ID who sent the message
     * @returns {String}
     * @memberof Message
     */
    getMemberID(message) {
        return this.getMember(message) ? this.getMember(message).id : null;
    }

    /**
     * Message channel
     * @memberof Message
     */
    getChannel(message) {
        return message.channel;
    }

    /**
     * Message channel ID
     * @returns {String}
     * @memberof Message
     */
    getChannelID(message) {
        return this.getChannel(message).id;
    }

    /**
     * Message channel name
     * @returns {String}
     * @memberof Message
     */
    getChannelName(message) {
        return this.getChannel(message).name;
    }

    /**
     * Guild the message belongs to
     * @memberof Message
     */
    getGuild(message) {
        return message.channel.guild;
    }

    /**
     * Guild ID the message belongs to
     * @returns {String}
     * @memberof Message
     */
    getGuildID(message) {
        return this.getGuild(message) ? this.getGuild(message).id : null;
    }

    /**
     * Guild name the message belongs to
     * @returns {String}
     * @memberof Message
     */
    getGuildName(message) {
        return this.getGuild(message) ? this.getGuild(message).name : null;
    }

    // **** METHODS **** //

    /**
     * Delete the message
     *
     * @param {Message} message
     * @returns {Promise}
     * @memberof Message
     */
    delete(message) {
        throw new NotImplementedException();
    }

    /**
     * Edit the message
     *
     * @param {Message} message
     * @param {String|Object} content
     * @returns {Promise<Message>}
     * @memberof Message
     */
    edit(message, content) {
        throw new NotImplementedException();
    }
}

export default Message;
