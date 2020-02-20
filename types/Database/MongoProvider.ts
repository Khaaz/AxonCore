
/**
 * DB interface to interact with a MongoDB Database.
 *
 * @author KhaaZ
 *
 * @class MongoProvider
 * @extends ADBProvider
 */
export declare class MongoProvider extends ADBProvider {
    public AxonSchema?: AxonConfig;
    public GuildSchema?: GuildConfig;

    /**
     * Override init method.
     *
     * @param axonOptions
     *
     * @memberof MongoProvider
     */
    init(AxonOptions?: AxonOptions): void;
    /**
     * Initialises a default Axon config.
     *
     * @returns Newly created Axon config from the DB
     * @memberof MongoProvider
     */
    initAxon(): Promise<AxonConfig>;
    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param gID - Guild ID
     *
     * @returns Newly created Guild config from the DB
     * @memberof MongoProvider
     */
    initGuild(gID: string): Promise<GuildConfig>;

    /**
     * Retrieves the axon config from the DB
     *
     * @returns AxonSchema Object or null
     * @memberof MongoProvider
     */
    fetchAxon(): Promise<AxonConfig|null>;
    /**
     * Retrieves the Guild config for the specified guild.
     *
     * @param gID - Guild ID
     * @memberof MongoProvider
     */
    fetchGuild(gID: string): Promise<GuildConfig|null>;
    /**
     * Retrieves the Guild **Schema** for the specified guild.
     * Does not lean and return the actual mongoose Schema.
     * MongoProvider specific method.
     *
     * @param gID - Guild ID
     * @returns GuildSchema or null
     * @memberof MongoProvider
     */
    fetchGuildSchema(gID: string): Promise<Model<GuildSchema> | null>;

    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param key - The identifier in the Database
     * @param value - The value to update in the DB
     * @returns Whether the request was successful or not
     *
     * @memberof MongoProvider
     */
    updateAxon(key: string, value: updateDBVal): Promise<boolean>;
    /**
     * Update GuildConfig in the DB.
     * Update the specific key with the value given as third parameters.
     * Specify the guild with the guild ID.
     * Generic method to update Database.
     *
     * @param key - The identifier in the Database
     * @param gID - The guild ID to update
     * @param value - The value to update in the DB
     * @returns Whether the request was successful or not
     *
     * @memberof MongoProvider
     */
    updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;
    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param data - the schema object to update
     * @returns Updated AxonConfig from the DB
     * @memberof MongoProvider
     */
    saveAxon(data: AxonConfig): Promise<AxonConfig|null>;
    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param gID - Guid id
     * @param data - the schema object to update
     * @returns Updated GuildConfig from the DB
     * @memberof MongoProvider
     */
    saveGuild(gID: string, data: GuildConfig): Promise<GuildConfig|null>;
}
