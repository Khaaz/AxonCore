import fs from 'fs';
import util from 'util';
import AxonError from '../Errors/AxonError';
import { permissionNumbers } from './Enums';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const USER_MENTION = /<@!?([0-9]+)>$/;
const ROLE_MENTION = /<@&([0-9]+)>$/;
const CHANNEL_MENTION = /<#([0-9]+)>$/;
const ID = /^[0-9]+$/;
const HEX_CODE = /^#?([0-9A-Fa-f]{6})$/;

/**
 * General Utility Class for AxonCore
 *
 * All methods useful and usable everywhere
 *
 * @author KhaaZ
 *
 * @class Utils
 */
class Utils {
    /**
     * Creates an Utils instance.
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     *
     * @prop {RegExp} userMention - Regular Expression to match a userMention
     * @prop {RegExp} roleMention - Regular Expression to match a roleMention
     * @prop {RegExp} channelMention - Regular Expression to match a channelMention
     * @prop {RegExp} id - Regular Expression to match an id
     * @prop {RegExp} hexCode - Regular Expression to match an hexCode
     *
     * @memberof Utils
     */
    constructor(client) {
        this._axon = client;

        this.userMention = USER_MENTION;
        this.roleMention = ROLE_MENTION;
        this.channelMention = CHANNEL_MENTION;
        this.id = ID;

        this.hexCode = HEX_CODE;
    }

    // Static getters
    static get userMention() {
        return USER_MENTION;
    }

    static get roleMention() {
        return ROLE_MENTION;
    }

    static get channelMention() {
        return CHANNEL_MENTION;
    }

    static get id() {
        return ID;
    }

    static get hexCode() {
        return HEX_CODE;
    }

    get axon() {
        return this._axon;
    }

    get bot() {
        return this._axon.client;
    }

    //
    // ****** CLIENT ******
    //

    /**
     * Split the given content (String), according to correct linebreaks.
     * Split at 1900 characters.
     *
     * @param {String} content
     * @returns {Array<String>|String} The array of content string splitted or the original String
     */
    splitMessage(content) {
        return content.match(/[\s\S]{1,1900}[\n\r]/g) || [];
    }

    /**
     * Returns the guild prefix of the given msg.
     *
     * @param {Object} msg - Message object given at the command.
     * @returns {String} The prefix as string.
     */
    getPrefix(msg) {
        return (msg.channel.guild && this.axon.guildConfigs.get(msg.channel.guild.id).prefix)[0] || this.axon.params.prefix[0];
    }

    //
    // ****** ROLES ******
    //

    /**
     * Get an array of role objects from a member.
     *
     * @param {Object<Guild>} guild
     * @param {Object<Member>} member
     * @returns {Array<Role>} Array of roles object
     * @memberof Utils
     */
    getRoles(guild, member) {
        if (!member) {
            member = guild.members.get(this.axon.client.id);
        }
        return member.roles.map(r => guild.roles.get(r) );
    }

    /**
     * Get highest role of the given member.
     *
     * @param {Object<Guild>} guild
     * @param {Object<Member>} member
     * @returns {Object<Role>} Role Object
     * @memberof Utils
     */
    getHighestRole(guild, member) {
        const roles = this.getRoles(guild, member);
        return this.sortRoles(roles)[0];
    }

    /**
     * Sort a users roles from highest role to lowest role.
     *
     * @param {Array<Role>} array - The roles to sort
     * @returns {Array<Role>} Sorted array (per position) of Role Object
     */
    sortRoles(roles) {
        return roles.sort( (a, b) => b.position - a.position);
    }

    /**
     * Check if the first role is higher than the other.
     *
     * @param {Object<Role>} role1
     * @param {Object<Role>} role2
     * @returns {Boolean}
     * @memberof Utils
     */
    isRoleHigher(role1, role2) {
        if (!role1) {
            return false;
        }

        if (role1 && !role2) {
            return true;
        }

        return role1.position > role2.position;
    }

    /**
     * Check if the highest role of first is higher than the highest role of second
     *
     * @param {Object<Guild>} guild
     * @param {Object<Member>} first
     * @param {Object<Member>} second
     * @returns {Boolean}
     * @memberof Utils
     */
    isHigherRole(guild, first, second) {
        const role1 = this.getHighestRole(guild, first);
        const role2 = this.getHighestRole(guild, second);
        return this.isRoleHigher(role1, role2);
    }

    // ****** PERMISSIONS ******

    /**
     * Check if the member has correct perm to execute
     *
     * @param {Object<Member>} member - Member object
     * @param {Array<String>} permissions - List of permissions to test
     * @returns {Boolean} True if member has permissions / False if not
     * @memberof AxonUtils
     */
    hasPerms(member, permissions = [] ) {
        for (const perm of permissions) {
            if (!member.permission.has(perm) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if the given user has correct permissions in targeted channel.
     *
     * @param {Object<Channel>} channel - Channel object
     * @param {Array<String>} permissions - List of permissions to test
     * @param {Object<User>} [user=this.bot.user] - User to test
     * @returns {Boolean} True if user has permissions / False if not
     * @memberof AxonUtils
     */
    hasChannelPerms(channel, permissions, user = this.bot.user) {
        for (const perm of permissions) {
            if (!channel.permissionsOf(user.id).has(perm) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * List all missing permissions of the given user.
     *
     * @param {Object<Member>} member
     * @param {Array<String>} [permissions=[]] - List of permissions to test
     * @returns {Array<String>} An array of missing permissions
     * @memberof AxonUtils
     */
    missingPerms(member, permissions = [] ) {
        const missing = [];
        for (const perm of permissions) {
            if (!member.permission.has(perm) ) {
                missing.push(perm);
            }
        }
        return missing;
    }

    /**
     * Calculate permissions using a object of perms
     *
     * @param {Object} data The permissions to calculate for
     *
     *  @returns {Object} Object containing the perms denied & allowed
     */
    calculatePerms(data) {
        let allow = 0;
        let deny = 0;
        for (const key of Object.keys(data) ) {
            if (!permissionNumbers[key] ) throw new AxonError(`Key ${key} not found!`, 'Enums');
            if (data[key] === true) {
                allow = Math.round(allow + permissionNumbers[key] );
            } else if (data[key] === false) {
                deny = Math.round(deny + permissionNumbers[key] );
            }
            if (key === 'all') {
                if (data[key] === true) {
                    allow = permissionNumbers[key];
                    break;
                } else if (data[key] === false) {
                    deny = permissionNumbers[key];
                    break;
                }
            }
        }
        return { allow, deny };
    }

    //
    // ****** GENERAL ******
    //

    /**
     * Wait.
     *
     * @param {Number} ms
     * @returns {Promise} resolve after the delay is passed
     * @memberof AxonUtils
     */
    sleep(ms) {
        return new Promise( (res) => setTimeout( () => res(), ms) );
    }

    /**
     * Promisified readFile method
     *
     * @param {String} path
     * @returns {Promise<String>} content
     */
    readFile(path) {
        return readFile(path);
    }

    /**
     * Promisified writeFile method
     *
     * @param {String} path
     * @param {String} content
     * @returns {Promise}
     */
    writeFile(path, content) {
        return writeFile(path, content);
    }

    /**
     * Ensures that all property names of obj1 exists in obj2.
     * Doesn't compare values. Exept if it is an object, then it checks for property names recursively
     *
     * @param {Object} obj1 - Default config/object
     * @param {Object} obj2 - Custom config/Object (Config/Object to compare with)
     * @returns {Boolean} True: obj2 has at least all prop of obj1
     * @memberof Utils
     */
    compareObject(obj1, obj2) {
        for (const key in obj1) {
            if (obj2[key] === undefined) {
                return false;
            }
            if (typeof obj1[key] === 'object' && !(obj1[key] instanceof Array) ) {
                if (!this.compareObject(obj1[key], obj2[key] ) ) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Utils;
