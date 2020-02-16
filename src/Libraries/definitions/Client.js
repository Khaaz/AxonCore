/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

import { request } from 'https';

import { HTTP_CODE } from '../../Utility/Constants/AxonEnums';

class Client {
    constructor(lib) {
        this.lib = lib;
        this.baseWebhookURL = 'https://discordapp.com/api/webhooks/';

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
        throw new NotImplementedException();
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
