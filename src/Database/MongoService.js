import DBService from './DBService';

/**
 * Mongo Service class, handles all interactions with MongoDB.
 *
 * @author KhaaZ
 *
 * @class MongoService
 * @extends DBService
 */
class MongoService extends DBService {
    constructor(axon) {
        super();
        this._axon = axon;
    }

    get axon() {
        return this._axon;
    }

    init(axonOptions) {
        this.AxonSchema = axonOptions.axonSchema || require('./Models/AxonSchema').default;
        this.GuildSchema = axonOptions.guildSchema || require('./Models/GuildSchema').default;
        this.axon.schemas.set('axonSchema', this.AxonSchema);
        this.axon.schemas.set('guildSchema', this.GuildSchema);
    }

    /**
     * Retrieves the Axon schema from the DB.
     *
     * @returns {Promise<Object|null>} AxonSchema or null
     * @memberof MongoService
     */
    fetchAxon() {
        return this.AxonSchema.findOne( {
            ID: '1',
        } );
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     * WARNING: LEAN (faster but no mongo methods)
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof MongoService
     */
    fetchGuild(gID) {
        return this.GuildSchema.findOne( {
            guildID: gID,
        } ).lean();
    }

    /**
     * Retreives the Guild Schema for the specified guild.
     * NOT LEAN
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     * @memberof MongoService
     */
    fetchGuildSchema(gID) {
        return this.GuildSchema.findOne( {
            guildID: gID,
        } );
    }

    /**
     * Initialises a default schema for Axon.
     *
     * @returns {Promise<Object|null>} Newly created Axon Schema
     * @memberof MongoService
     */
    initAxon() {
        return this.AxonSchema.findOneAndUpdate( {
            ID: '1',
        },
        {
            ID: '1',
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );
    }

    /**
     * Initialises a default schema for the specified guild.
     *
     * @param {String} gID - guild ID
     * @param {Object<AxonClient>} axonClient
     * @returns {Promise<Object|null>} Guild Schema Object newly created
     * @memberof MongoService
     */
    initGuild(axonClient, gID) {
        return this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            guildID: gID,
            prefix: axonClient.params.prefix,
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );
    }

    /**
     * Updates the blacklisted users.
     *
     * @param {Array<String>} blacklistedUsers - Array of blacklistedUsers
     * @returns {Promise<Object|null>} Updated AxonSchema
     * @memberof MongoService
     */
    updateBlacklistUser(blacklistedUsers) {
        return this.AxonSchema.findOneAndUpdate( {
            ID: '1',
        },
        {
            $set: {
                bannedUsers: blacklistedUsers,
            },
        },
        {
            new: true,
            upsert: true,
        } );
    }

    /**
     * Update the blacklisted guilds
     *
     * @param {Array<String>} blacklistedGuilds - Array of blacklistedUsers
     * @returns {Promise<Object|null>} Updated AxonSchema
     * @memberof MongoService
     */
    updateBlacklistGuild(blacklistedGuilds) {
        return this.AxonSchema.findOneAndUpdate( {
            ID: '1',
        },
        {
            $set: {
                bannedGuilds: blacklistedGuilds,
            },
        },
        {
            new: true,
            upsert: true,
        } );
    }

    /**
     * Updates the prefix array for the specified guild.
     *
     * @param {String} gID - guild ID
     * @param {Array<String>} prefixArr - Array of prefixes
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof MongoService
     */
    updateGuildPrefix(gID, prefixArr) {
        return this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            $set: {
                prefix: prefixArr,
            },
        },
        {
            new: true,
            upsert: true,
        } );
    }

    /**
     * Updates the modules array for the specified guild.
     *
     * @param {Array<String>} modulesArr - Array of modules label
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof MongoService
     */
    updateModule(gID, modulesArr) {
        return this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            $set: {
                modules: modulesArr,
            },
        },
        {
            new: true,
            upsert: true,
        } );
    }

    /**
     * Updates the commands array for the specified guild.
     *
     * @param {Array<String>} commandsArr - Array of commands label
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof MongoService
     */
    updateCommand(gID, commandsArr) {
        return this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            $set: {
                commands: commandsArr,
            },
        },
        {
            new: true,
            upsert: true,
        } );
    }

    /**
     * Updates the events array for the specified guild.
     *
     * @param {Array<String>} eventsArr - Array of events label
     * @returns {Promise<Object|null>} Updated GuildSchema
     * @memberof MongoService
     */
    updateEvent(gID, eventsArr) {
        return this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            $set: {
                events: eventsArr,
            },
        },
        {
            new: true,
            upsert: true,
        } );
    }

    /**
     * Updates the given schema in the DB with a new schema.
     *
     * @param {Object} schema - the schema object to update
     * @returns {Promise<Object|null>} Updated Schema from the DB
     * @memberof MongoService
     */
    saveAxonSchema(schema) {
        return this.AxonSchema.findOneAndUpdate( {
            ID: '1',
        },
        schema,
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );
    }

    /**
     * Saves the guild schema.
     *
     * @param {String} gID - Guid id
     * @param {Object} schema - Guild Schema to save
     * @returns {Promise<Object|null>} Updated Guild Schema
     * @memberof MongoService
     */
    saveGuildSchema(gID, schema) {
        return this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        schema,
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );
    }
}

export default MongoService;
