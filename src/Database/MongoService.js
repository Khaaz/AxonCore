'use strict';

/**
 * Mongo Service class
 * Handler all interaction with MongoDB
 * (Guild/Axon schemas for AxonClient request)
 *
 * @author KhaaZ
 *
 * @class MongoService
 */
class MongoService {
    constructor(axon) {
        this._axon = axon;
    }

    get axon() {
        return this._axon;
    }

    init(axonOptions) {
        this.AxonSchema = axonOptions.axonSchema || require('./Models/AxonSchema').default;
        this.GuildSchema = axonOptions.guildSchema || require('./Models/GuildSchema').default;

        this.axon.Schemas.set('axonSchema', this.AxonSchema);
        this.axon.Schemas.set('guildSchema', this.GuildSchema);
    }

    /**
     * Retrieve Axon schema from DB (unique schema)
     *
     * @returns {Promise<Object|null>} AxonSchema Object or null
     * @memberof MongoService
     */
    fetchAxon() {
        return this.AxonSchema.findOne({
            ID : '1',
        });
    }

    /**
     * Retreive the Guild Schema for the specific guild
     * WARNING: LEAN (faster but no mongo methods)
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema Object or null
     * @memberof MongoService
     */
    fetchGuild(gID) {
        return this.GuildSchema.findOne({
            guildID : gID,
        }).lean();
    }

    /**
     * Retreive the Guild Schema for the specific guild
     * NOT LEAN
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema Object or null
     * @memberof MongoService
     */
    fetchGuildSchema(gID) {
        return this.GuildSchema.findOne({
            guildID : gID,
        });
    }

    /**
     * Initialise the default schema for Axon with default value
     *
     * @returns {Promise<Object>} Axon Schema Object newly created
     * @memberof MongoService
     */
    initAxon() {
        return this.AxonSchema.findOneAndUpdate({
            ID : '1',
        },
        {
            ID: '1',
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }

    /**
     * Initialise the default schema for Axon with default value
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object>} Guild Schema Object newly created
     * @memberof MongoService
     */
    initGuild(gID) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            guildID : gID,
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }

    /**
     * Update the blacklisted users
     *
     * @param {Array<String>} blacklistedUsers - Array of blacklistedUsers
     * @returns {Promise} AxonSchema updated
     * @memberof MongoService
     */
    updateBlacklistUser(blacklistedUsers) {
        return this.AxonSchema.findOneAndUpdate({
            ID : '1',
        },
        {
            $set: {
                bannedUsers: blacklistedUsers,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Update the blacklisted guilds
     *
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise} AxonSchema updated
     * @memberof MongoService
     */
    updateBlacklistGuild(blacklistedGuilds) {
        return this.AxonSchema.findOneAndUpdate({
            ID : '1',
        },
        {
            $set: {
                bannedUsers: blacklistedGuilds,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Update the guild prefix array for that guild
     *
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise} GuilSchema updated
     * @memberof MongoService
     */
    updateGuildPrefix(gID, prefixArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                prefix: prefixArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Update the guilds modules array for that guild
     *
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise} GuildSchema updated
     * @memberof MongoService
     */
    updateModule(gID, modulesArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                modules: modulesArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Update the guilds commands array for that guild
     *
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise} GuildSchema updated
     * @memberof MongoService
     */
    updateCommand(gID, commandsArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                commands: commandsArr,
            },
        },
        {
            new: true,
            upsert: true,
        });
    }

    /**
     * Update the guilds events array for that guild
     *
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise} GuildSchema updated
     * @memberof MongoService
     */
    updateEvent(gID, eventsArr) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        {
            $set: {
                events: eventsArr,
            },
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
     * @param {Object} schema - the schema object to update
     * @returns {Promise} Updated Schema from the DB
     * @memberof MongoService
     */
    saveSchema(schema) {
        return schema.save();
    }

    /**
     * Save Guild Schema
     *
     * @param {String} gID - Guid id
     * @param {Object} schema - Guild Schema to save
     * @returns {Promise} Updated SChema111
     * @memberof MongoService
     */
    saveGuildSchema(gID, schema) {
        return this.GuildSchema.findOneAndUpdate({
            guildID : gID,
        },
        schema,
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });
    }
}

export default MongoService;
