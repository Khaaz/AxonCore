import LRUCache from './../../Utility/External/LRUCache';

import GuildConfig from '../DataStructure/GuildConfig';

import AxonError from '../../Errors/AxonError';

/**
 * Handles GuildConfigs cache.
 * Can be extended to a redis or memcached cache easily for instance.
 *
 * @author KhaaZ
 *
 * @class GuildConfigsCache
 *
 * @prop {AxonClient} _axon
 * @prop {LRUCache<GuildConfig>} guildConfigs
 */
class GuildConfigsCache {
    /**
     * Creates an instance of GuildConfigsCache.
     *
     * @param {AxonClient} axonClient
     *
     * @memberof GuildConfigsCache
     */
    constructor(axonClient) {
        this._axon = axonClient;

        this.guildConfigs = new LRUCache(1000, { base: GuildConfig } );
    }

    /**
     * Get a GuildConfig from the guild ID.
     *
     * @param {String} key
     * @returns {GuildConfig}
     *
     * @memberof GuildConfigsCache
     */
    get(key) {
        return this.guildConfigs.get(key);
    }

    /**
     * Set a GuildConfig with the Guild ID as key.
     *
     * @param {String} key
     * @param {GuildConfig} value
     *
     * @memberof GuildConfigsCache
     */
    set(key, value) {
        this.guildConfigs.set(key, value);
    }

    /**
     * Get a GuildConfig from the cache or from the DB if not in the cache.
     *
     * @param {String} key
     * @returns {Promise<GuildConfig|null>}
     *
     * @memberof GuildConfigsCache
     */
    async getOrFetch(key) {
        let guildConfig = this.get(key);
        if (!guildConfig) {
            try {
                guildConfig = await this.fetchGuildConf(key);
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
     *
     * @memberof GuildConfigsCache
     */
    async fetchGuildConf(gID) {
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
