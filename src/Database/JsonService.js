'use strict';

class JsonService {
    /**
     * Retrieve Axon schema from DB (unique schema)
     *
     * @static
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    static fetchAxon() {
        //
    }

    /**
     * Retreive the Guild Schema for the specfici guidld
     *
     * @static
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema Object or null
     * @memberof MongoService
     */
    static fetchGuild(gID) {
        //
    }

    /**
     * Initialise the default schema for Axon with default value
     *
     * @static
     * @returns {Promise<Object>} Axon Schema Object newly created
     * @memberof MongoService
     */
    static initAxon() {
        //
    }

    /**
     * Initialise the default schema for Axon with default value
     *
     * @static
     * @param {String} gID - guild ID
     * @returns {Promise<Object>} Guild Schema Object newly created
     * @memberof MongoService
     */
    static initGuild(gID) {
        //
    }

    /**
     * Update the blacklisted users
     *
     * @static
     * @param {Array<String>} blacklistedUsers - Array of blacklistedUsers
     * @returns {Promise} AxonSchema updated
     * @memberof MongoService
     */
    static updateBlacklistUser(blacklistedUsers) {
        //
    }

    /**
     * Update the blacklisted guilds
     *
     * @static
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise} AxonSchema updated
     * @memberof MongoService
     */
    static updateBlacklistGuild(blacklistedGuilds) {
        //
    }

    /**
     * Update the guild prefix array for that guild
     *
     * @static
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise} GuilSchema updated
     * @memberof MongoService
     */
    static updateGuildPrefix(gID, prefixArr) {
        //
    }

    /**
     * Update the guilds modules array for that guild
     *
     * @static
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise} GuildSchema updated
     * @memberof MongoService
     */
    static updateModule(gID, modulesArr) {
        //
    }

    /**
     * Update the guilds commands array for that guild
     *
     * @static
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise} GuildSchema updated
     * @memberof MongoService
     */
    static updateCommand(gID, commandsArr) {
        //
    }

    /**
     * Update the guilds events array for that guild
     *
     * @static
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise} GuildSchema updated
     * @memberof MongoService
     */
    static updateEvent(gID, eventsArr) {
        //
    }

    /**
     * Update the given schema in the DB
     * with value in current schema object
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
