/**
 * Handles bitwise enums
 *
 * @author VoidNulll
 *
 * @class BitwiseHandler
 */
export declare class BitwiseHandler {
    public enums: object;

    /**
     * @constructor
     * @param enums The enums that will be handled.
     */
    constructor(enums: object);

    /**
     * See if the bits contain a specific enum
     * @param enumName Name of enum to check for
     * @param bits Current bits
     * @param negative Whether or not to inverse the output
     * @returns Whether or not the bits include a specific enum
     */
    has(enumName: string, bits: number, negative?: boolean): boolean;

    /**
     * Turn the bits into an array of enums
     * @param bits Bits to calculate for
     * @param negative Whether or not to see what enums the bits do not contain
     * @returns Array of enums as strings
     */
    hasArray(bits: number, negative?: boolean): string[];

    /**
     * Add the bits for an enum to the current bits
     * @param bits Bits to add to
     * @param enumName Enum to add
     * @returns Number of bits
     */
    add(bits: number, enumName: string): number;

    /**
     * Remove the bits of an enum from the current bits
     * @param bits Bits to remove from
     * @param enumName Enum to remove
     * @returns Number of bits
     */
    remove(bits: number, enumName: string): number;

    /**
     * Turn bits into a JSON of enum keys and boolean values
     * @param bits Bits to turn into JSON entries
     * @negative  Whether or not to reverse the checks
     * @returns JSON object showing what enums bits do or do not have
     */
    json(bits: number, negative?: boolean): object;

    /**
     * Turn JSON enums to bits
     * @param json JSON object to turn into bits
     * @returns Object of enums true and false
     */
    fromJSON(json: object): object;
}
