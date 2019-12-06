import DBService from './DBService';
import Manager from './Sequelize/Manager';

/**
 * @author John.#9309 (Olybear9)
 *
 * @class Sequelise Service
 * @extends DBService
 */
class SequelizeService extends DBService {
    constructor (axon) {
        super();
        this._axon = axon;
    }

    get axon() {
        return this._axon;
    }

    /**
     * Initialize Sequelise service.
     * 
     * @param {Object<Options>} options - Options for Sequelise service.
     */
    init(options) {
        this._dialiect = options.dialiect;
        return Manager.startDatabase(this._dialiect);
    }

    /**
     * Retrieves the axon schema from the DB.
     *
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof DBService
     */
    fetchAxon() {
        throw new Error('Not implemented Exception');
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof DBService
     */
    fetchGuild(gID) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Initialises a default schema for Axon.
     *
     * @returns {Promise<Object>} Newly created Axon Schema
     * @memberof DBService
     */
    initAxon() {
        throw new Error('Not implemented Exception');
    }

    /**
     * Init Guild Schema with default values
     *
     * @param {String} gID - Guild ID
     * @param {Object<AxonClient>} axonClient
     * @returns {Promise<Object|null>} Newly created guild
     * @memberof DBService
     */
    initGuild(axonClient, gID) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the blacklisted users.
     *
     * @param {Array<String>} blacklistedUsers - Array of blacklisted users
     * @returns {Promise<Object|null>} Updated AxonSchema
     * @memberof DBService
     */
    updateBlacklistUser(blacklistedUsers) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the blacklisted guilds.
     *
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise<Object|null>} Updated AxonSchema
     * @memberof DBService
     */
    updateBlacklistGuild(blacklistedGuilds) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the guild prefix array for the specified guild.
     *
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof DBService
     */
    updateGuildPrefix(gID, prefixArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the modules array for the specified guild.
     *
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof DBService
     */
    updateModule(gID, modulesArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates commands array for the specified guild.
     *
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof DBService
     */
    updateCommand(gID, commandsArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the events array for the specified guild.
     *
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof DBService
     */
    updateEvent(gID, eventsArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the given schema in the DB with a new schema.
     *
     * @param {Object} schema - the schema object to update
     * @returns {Promise<Object|null>} Updated Schema from the DB
     * @memberof DBService
     */
    saveAxonSchema(schema) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param {String} gID - Guid id
     * @param {Object} schema - the schema object to update
     * @returns {Promise<Object|null>} Updated Schema from the DB
     * @memberof DBService
     */
    saveGuildSchema(gID, schema) {
        throw new Error('Not implemented Exception');
    }
}

export default SequelizeService;
