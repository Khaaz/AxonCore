
/**
 * DB interface to interact with a Json Database.
 *
 * @author Olybear, KhaaZ
 *
 * @class JsonProvider
 * @extends ADBProvider
 */
export declare class JsonProvider extends ADBProvider {
    /**
     * Class responsible to read / write data to the DB as json.
     */
    public manager?: JsonManager;
    
    /**
     * Override init method.
     *
     * @param {AxonOptions}
     * @memberof JsonProvider
     */
    init(axonOptions?: AxonOptions): void
    /**
     * Initialises a default Axon config.
     *
     * @returns Newly created Axon config from the DB
     * @memberof JsonProvider
     */
    initAxon(): Promise<AxonConfig>;
    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param gID - Guild ID
     *
     * @returns Newly created Guild config from the DB
     * @memberof JsonProvider
     */
    initGuild(gID: string): Promise<GuildConfig>;

    /**
     * Retrieves the axon config from the DB
     *
     * @returns AxonSchema Object or null
     * @memberof JsonProvider
     */
    fetchAxon(): Promise<AxonConfig>;
    /**
     * Retrieves the Guild config for the specified guild.
     *
     * @param gID - guild ID
     * @memberof JsonProvider
     */
    fetchGuild(gID: string): Promise<GuildConfig>;

    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param key - The identifier in the Database
     * @param value - The value to update in the DB
     * @returns Whether the request was successful or not
     *
     * @memberof JsonProvider
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
     * @memberof JsonProvider
     */
    updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;

    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param data - the schema object to update
     * @returns Updated AxonConfig from the DB
     *
     * @memberof JsonProvider
     */
    saveAxon(data: AxonConfig): Promise<AxonConfig|null>;
    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param gID - Guild id
     * @param data - the schema object to update
     * @returns Updated GuildConfig from the DB
     * @memberof JsonProvider
     */
    saveGuild(gID: string, data: GuildConfig): Promise<GuildConfig|null>;
}
