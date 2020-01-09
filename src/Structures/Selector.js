import NoAbstractInstanceException from './../Errors/NoAbstractInstanceException';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * Static class
 * Select and instantiate dependencies.
 *
 * @abstract
 * @class Selector
 */
class Selector {
    constructor() {
        throw new NoAbstractInstanceException();
    }

    static select() {
        throw new NotImplementedException();
    }
}

export default Selector;
