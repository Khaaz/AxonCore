'use strict';

import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * A method to resolve the webhook to use.
 *
 * @param {String} type - The type of the webhook you need.
 * @param {String} [userID=this.user.id] - The user ID of the bot that you want to resolve the webhook for.
 * @returns {Object?} An object that contains an `id` and `token` property to use to execute the webhook. Or, undefined if the type is wrong.
 * @memberof AxonClient
 */
//const resolveWebhook = function(type, userID = this.user.id) {
//    if (userID === confToken.bot.stable.id) {
//        return confToken.stableWH[type];
//    } else if (userID === confToken.bot.dev.id) {
//        return confToken.devWH[type];
//    } else {
//        return confToken.selfhostWH[type];
//    }
//};

const readJson = async(path) => {
    try {
        const txt = await readFile(path);
        const conf = JSON.parse(txt);
        if (!conf) {
            throw new Error('Path incorrect');
        }
        return conf;
    } catch(err) {
        return Promise.reject(err);
    }
    
};

const writeJson = async(path, obj) => {
    try {
        const txt = JSON.stringify(obj);
        const res = await writeFile(path, txt);
        return res;
    } catch(err) {
        return err;
    }
    
};

export default {
    //resolveWebhook,
    readJson,
    writeJson
};
