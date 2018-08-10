'use strict';

import Axon from './Models/AxonSchema';
import Guild from './Models/GuildSchema';

class MongoService {
    constructor() {}

    /**
     * Retrieve Axon schema from DB (unique schema)
     *
     * @static
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    static fetchAxon() {
        return Axon.findOne({
            ID : '1',
        });
    }

    /**
     * Retreive the Guild Schema for the specific guild
     * WARNING: LEAN (faster but no mongo methods)
     *
     * @static
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema Object or null
     * @memberof MongoService
     */
    static fetchGuild(gID) {
        return Guild.findOne({
            guildID : gID,
        }).lean();
    }

    /**
     * Retreive the Guild Schema for the specific guild
     * NOT LEAN
     *
     * @static
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema Object or null
     * @memberof MongoService
     */
    static fetchGuildSchema(gID) {
        return Guild.findOne({
            guildID : gID,
        });
    }

    /**
     * Initialise the default schema for Axon with default value
     *
     * @static
     * @returns {Promise<Object>} Axon Schema Object newly created
     * @memberof MongoService
     */
    static initAxon() {
        return Axon.findOneAndUpdate({
            ID : '1',
        },
        {
            ID: '1'
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        });
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
        return Guild.findOneAndUpdate({
            guildID : gID,
        },
        {
            guildID : gID,
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        });
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
        return Axon.findOneAndUpdate({
            ID : '1',
        },
        {
            $set: {
                bannedUsers: blacklistedUsers
            }
        },
        {
            new: true,
            upsert: true,
        });
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
        return Axon.findOneAndUpdate({
            ID : '1',
        },
        {
            $set: {
                bannedUsers: blacklistedGuilds
            }
        },
        {
            new: true,
            upsert: true,
        });
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
        return Guild.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                prefix: prefixArr
            }
        },
        {
            new: true,
            upsert: true,
        });
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
        return Guild.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                modules: modulesArr
            }
        },
        {
            new: true,
            upsert: true,
        });
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
        return Guild.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                commands: commandsArr
            }
        },
        {
            new: true,
            upsert: true,
        });
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
        return Guild.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                events: eventsArr
            }
        },
        {
            new: true,
            upsert: true,
        });
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
        return schema.save();
    }
}

export default MongoService;
