
/**
 * Default AxonConfig data structure used in AxonCore.
 * This class can be extended and changed as you want.
 * All methods flagged with "is used internally" can be overridden but need to keep the same name.
 *
 * @author KhaaZ
 *
 * @class AxonConfig
 */
export declare class AxonConfig implements AxonConfigRaw {
    private _axon: AxonClient;

    public id: string;
    public prefix: string;

    public createdAt: Date;
    public updatedAt: Date;

    public bannedUsers: string[];
    public bannedGuilds: string[];

    /**
     * Creates an instance of AxonConfig.
     *
     * @param values DB values for the current Guild
     *
     * @memberof AxonConfig
     */
    constructor(axon: AxonClient, values: AConfig);

    /**
     * Whether the user is blacklisted or not
     *
     * *used internally*
     * @memberof AxonConfig
     */
    public isBlacklistedUser(userID: string): boolean;
    /**
     * Whether the guild is blacklisted or not
     *
     * *used internally*
     * @memberof AxonConfig
     */
    public isBlacklistedGuild(guildID: string): boolean;
    /**
     * Updates the state of a blacklisted user.
     *
     * *not used internally*
     *
     * @param userID - The guild ID
     * @param boolean - Whether to add (true) the user or remove (false) it.
     * @returns Updated axonConfig / Error
     * @memberof AxonConfig
     */
    public updateBlacklistUser(userID: string, boolean: boolean): Promise<AxonConfig|null>;
    /**
     * Updates the state of a blacklisted guild.
     *
     * *not used internally*
     *
     * @param guildID - The guild ID
     * @param boolean - Whether to add (true) the guild or remove (false) it.
     * @returns Updated axonConfig / Error
     * @memberof AxonConfig
     */
    public updateBlacklistGuild(guildID: string, boolean: boolean): Promise<AxonConfig|null>;
    private _req(key: string, value: updateDBVal): Promise<AxonConfig|null>;
}
