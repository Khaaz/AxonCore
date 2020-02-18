/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 */

class User {
    /**
     * Creates an instance of User
     * @param {LibraryInterface} lib
     */
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'User') {
            throw new NoAbstractInstanceException();
        }
    }
    // **** GETTERS / SETTERS **** //
    
    /**
     * User ID
     * @returns {String}
     * @memberof User
     */
    getID(user) {
        return user.id;
    }

    /**
     * User's username
     * @return {String}
     * @memberof User
     */
    getUsername(user) {
        return user.username;
    }

    /**
     * User's discrim
     * @return {String}
     * @memberof User
     */
    getDiscriminator(user) {
        return user.discriminator;
    }

    /**
     * User's username+discrim
     * @returns {String}
     * @memberof User
     */
    getTag(user) {
        return `${user.username}#${user.discriminator}`;
    }

    /**
     * If user is a bot
     * @returns {Boolean}
     * @memberof User
     */
    isBot(user) {
        return user.bot;
    }

    /**
     * Get the DM channel for this user.
     *
     * @param {User} user
     * @returns {Promise<Channel>} - The DM channel
     * @memberof User
     */
    getDM(user) {
        throw new NotImplementedException();
    }
}

export default User;
