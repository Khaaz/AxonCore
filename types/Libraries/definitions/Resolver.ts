import {
    LibClient, LibUser, LibGuild, LibMember, LibRole, LibChannel,
} from '../..';

/**
 * Static Resolver class for AxonCore
 *
 * @author KhaaZ
 *
 * @static
 * @class Resolver
 */
export declare class Resolver {
    /**
     * Resolve a user within all the users the bot has.
     *
     * @param client - The bot client
     * @param args - Array of arguments resolved by the command.
     * @returns The user object / Null if not found / Error
     * @memberof Resolver
     */
    static user(client: LibClient, args: string[]|string): LibUser|null; // Not implemented
    /**
     * Resolve a member within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The member object / Null if not found / Error
     * @memberof Resolver
     */
    static member(guild: LibGuild, args: string[]|string): LibMember|null; // Not implemented
    /**
     * Resolve a role within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The role object / Null if not found / Error
     * @memberof Resolver
     */
    static role(guild: LibGuild, args: string[]|string): LibRole|null; // Not implemented
    /**
     * Resolve a channel within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The channel object / Null if not found / Error
     * @memberof Resolver
     */
    static channel(guild: LibGuild, args: string[]|string): LibChannel|null; // Not implemented
    /**
     * Resolve a guild within all guilds the bot is in.
     *
     * @param client - The bot client
     * @param args - Array with guild name/ID
     * @returns The guild object / Null if not found / Error
     * @memberof Resolver
     */
    static guild(client: LibClient, args: string[] ): LibGuild|null; // Not implemented
}
