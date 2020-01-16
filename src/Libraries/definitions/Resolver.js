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
     * @param {Object<Client>} client - The bot client
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The user object / Null if not found / Error
     */
    static user(client, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a member within a guild.
     *
     * @param {Guild} guild - Object Guild resolved by the command.
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The member object / Null if not found / Error
     */
    static member(guild, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a role within a guild.
     *
     * @param {Guild} guild - Object Guild resolved by the command.
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The role object / Null if not found / Error
     */
    static role(guild, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a channel within a guild.
     *
     * @param {Guild} guild - Object Guild resolved by the command.
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The channel object / Null if not found / Error
     */
    static channel(guild, args) {
        throw new NotImplementedException();
    }

    /**
     * Resolve a guild within all guilds the bot is in.
     *
     * @param {Object<Client>} client - The bot client
     * @param {Array} args - Array with guild name/ID
     * @returns {Object|null} The guild object / Null if not found / Error
     */
    static guild(client, args) {
        throw new NotImplementedException();
    }
}

export default Resolver;

