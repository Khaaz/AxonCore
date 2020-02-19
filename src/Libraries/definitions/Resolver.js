/* eslint-disable no-unused-vars */
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * Static Resolver class for AxonCore
 *
 * @author KhaaZ
 *
 * @static
 * @class Resolver
 */
class Resolver {
    /**
     * Resolve a user within all the users the bot has.
     *
     * @param {BotClient} client - The bot client
     * @param {Array<String>|String} args - Array of arguments resolved by the command.
     * @returns {User|null} The user object / Null if not found / Error
     * @memberof Resolver
     */
    static user(client, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a member within a guild.
     *
     * @param {Guild} guild - Object Guild resolved by the command.
     * @param {Array<String>|String} args - Array of arguments resolved by the command.
     * @returns {Member|null} The member object / Null if not found / Error
     * @memberof Resolver
     */
    static member(guild, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a role within a guild.
     *
     * @param {Guild} guild - Object Guild resolved by the command.
     * @param {Array<String>|String} args - Array of arguments resolved by the command.
     * @returns {Role|null} The role object / Null if not found / Error
     * @memberof Resolver
     */
    static role(guild, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a channel within a guild.
     *
     * @param {Guild} guild - Object Guild resolved by the command.
     * @param {Array<String>|String} args - Array of arguments resolved by the command.
     * @returns {Channel|null} The channel object / Null if not found / Error
     * @memberof Resolver
     */
    static channel(guild, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a guild within all guilds the bot is in.
     *
     * @param {BotClient} client - The bot client
     * @param {Array<String>} args - Array with guild name/ID
     * @returns {Guild|null} The guild object / Null if not found / Error
     * @memberof Resolver
     */
    static guild(client, args) {
        throw new NotImplementedException();
    }
}

export default Resolver;

