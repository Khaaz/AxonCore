'use strict';

import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

        this.userMention = /<@!?([0-9]+)>$/;
        this.roleMention = /<@&([0-9]+)>$/;
        this.channelMention = /<#([0-9]+)>$/;
        this.id = /^[0-9]+$/;

        this.hexCode = /^#?([0-9A-Fa-f]{6})$/;
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
    // ****** ROLES METHODS ******
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
        return member.roles.map(r => guild.roles.get(r));
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
        return roles.sort((a, b) => b.position - a.position);
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
        return new Promise((res) => setTimeout(() => res(), ms));
    }

    /** read file */
    async readJson(path) {
        try {
            const txt = await readFile(path);
            const conf = JSON.parse(txt);
            if (!conf) {
                throw new Error('Path incorrect');
            }
            return conf;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /** write file */
    async writeJson(path, obj) {
        try {
            const txt = JSON.stringify(obj);
            const res = await writeFile(path, txt);
            return res;
        } catch (err) {
            return err;
        }
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
            if (typeof obj1[key] === 'object' && !(obj1[key] instanceof Array)) {
                if (!this.compareObject(obj1[key], obj2[key])) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Utils;
