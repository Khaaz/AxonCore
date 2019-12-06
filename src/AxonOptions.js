/**
 * AxonOptions definition.
 * Options passed when creating an AxonClient instance.
 *
 * @author KhaaZ
 *
 * @class AxonOptions
 *
 * @prop {Object} [botConfig=null] - General Axon config
 * @prop {Object} [lang=null] - Message templates / translations
 * @prop {Object} [tokenConfig=null] - Token config
 * @prop {Function} [logo=null] - Custom function that will log a logo
 * @prop {Object<Utils>} [utils=null] - Custom utils. Needs to be an instance of AxonCore.Utils
 * @prop {Object} [logger=null] - Custom logger
 * @prop {Object<DBProvider>} [DBProvider=null] - DBProvider. Needs to be an instance of DBProvider
 * @prop {String} [DBLocation=null] - Path to use as default location for usage of the JSONProvider
 * @prop {Object<AxonConfig>} [axonConfig=null] - Custom AxonConfig object to use instead of default AxonConfig
 * @prop {Object<GuildConfig>} [guildConfig=null] - Custom GuildConfig object to use instead of default GuildConfig
 */
class AxonOptions {
    /**
     * Creates an instance of AxonOptions.
     *
     * @param {Object} [data={}]
     * @param {Object} [data.botConfig=null] - General Axon config
     * @param {Object} [data.lang=null] - Message templates / translations
     * @param {Object} [data.tokenConfig=null] - Token config
     * @param {String} [data.token=null] - The discord js token to automatically connect the bot client
     * @param {Function} [data.logo=null] - Custom function that will log a logo
     * @param {Object<Utils>} [data.utils=null] - Custom utils. Needs to be an instance of AxonCore.Utils
     * @param {Object} [data.logger=null] - Custom logger
     * @param {Object<DBProvider>} [data.DBProvider=null] - DBProvider. Needs to be an instance of DBProvider
     * @param {String} [data.DBLocation=null] - Path to use as default location for usage of the JSONProvider
     * @param {Object<AxonConfig>} [data.axonConfig=null] - Custom AxonConfig object to use instead of default AxonConfig
     * @param {Object<GuildConfig>} [data.guildConfig=null] - Custom GuildConfig object to use instead of default GuildConfig
     *
     * @memberof AxonOptions
     */
    constructor(data = {} ) {
        this.botConfig = data.botConfig || null;
        this.lang = data.lang || null;
        this.tokenConfig = data.tokenConfig || null;

        this._token = data.token || null; // DJS token to login

        this.logo = data.logo || null;

        this.utils = data.utils || null;
        this.logger = data.logger || null;
        this.DBProvider = data.DBProvider || null;
        this.DBLocation = data.DBLocation || null;
        
        this.axonConfig = data.axonConfig || null;
        this.guildConfig = data.guildConfig || null;
    }
}

export default AxonOptions;
