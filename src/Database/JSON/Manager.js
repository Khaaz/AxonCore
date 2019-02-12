'use strict';

import axonDefault from './AxonDefault.json';
import guildDefault from './GuildDefault.json';

import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Manager class for handling Json database
 *
 * @author KhaaZ, Olybear
 *
 * @class Manager
 */
class Manager {
    constructor() {
        // default schemas values
        this._axonDefault = axonDefault;
        this._guildDefault = guildDefault;

        this._basePath = __dirname + '/Database/';
        this._axonPath = __dirname + '/Database/axon.json';
    }

    get axonDefault() {
        return this._axonDefault;
    }

    get guildDefault() {
        return this._guildDefault;
    }

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
        return this._basePath + gID + '.json';
    }

    /**
     * Read a file and return the string of the file content or null
     *
     * @param {String} path
     * @returns {Promise<String|null>}
     */
    async readFile(path) {
        if (!path) return null;
        try {
            return await readFile(path);
        } catch (err) {
            return null;
        }
    }

    /**
     * Read a file and return the string of the file content or null
     *
     * @param {String} path
     * @returns {Promise<String|null>}
     */
    async writeFile(path, content = '{}') {
        if (!path) return null;
        if (path.search('.json') === -1) return null;

        try {
            await writeFile(path, content, 'utf8');
            return true;
        } catch (err) {
            return false;
        }
    }

    //
    //
    //

    /**
     * Create a file and schema for Axon global file.
     * @returns {Promise<Object>} The newly created Schema || null
     */
    async createAxonSchema() {
        const res = await this.writeFile(this._axonPath, this.toString(this.axonDefault));
        if (res) {
            return this.axonDefault;
        } else {
            return null;
        }
    }

    /**
     * Create a file and schema for the given guild.
     *
     * @param {String} gID
     * @returns {Promise<Object>} The newly created Schema || null
     */
    async createGuildSchema(gID) {
        const guildSchema = Object.assign({}, this.guildDefault);
        guildDefault.guildID = gID;
        guildDefault.createdAt = new Date();
        const res = await this.writeFile(this._buildPath(gID), this.toString(guildSchema));
        if (res) {
            return this.guildDefault;
        } else {
            return null;
        }
    }

    /**
     * Fetch the axon schema
     *
     * @returns {Promise<Object>} AxonSchema || null
     */
    async fetchAxonSchema() {
        const res = await this.readFile(this._axonPath);
        if (res) {
            return this.toJSON(res);
        } else {
            return res;
        }
    }

    /**
     * Fetch the guild schema for the given guild
     *
     * @param {String} gID
     * @returns {Promise<Object>} GuildSchema || null
     */
    async fetchGuildSchema(gID) {
        const res = await this.readFile(this._buildPath(gID));
        if (res) {
            return this.toJSON(res);
        } else {
            return res;
        }
    }

    /**
     * Write the updated schema in the file (for thegiven guild).
     *
     * @param {String} gID
     * @param {Object} schema
     * @returns {Promise<Object>} GuildSchema || null
     */
    async writeGuildSchema(gID, schema) {
        const res = await this.writeFile(this._buildPath(gID), this.toString(schema));
        if (res) {
            return schema;
        } else {
            return null;
        }
    }

    /**
     * Write the updated schema in the file.
     *
     * @param {Object} schema
     * @returns {Promise<Object>} AxonSchema || null
     */
    async writeAxonSchema(schema) {
        const res = await this.writeFile(this._axonDefault, this.toString(schema));
        if (res) {
            return schema;
        } else {
            return null;
        }
    }

    //
    //
    //

    /**
     * Update the schema with the given value for the given guild
     *
     * @param {String} gID
     * @param {String} key
     * @param {Object} value - The value to update for the given key (can be anything)
     * @returns {Promise<Object>} GuildSchema || null
     */
    async updateGuildKey(gID, key, value) {
        const guildSchema = await this.fetchGuildSchema(gID);

        guildSchema[key] = value;

        return this.writeGuildSchema(gID, guildSchema);
    }

    /**
     * Update the schema with the given value
     *
     * @param {String} key
     * @param {Object} value - The value to update for the given key (can be anything)
     * @returns {Promise<Object>} AxonSchema || null
     */
    async updateAxonKey(key, value) {
        const axonSchema = await this.fetchAxonSchema();

        axonSchema[key] = value;

        return this.writeAxonSchema(axonSchema);
    }
}

export default new Manager();
