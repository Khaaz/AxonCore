/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * Abstract class for loaders.
 * Module Loader, Command Loader, Listener Loader
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ALoader
 *
 * @prop {Object} loadIn - The object in which we are loading items
 */
class ALoader {
    /**
     * Creates an instance of ALoader.
     *
     * @param {Object} loadIn
     *
     * @memberof ALoader
     */
    constructor(loadIn) {
        if (this.constructor === 'ALoader') {
            throw new NoAbstractInstanceException();
        }
        this.loadIn = loadIn;
    }

    /**
     * Loads the object given in parameter.
     *
     * @param {Object} toLoad - The Object to load
     *
     * @memberof ALoader
     */
    load(toLoad) {
        throw new NotImplementedException();
    }

    /**
     * Loads all objects given in parameters.
     *
     * @param {Object|Array} toLoad - All Objects to load
     *
     * @memberof ALoader
     */
    // eslint-disable-next-line no-unused-vars
    loadAll(toLoad) {
        throw new NotImplementedException();
    }

    /**
     * Unload the object given in parameter.
     *
     * @param {String} toUnload
     *
     * @memberof ALoader
     */
    unload(toUnload) {
        throw new NotImplementedException();
    }
}

export default ALoader;
