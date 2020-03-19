import axonDefault from './AxonDefault.json';
import guildDefault from './GuildDefault.json';

import AsyncQueue from '../../Utility/External/AsyncQueue';

import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

/**
 * @typedef {{id: String; prefix: String; createdAt: String; updatedAt: String; bannedGuilds: Array<String>; bannedUsers: Array<String>}} AxonJSON
 * @typedef {{
 * guildID: String; prefixes: Array<String>; modules: Array<String>; commands: Array<String>; eventListeners: Array<String>; createdAt: String; updatedAt: String;
 * ignoredUsers: Array<String>; ignoredRoles: Array<String>; ignoredChannels: Array<String>; modOnly: Boolean; modRoles: Array<String>; modUsers: Array<String>;
 * }} GuildJSON
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 */

/**
 * Manager class for handling Json database
 *
 * @author KhaaZ, Olybear
 *
 * @class JsonManager
 */
class JsonManager {
    /**
     * Creates an instance of JsonManager.
     *
     * @param {String} basePath - The path / location where to create and use the database
     *
     * @memberof JsonManager
     */
    constructor(basePath) {
        // default schemas values
        /**
         * @type {AxonJSON}
         */
        this._axonDefault = axonDefault;
        /**
         * @type {GuildJSON}
         */
        this._guildDefault = guildDefault;

        if (!fs.existsSync(basePath) ) {
            console.log('The DB directory doesn\'t exist. Creating...');
            fs.mkdirSync(basePath, { recursive: true } );
            console.log('DB directory created');
        }

        this._basePath = basePath || `${__dirname}/Database/`;
        this._axonPath = `${basePath}axon.json` || `${__dirname}/Database/axon.json`;

        this.axonExecutor = new AsyncQueue();
        /**
         * @type {Object.<string, AsyncQueue>}
         */
        this.guildExecutors = {};
    }

    /**
     * Returns default data structure for axon
     *
     * @readonly
     * @memberof JsonManager
     */
    get axonDefault() {
        return this._axonDefault;
    }

    /**
     * Returns default data structure for guild
     *
     * @readonly
     * @memberof JsonManager
     */
    get guildDefault() {
        return this._guildDefault;
    }

    /**
     * Get guild executor
     * @param {String} guildID Guild ID
     * @returns {AsyncQueue}
     * @memberof JsonManager
     */
    getExecutor(guildID) {
        let executor = this.guildExecutors[guildID];

        if (!executor) {
            executor = new AsyncQueue();
            this.guildExecutors[guildID] = executor;
        }
        
        return executor;
    }

    // **** CORE **** //

    /**
     * Parse JSON string as object/array
     * @param {String} string JSON string
     * @returns {Object.<string, any>|Array<any>|String} Parsed array/object or input string if failed
     * @memberof JsonManager
     */
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

    /**
     * Parse object/array as JSON string
     * @param {Object|Array} json Object/array to be parsed into JSON string
     * @returns {String|Object.<string, any>|Array<any>} JSON string or parsed array/object if failed
     * @memberof JsonManager
     */
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

    /**
     * Get guild config path
     * @param {String} gID Guild ID
     */
    _buildPath(gID) {
        return `${this._basePath}${gID}.json`;
    }

    /**
     * Read a file and return the string of the file content or null
     *
     * @param {String} path
     * @returns {Promise<String|null>}
     *
     * @memberof JsonManager
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
     * Write a file
     *
     * @param {String} path
     * @param {String} [content='{}']
     * @returns {Promise<Boolean>} Whether or not the task completed successfully
     *
     * @memberof JsonManager
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
     * @param {String} defaultPrefix Default prefix
     * @returns {Promise<AxonJSON>} The newly created Schema || null
     *
     * @memberof JsonManager
     */
    async createAxonSchema(defaultPrefix) {
        // create schema with default / basic values
        const axonSchema = Object.assign( {}, this.axonDefault);
        axonSchema.prefix = defaultPrefix;
        axonSchema.createdAt = new Date();

        return this.writeAxonSchema(axonSchema);
    }

    /**
     * Create a file and schema for the given guild.
     *
     * @param {Array<String>} prefixes Array of prefixes
     * @param {String} gID Guild ID
     * @returns {Promise<GuildJSON>} The newly created Schema || null
     *
     * @memberof JsonManager
     */
    async createGuildSchema(prefixes, gID) {
        // create schema with default / basic values
        const guildSchema = Object.assign( {}, this.guildDefault);
        guildSchema.guildID = gID;
        guildSchema.createdAt = new Date();
        guildSchema.prefixes = prefixes;

        return this.writeGuildSchema(gID, guildSchema);
    }

    // **** FETCHERS **** //

    /**
     * Fetch the axon schema
     *
     * @returns {Promise<AxonJSON>} AxonSchema || null
     *
     * @memberof JsonManager
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
     * @param {String} gID Guild ID
     * @returns {Promise<GuildJSON>} GuildSchema || null
     *
     * @memberof JsonManager
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
     * @param {String} gID Guild ID
     * @param {String} key Value to update
     * @param {updateDBVal} value - The value to update for the given key (can be anything)
     * @returns {Promise<GuildJSON>} GuildSchema || null
     *
     * @memberof JsonManager
     */
    updateGuildKey(gID, key, value) {
        return this.getExecutor(gID).add(async() => {
            const guildSchema = await this.fetchGuildSchema(gID);

            guildSchema[key] = value;
            
            return this.writeGuildSchema(gID, guildSchema);
        }, true);
    }

    /**
     * Update the schema with the given value
     *
     * @param {String} key Value to update
     * @param {Object} value - The value to update for the given key (can be anything)
     * @returns {Promise<AxonJSON>} AxonSchema || null
     *
     * @memberof JsonManager
     */
    updateAxonKey(key, value) {
        return this.axonExecutor.add(async() => {
            const axonSchema = await this.fetchAxonSchema();

            axonSchema[key] = value;

            return this.writeAxonSchema(axonSchema);
        }, true);
    }

    // **** OVERWRITER **** //

    /**
     * Write the updated schema in the file.
     *
     * @param {AxonJSON} schema AxonSchema
     * @returns {Promise<AxonJSON>} AxonSchema || null
     *
     * @memberof JsonManager
     */
    async writeAxonSchema(schema) {
        schema.updatedAt = new Date();
        
        const res = await this.writeFile(this._axonPath, this.toString(schema) );
        if (res) {
            return schema;
        }
        return null;
    }

    /**
     * Write the updated schema in the file (for the given guild).
     *
     * @param {String} gID Guild ID
     * @param {GuildJSON} schema GuildSchema
     * @returns {Promise<GuildJSON>} GuildSchema || null
     *
     * @memberof JsonManager
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

export default JsonManager;
