/* eslint-disable no-unused-vars */
/**
 * Abstract class for all DB services
 *
 * @author KhaaZ
 *
 * @class DBService
 */
class DBService {
    constructor() {
        if (this.constructor === 'DBService') {
            throw new Error('Can\'t instantiate an abstract class');
        }
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
     * @returns {Promsie<Object>} Newly created guild
     */

    initGuild(gID) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the blacklisted users.
     *
     * @param {Array<String>} blacklistedUsers - Array of blacklisted users
     * @returns {Promise} Updated AxonSchema
     * @memberof DBService
     */
    updateBlacklistUser(blacklistedUsers) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the blacklisted guilds.
     *
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise} Updated AxonSchema
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
     * @returns {Promise} Updated GuildSchema
     * @memberof DBService
     */
    updateGuildPrefix(gID, prefixArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the modules array for the specified guild.
     *
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise} Updated GuildSchema
     * @memberof DBService
     */
    updateModule(gID, modulesArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates commands array for the specified guild.
     *
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise} Updated GuildSchema
     * @memberof DBService
     */
    updateCommand(gID, commandsArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the events array for the specified guild.
     *
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise} Updated GuildSchema
     * @memberof DBService
     */
    updateEvent(gID, eventsArr) {
        throw new Error('Not implemented Exception');
    }

    /**
     * Updates the given schema in the DB with a new schema.
     *
     * @param {Object} schema - the schema object to update
     * @returns {Promise} Updated Schema from the DB
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
     * @returns {Promise} Updated Schema from the DB
     * @memberof DBService
     */
    saveGuildSchema(gID, schema) {
        throw new Error('Not implemented Exception');
    }
}

export default DBService;
