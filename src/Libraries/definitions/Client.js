/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

class Client {
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Client') {
            throw new NoAbstractInstanceException();
        }
    }

    get client() {
        return this.lib.botClient;
    }

    // **** GETTERS / SETTERS **** //

    getID() {
        return this.client.user.id;
    }

    getUsername() {
        return this.client.user.username;
    }

    getMention() {
        return this.client.user.mention;
    }

    getAvatar() {
        return this.client.user.avatarURL;
    }

    // **** METHODS **** //

    /**
     * Connect the client to the gateway
     *
     * @returns {Promise}
     *
     * @memberof Client
     */
    connect() {
        throw new NotImplementedException();
    }

    /**
     * Set the bot Presence
     *
     * @param {String} status
     * @param {Object} game
     * @returns {Promise}
     *
     * @memberof Client
     */
    setPresence(status, game) {
        throw new NotImplementedException();
    }
}

export default Client;
