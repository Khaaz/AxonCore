import {
    ADBProvider, AxonConfig, GuildConfig, Module, Command, Listener,
} from '..';

/**
 * A schema designed use an InMemory solution in AxonCore
 *
 * @author VoidNull
 *
 * @class InMemoryProvider
 * @extends ADBProvider
 */
export declare class InMemoryProvider extends ADBProvider {
    public init(): void;
    public fetchAxon(): Promise<AxonConfig>;
    /**
     * @param gID Guild ID
     */
    public fetchGuild(gID: string): Promise<GuildConfig>;

    initAxon(): Promise<AxonConfig>;
    /**
     * @param gID Guild ID
     */
    initGuild(gID: string): Promise<GuildConfig>;
    
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
