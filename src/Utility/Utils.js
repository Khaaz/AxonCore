const regex = {
    userMention: /<@!?([0-9]+)>$/,
    roleMention: /<@&([0-9]+)>$/,
    channelMention: /<#([0-9]+)>$/,
    id: /^[0-9]+$/
};

const other = {};

/**
 * Ensures that all prop of obj1 exists in obj2.
 * Doesn't compare values. Exept if it an object, then it check for prop names again
 * @param {Object} obj1 Default config
 * @param {Object} obj2 Custom config (Config to compare with)
 */
const keyCompare = function compareObject(obj1, obj2) {
    for (const key in obj1) {
        if (obj2[key] == undefined) {
            return false;
        }
        if (typeof obj1[key] === 'object' && !(obj1[key] instanceof Array)) {
            if (!compareObject(obj1[key], obj2[key])) {
                return false;
            }
        }
    }
    return true;
};

export default {
    regex,
    other,
    keyCompare
};
