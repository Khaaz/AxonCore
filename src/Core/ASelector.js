import NoAbstractInstanceException from '../Errors/NoAbstractInstanceException';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * Static class
 * Select and instantiate dependencies.
 *
 * @abstract
 * @static
 * @class ASelector
 */
class ASelector {
    constructor() {
        if (this.constructor === 'ASelector') {
            throw new NoAbstractInstanceException();
        }
    }

    static select() {
        throw new NotImplementedException();
    }
}

export default ASelector;
