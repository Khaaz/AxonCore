'use strict';
/* eslint-disable */
import Manager from './JSON/Manager';
class JsonService {
    /**
     * Retrieves the axon schema from the DB.
     *
     * @static
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    static fetchAxon() {
        return Manager.fetchAxonSchema();
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
        return Manager.fetchGuild(gID);
    }

    /**
     * Initialises a default schema for Axon.
     *
     * @static
     * @returns {Promise<Object>} Newly created Axon Schema
     * @memberof MongoService
     */
    static initAxon() {
        return Manager.fetchDefault();
    }

    /**
     * @static
     * @param {String} gID - Guild ID
     * @returns {Promsie<Object>} Newly created guild
     */

    static initGuild(gID) {
        return Manager.createGuild(gID);
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
        return Manager.updateUserBlacklist(blacklistedUsers);
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
        return Manager.updateGuildBlacklist(blacklistedGuilds);
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
        return Manager.updateGuildKey(gID, "prefix", prefixArr);
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
        return Manager.updateGuildKey(gID, "modules", modulesArr);
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
        return Manager.updateGuildKey(gID, "commands", commandsArr);
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
        return Manager.updateGuildKey(gID, "events", eventsArr);
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
        return Manager.updateSchema(schema);
    }
}

export default JsonService;
