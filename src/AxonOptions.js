import Utils from './Utility/Utils';

import { LIBRARY_TYPES, DB_TYPES, LOGGER_TYPES } from './Utility/Constants/AxonEnums';

import defaultConfig from './Configs/botConfig.json';
import defaultLang from './Configs/lang.json';
import defaultWebhooksConfig from './Configs/webhooksConfig.json';

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
 * @prop {Number<LIBRARY_TYPES>} settings.library - Library type
 * @prop {Number<LOGGER_TYPES>} setting.logger - Logger type
 * @prop {Number<DB_TYPES>} settings.db - DB type
 * @prop {Number} settings.guildConfigCache - max amount of guildConfigs cached at the same time (LRUCache)
 *
 * @prop {Object} lang - Translation file
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
 * @prop {Object} template.embeds - Embeds colors
 * @prop {Object} template.emotes - Emotes
 *
 * // Custom
 * @prop {Object} data.custom - Custom configs that can be provided
 *
 * // Webhooks
 * @prop {Object} webhooks - Webhooks tokens / id
 * @prop {Object} webhooks.FATAL
 * @prop {Object} webhooks.ERROR
 * @prop {Object} webhooks.WARN
 * @prop {Object} webhooks.DEBUG
 * @prop {Object} webhooks.NOTICE
 * @prop {Object} webhooks.INFO
 * @prop {Object} webhooks.VERBOSE
 *
 * // Extensions
 * @prop {Object} extensions - Classes overrides
 * @prop {Utils} extensions.utils - Custom utils. Needs to be an instance of AxonCore.Utils
 * @prop {Object} extensions.logger - Custom logger
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
     * @param {Number<LIBRARY_TYPES>} data.settings.library - Library type
     * @param {Number<LOGGER_TYPES>} data.setting.logger - Logger type
     * @param {Number<DB_TYPES>} data.settings.db - DB type
     * @param {Number} data.settings.guildConfigCache - max amount of guildConfigs cached at the same time (LRUCache)
     *
     * @param {Object} data.lang - Translation file
     * @param {Function} data.logo - Custom function that will log a custom logo on startup
     * // Info
     * @param {Object} data.info - General info about the bot
     * @param {String} data.info.name - The application name
     * @param {String} data.info.description - The application description
     * @param {String} data.info.version - The application version
     * // Staff
     * @param {Object} data.staff - The bot staff (owner, admins)
     * @param {Array<Object>} data.staff.owners - The bot staff (owner, admins)
     * @param {Array<Object>} data.staff.admins - The bot staff (owner, admins)
     * // Template
     * @param {Object} data.template - Template information (colors / formatting / emojis)
     * @param {Object} data.template.embeds - Embeds colors
     * @param {Object} data.template.emotes - Emotes
     *
     * // Custom
     * @param {Object} data.custom - Custom configs that can be provided
     *
     * // Webhooks
     * @param {Object} [webhooks={}] - Webhooks tokens / id
     * @param {Object} webhooks.FATAL
     * @param {Object} webhooks.ERROR
     * @param {Object} webhooks.WARN
     * @param {Object} webhooks.DEBUG
     * @param {Object} webhooks.NOTICE
     * @param {Object} webhooks.INFO
     * @param {Object} webhooks.VERBOSE
     *
     * // Extensions
     * @param {Object} [extensions={}] - Classes overrides
     * @param {Utils} extensions.utils - Custom utils. Needs to be an instance of AxonCore.Utils
     * @param {Object} extensions.logger - Custom logger
     * @param {ADBProvider} extensions.DBProvider - DBProvider. Needs to be an instance of DBProvider
     * @param {String} extensions.DBLocation - Path to use as default location for usage of the JSONProvider
     * @param {AxonConfig} extensions.axonConfig - Custom AxonConfig object to use instead of default AxonConfig
     * @param {GuildConfig} extensions.guildConfig - Custom GuildConfig object to use instead of default GuildConfig
     * @memberof AxonOptions
     */
    constructor(data = {}, webhooks = {}, extensions = {} ) {
        this._token = data.token || null; // DJS token to login

        this.prefixes = Utils.compareObject(defaultConfig.prefixes, data.prefixes)
            ? data.prefixes
            : defaultConfig.prefixes;

        const settings = data.settings || {};
        this.settings = {
            lang: settings.lang || 'english',
            debugMode: !!settings.debugMode,
            library: settings.library !== undefined ? settings.library : LIBRARY_TYPES.ERIS,
            logger: settings.logger !== undefined ? settings.logger : LOGGER_TYPES.DEFAULT,
            db: settings.db !== undefined ? settings.db : DB_TYPES.DBLESS,
            guildConfigCache: settings.guildConfigCache || 10000,
        };

        this.lang = Utils.compareObject(defaultLang, data.lang)
            ? data.lang
            : defaultLang;

        this.logo = data.logo || null;
        this.info = Utils.compareObject(defaultConfig.info, data.info)
            ? data.info
            : defaultConfig.info;
        this.staff = Utils.compareObject(defaultConfig.staff, data.staff)
            ? data.staff
            : defaultConfig.staff;
        this.template = Utils.compareObject(defaultConfig.template, data.template)
            ? data.template
            : defaultConfig.template;

        // Additional setting (custom)
        this.custom = data.custom || null;

        // webhooks
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
