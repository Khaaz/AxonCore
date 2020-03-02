import { EventEmitter } from 'events';
import NotImplementedException from '../../Errors/NotImplementedException';

class Collector extends EventEmitter {
    constructor(axonClient) {
        super();
        this._axon = axonClient;
    }

    get axon() {
        return this._axon;
    }

    get bot() {
        return this._axon.botClient;
    }

    get lib() {
        return this._axon.library;
    }

    preRun() {
        throw new NotImplementedException();
    }

    run() {
        this._run();
        return;
    }

    _run() {
        throw new NotImplementedException();
    }

    postRun() {
        throw new NotImplementedException();
    }
}

export default Collector;
