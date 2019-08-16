/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

class User {
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'User') {
            throw new NoAbstractInstanceException();
        }
    }
    // **** GETTERS / SETTERS **** //
    
    getID(user) {
        return user.id;
    }

    getUsername(user) {
        return user.username;
    }

    getDiscriminator(user) {
        return user.discriminator;
    }

    getTag(user) {
        return `${user.username}#${user.discriminator}`;
    }

    isBot(user) {
        return user.bot;
    }

    /**
     * Get the DM channel for this user.
     *
     * @param {Object<User>} user
     * @returns {Promise<Channel>} - The DM channel
     *
     * @memberof User
     */
    getDM(user) {
        throw new NotImplementedException();
    }
}

export default User;
