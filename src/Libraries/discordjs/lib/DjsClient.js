import Client from '../../definitions/Client';

import { request } from 'https';

import { HTTP_CODE } from '../../../Utility/Constants/AxonEnums';

class DjsClient extends Client {
    constructor(lib, token) {
        super(lib);
        this._token = token;

        this.baseWebhookURL = 'https://discordapp.com/api/webhooks/';
    }

    get client() {
        return this.lib.botClient;
    }

    getAvatar() {
        return this.getUser() ? this.getUser().avatarURL() : null;
    }

    getMember(guild) {
        return guild.me;
    }
    // **** METHODS **** //

    connect() {
        return this.client.login(this._token);
    }

    setPresence(status, game) {
        return this.client.user.setPresence( {
            status,
            activity: game,
        } );
    }

    triggerWebhook(id, token, data) {
        this.client.api.webhooks(id, token).post( {
            data,
            query: { wait: true },
            auth: false,
        } );
    }

    /** @TODO remove custom request when sure the above works */
    _triggerWebhook(id, token, data) {
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

export default DjsClient;
