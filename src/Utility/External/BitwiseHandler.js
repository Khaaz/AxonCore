/**
 * Handles bitwise enums
 *
 * @author VoidNulll
 *
 * @class BitwiseHandler
 *
 * @prop {Object} enums - Enums to handle
 */
export default class BitwiseHandler {
    /**
     * @constructor
     * @param {Object} enums The enums that will be handled.
     */
    constructor(enums) {
        this.enums = enums;
    }

    /**
     * See if the bits contain a specific enum
     * @param {string} enumName Name of enum to check for
     * @param {number} bits Current bits
     * @param {boolean} [negative] Whether or not to inverse the output
     * @returns Whether or not the bits include a specific enum
     */
    has(enumName, bits, negative) {
        const hasEnum = !!(bits & this.enums[enumName] );
        return (negative && !hasEnum) || (!negative && hasEnum);
    }

    /**
     * Turn the bits into an array of enums
     * @param {number} bits Bits to calculate for
     * @param {boolean} [negative] Whether or not to see what enums the bits do not contain
     * @returns Array of enums as strings
     */
    hasArray(bits, negative) {
        const enums = Object.keys(this.enums).filter(key => (negative && !(bits & this.enums[key] ) ) || (!negative && (bits & this.enums[key] ) ) );
        return enums;
    }

    /**
     * Add the bits for an enum to the current bits
     * @param {number} bits Bits to add to
     * @param {string} enumName Enum to add
     * @returns Number of bits
     */
    add(bits, enumName) {
        return bits | this.enums[enumName];
    }

    /**
     * Remove the bits of an enum from the current bits
     * @param {number} bits Bits to remove from
     * @param {string} enumName Enum to remove
     * @returns Number of bits
     */
    remove(bits, enumName) {
        return bits ^ this.enums[enumName];
    }

    /**
     * Turn bits into a JSON of enum keys and boolean values
     * @param {number} bits Bits to turn into JSON entries
     * @param {boolean} [negative] Whether or not to reverse the checks
     * @returns {Object} JSON object showing what enums bits do or do not have
     */
    json(bits, negative) {
        const enums = {};
        for (const [key, value] of Object.entries(this.enums) ) {
            if (!negative) {
                enums[key] = !!(bits & value);
            } else {
                enums[key] = !(bits & value);
            }
        }
        return enums;
    }

    /**
     * Turn JSON enums to bits
     * @param {Object} json JSON object to turn into bits
     * @returns {Object} Object of enums true and false
     */
    fromJSON(json) {
        const bits = { has: 0, hasNot: 0 };
        const { enums } = this;
        Object.entries(json).forEach( ( [key, value] ) => {
            if (value && enums[key] ) {
                bits.has |= enums[key];
            } else if (!value && enums[key] ) {
                bits.hasNot |= enums[key];
            }
        } );
        return bits;
    }
}
