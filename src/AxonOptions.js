import Utils from './Utility/Utils';

import { LIBRARY_TYPES, DB_TYPES, LOGGER_TYPES } from './Utility/Constants/AxonEnums';

import defaultConfig from './Configs/botConfig.json';
import defaultLang from './Configs/lang.json';
import defaultWebhooksConfig from './Configs/webhooksConfig.json';

/**
 * @typedef {Object.<string, AxonLanguageResponse>} Languages
 * @typedef {import('./Langs/TranslationManager').AxonLanguageResponse} AxonLanguageResponse
 * @typedef {import('./Loggers/ALogger').default} ALogger
 * @typedef {import('./Database/ADBProvider').default} ADBProvider
 * @typedef {import('./Core/Models/AxonConfig').default} AxonConfig
 * @typedef {import('./Core/Models/GuildConfig').default} GuildConfig
 * @typedef {import('./Utility/Constants/AxonEnums').LIBRARY_TYPES} LIBRARY_TYPES
 * @typedef {import('./Utility/Constants/AxonEnums').LOGGER_TYPES} LOGGER_TYPES
 * @typedef {import('./Utility/Constants/AxonEnums').DB_TYPES} DB_TYPES
 */

/**
 * AxonOptions definition.
 * Options passed when creating an AxonClient instance.
 *
 * @author KhaaZ
 *
 * @class AxonOptions
 *
 * @prop {String} data._token - The discord js token to automatically connect the bot client
 * // Prefixes
 * @prop {Object} prefixes - Bot prefixes
 * @prop {String} prefixes.general - General Bot prefix
 * @prop {String} prefixes.owner - Owner prefix
 * @prop {String} prefixes.admin - Admin prefix
 * // Settings
 * @prop {Object} settings - Bot settings
 * @prop {String} settings.lang - Default lang for the bot
 * @prop {Boolean} settings.debugMode - Whether to run the bot in debugMode (additional info)
 * @prop {LIBRARY_TYPES} settings.library - Library type
 * @prop {LOGGER_TYPES} settings.logger - Logger type
 * @prop {DB_TYPES} settings.db - DB type
 * @prop {Number} settings.guildConfigCache - max amount of guildConfigs cached at the same time (LRUCache)
 *
 * @prop {Languages} lang - Translation file
 * @prop {Function} logo - Custom function that will log a custom logo on startup
 * // Info
 * @prop {Object} info - General info about the bot
 * @prop {String} info.name - The application name
 * @prop {String} info.description - The application description
 * @prop {String} info.version - The application version
 * // Staff
 * @prop {Object} staff - The bot staff (owner, admins)
 * @prop {Array<Object>} staff.owners - The bot staff (owner, admins)
 * @prop {Array<Object>} staff.admins - The bot staff (owner, admins)
 * // Template
 * @prop {Object} template - Template information (colours / formatting / emojis)
 * @prop {Object.<string, Number>} template.embeds - Embeds colors
 * @prop {Object.<string, String>} template.emotes - Emotes
 *
 * // Custom
 * @prop {Object.<string, any>} data.custom - Custom configs that can be provided
 *
 * // Webhooks
 * @prop {Object} webhooks - Webhooks tokens / id
 * @prop {{id: String, token: String}} webhooks.FATAL
 * @prop {{id: String, token: String}} webhooks.ERROR
 * @prop {{id: String, token: String}} webhooks.WARN
 * @prop {{id: String, token: String}} webhooks.DEBUG
 * @prop {{id: String, token: String}} webhooks.NOTICE
 * @prop {{id: String, token: String}} webhooks.INFO
 * @prop {{id: String, token: String}} webhooks.VERBOSE
 *
 * // Extensions
 * @prop {Object} extensions - Classes overrides
 * @prop {Utils} extensions.utils - Custom utils. Needs to be an instance of AxonCore.Utils
 * @prop {ALogger} extensions.logger - Custom logger
 * @prop {DBProvider} extensions.DBProvider - DBProvider. Needs to be an instance of DBProvider
 * @prop {String} extensions.DBLocation - Path to use as default location for usage of the JSONProvider
 * @prop {AxonConfig} extensions.axonConfig - Custom AxonConfig object to use instead of default AxonConfig
 * @prop {GuildConfig} extensions.guildConfig - Custom GuildConfig object to use instead of default GuildConfig
 */
class AxonOptions {
    /**
     * Creates an instance of AxonOptions.
     *
     * @param {Object} [data={}]
     *
     * @param {String} data.token - The discord js token to automatically connect the bot client
     * // Prefixes
     * @param {Object} data.prefixes - Bot prefixes
     * @param {String} data.prefixes.general - General Bot prefix
     * @param {String} data.prefixes.owner - Owner prefix
     * @param {String} data.prefixes.admin - Admin prefix
     * // Settings
     * @param {Object} data.settings - Bot settings
     * @param {String} data.settings.lang - Default lang for the bot
     * @param {Boolean} data.settings.debugMode - Whether to run the bot in debugMode (additional info)
     * @param {LIBRARY_TYPES} data.settings.library - Library type
     * @param {LOGGER_TYPES} data.settings.logger - Logger type
     * @param {DB_TYPES} data.settings.db - DB type
     * @param {Number} data.settings.guildConfigCache - max amount of guildConfigs cached at the same time (LRUCache)
     *
     * @param {Languages | String} data.lang - Translation file/folder
     * @param {() => void} data.logo - Custom function that will log a custom logo on startup
     * // Info
     * @param {Object} data.info - General info about the bot
     * @param {String} data.info.name - The application name
     * @param {String} data.info.description - The application description
     * @param {String} data.info.version - The application version
     * // Staff
     * @param {Object} data.staff - The bot staff (owner, admins)
     * @param {Array<{name: String, id: String}>} data.staff.owners - The bot staff (owner, admins)
     * @param {Array<{name: String, id: String}>} data.staff.admins - The bot staff (owner, admins)
     * // Template
     * @param {Object} data.template - Template information (colors / formatting / emojis)
     * @param {Object.<string, Number>} data.template.embeds - Embeds colors
     * @param {Object.<string, String>} data.template.emotes - Emotes
     *
     * // Custom
     * @param {Object.<string, any>} data.custom - Custom configs that can be provided
     *
     * // Webhooks
     * @param {Object} [webhooks={}] - Webhooks tokens / id
     * @param {{id: String, token: String}} webhooks.FATAL
     * @param {{id: String, token: String}} webhooks.ERROR
     * @param {{id: String, token: String}} webhooks.WARN
     * @param {{id: String, token: String}} webhooks.DEBUG
     * @param {{id: String, token: String}} webhooks.NOTICE
     * @param {{id: String, token: String}} webhooks.INFO
     * @param {{id: String, token: String}} webhooks.VERBOSE
     *
     * // Extensions
     * @param {Object} [extensions={}] - Classes overrides
     * @param {new (...args) => Utils} extensions.utils - Custom utils. Needs to be an instance of AxonCore.Utils
     * @param {ALogger} extensions.logger - Custom logger
     * @param {new (...args) => ADBProvider} extensions.DBProvider - DBProvider. Needs to be an instance of DBProvider
     * @param {String} extensions.DBLocation - Path to use as default location for usage of the JSONProvider
     * @param {new (...args) => AxonConfig} extensions.axonConfig - Custom AxonConfig object to use instead of default AxonConfig
     * @param {new (...args) => GuildConfig} extensions.guildConfig - Custom GuildConfig object to use instead of default GuildConfig
     * @memberof AxonOptions
     */
    constructor(data = {}, webhooks = {}, extensions = {} ) {
        this._token = data.token || null; // DJS token to login

        /**
         * @type {{general: String, owner: String, admin: String}}
         */
        this.prefixes = Utils.compareObject(defaultConfig.prefixes, data.prefixes)
            ? data.prefixes
            : defaultConfig.prefixes;

        const settings = data.settings || {};
        /**
         * @type {{
         * lang: String, debugMode: Boolean, library: Number, logger: Number, db: Number, guildConfigCache: Number
         * }}
         */
        this.settings = {
            lang: settings.lang || 'english',
            debugMode: !!settings.debugMode,
            library: settings.library !== undefined ? settings.library : LIBRARY_TYPES.ERIS,
            logger: settings.logger !== undefined ? settings.logger : LOGGER_TYPES.DEFAULT,
            db: settings.db !== undefined ? settings.db : DB_TYPES.DBLESS,
            guildConfigCache: settings.guildConfigCache || 10000,
        };

        if (typeof data.lang === 'string') {
            const path = `${process.cwd()}/${data.lang}`;
            const files = require('fs').readdirSync(path).filter(p => p.endsWith('.json') );
            if (files.length === 0) {
                /**
                 * @type {Languages}
                 */
                this.lang = defaultLang;
            } else {
                const langs = {};
                files.forEach(l => {
                    const customFile = require(`${path}/${l}`);
                    langs[l.split('.')[0]] = Utils.compareObject(defaultLang, customFile) ? customFile : defaultLang;
                } );
                this.lang = langs;
            }
        } else {
            this.lang = Utils.compareObject(defaultLang, data.lang)
                ? data.lang
                : defaultLang;
        }

        this.logo = data.logo || null;
        /**
         * @type {{name: String, description: String, version: String}}
         */
        this.info = Utils.compareObject(defaultConfig.info, data.info)
            ? data.info
            : defaultConfig.info;
        /**
         * @type {{owners: Array<{name: String, id: String}>, admins: Array<{name: String, id: String}>}}
         */
        this.staff = Utils.compareObject(defaultConfig.staff, data.staff)
            ? data.staff
            : defaultConfig.staff;
        /**
         * @type {{embeds: Object.<string, Number>, emotes: Object.<string, String>}}
         */
        this.template = Utils.compareObject(defaultConfig.template, data.template)
            ? data.template
            : defaultConfig.template;

        // Additional setting (custom)
        this.custom = data.custom || null;

        // webhooks
        /**
         * @type {{
         * FATAL: {id: String, token: String}, ERROR: {id: String, token: String}, WARN: {id: String, token: String}, DEBUG: {id: String, token: String},
         * NOTICE: {id: String, token: String}, INFO: {id: String, token: String}, VERBOSE: {id: String, token: String}
         * }}
         */
        this.webhooks = Utils.compareObject(defaultWebhooksConfig, webhooks)
            ? webhooks
            : defaultWebhooksConfig;

        // extensions
        this.extensions = {
            utils: extensions.utils || null,
            logger: extensions.logger || null,
            DBProvider: extensions.DBProvider || null,
            DBLocation: extensions.DBLocation || null,
            axonConfig: extensions.axonConfig || null,
            guildConfig: extensions.guildConfig || null,
        };
    }
}

export default AxonOptions;
