import Client from '../../definitions/Client';

class ErisClient extends Client {
    get client() {
        return this.lib.botClient;
    }

    // **** METHODS **** //

    connect() {
        return this.client.connect();
    }

    setPresence(status, game) {
        return this.client.editStatus(status, game);
    }
}

export default ErisClient;
