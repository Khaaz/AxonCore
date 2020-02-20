
/**
 * A schema designed use an InMemory solution in AxonCore
 *
 * @author VoidNull
 *
 * @class InMemoryProvider
 * @extends ADBProvider
 */
export declare class InMemoryProvider extends ADBProvider {
    public fetchAxon(): Promise<AxonConfig>;
    public init(): void;
    /**
     * @param gID Guild ID
     */
    public fetchGuild(gID: string): Promise<GuildConfig>;

    initAxon(): Promise<AxonConfig>;
    /**
     * @param gID Guild ID
     */
    initGuild(gID: string): Promise<GuildConfig>;

    /**
     * Update the blacklist user list
     * @param blacklistedUsers Array of blacklisted user IDs
     */
    updateBlacklistUser(blacklistedUsers: string[] ): Promise<AxonConfig>;
    /**
     * Update the blacklist guild list
     * @param blacklistedGuilds Array of blacklisted guild IDs
     */
    updateBlacklistGuild(blacklistedGuilds: string[] ): Promise<AxonConfig>;
    /**
     * Update a guild's prefix
     * @param gID Guild ID
     * @param prefixArr Array of prefixes
     * @returns Whether the request was successful or not
     */
    updateGuildPrefix(gID: string, prefixArr: string[] ): Promise<boolean>;
    /**
     * Update list of disabled modules
     * @param gID Guild ID
     * @param modulesArr Array of disabled modules
     * @returns Whether the request was successful or not
     */
    updateModule(gID: string, modulesArr: string[] ): Promise<boolean>;
    /**
     * Update list of disabled commands
     * @param gID Guild ID
     * @param commandArr Array of disabled commands
     * @returns Whether the request was successful or not
     */
    updateCommand(gID: string, commandArr: string[] ): Promise<boolean>;
    /**
     * Update list of disabled events
     * @param gID Guild ID
     * @param eventArr Array of disabled events
     * @returns Whether the request was successful or not
     */
    updateEvent(gID: string, eventArr: string[] ): Promise<boolean>;
    
    saveAxon(axonSchema: AxonConfig): Promise<AxonConfig>;
    saveGuild(gID: string, guildSchema: GuildConfig): Promise<GuildConfig>;

    /**
     * Update Axon config
     * @param key Value to update
     * @param value What the value should be updated to
     * @returns Whether the request was successful or not
     */
    public updateAxon(key: 'id' | 'prefix', value: string): Promise<boolean>;
    public updateAxon(key: 'createdAt' | 'updatedAt', value: Date): Promise<boolean>;
    public updateAxon(key: 'bannedUsers' | 'bannedGuilds', value: string[] ): Promise<boolean>;

    /**
     * Update guild config
     * @param key Value to update
     * @param gID Guild ID
     * @param value What the value should be updated to
     * @return Whether the request was successful or not
     */
    updateGuild(key: 'prefixes' | 'ignoredUsers' | 'ignoredRoles' | 'ignoredChannels' | 'modRoles' | 'modUsers', gID: string, value: string[] ): Promise<boolean>;
    updateGuild(key: 'createdAt' | 'updatedAt', gID: string, value: Date): Promise<boolean>;
    updateGuild(key: 'modules', gID: string, value: Module[] ): Promise<boolean>;
    updateGuild(key: 'commands', gID: string, value: Command[] ): Promise<boolean>;
    updateGuild(key: 'listeners', gID: string, value: Listener[] ): Promise<boolean>;
    updateGuild(key: 'modOnly', gID: string, value: boolean): Promise<boolean>;
}
