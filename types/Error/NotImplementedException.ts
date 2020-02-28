/**
 * Error thrown when a method not implemented (not overridden) is used.
 *
 * @author KhaaZ
 *
 * @class NotImplementedException
 * @extends Error
 */
export declare class NotImplementedException extends Error {
    constructor(...args: any[] );
    readonly name: string;
    readonly message: string;
}
