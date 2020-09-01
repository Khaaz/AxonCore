/**
 * Handles bitwise enums
 *
 * @author VoidNulll
 *
 * @class BitwiseHandler
 *
 * @prop {Object} enums - Enums to handle
 */
export declare class BitwiseHandler {
    public enums: object;

    /**
     * @constructor
     * @param {Object} enums The enums that will be handled.
     */
    constructor(enums: object);

    /**
     * See if the bits contain a specific enum
     * @param {string} enumName Name of enum to check for
     * @param {number} bits Current bits
     * @param {boolean} negative Whether or not to inverse the output
     * @returns Whether or not the bits include a specific enum
     */
    has(enumName: string, bits: number, negative?: boolean): boolean;

    /**
     * Turn the bits into an array of enums
     * @param {number} bits Bits to calculate for
     * @param {boolean} [negative] Whether or not to see what enums the bits do not contain
     * @returns Array of enums as strings
     */
    hasArray(bits: number, negative?: boolean): string[];

    /**
     * Add the bits for an enum to the current bits
     * @param {number} bits Bits to add to
     * @param {string} enumName Enum to add
     * @returns Number of bits
     */
    add(bits: number, enumName: string): number;

    /**
     * Remove the bits of an enum from the current bits
     * @param {number} bits Bits to remove from
     * @param {string} enumName Enum to remove
     * @returns Number of bits
     */
    remove(bits: number, enumName: string): number;

    /**
     * Turn bits into a JSON of enum keys and boolean values
     * @param {number} bits Bits to turn into JSON entries
     * @param {boolean} [negative] Whether or not to reverse the checks
     * @returns {Object} JSON object showing what enums bits do or do not have
     */
    json(bits: number, negative?: boolean): object;

    /**
     * Turn JSON enums to bits
     * @param {Object} json JSON object to turn into bits
     * @returns {Object} Object of enums true and false
     */
    fromJSON(json: object): object;
}
