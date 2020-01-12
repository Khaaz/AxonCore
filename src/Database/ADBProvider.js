/* eslint-disable no-unused-vars */
import AxonClient from '../AxonClient';

import AxonError from '../Errors/AxonError';
import NoAbstractInstanceException from '../Errors/NoAbstractInstanceException';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * Abstract class for all DB services.
 * Extend this class to create your own Database provider.
 * You just need to write these methods for the framewor to be able to interact with the database.
 *
 * The provider creates guildconfigs with DB datas.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ADBProvider
 *
 * @prop {AxonClient} axon - The AxonClient
 */
class ADBProvider {
    /**
     * Creates an instance of DBProvider.
     *
     * @param {AxonClient} axon
     *
     * @memberof DBProvider
     */
    constructor(axonClient) {
        if (this.constructor === 'DBProvider') {
            throw new NoAbstractInstanceException();
        }

        if (!axonClient || !(axonClient instanceof AxonClient) ) {
            throw new AxonError('First argument needs to be the AxonClient.', 'DBProvider');
        }

        this.axon = axonClient;
    }

    /**
     * Init the DBProvider.
     * Method calledjust after instantiation.Can be overrided with anything that willbe used by the provider.
     *
     * @param {AxonOptions}
     *
     * @memberof DBProvider
     */
    init(axonOptions = null) {
        throw new NotImplementedException();
    }

    // **** INIT **** //

    /**
     * Initialises a default Axon config.
     *
     * @returns {Promise<AxonConfig>} Newly created Axon config from the DB
     *
     * @memberof DBProvider
     */
    initAxon() {
        throw new NotImplementedException();
    }

    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param {String} gID - Guild ID
     *
     * @returns {Promise<GuildConfig|null>} Newly created Guild config from the DB
     *
     * @memberof DBProvider
     */
    initGuild(gID) {
        throw new NotImplementedException();
    }

    // **** FETCHERS **** //

    /**
     * Retrieves the axon config from the DB
     *
     * @returns {Promise<AxonConfig|null>} AxonSchema Object or null
     *
     * @memberof DBProvider
     */
    fetchAxon() {
        throw new NotImplementedException();
    }

    /**
     * Retreives the Guild config for the specified guild.
     *
     * @param {String} gID - guild ID
     * @returns {Promise<GuildConfig|null>}
     *
     * @memberof DBProvider
     */
    fetchGuild(gID) {
        throw new NotImplementedException();
    }

    // **** UPDATERS **** //

    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {Object|Array|String|Boolean} value - The value to update in the DB
     * @returns {Promise<Boolean>} UWhether the request was successfull or not
     *
     * @memberof DBProvider
     */
    updateAxon(key, value) {
        throw new NotImplementedException();
    }

    /**
     * Update GuildConfig in the DB.
     * Update the specific key with the value given as third parameters.
     * Specify the guild with the guild ID.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {String} gID - The guild ID to update
     * @param {Object|Array|String|Boolean} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successfull or not
     *
     * @memberof DBProvider
     */
    updateGuild(key, gID, value) {
        throw new NotImplementedException();
    }

    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param {Object} data - the schema object to update
     * @returns {Promise<AxonConfig|null>} Updated AxonConfig from the DB
     *
     * @memberof DBProvider
     */
    saveAxon(data) {
        throw new NotImplementedException();
    }

    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param {String} gID - Guid id
     * @param {Object} data - the schema object to update
     * @returns {Promise<GuildConfig|null>} Updated GuildConfig from the DB
     *
     * @memberof DBProvider
     */
    saveGuild(gID, data) {
        throw new NotImplementedException();
    }
}

export default ADBProvider;
