import NotImplementedException from '../Errors/NotImplementedException';

class LibraryInterface {
    constructor(axonClient) {
        this._axon = axonClient;
    }

    get botClient() {
        return this._axon.botClient;
    }

    // eslint-disable-next-line no-unused-vars
    onMessageCreate(func) {
        throw new NotImplementedException();
    }

    // eslint-disable-next-line no-unused-vars
    onceReady(func) {
        throw new NotImplementedException();
    }
}

export default LibraryInterface;
