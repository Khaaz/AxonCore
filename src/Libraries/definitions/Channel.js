/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

class Channel {
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Channel') {
            throw new NoAbstractInstanceException();
        }
    }
    
    // **** GETTERS / SETTERS **** //
    
    getID(channel) {
        return channel.id;
    }

    getName(channel) {
        return channel.name;
    }

    getGuild(channel) {
        return channel.guild;
    }

    getGuildID(channel) {
        return this.getGuild(channel) ? this.getGuild(channel).id : null;
    }

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
     *
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
     *
     * @memberof Channel
     */
    sendMessage(channel, content) {
        throw new NotImplementedException();
    }
}

export default Channel;
