
/**
 * Error thrown when an abstract class is instantiated.
 *
 * @author KhaaZ
 *
 * @class NoAbstractInstanceException
 * @extends Error
 */
export declare class NoAbstractInstanceException extends Error {
    constructor(...args: any[] );
    readonly name: string;
    readonly message: string;
}
