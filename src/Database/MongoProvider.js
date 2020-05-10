import ADBProvider from './ADBProvider';

import AxonConfig from '../Core/Models/AxonConfig';
import GuildConfig from '../Core/Models/GuildConfig';

/**
 * @typedef {import('../AxonOptions').default} AxonOptions
 * @typedef {import('./Mongo/AxonSchema').default} AxonSchema
 * @typedef {import('./Mongo/GuildSchema').default<GuildDocument>} GuildSchema
 * @typedef {import('mongoose').Document} Document
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 * @typedef {{
 * id: String, prefix: String, createdAt: Date, updatedAt: Date, bannedUsers: Array<String>, bannedGuilds: Array<String>
 * }} AxonConfigRaw
 * @typedef {{
 * guildID: string, prefixes: Array<String>, createdAt: Date, updatedAt: Date, modules: Array<String>, commands: Array<String>, listeners: Array<String>,
 * ignoredUsers: Array<String>, ignoredRoles: Array<String>, ignoredChannels: Array<String>, modOnly: Boolean, modRoles: Array<String>, modUsers: Array<String>
 * }} GuildConfigRaw
 * @typedef {Document & GuildConfigRaw} GuildDocument
 */

/**
 * DB interface to interact with a MongoDB Database.
 *
 * @author KhaaZ
 *
 * @class MongoProvider
 * @extends ADBProvider
 *
 * @prop {AxonSchema} AxonSchema
 * @prop {GuildSchema} GuildSchema
 */
class MongoProvider extends ADBProvider {
    /**
     * Override init method.
     *
     * @param {AxonOptions} axonOptions
     *
     * @memberof MongoProvider
     */
    init(axonOptions = null) { // eslint-disable-line no-unused-vars
        // We use require to require the schema at runtime.
        // This will prevent the MongoProvider from DIRECTLY depending on mongoose and preventing to make it break the global export
        // This will also only create the model at runtime, allowing to override the model if the MongoProvider is extended and the init method overridden
        this.AxonSchema = require('./Mongo/AxonSchema').default;
        this.GuildSchema = require('./Mongo/GuildSchema').default;
    }

    // **** INIT **** //

    /**
     * Initialises a default Axon config.
     *
     * @returns {Promise<AxonConfig>} Newly created Axon config from the DB
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
        } ).lean().exec();

        return data && new AxonConfig(this.axon, data);
    }

    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param {String} gID - Guild ID
     *
     * @returns {Promise<GuildConfig|null>} Newly created Guild config from the DB
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
        } ).lean().exec();

        return data && new GuildConfig(this.axon, data);
    }

    // **** FETCHERS **** //

    /**
     * Retrieves the axon config from the DB
     *
     * @returns {Promise<AxonConfig|null>} AxonSchema Object or null
     * @memberof MongoProvider
     */
    async fetchAxon() {
        const data = await this.AxonSchema.findOne( {
            id: '1',
        } ).lean().exec();
        return data && new AxonConfig(this.axon, data);
    }

    /**
     * Retrieves the Guild config for the specified guild.
     *
     * @param {String} gID - Guild ID
     * @returns {Promise<GuildConfig|null>}
     * @memberof MongoProvider
     */
    async fetchGuild(gID) {
        const data = await this.GuildSchema.findOne( {
            guildID: gID,
        } ).lean().exec();
        return data && new GuildConfig(this.axon, data);
    }

    /**
     * Retrieves the Guild **Document** for the specified guild.
     * Does not lean and returns the actual mongoose Document.
     * MongoProvider specific method.
     *
     * @param {String} gID - Guild ID
     * @returns {Promise<GuildDocument|null>} GuildDocument or null
     * @memberof MongoProvider
     */
    fetchGuildDocument(gID) {
        return this.GuildSchema.findOne( {
            guildID: gID,
        } ).exec();
    }

    // **** UPDATES **** //

    
    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {updateDBVal} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successful or not
     *
     * @memberof MongoProvider
     */
    updateAxon(key, value) {
        return this.AxonSchema.updateOne( {
            id: '1',
        },
        {
            $set: {
                [key]: value,
                updatedAt: new Date(),
            },
        } ).lean().exec()
            .then(res => !!res.nModified);
    }

    /**
     * Update GuildConfig in the DB.
     * Update the specific key with the value given as third parameters.
     * Specify the guild with the guild ID.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {String} gID - The guild ID to update
     * @param {updateDBVal} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successful or not
     *
     * @memberof MongoProvider
     */
    updateGuild(key, gID, value) {
        return this.GuildSchema.updateOne( {
            guildID: gID,
        },
        {
            $set: {
                [key]: value,
                updatedAt: new Date(),
            },
        } ).lean().exec()
            .then(res => !!res.nModified);
    }

    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param {AxonConfig|AxonConfigRaw} data - the schema object to update
     * @returns {Promise<AxonConfig|null>} Updated AxonConfig from the DB
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
        } ).lean().exec();

        return res && new AxonConfig(this.axon, res);
    }

    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param {String} gID - Guid id
     * @param {GuildConfig|GuildConfigRaw} data - the schema object to update
     * @returns {Promise<GuildConfig|null>} Updated GuildConfig from the DB
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
        } ).lean().exec();

        return res && new GuildConfig(this.axon, res);
    }
}

export default MongoProvider;
