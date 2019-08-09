class LibraryInterface {
    constructor(axonClient) {
        this._axon = axonClient;
    }

    get botClient() {
        return this._axon.botClient;
    }
}

export default LibraryInterface;
