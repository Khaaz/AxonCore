'use strict';

import Utils from './Utils';
// Error
import AxonError from '../Errors/AxonError';

const Util = new Utils();
/**
 * Resolver class for AxonClient
 *
 * @author KhaaZ
 *
 * @class Resolver
 */
class Resolver {
    /**
     * User resolver
     *
     * @param {Object<Eris.Client>} client - The bot client
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The user object / null if not found / error if error (incorect args)
     */
    static user(client, args) {
        // Checking if all the arguments are supplied.
        if (!args.length) {
            throw new AxonError('All the arguments are either not given or false.', 'Resolver', 'User');
        }
        // Checking if args is an array, if it is not, converting it to an array.
        if (!Array.isArray(args)) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const users = client.users;

        const mention = Util.userMention.exec(args[0]);

        const user = ((mention && mention[1]) && users.get(mention[1])) // User mention
            || (Util.id.test(args[0]) && users.get(args[0])) // User ID
            || (args.all.indexOf('#') > -1 && users.find(u => `${u.username}#${u.discriminator}` === args.all)) // Username + discrim
            || users.find(u => u.username === args.all) // Username
            || users.find(u => u.username.toLowerCase() === args.lower) // Username lowercase
            || users.find(u => u.username.includes(args.all)) // Username includes
            || users.find(u => u.username.toLowerCase().includes(args.lower)) // Username lowercase includes
            || null;// No users found

        return user; // Return the user object.
    }

    /**
     * Member resolver
     *
     * @param {Object<Guild>} guild - Object Guild resolved by the command.
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The member object / null if not found / error if error (incorect args)
     */
    static member(guild, args) {
        // Checking if all the arguments are supplied.
        if (!guild || !args.length) {
            throw new AxonError('All the arguments are either not given or false.', 'Resolver', 'Member');
        }
        // Checking if args is an array, if it is not, converting it to an array.
        if (!Array.isArray(args)) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const members = guild.members;

        const mention = Util.userMention.exec(args[0]);

        const member = ((mention && mention[1]) && members.get(mention[1])) // User mention
            || (Util.id.test(args[0]) && members.get(args[0])) // User ID
            || (args.all.indexOf('#') > -1 && members.find(m => `${m.username}#${m.discriminator}` === args.all)) // Username + discrim
            || members.find(m => m.username === args.all) // Username
            || members.find(m => m.nick === args.all) // nickname
            || members.find(m => m.username.toLowerCase() === args.lower) // Username lowercase
            || members.find(m => m.nick && m.nick.toLowerCase() === args.lower) // nickname lowercase
            // members.find(m => m.username.includes(args.all) ) || // Username includes
            // members.find(m => m.nick && m.nick.includes(args.all) ) || // nickname includes
            || members.find(m => m.username.toLowerCase().includes(args.lower)) // username lowercase includes
            || members.find(m => m.nick && m.nick.toLowerCase().includes(args.lower)) // nickname lowercase includes
            || null; // No member found

        return member; // Return the member object.
    }

    /**
     * Role resolver
     *
     * @param {Object<Guild>} guild - Object Guild resolved by the command.
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The role object / null if not found / error if error (incorect args)
     */
    static role(guild, args) {
        // Checking if all the arguments are supplied.
        if (!guild || !args.length) {
            throw new AxonError('All the arguments are either not given or false.', 'Resolver', 'Role');
        }

        // Checking if args is an array, if it is not, converting it to an array.
        if (!Array.isArray(args)) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const roles = guild.roles;

        const mention = Util.roleMention.exec(args[0]);

        const role = ((mention && mention[1]) && roles.get(mention[1]))  // mention
            || (Util.id.test(args[0]) && roles.get(args[0])) // id
            || roles.find(m => m.name === args.all) // name
            || roles.find(m => m.name.toLowerCase() === args.lower) // name lower
            || roles.find(m => m.name.includes(args.all)) // name includes
            || roles.find(m => m.name.toLowerCase().includes(args.lower)) // name loxer includes
            || null; // no role found

        return role;
    }

    /**
     * Channel resolver
     *
     * @param {Object<Guild>} guild - Object Guild resolved by the command.
     * @param {Array|String} args - Array of arguments resolved by the command.
     * @returns {Object|null} The channel object / null if not found / error if error (incorect args)
     */
    static channel(guild, args) {
        // Checking if all the arguments are supplied.
        if (!guild || !args.length) {
            throw new AxonError('All the arguments are either not given or false.', 'Resolver', 'Channel');
        }

        // Checking if args is an array, if it is not, converting it to an array.
        if (!Array.isArray(args)) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const channels = guild.channels;

        const mention = Util.channelMention.exec(args[0]);

        const channel = ((mention && mention[1]) && channels.get(mention[1]))
            || (Util.id.test(args[0]) && channels.get(args[0]))
            || channels.find(c => c.name === args.all) // name
            || channels.find(c => c.name.toLowerCase() === args.lower) // name lower
            || channels.find(c => c.name.includes(args.all)) // name includes
            || channels.find(c => c.name.toLowerCase().includes(args.lower)) // name lower includes
            || null; // no channel found

        return channel;
    }

    /**
     * Guild resolver
     *
     * @param {Array} args - Array with guild name/ID
     * @returns {Object|null} The guild object / null if not found / error if error (incorrect args)
     */
    static guild(args) {
        // Checking if all the arguments are supplied.
        if (!args.length) {
            throw new AxonError('All the arguments are either not given or false.', 'Resolver', 'Guild');
        }

        const guilds = this._client.guilds;
        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();

        const guild = (Util.id.test(args[0]) && guilds.find(g => g.id === args[0])) // ID
            || guilds.find(g => g.name === args.all) // Name
            || guilds.find(g => g.name.toLowerCase() === args.lower) // Lowercase name
            || guilds.find(g => g.name.includes(args.all)) // Includes name
            || guilds.find(g => g.name.toLowerCase().includes(args.lower)) // Includes lowercase name
            || null;

        return guild;
    }
}

export default Resolver;

