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
    constructor() {
        this.userMention = /<@!?([0-9]+)>$/;
        this.roleMention = /<@&([0-9]+)>$/;
        this.channelMention = /<#([0-9]+)>$/;
        this.id = /^[0-9]+$/;

        this.hexCode = /^#?([0-9A-Fa-f]{6})$/;
    }

    //
    // ****** CLIENT ******
    //

    /**
     * Split a content (String), according to correct linebreaks.
     * split at 1900 char
     *
     * @param {String} content
     * @returns {Array<String>/String} The array of content string splitted or the original String
     */
    splitMessage(content) {
        return content.match(/[\s\S]{1,1900}[\n\r]/g) || [];
    }


    /**
     * Returns the guild prefix of the given msg.
     *
     * @param {Object<AxonClient>} client - AxonClient
     * @param {Object} msg - Message object given at the command.
     * @returns {String} The prefix as string.
     */
    getPrefix(axon, msg) {
        return (msg.channel.guild && axon.guildConfigs.get(msg.channel.guild.id).prefix)[0] || axon.params.prefix[0];
    }

    /**
     * Sort a users roles
     *
     * @param {Array} array - The roles to sort
     * @returns {Array} sorted array
     */
    sortRoles(roles) {
        return roles.sort((a, b) => b.position - a.position);
    }

    //
    // ****** MISC ******
    //
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
     * Doesn't compare values. Exept if it is an object, then it check for property names again
     *
     * @param {Object} obj1 - Default config
     * @param {Object} obj2 - Custom config (Config to compare with)
     * @returns {Boolean} true: obj2 has at least all prop of obj1
     * @memberof Utils
     */
    compareObject(obj1, obj2) {
        for (const key in obj1) {
            if (obj2[key] == undefined) {
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

export default new Utils();
