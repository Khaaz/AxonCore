/**
 * @typedef {{
 * ERR_BOT_PERM?: String, ERR_CALLER_PERM?: String, ERR_DESTINATION_PERM?: String,
 * ERR_COOLDOWN?: String, ERR_GENERAL?: String, [key: String]: String|undefined
 * }} AxonLanguageResponse
 */

/**
 * Parse a message and replace custom variable with arguments
 *
 * @author KhaaZ
 *
 * @class MessageParser
 */
class MessageParser {
    constructor() {
        // Another regex could be /{{(.*?)}}/g using non greedy (.*?)
        this.match = /{{([^}]+)}}/g;
    }

    /**
     * Generator function that will match all occurrence of the regex and yield a Match structure
     *
     * @generator
     * @param {String} message
     * @yields {Object} Match
     * @memberof MessageParser
     */
    *matchAll(message) {
        let res = this.match.exec(message);
        while (res !== null) {
            yield res;
            res = this.match.exec(message);
        }
    }

    /**
     * Parse the message by replacing the dynamic content.
     *
     * @param {String} message
     * @param {AxonLanguageResponse} args - Custom object with all arguments that needs to be inserted in the string
     * @returns {String} - The Parsed message
     * @memberof MessageParser
     */
    parse(message, args) {
        let parsedMessage = message;
        for (const match of this.matchAll(message) ) {
            const toChange = args[match[1].trim()];
            if (toChange) {
                parsedMessage = parsedMessage.replace(match[0], toChange);
            }
        }
        return parsedMessage;
    }

    /**
     * Same as above but arguments are unnamed and passed as parameters instead of inside one object.
     *
     * @param {String} message
     * @param {...String} args
     * @returns {String} - The Parsed message
     * @memberof MessageParser
     */
    parse2(message, ...args) {
        let parsedMessage = message;
        for (const match of message.match(this.match) ) {
            parsedMessage = parsedMessage.replace(match, args.shift() );
        }
        return parsedMessage;
    }
}

export default MessageParser;
