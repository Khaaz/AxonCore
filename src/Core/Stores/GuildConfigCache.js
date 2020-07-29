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
     * @param {Number} limit - The limit of item in the LRUCache
     * @memberof GuildConfigsCache
     */
    constructor(axonClient, limit) {
        super(new LRUCache(limit || 1000, { base: axonClient._guildConfig } ) );
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
        let guildConfig;
        
        try {
            guildConfig = await this._axon.DBProvider.fetchGuild(gID);
            if (!guildConfig) {
                guildConfig = await this._axon.DBProvider.initGuild(gID);
            }
        } catch (_) {
            guildConfig = await this._axon.DBProvider.initGuild(gID);
        }

        this.set(gID, guildConfig);
        return guildConfig;
    }

    /**
     * Refresh the element by supressing it, fetching and caching it again
     *
     * @param {String} gID
     * @returns {Boolean} Whether it worked
     * @memberof GuildConfigsCache
     */
    async refresh(gID) {
        this.delete(gID);
        const guildConfig = await this.fetch(gID);
        if (!guildConfig) {
            return false;
        }

        this.set(gID, guildConfig);
        return true;
    }
}

export default GuildConfigsCache;
