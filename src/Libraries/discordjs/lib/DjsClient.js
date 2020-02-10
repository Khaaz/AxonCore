import Client from '../../definitions/Client';

import AxonError from '../../../Errors/AxonError';

class DjsClient extends Client {
    constructor(lib, token) {
        super(lib);
        if (!token) {
            throw new AxonError('No token provided! Please provide a token through AxonOptions!', 'DjsClient');
        }
        this._token = token;
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
        return this.client
            ? this.client.api.webhooks(id, token).post( {
                data,
                query: { wait: true },
                auth: false,
            } )
            : super.triggerWebhook(id, token, data);
    }
}

export default DjsClient;
