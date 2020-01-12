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
     * Creates an instance of ADispatcher.
     *
     * @param {AxonClient} axon
     *
     * @memberof ADispatcher
     */
    constructor(axon) {
        if (this.constructor === 'ADispatcher') {
            throw new NoAbstractInstanceException();
        }

        this._axon = axon;
    }

    /**
     * ADispatcher main method.
     * Need to be overrided, any parameters can  be used.
     *
     * @memberof ADispatcher
     */
    dispatch() {
        throw new NotImplementedException();
    }
}

export default ADispatcher;
