import {
    AxonClient, AxonOptions, AxonConfig, GuildConfig, updateDBVal,
} from '..';

/**
 * Abstract class for all DB services.
 * Extend this class to create your own Database provider.
 * You just need to write these methods for the framework to be able to interact with the database.
 *
 * The provider creates guildconfigs with DB data.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ADBProvider
 */
export declare abstract class ADBProvider {
    /**
     * The AxonClient
     */
    public axon: AxonClient;
    /**
     * Creates an instance of ADBProvider.
     *
     * @memberof ADBProvider
     */
    constructor(axonClient: AxonClient);
    /**
     * Init the ADBProvider.
     * Method called just after instantiation. Can be overridden with anything that will be used by the provider.
     *
     * @memberof ADBProvider
     */
    public init(axonOptions?: AxonOptions): this; // Not Implemented
    /**
     * Initialises a default Axon config.
     *
     * @returns Newly created Axon config from the DB
     *
     * @memberof ADBProvider
     */
    public initAxon(): Promise<AxonConfig>; // Not Implemented
    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param gID - Guild ID
     *
     * @returns Newly created Guild config from the DB
     *
     * @memberof ADBProvider
     */
    public initGuild(gID: string): Promise<GuildConfig>; // Not Implemented
    
    /**
     * Retrieves the axon config from the DB
     *
     * @returns AxonSchema Object or null
     *
     * @memberof ADBProvider
     */
    public fetchAxon(): Promise<AxonConfig | null>; // Not Implemented
    /**
     * Retrieves the Guild config for the specified guild.
     *
     * @param gID - Guild ID
     *
     * @memberof ADBProvider
     */
    public fetchGuild(gID: string): Promise<GuildConfig | null>; // Not Implemented
    
    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param key - The identifier in the Database
     * @param value - The value to update in the DB
     * @returns Whether the request was successful or not
     *
     * @memberof ADBProvider
     */
    public updateAxon(key: string, value: updateDBVal): Promise<boolean>; // Not Implemented
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
     * @memberof ADBProvider
     */
    public updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>; // Not Implemented
    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param data - the schema object to update
     * @returns Updated AxonConfig from the DB
     *
     * @memberof ADBProvider
     */
    public saveAxon(data: AxonConfig): Promise<AxonConfig | null>; // Not Implemented
    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param gID - Guild ID
     * @param data - The schema object to update
     * @returns Updated GuildConfig from the DB
     *
     * @memberof ADBProvider
     */
    public saveGuild(gID: string, data: GuildConfig): Promise<GuildConfig | null>; // Not Implemented

    public AxonConfig: new (...args: any) => AxonConfig;
    public GuildConfig: new (...args: any) => GuildConfig;
}
