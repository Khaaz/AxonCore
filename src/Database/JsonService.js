'use strict';

class JsonService {
    /**
     * Retrieves the axon schema from the DB.
     *
     * @static
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    static fetchAxon() {
        //
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     *
     * @static
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof MongoService
     */
    static fetchGuild(gID) {
        //
    }

    /**
     * Initialises a default schema for Axon.
     *
     * @static
     * @returns {Promise<Object>} Newly created Axon Schema
     * @memberof MongoService
     */
    static initAxon() {
        //
    }

    static initGuild(gID) {
        //
    }

    /**
     * Updates the blacklisted users.
     *
     * @static
     * @param {Array<String>} blacklistedUsers - Array of blacklisted users
     * @returns {Promise} Updated AxonSchema
     * @memberof MongoService
     */
    static updateBlacklistUser(blacklistedUsers) {
        //
    }

    /**
     * Updates the blacklisted guilds.
     *
     * @static
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise} Updated AxonSchema
     * @memberof MongoService
     */
    static updateBlacklistGuild(blacklistedGuilds) {
        //
    }

    /**
     * Updates the guild prefix array for the specified guild.
     *
     * @static
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    static updateGuildPrefix(gID, prefixArr) {
        //
    }

    /**
     * Updates the modules array for the specified guild.
     *
     * @static
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    static updateModule(gID, modulesArr) {
        //
    }

    /**
     * Updates commands array for the specified guild.
     *
     * @static
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    static updateCommand(gID, commandsArr) {
        //
    }

    /**
     * Updates the events array for the specified guild.
     *
     * @static
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    static updateEvent(gID, eventsArr) {
        //
    }

    /**
     * Updates the given schema in the DB with a new schema.
     *
     * @static
     * @param {Object} schema - the schema object to update
     * @returns {Promise} Updated Schema from the DB
     * @memberof MongoService
     */
    static saveSchema(schema) {
        //
    }
}

export default JsonService;
