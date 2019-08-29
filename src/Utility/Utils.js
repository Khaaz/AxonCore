import fs from 'fs';
import util from 'util';

import AxonError from '../Errors/AxonError';

import { PERMISSIONS_NUMBERS } from './Constants/DiscordEnums';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const USER_MENTION = /<@!?([0-9]+)>$/;
const ROLE_MENTION = /<@&([0-9]+)>$/;
const CHANNEL_MENTION = /<#([0-9]+)>$/;
const ID = /^[0-9]+$/;
const HEX_CODE = /^#?([0-9A-Fa-f]{6})$/;

/**
 * General Utility Class for AxonCore
 * All methods useful and usable everywhere
 *
 * @author KhaaZ
 *
 * @class Utils
 *
 * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
 * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.botClient]
 *
 * @prop {RegExp} userMention - Regular Expression to match a userMention
 * @prop {RegExp} roleMention - Regular Expression to match a roleMention
 * @prop {RegExp} channelMention - Regular Expression to match a channelMention
 * @prop {RegExp} id - Regular Expression to match an id
 * @prop {RegExp} hexCode - Regular Expression to match an hexCode
 */
class Utils {
    /**
     * Creates an instance of Utils.
     *
     * @param {Object<AxonClient>} client
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

    /**
     * Returns the UserMention regex
     *
     * @readonly
     * @static
     * @type {RegExp}
     * @memberof Utils
     */
    static get userMention() {
        return USER_MENTION;
    }

    /**
     * Returns the RoleMention regex
     *
     * @readonly
     * @static
     * @type {RegExp}
     * @memberof Utils
     */
    static get roleMention() {
        return ROLE_MENTION;
    }

    /**
     * Returns the ChannelMention regex
     *
     * @readonly
     * @static
     * @type {RegExp}
     * @memberof Utils
     */
    static get channelMention() {
        return CHANNEL_MENTION;
    }

    /**
     * Returns the ID regex
     *
     * @readonly
     * @static
     * @type {RegExp}
     * @memberof Utils
     */
    static get id() {
        return ID;
    }

    /**
     * Return the HexCode regex
     *
     * @readonly
     * @static
     * @type {RegExp}
     * @memberof Utils
     */
    static get hexCode() {
        return HEX_CODE;
    }

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {Object<AxonClient>}
     * @memberof Utils
     */
    get axon() {
        return this._axon;
    }

    /**
     * Returns the BotClient instance
     *
     * @readonly
     * @type {Object<BotClient>}
     * @memberof Utils
     */
    get bot() {
        return this._axon.botClient;
    }

    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @type {Object<LibraryInterface>}
     * @memberof Utils
     */
    get library() {
        return this._axon.library;
    }

    // **** CLIENT **** //

    /**
     * Split the given content (String), according to correct linebreaks.
     * Split at 1900 characters.
     *
     * @param {String} content
     * @returns {Array<String>|String} The array of content string splitted or the original String
     *
     * @memberof Utils
     */
    splitMessage(content) {
        return content.match(/[\s\S]{1,1900}[\n\r]/g) || [];
    }

    /**
     * Returns the guild prefix of the given msg.
     *
     * @param {Object} msg - Message object given at the command.
     * @returns {String} The prefix as string.
     *
     * @memberof Utils
     */
    async getPrefix(msg) {
        const guildID = this.library.message.getGuildID(msg);
        const guildConfig = guildID ? await this.axon.guildConfigs.getOrFetch(guildID) : null;
        return guildConfig ? guildConfig.getPrefixes()[0] : this.axon.settings.prefixes[0];
    }

    // **** ROLES **** //

    /**
     * Get an array of role objects from a member.
     *
     * @param {Object<Guild>} guild
     * @param {Object<Member>} member
     * @returns {Array<Role>} Array of roles object
     *
     * @memberof Utils
     */
    getRoles(guild, member) {
        if (!member) {
            member = this.library.client.getMember(guild);
        }
        return this.library.member.getRolesObject(member);
    }

    /**
     * Get highest role of the given member.
     *
     * @param {Object<Guild>} guild
     * @param {Object<Member>} member
     * @returns {Object<Role>} Role Object
     *
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
     *
     * @memberof Utils
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
     *
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
     *
     * @memberof Utils
     */
    isHigherRole(guild, first, second) {
        const role1 = this.getHighestRole(guild, first);
        const role2 = this.getHighestRole(guild, second);
        return this.isRoleHigher(role1, role2);
    }

    // **** PERMISSIONS **** //

    /**
     * Check if the member has correct permissions to execute
     *
     * @param {Object<Member>} member - Member object
     * @param {Array<String>} permissions - List of permissions to test
     * @returns {Boolean} hether the member has permissions or not
     *
     * @memberof Utils
     */
    hasPerms(member, permissions = [] ) {
        for (const perm of permissions) {
            if (!this.library.member.hasPermission(member, perm) ) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if the given user has correct permissions to execute in the specific channel.
     *
     * @param {Object<Channel>} channel - Channel object
     * @param {Array<String>} permissions - List of permissions to test
     * @param {Object<User>} [user=this.bot.user] - User to test
     * @returns {Boolean} Whether the member has permissions or not
     *
     * @memberof Utils
     */
    hasChannelPerms(channel, permissions, user = this.bot.user) {
        for (const perm of permissions) {
            if (!this.library.channel.hasPermission(channel, user, perm) ) {
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
     *
     * @memberof Utils
     */
    missingPerms(member, permissions = [] ) {
        const missing = [];
        for (const perm of permissions) {
            if (!this.library.member.hasPermission(member, perm) ) {
                missing.push(perm);
            }
        }
        return missing;
    }

    /**
     * Calculate permissions using a object of perms
     *
     * @param {Object} data - The permissions to calculate for
     * @returns {Object} Object containing the perms denied & allowed
     *
     * @memberof Utils
     */
    calculatePerms(data) {
        let allow = 0;
        let deny = 0;
        for (const key of Object.keys(data) ) {
            if (!PERMISSIONS_NUMBERS[key] ) {
                throw new AxonError(`Key ${key} not found!`, 'Utils');
            }
            if (data[key] === true) {
                allow = Math.round(allow + PERMISSIONS_NUMBERS[key] );
            } else if (data[key] === false) {
                deny = Math.round(deny + PERMISSIONS_NUMBERS[key] );
            }
            if (key === 'all') {
                if (data[key] === true) {
                    allow = PERMISSIONS_NUMBERS[key];
                    break;
                } else if (data[key] === false) {
                    deny = PERMISSIONS_NUMBERS[key];
                    break;
                }
            }
        }
        return { allow, deny };
    }

    // **** GENERAL **** //

    /**
     * Wait for a specified amount of miliseconds..
     *
     * @param {Number} ms
     * @returns {Promise} resolve after the delay is passed
     * @memberof Utils
     */
    sleep(ms) {
        return new Promise( (res) => setTimeout( () => res(), ms) );
    }

    /**
     * Promisified readFile method
     *
     * @param {String} path
     * @returns {Promise<String>} content
     *
     * @memberof Utils
     */
    readFileAsync(path) {
        return readFile(path);
    }

    /**
     * Promisified writeFile method
     *
     * @param {String} path
     * @param {String} content
     * @returns {Promise}
     *
     * @memberof Utils
     */
    writeFileAsync(path, content) {
        return writeFile(path, content);
    }

    /**
     * Ensures that all property names of obj1 exists in obj2.
     * Doesn't compare values. Exept if it is an object, then it checks for property names recursively.
     *
     * @param {Object} obj1 - Default config/object
     * @param {Object} obj2 - Custom config/Object (Config/Object to compare with)
     * @returns {Boolean} True: obj2 has at least all prop of obj1
     *
     * @memberof Utils
     */
    static compareObject(obj1, obj2) {
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

// message.member.roles.map(roles => roles).slice(1).sort((a, b) => b.position - a.position).join(", ");
