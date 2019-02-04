'use strict';

import DBService from './DBService';

import Manager from './JSON/Manager';

/**
 * @author Olybear, KhaaZ
 *
 * @class JsonService
 * @extends DBService
 */
class JsonService extends DBService {
    /**
     * Retrieves the axon schema from the DB.
     *
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    fetchAxon() {
        return Manager.fetchAxonSchema();
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof MongoService
     */
    fetchGuild(gID) {
        return Manager.fetchGuildSchema(gID);
    }

    /**
     * Initialises a default schema for Axon.
     *
     * @returns {Promise<Object>} Newly created Axon Schema
     * @memberof MongoService
     */
    initAxon() {
        return Manager.createAxonSchema();
    }

    /**
     * Init Guild Schema with default values
     *
     * @param {String} gID - Guild ID
     * @returns {Promsie<Object>} Newly created guild
     */

    initGuild(gID) {
        return Manager.createGuildSchema(gID);
    }

    /**
     * Updates the blacklisted users.
     *
     * @param {Array<String>} blacklistedUsers - Array of blacklisted users
     * @returns {Promise} Updated AxonSchema
     * @memberof MongoService
     */
    updateBlacklistUser(blacklistedUsers) {
        return Manager.updateAxonKey('bannedUsers', blacklistedUsers);
    }

    /**
     * Updates the blacklisted guilds.
     *
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise} Updated AxonSchema
     * @memberof MongoService
     */
    updateBlacklistGuild(blacklistedGuilds) {
        return Manager.updateAxonKey('bannedGuilds', blacklistedGuilds);
    }

    /**
     * Updates the guild prefix array for the specified guild.
     *
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateGuildPrefix(gID, prefixArr) {
        return Manager.updateGuildKey(gID, 'prefix', prefixArr);
    }

    /**
     * Updates the modules array for the specified guild.
     *
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateModule(gID, modulesArr) {
        return Manager.updateGuildKey(gID, 'modules', modulesArr);
    }

    /**
     * Updates commands array for the specified guild.
     *
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateCommand(gID, commandsArr) {
        return Manager.updateGuildKey(gID, 'commands', commandsArr);
    }

    /**
     * Updates the events array for the specified guild.
     *
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise} Updated GuildSchema
     * @memberof MongoService
     */
    updateEvent(gID, eventsArr) {
        return Manager.updateGuildKey(gID, 'events', eventsArr);
    }

    /**
     * Updates the given schema in the DB with a new schema.
     *
     * @param {Object} schema - the schema object to update
     * @returns {Promise} Updated Schema from the DB
     * @memberof MongoService
     */
    saveAxonSchema(schema) {
        return Manager.writeAxonSchema(schema);
    }

    /**
     * Saves the guild schema.
     *
     * @param {String} gID - Guid id
     * @param {Object} schema - Guild Schema to save
     * @returns {Promise} Updated Guild Schema
     * @memberof MongoService
     */
    saveGuildSchema(gID, schema) {
        return Manager.writeGuildSchema(gID, schema);
    }
}

export default JsonService;
