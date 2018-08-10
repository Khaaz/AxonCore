'use strict';

/**
 * Custom error with correct formatting and argument
 * Better error tracking
 * - Error thrown on a Client error (general error)
 *
 * @author KhaaZ
 *
 * @class AxonError
 * @extends {Error}
 */
class AxonError extends Error {
    /**
     * Creates an instance of AxonError.
     *
     * @param {String} message - custom message
     * @param {Object<Module>} module (optional)
     * @param {Object<Command>} command (optional)
     * @param {Object} err - error object (optional)
     * @memberof AxonError
     */
    constructor(message, module, command, err) {
        super();

        this.module = (typeof module === 'string') ? module : (module.toString() || null);
        this.command = (typeof command === 'string') ? command : (command.toString() || null);

        const short =  `${this.name} => `
            + (this.module ? `[${this.module}] ` : '')
            + (this.command ? `${this.command} ` : '')
            + ((err && err.name) ? `\n${err.name} - ` : '\n');

        Object.defineProperty(this, 'short', {
            value: short,
            writable: false,
        });

        Object.defineProperty(this, 'message', {
            value: short + message + ' | ' + (err ? (err.message || err.name || '') : ''),
            writable: false,
        });

        if (err && err.stack) {
            Object.defineProperty(this, 'stack', {
                value: this.message + '\n' + err.stack,
                writable: false,
            });
        }
    }

    get name() {
        return this.constructor.name;
    }
}

export default AxonError;
