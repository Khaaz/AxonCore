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
        return this.getUser() ? this.getUser().username : null;
    }

    getMention() {
        return this.client.user.mention;
    }

    getAvatar() {
        throw new NoAbstractInstanceException();
    }

    getUser() {
        return this.client.user;
    }

    getMember(guild) {
        throw new NotImplementedException();
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

    /**
     * Execute a webhook and send a message
     *
     * @param {String} id
     * @param {String} token
     * @param {Object} data
     * @returns {Promise}
     *
     * @memberof Client
     */
    triggerWebhook(id, token, data) {
        throw new NotImplementedException();
    }
}

export default Client;
