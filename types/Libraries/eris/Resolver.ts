
/**
 * Static Resolver class for Eris.AxonCore
 *
 * @author KhaaZ
 *
 * @static
 * @class ErisResolver
 */
export declare class ErisResolver extends Resolver {
    /**
     * Resolve a user within all the users the bot has.
     *
     * @param client - The bot client
     * @param args - Array of arguments resolved by the command.
     * @returns The user object / Null if not found / Error
     * @memberof ErisResolver
     */
    static user(client: Eris.Client, args: string | string[] ): Eris.User | null;
    /**
     * Resolve a member within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The member object / Null if not found / Error
     * @memberof ErisResolver
     */
    static member(guild: Eris.Guild, args: string | string[] ): Eris.Member | null;
    /**
     * Resolve a role within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The role object / Null if not found / Error
     * @memberof ErisResolver
     */
    static role(guild: Eris.Guild, args: string | string[] ): Eris.Role | null;
    /**
     * Resolve a channel within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The channel object / Null if not found / Error
     * @memberof ErisResolver
     */
    static channel(guild: Eris.Guild, args: string | string[] ): Eris.GuildChannel;
    /**
     * Resolve a guild within all guilds the bot is in.
     *
     * @param client - The bot client
     * @param args - Array with guild name/ID
     * @returns The guild object / Null if not found / Error
     * @memberof ErisResolver
     */
    static guild(client: Eris.Client, args: string[] ): Eris.Guild;
}
