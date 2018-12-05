'use strict';
import db from './JSON/functions';
import { resolve } from 'url';
class JsonService {
    /**
     * Retrieve Axon schema from DB (unique schema)
     *
     * @static
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    static fetchAxon() {
        return db.read('guild', 1);
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
        return db.read(gID)
    }

    /**
     * Initialise the default schema for Axon with default value
     *
     * @static
     * @returns {Promise<Object>} Axon Schema Object newly created
     * @memberof MongoService
     */
    static initAxon() {
        db.write('guild', {parent: '1'});
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
        return db.write('guild', {parent: gID});
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
        return db.write('blacklist/users', blacklistedUsers);
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
        return db.write('blacklist/guilds', blacklistedGuilds);
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
        return db.write('guild', {parent: gID, child: "prefix", value: prefixArr});
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
        return db.write('guild', {parent: gID, child: 'commands', value: modulesArr})
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
        return db.write('guild', {parent: gID, child: 'commands', value: commandsArr});
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
        return db.write('guild', {parent: gID, child: 'events', value: eventsArr});
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
        return db.write('guild', {parent: '1', value: eventsArr});
    }
}

export default JsonService;
