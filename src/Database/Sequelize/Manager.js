import axonDefault from './AxonDefault.json';
import guildDefault from './GuildDefault.json';
import * as Sequelize from 'sequelize';

/**
 * Manager class for handling Sequelise Database.
 * 
 * @author Olybear9
 * 
 * @class Manager
 */
class Manager {
    constructor() {
        this._axonDefault = axonDefault;
        this._guildDefault = guildDefault;
        this._allowedDatabases = ['mysql', 'mariadb', 'postgres'];
        this._dialiect = null;
        this._db = null;
        this._Sequelize = null;
    }

    get axonDefault() {
        return this._axonDefault;
    }

    get guildDefault() {
        return this._guildDefault;
    }

    startDatabase(opts) {
        const type = opts.type;
        const username = opts.username;
        const password = opts.password;

        if (this._Sequelize) {
            return new Error('Database already loaded.');
        }

        if (!this._allowedDatabases.includes(type)) {
            return new Error('Invalid dialect provided! Must be one of: ' + this._allowedDatabases.join(', '));
        }

        this._Sequelize = new Sequelize('AxonDb', username, password, {
            host: 'localhost',
            dialiect: type
        });

        try {
            this.buildModelClasses();
            this.testConnection();
            return this.testConnection();
        } catch (error) {
            return error;
        }

    }

    async testConnection() {
        if (!this._Sequelize) {
            return new Error('Database not loaded.');
        }
    }

    buildModelClasses() {
        this._axonSchema = this._Sequelize.define('AxonSchema', this.typeData(this._axonDefault));
        this._guildSchema = this._Sequelize.define('GuildSchema', this.typeData(this._axonDefault));

    }

    typeData(obj) {
        if (!obj || typeof obj !== 'object') return {};

        const keys = Object.keys(obj);
        const types = {
            string: 'STRING',
            object: 'JSON',
            boolean: 'BOOLEAN',
            array: 'JSON',
            number_int: 'INT',
            number_float: 'FLOAT',
            number_big: 'BIGINT',
            date: 'JSON'
        };

        let modelTypes = {};

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = obj[i];

            if (val instanceof Date) {
                modelTypes[key] = {
                    type: types.date
                }
                continue;
            }

            if (val instanceof Array) {
                modelTypes[key] = {
                    type: types.object
                }
                continue;
            }

            if (typeof val === 'boolean') {
                modelTypes[key] = {
                    type: types.boolean
                }
                continue;
            }

            if (typeof val === 'bigint') {
                modelTypes[key] = {
                    type: types.number_big
                }
                continue;
            }

            if (typeof val === 'function') continue;

            if (typeof val === 'number') {
                if (Number.isInteger(val)) {
                    modelTypes[key] = {
                        type: types.number_int
                    }
                    continue;
                } else {
                    modelTypes[key] = {
                        type: types.number_float
                    }
                    continue;
                }
            }

            if (typeof val === 'object') {
                modelTypes[key] = {
                    type: types.object
                }
                continue;
            }

            continue;

        }

        return modelTypes;

    }
}

export default new Manager();