import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * Abstract class for dispatchers.
 * Command Dispatcher and Event Dispatcher
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ADispatcher
 *
 * @prop {AxonClient} _axon - AxonClient
 */
class ADispatcher {
    /**
     * Creates an instance of Dispatcher.
     *
     * @param {AxonClient} axon
     *
     * @memberof Dispatcher
     */
    constructor(axon) {
        if (this.constructor === 'Dispatcher') {
            throw new NoAbstractInstanceException();
        }

        this._axon = axon;
    }

    /**
     * Dispatcher main method.
     * Need to be overrided, any parameters can  be used.
     *
     * @memberof Dispatcher
     */
    dispatch() {
        throw new NotImplementedException();
    }
}

export default ADispatcher;
