
/**
 * Handles GuildConfigs cache.
 * Can be extended to a redis or memcached cache easily for instance.
 *
 * @author KhaaZ
 *
 * @class GuildConfigsCache
 */
export declare class GuildConfigCache {
    private _axon: AxonClient;
    public guildConfigs: LRUCache<GuildConfig>;
    /**
     * Creates an instance of GuildConfigsCache.
     *
     * @memberof GuildConfigsCache
     */
    constructor(axonClient: AxonClient);
    /**
     * Get a GuildConfig from the guild ID.
     *
     * @memberof GuildConfigsCache
     */
    get(key: string): GuildConfig;
    /**
     * Set a GuildConfig with the Guild ID as key.
     *
     * @memberof GuildConfigsCache
     */
    set(key: string, value: GuildConfig): void;
    public [Symbol.iterator](): [string|number, GuildConfig];
    /**
     * Get a GuildConfig from the cache or from the DB if not in the cache.
     *
     * @memberof GuildConfigsCache
     */
    public getOrFetch(key: string): Promise<GuildConfig|null>;
    /**
     * Fetches and resolves the guild config of the given ID from the DB, creates a schema if none was found or there was an error.
     *
     * @param gID - The guild ID to fetch the DB
     * @returns Guild schema from the DB / Error
     * @memberof GuildConfigsCache
     */
    public fetchGuildConf(gID: string): Promise<GuildConfig|null>;
}
