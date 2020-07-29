import LRUCache from './../../Utility/External/LRUCache';
import Store from '../../Utility/Store';

import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 */

/**
 * Handles GuildConfigs cache.
 * Can be extended to a redis or memcached cache easily for instance.
 *
 * @author KhaaZ
 *
 * @class GuildConfigsCache
 * @extends Store<GuildConfig>
 * @prop {AxonClient} _axon
 * @prop {LRUCache<GuildConfig>} guildConfigs
 */
class GuildConfigsCache extends Store {
    /**
     * Creates an instance of GuildConfigsCache.
     *
     * @param {AxonClient} axonClient
     * @memberof GuildConfigsCache
     */
    constructor(axonClient) {
        super(new LRUCache(1000, { base: axonClient._guildConfig } ) );
        this._axon = axonClient;
    }

    /**
     * Returns the cache
     *
     * @readonly
     * @type {LRUCache<GuildConfig>}
     * @memberof GuildConfigsCache
     */
    get guildConfigs() {
        return this.cache;
    }

    /**
     * Get a GuildConfig from the cache or from the DB if not in the cache.
     *
     * @param {String} key
     * @returns {Promise<GuildConfig|null>}
     * @memberof GuildConfigsCache
     */
    async getOrFetch(key) {
        let guildConfig = this.get(key);
        if (!guildConfig) {
            try {
                guildConfig = await this.fetch(key);
            } catch (err) {
                throw new AxonError(`Cannot retrieve guildConfig from the DB: Guild: ${key}\n${err.stack}`, 'AxonClient', 'GuildConfigsCache');
            }
            this.set(key, guildConfig);
        }
        return guildConfig;
    }

    /**
     * Fetches and resolves the guild config of the given ID from the DB, creates a schema if none was found or there was an error.
     *
     * @param {String} gID - The guild ID to fetch the DB
     * @returns {Promise<GuildConfig|null>} Guild schema from the DB / Error
     * @memberof GuildConfigsCache
     */
    async fetch(gID) {
        try {
            let guildConfig = await this._axon.DBProvider.fetchGuild(gID);
            if (!guildConfig) {
                guildConfig = await this._axon.DBProvider.initGuild(gID);
            }
            return guildConfig;
        } catch (err) {
            const newGuildConfig = await this._axon.DBProvider.initGuild(gID);
            return newGuildConfig;
        }
    }
}

export default GuildConfigsCache;
