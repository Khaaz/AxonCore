'use strict';

/**
 * Custom error with correct formatting and argument
 * Better error tracking
 * - Error thrown on a command error
 * 
 * @author KhaaZ
 * 
 * @class AxonCommandError
 * @extends {Error}
 */
class AxonCommandError extends Error {

    /**
     * Creates an instance of AxonCommandError.
     * 
     * @param {Object<Module>} module
     * @param {Object<Command>} command
     * @param {String} ctx - context (guild ID etc)
     * @param {Object<Error>} err - Discord Error (givin by eris/discord/other)
     * @memberof AxonCommandError
     */
    constructor(module, command, ctx, err) {
        super();

        this.module = module.toString();
        this.command = command.toString();

        const short =  `${this.name} => [${this.module}] - ${this.command}\n${ctx} : ${err.name ? err.name : ''}`;
        Object.defineProperty(this, 'short', {
            value: short,
            writable: false
        });

        Object.defineProperty(this, 'message', {
            value: short + ' | ' + err.message ? err.message : '',
            writable: false
        });

        if(err.stack) {
            Object.defineProperty(this, 'stack', {
                value: this.message + '\n' + err.stack,
                writable: false
            });
        }
    }

    get name() {
        return this.constructor.name;
    }
}

export default AxonCommandError;
