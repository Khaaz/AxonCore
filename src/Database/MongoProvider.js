import DBProvider from './DBProvider';

import AxonConfig from '../Structures/DataStructure/AxonConfig';
import GuildConfig from '../Structures/DataStructure/GuildConfig';

/**
 * DB interface to interact with a MongoDB Database.
 *
 * @author KhaaZ
 *
 * @class MongoProvider
 * @extends DBProvider
 *
 * @prop {Object} AxonSchema
 * @prop {Object} GuildSchema
 */
class MongoProvider extends DBProvider {
    /**
     * Override init method.
     *
     * @param {Object<AxonOptions>}
     *
     * @memberof MongoProvider
     */
    init(axonOptions = null) { // eslint-disable-line no-unused-vars
        // We use require to require the schema at runtime.
        // This will prevent the MongoProvider from DIRECTLY depending on mongoose and preventing to make it break the global export
        // This will also only create the model at runtime, allowing to override the model if the MongoProvider is extended and the init method overrided
        this.AxonSchema = require('./Mongo/AxonSchema').default;
        this.GuildSchema = require('./Mongo/GuildSchema').default;
    }

    // **** INIT **** //

    /**
     * Initialises a default Axon config.
     *
     * @returns {Promise<AxonConfig>} Newly created Axon config from the DB
     *
     * @memberof MongoProvider
     */
    async initAxon() {
        const data = await this.AxonSchema.findOneAndUpdate( {
            id: '1',
        },
        {
            id: '1',
            prefix: this.axon.settings.prefixes[0],
            updatedAt: new Date(),
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );

        return data && new AxonConfig(this.axon, data);
    }

    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param {String} gID - Guild ID
     *
     * @returns {Promise<GuildConfig|null>} Newly created Guild config from the DB
     *
     * @memberof MongoProvider
     */
    async initGuild(gID) {
        const data = await this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            guildID: gID,
            prefixes: this.axon.settings.prefixes,
            updatedAt: new Date(),
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );

        return data && new GuildConfig(this.axon, data);
    }

    // **** FETCHERS **** //

    /**
     * Retrieves the axon config from the DB
     *
     * @returns {Promise<AxonConfig|null>} AxonSchema Object or null
     *
     * @memberof MongoProvider
     */
    async fetchAxon() {
        const data = await this.AxonSchema.findOne( {
            id: '1',
        } );
        return data && new AxonConfig(this.axon, data);
    }

    /**
     * Retreives the Guild config for the specified guild.
     *
     * @param {String} gID - guild ID
     * @returns {Promise<GuildConfig|null>}
     *
     * @memberof MongoProvider
     */
    async fetchGuild(gID) {
        const data = await this.GuildSchema.findOne( {
            guildID: gID,
        } ).lean();
        return data && new GuildConfig(this.axon, data);
    }

    /**
     * Retreives the Guild **Schema** for the specified guild.
     * Does not lean and return the actual mongoos Schema.
     * MongoProvider specific method.
     *
     * @param {String} gID - guild ID
     * @returns {Promise<Object|null>} GuildSchema or null
     *
     * @memberof MongoProvider
     */
    fetchGuildSchema(gID) {
        return this.GuildSchema.findOne( {
            guildID: gID,
        } );
    }

    // **** UPDATERS **** //

    
    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {Object|Array|String|Boolean} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successfull or not
     *
     * @memberof MongoProvider
     */
    async updateAxon(key, value) {
        const data = await this.AxonSchema.findOneAndUpdate( {
            id: '1',
        },
        {
            $set: {
                [key]: value,
                updatedAt: new Date(),
            },
        },
        {
            new: true,
            upsert: true,
        } );

        return !!data;
    }

    /**
     * Update GuildConfig in the DB.
     * Update the specific key with the value given as third parameters.
     * Specify the guild with the guild ID.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {String} gID - The guild ID to update
     * @param {Object|Array|String|Boolean} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successfull or not
     *
     * @memberof MongoProvider
     */
    async updateGuild(key, gID, value) {
        const data = await this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        {
            $set: {
                [key]: value,
                updatedAt: new Date(),
            },
        },
        {
            new: true,
            upsert: true,
        } );

        return !!data;
    }

    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param {Object} data - the schema object to update
     * @returns {Promise<AxonConfig|null>} Updated AxonConfig from the DB
     *
     * @memberof MongoProvider
     */
    async saveAxon(data) {
        data.updatedAt = new Date();

        const res = await this.AxonSchema.findOneAndUpdate( {
            id: '1',
        },
        data,
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );

        return res && new AxonConfig(this.axon, res);
    }

    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param {String} gID - Guid id
     * @param {Object} data - the schema object to update
     * @returns {Promise<GuildConfig|null>} Updated GuildConfig from the DB
     *
     * @memberof MongoProvider
     */
    async saveGuild(gID, data) {
        data.updatedAt = new Date();

        const res = await this.GuildSchema.findOneAndUpdate( {
            guildID: gID,
        },
        data,
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        } );

        return res && new GuildConfig(this.axon, res);
    }
}

export default MongoProvider;
