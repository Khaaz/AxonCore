/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 */

class Channel {
    /**
     * Creates an instance of Channel
     * @param {LibraryInterface} lib
     */
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Channel') {
            throw new NoAbstractInstanceException();
        }
    }
    
    // **** GETTERS / SETTERS **** //
    
    /**
     * Gets the channel ID
     * @param {Channel} channel
     * @returns {String}
     * @memberof Channel
     */
    getID(channel) {
        return channel.id;
    }

    /**
     * Gets the channel name
     * @param {Channel} channel
     * @returns {String}
     * @memberof Channel
     */
    getName(channel) {
        return channel.name;
    }

    /**
     * Gets the guild the channel belongs to
     * @param {Channel} channel
     * @returns {Guild}
     * @memberof Channel
     */
    getGuild(channel) {
        return channel.guild;
    }

    /**
     * Gets the guild ID the channel belongs to
     * @param {Channel} channel
     * @returns {String|null}
     * @memberof Channel
     */
    getGuildID(channel) {
        return this.getGuild(channel) ? this.getGuild(channel).id : null;
    }

    /**
     * Gets the guild name the channel belongs to
     * @param {Channel} channel
     * @returns {String|null}
     * @memberof Channel
     */
    getGuildName(channel) {
        return this.getGuild(channel) ? this.getGuild(channel).name : null;
    }

    /**
     * Whether the user has the perm in the channel
     *
     * @param {Channel} channel
     * @param {User} user
     * @param {String} perm
     * @returns {Boolean}
     * @memberof Channel
     */
    hasPermission(channel, user, perm) {
        throw new NotImplementedException();
    }
    
    // **** METHODS **** //
    
    /**
     * Send a message in the channel
     *
     * @param {Channel} channel
     * @param {String|Object} content
     * @returns {Promise<Message>}
     * @memberof Channel
     */
    sendMessage(channel, content) {
        throw new NotImplementedException();
    }
}

export default Channel;
