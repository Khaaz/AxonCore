/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * Abstract class for loaders.
 * Client Loader, Module Loader, Command Loader
 *
 * @author KhaaZ
 *
 * @abstract
 * @class Loader
 *
 * @prop {Object} loadIn - The object where we are loding items
 */
class Loader {
    /**
     * Creates an instance of Loader.
     *
     * @param {Object<AxonClient>} axon
     *
     * @memberof Loader
     */
    constructor(loadIn) {
        if (this.constructor === 'Loader') {
            throw new NoAbstractInstanceException();
        }
        this.loadIn = loadIn;
    }

    /**
     * Loader main method.
     * Need to be overrided. Loads the object givenin parameters.
     *
     * @param {Object} toLoad - The Object to load
     *
     * @memberof Loader
     */
    load(toLoad) {
        throw new NotImplementedException();
    }

    /**
     * Loader main method.
     * Need to be overrided. Loads all objects given in parameters.
     *
     * @param {Object|Array} toLoad - All Objects to load
     *
     * @memberof Loader
     */
    // eslint-disable-next-line no-unused-vars
    loadAll(toLoad) {
        throw new NotImplementedException();
    }
}

export default Loader;
