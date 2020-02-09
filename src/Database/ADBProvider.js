/* eslint-disable no-unused-vars */
import AxonClient from '../AxonClient';

import AxonError from '../Errors/AxonError';
import NoAbstractInstanceException from '../Errors/NoAbstractInstanceException';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 * @typedef {import('../AxonOptions').default} AxonOptions
 * @typedef {import('../Structures/DataStructure/AxonConfig').default} AxonConfig
 * @typedef {import('../Structures/DataStructure/GuildConfig').default} GuildConfig
 */

/**
 * Abstract class for all DB services.
 * Extend this class to create your own Database provider.
 * You just need to write these methods for the framework to be able to interact with the database.
 *
 * The provider creates guildconfigs with DB data.
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
     * Creates an instance of ADBProvider.
     *
<<<<<<< HEAD
     * @param {AxonClient} axonClient
     *
     * @memberof ADBProvider
=======
     * @param {AxonClient} axon
     * @memberof DBProvider
>>>>>>> df1c543b5be3024686489612fe5c8cd6870a900c
     */
    constructor(axonClient) {
        if (this.constructor === 'ADBProvider') {
            throw new NoAbstractInstanceException();
        }

        if (!axonClient || !(axonClient instanceof AxonClient) ) {
            throw new AxonError('First argument needs to be the AxonClient.', 'ADBProvider');
        }

        this.axon = axonClient;
    }

    /**
     * Init the ADBProvider.
     * Method called just after instantiation. Can be overridden with anything that will be used by the provider.
     *
<<<<<<< HEAD
     * @param {AxonOptions} [axonOptions]
     *
     * @memberof ADBProvider
=======
     * @param {AxonOptions}
     * @memberof DBProvider
>>>>>>> df1c543b5be3024686489612fe5c8cd6870a900c
     */
    init(axonOptions = null) {
        throw new NotImplementedException();
    }

    // **** INIT **** //

    /**
     * Initialises a default Axon config.
     *
     * @returns {Promise<AxonConfig>} Newly created Axon config from the DB
<<<<<<< HEAD
     *
     * @memberof ADBProvider
=======
     * @memberof DBProvider
>>>>>>> df1c543b5be3024686489612fe5c8cd6870a900c
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
<<<<<<< HEAD
     *
     * @memberof ADBProvider
=======
     * @memberof DBProvider
>>>>>>> df1c543b5be3024686489612fe5c8cd6870a900c
     */
    initGuild(gID) {
        throw new NotImplementedException();
    }

    // **** FETCHERS **** //

    /**
     * Retrieves the axon config from the DB
     *
     * @returns {Promise<AxonConfig|null>} AxonSchema Object or null
<<<<<<< HEAD
     *
     * @memberof ADBProvider
=======
     * @memberof DBProvider
>>>>>>> df1c543b5be3024686489612fe5c8cd6870a900c
     */
    fetchAxon() {
        throw new NotImplementedException();
    }

    /**
     * Retrieves the Guild config for the specified guild.
     *
     * @param {String} gID - Guild ID
     * @returns {Promise<GuildConfig|null>}
     *
     * @memberof ADBProvider
     */
    fetchGuild(gID) {
        throw new NotImplementedException();
    }

    // **** UPDATES **** //

    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {updateDBVal} value - The value to update in the DB
     * @returns {Promise<AxonConfig>} The updated AxonConfig
     *
     * @memberof ADBProvider
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
     * @param {updateDBVal} value - The value to update in the DB
     * @returns {Promise<GuildConfig>} The updated GuildConfig
     *
     * @memberof ADBProvider
     */
    updateGuild(key, gID, value) {
        throw new NotImplementedException();
    }

    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param {AxonConfig} data - the schema object to update
     * @returns {Promise<AxonConfig|null>} Updated AxonConfig from the DB
     *
     * @memberof ADBProvider
     */
    saveAxon(data) {
        throw new NotImplementedException();
    }

    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param {String} gID - Guild ID
     * @param {GuildConfig} data - The schema object to update
     * @returns {Promise<GuildConfig|null>} Updated GuildConfig from the DB
     *
     * @memberof ADBProvider
     */
    saveGuild(gID, data) {
        throw new NotImplementedException();
    }
}

export default ADBProvider;
