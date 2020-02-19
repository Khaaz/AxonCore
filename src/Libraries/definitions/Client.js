/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

import { request } from 'https';

import { HTTP_CODE } from '../../Utility/Constants/AxonEnums';

/**
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 */

class Client {
    /**
     * Creates an instance of Client
     * @param {LibraryInterface} lib
     */
    constructor(lib) {
        this.lib = lib;
        this.baseWebhookURL = 'https://discordapp.com/api/webhooks/';

        if (this.constructor === 'Client') {
            throw new NoAbstractInstanceException();
        }
    }

    /**
     * Bot client
     * @type {BotClient}
     * @readonly
     * @memberof Client
     */
    get client() {
        return this.lib.botClient;
    }

    // **** GETTERS / SETTERS **** //

    /**
     * Bot user ID
     * @returns {String}
     * @memberof Client
     */
    getID() {
        return this.client.user.id;
    }

    /**
     * Bot username
     * @returns {String}
     * @memberof Client
     */
    getUsername() {
        return this.getUser() ? this.getUser().username : null;
    }

    /**
     * Bot mention
     * @returns {String}
     * @memberof Client
     */
    getMention() {
        return this.client.user.mention;
    }

    /**
     * Bot avatar
     * @returns {String}
     * @memberof Client
     */
    getAvatar() {
        throw new NotImplementedException();
    }

    /**
     * Bot user
     * @memberof Client
     */
    getUser() {
        return this.client.user;
    }

    /**
     * Bot guild member
     * @memberof Client
     */
    getMember(guild) {
        throw new NotImplementedException();
    }

    // **** METHODS **** //

    /**
     * Connect the client to the gateway
     *
     * @returns {Promise}
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
     * @memberof Client
     */
    triggerWebhook(id, token, data) {
        return this._request(`${this.baseWebhookURL}${id}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }, data);
    }

    _request(url, params, postData) {
        return new Promise( (resolve, reject) => {
            const req = request(url, params, (res) => {
                // reject on bad status
                if (res.statusCode < HTTP_CODE.OK || res.statusCode >= HTTP_CODE.MULTIPLE_CHOICES) {
                    reject(new Error(`statusCode=${res.statusCode}`) );
                }
                
                // chunk data
                let body = [];
                res.on('data', chunk => {
                    body.push(chunk);
                } );

                // resolve on end
                res.on('end', () => {
                    if (body.length) {
                        body = body.join();
                        try {
                            body = JSON.parse(body);
                        } catch (error) {
                            reject(error);
                        }
                    }
                    resolve(body);
                } );
            } );
            
            // reject on request error
            req.on('error', (err) => {
                reject(err);
            } );

            // post data
            if (postData) {
                req.write(JSON.stringify(postData) );
            }

            // end request
            req.end();
        } );
    }
}

export default Client;
