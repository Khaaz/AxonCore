import Client from '../../definitions/Client';

class DjsClient extends Client {
    constructor(lib, token) {
        super(lib);
        this._token = token;
    }

    get client() {
        return this.lib.botClient;
    }

    // **** METHODS **** //

    connect() {
        return this.client.login(this._token);
    }

    setPresence(status, game) {
        return this.client.setPresence( {
            status,
            activity: game,
        } );
    }
}

export default DjsClient;
