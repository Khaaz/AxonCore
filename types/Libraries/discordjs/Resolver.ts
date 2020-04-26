/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Resolver } from '../definitions/Resolver';
// @ts-ignore
import * as djs from 'discord.js';

export declare class DjsResolver extends Resolver {
    /**
     * Resolve a user within all the users the bot has.
     *
     * @param client - The bot client
     * @param args - Array of arguments resolved by the command.
     * @returns The user object / Null if not found / Error
     * @memberof DjsResolver
     */
    static user(client: djs.Client, args: string | string[] ): djs.User;
    /**
     * Resolve a member within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The member object / Null if not found / Error
     * @memberof DjsResolver
     */
    static member(guild: djs.Guild, args: string | string[] ): djs.GuildMember;
    /**
     * Resolve a role within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The role object / Null if not found / Error
     * @memberof DjsResolver
     */
    static role(guild: djs.Guild, args: string | string[] ): djs.Role;
    /**
     * Resolve a channel within a guild.
     *
     * @param guild - Object Guild resolved by the command.
     * @param args - Array of arguments resolved by the command.
     * @returns The channel object / Null if not found / Error
     * @memberof DjsResolver
     */
    static channel(guild: djs.Guild, args: string | string[] ): djs.GuildChannel;
    /**
     * Resolve a guild within all guilds the bot is in.
     *
     * @param client - The bot client
     * @param args - Array with guild name/ID
     * @returns The guild object / Null if not found / Error
     * @memberof DjsResolver
     */
    static guild(client: djs.Client, args: string[] ): djs.Guild;
}
