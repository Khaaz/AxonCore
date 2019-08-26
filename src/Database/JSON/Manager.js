import axonDefault from './AxonDefault.json';
import guildDefault from './GuildDefault.json';

import AsyncQueue from '../../Utility/External/AsyncQueue';

import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

/**
 * Manager class for handling Json database
 * @TODO Add a mutex / queue system per document/guild to reduce possibility of corruption
 *
 * @author KhaaZ, Olybear
 *
 * @class Manager
 */
class Manager {
    /**
     * Creates an instance of Manager.
     *
     * @param {String} basePath - The path / location where to create and use the database
     *
     * @memberof Manager
     */
    constructor(basePath) {
        // default schemas values
        this._axonDefault = axonDefault;
        this._guildDefault = guildDefault;

        if (!fs.existsSync(basePath) ) {
            console.log('The DB directory doesn\'t exist. Creating...');
            fs.mkdirSync(basePath, { recursive: true } );
            console.log('DB directory created');
        }

        this._basePath = basePath || `${__dirname}/Database/`;
        this._axonPath = `${basePath}axon.json` || `${__dirname}/Database/axon.json`;

        this.axonExecutor = new AsyncQueue();
        this.guildExecutors = {};
    }

    get axonDefault() {
        return this._axonDefault;
    }

    get guildDefault() {
        return this._guildDefault;
    }

    getExecutor(guildID) {
        let executor = this.guildExecutors[guildID];

        if (!executor) {
            executor = new AsyncQueue();
            this.guildExecutors[guildID] = executor;
        }
        
        return executor;
    }

    // **** CORE **** //

    toJSON(string) {
        if (!string) {
            return null;
        }
        try {
            return JSON.parse(string);
        } catch (e) {
            return string;
        }
    }

    toString(json) {
        if (!json) {
            return null;
        }
        try {
            return JSON.stringify(json, null, '\t');
        } catch (e) {
            return json;
        }
    }

    _buildPath(gID) {
        return `${this._basePath}${gID}.json`;
    }

    /**
     * Read a file and return the string of the file content or null
     *
     * @param {String} path
     * @returns {Promise<String|null>}
     *
     * @memberof Manager
     */
    async readFile(path) {
        if (!path) {
            return null;
        }
        try {
            return await readFileAsync(path);
        } catch (err) {
            return null;
        }
    }

    /**
     * Read a file and return the string of the file content or null
     *
     * @param {String} path
     * @returns {Promise<String|null>}
     *
     * @memberof Manager
     */
    async writeFile(path, content = '{}') {
        if (!path) {
            return null;
        }
        if (path.search('.json') === -1) {
            return null;
        }

        try {
            await writeFileAsync(path, content, 'utf8');
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // **** INIT **** //

    /**
     * Create a file and schema for Axon global file.
     * @returns {Promise<Object>} The newly created Schema || null
     *
     * @memberof Manager
     */
    async createAxonSchema(defaultPrefix) {
        // create schema with default / basic values
        const axonSchema = Object.assign( {}, this.axonDefault);
        axonSchema.prefix = defaultPrefix;
        axonSchema.createdAt = new Date();
        axonSchema.updatedAt = new Date();

        const res = await this.writeFile(this._axonPath, this.toString(axonSchema) );
        if (res) {
            return this.axonDefault;
        }
        return null;
    }

    /**
     * Create a file and schema for the given guild.
     *
     * @param {String} gID
     * @param {Array} prefixes
     * @returns {Promise<Object>} The newly created Schema || null
     *
     * @memberof Manager
     */
    async createGuildSchema(prefixes, gID) {
        // create schema with default / basic values
        const guildSchema = Object.assign( {}, this.guildDefault);
        guildSchema.guildID = gID;
        guildSchema.createdAt = new Date();
        guildSchema.updatedAt = new Date();
        guildSchema.prefixes = prefixes;

        const res = await this.writeFile(this._buildPath(gID), this.toString(guildSchema) );
        if (res) {
            return guildSchema;
        }
        return null;
    }

    // **** FETCHERS **** //

    /**
     * Fetch the axon schema
     *
     * @returns {Promise<Object>} AxonSchema || null
     *
     * @memberof Manager
     */
    async fetchAxonSchema() {
        const res = await this.readFile(this._axonPath);
        if (res) {
            return this.toJSON(res);
        }
        return res;
    }

    /**
     * Fetch the guild schema for the given guild
     *
     * @param {String} gID
     * @returns {Promise<Object>} GuildSchema || null
     *
     * @memberof Manager
     */
    async fetchGuildSchema(gID) {
        const res = await this.readFile(this._buildPath(gID) );
        if (res) {
            return this.toJSON(res);
        }
        return res;
    }

    // **** UPDATERS **** //

    /**
     * Update the schema with the given value for the given guild
     *
     * @param {String} gID
     * @param {String} key
     * @param {Object} value - The value to update for the given key (can be anything)
     * @returns {Promise<Object>} GuildSchema || null
     *
     * @memberof Manager
     */
    updateGuildKey(gID, key, value) {
        return this.getExecutor(gID).add(async() => {
            const guildSchema = await this.fetchGuildSchema(gID);

            guildSchema[key] = value;
            guildSchema.updatedAt = new Date();
            
            return this.writeGuildSchema(gID, guildSchema);
        }, true);
    }

    /**
     * Update the schema with the given value
     *
     * @param {String} key
     * @param {Object} value - The value to update for the given key (can be anything)
     * @returns {Promise<Object>} AxonSchema || null
     *
     * @memberof Manager
     */
    updateAxonKey(key, value) {
        return this.axonExecutor.add(async() => {
            const axonSchema = await this.fetchAxonSchema();

            axonSchema[key] = value;
            axonSchema.updatedAt = new Date();

            return this.writeAxonSchema(axonSchema);
        }, true);
    }

    // **** OVERWRITER **** //

    /**
     * Write the updated schema in the file.
     *
     * @param {Object} schema
     * @returns {Promise<Object>} AxonSchema || null
     *
     * @memberof Manager
     */
    async writeAxonSchema(schema) {
        schema.updatedAt = new Date();
        
        const res = await this.writeFile(this._axonDefault, this.toString(schema) );
        if (res) {
            return schema;
        }
        return null;
    }

    /**
     * Write the updated schema in the file (for the given guild).
     *
     * @param {String} gID
     * @param {Object} schema
     * @returns {Promise<Object>} GuildSchema || null
     *
     * @memberof Manager
     */
    async writeGuildSchema(gID, schema) {
        schema.updatedAt = new Date();

        const res = await this.writeFile(this._buildPath(gID), this.toString(schema) );
        if (res) {
            return schema;
        }
        return null;
    }
}

export default Manager;
