import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * Base class for all DB AModel
 *
 * @author Khaaz
 *
 * @abstract
 * @class AModel
 * @prop {AxonClient} _axon - The AxonClient instance
 */
class AModel {
    /**
     * Creates an instance of AModel.
     * @param {AxonClient} axon
     * @memberof AModel
     */
    constructor(axon) {
        if (this.constructor === 'AModel') {
            throw new NoAbstractInstanceException();
        }
        this._axon = axon;
    }

    /**
     * Update the config and the DB with the given value.
     *
     * @param {String} key
     * @param {*} value
     * @returns {Promise<AModel>}
     * @memberof AModel
     */
    updateKey(key, value) {
        if (!this[key] ) {
            return null;
        }
        this[key] = value;

        return this._req(key, value);
    }

    /**
     * Update the DB with the value
     * @param {String} key
     * @param {*} value
     * @returns {Promise<AModel>} The current config or null if it couldn't update the DB
     */
    // eslint-disable-next-line no-unused-vars
    async _req(key, value) {
        throw new NotImplementedException();
    }
}

export default AModel;
