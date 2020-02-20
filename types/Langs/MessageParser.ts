
/**
 * Parse a message and replace custom variable with arguments
 *
 * @author KhaaZ
 *
 * @class MessageParser
 */
export declare class MessageParser {
    public match: RegExp;
    constructor();
    /**
 * Generator function that will match all occurrence of the regex and yield a Match structure
 *
 * @generator
 * @yields Match
 * @memberof MessageParser
 */
    public matchAll(message: string): Generator<RegExpExecArray, void, unknown>;
    /**
 * Parse the message by replacing the dynamic content.
 *
 * @param args - Custom object with all arguments that needs to be inserted in the string
 * @returns - The Parsed message
 * @memberof MessageParser
 */
    public parse(message: string, args: AxonLanguageResponse): string;
    /**
 * Same as above but arguments are unnamed and passed as parameters instead of inside one object.
 *
 * @returns The Parsed message
 * @memberof MessageParser
 */
    public parse2(message: string, args: string[] ): string;
}
