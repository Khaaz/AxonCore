import { format } from 'util';

import NoAbstractInstanceException from './../Errors/NoAbstractInstanceException';

import Context from './Context';

/**
 * @typedef {import('../Utility/Constants/AxonEnums').LOGGER_TYPES} LOGGER_TYPES
 */

/**
 * Abstract Logger, based to create all loggers used in AxonCore.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ALogger
 * @property {*} out - Can be Console, Winston or Signale. Chalk will go as Console
 * @property {LOGGER_TYPES} type - The logger type
 */
class ALogger {
    /**
     * Creates an instance of ALogger
     * @param out Can be Console, Winston or Signale. Chalk will go as Console
     * @param {LOGGER_TYPES} type - The logger type
     * @memberof ALogger
     */
    constructor(out, type = 0) {
        if (this.constructor === 'ALogger') {
            throw new NoAbstractInstanceException();
        }
        this.out = out;
        this.type = type;
    }

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected errors...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    fatal(input, opt) {
        const mess = `${this._parseTime()} - [ FATAL ] => ${Context.from(opt).get()}${input}`;
        this.out.error(mess);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    error(input, opt) {
        const mess = `${this._parseTime()} - [ ERROR ] => ${Context.from(opt).get()}${input}`;
        this.out.error(mess);
    }

    /**
     * Warns - expected errors
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    warn(input, opt) {
        const mess = `${this._parseTime()} - [ WARN  ] => ${Context.from(opt).get()}${input}`;
        this.out.warn(mess);
    }

    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    debug(input, opt) {
        const mess = `${this._parseTime()} - [ DEBUG ] => ${Context.from(opt).get()}${input}`;
        this.out.log(mess);
    }

    /**
     * Important information
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    notice(input, opt) {
        const mess = `${this._parseTime()} - [NOTICE ] => ${Context.from(opt).get()}${input}`;
        this.out.log(mess);
    }

    /**
     * Default information
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    info(input, opt) {
        const mess = `${this._parseTime()} - [ INFO  ] => ${Context.from(opt).get()}${input}`;
        this.out.log(mess);
    }

    /**
     * Other Logging - executed commands, etc...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof ALogger
     */
    verbose(input, opt) {
        const mess = `${this._parseTime()} - [VERBOSE] => ${Context.from(opt).get()}${input}`;
        this.out.log(mess);
    }

    _parseTime() {
        const current = new Date();
        const formatted = format('[ %s ]', `${current.getHours() < 10 ? `0${current.getHours()}` : current.getHours()}h`
            + `${current.getMinutes() < 10 ? `0${current.getMinutes()}` : current.getMinutes()}m`
            + `${current.getSeconds() < 10 ? `0${current.getSeconds()}` : current.getSeconds()}s`);
        return formatted;
    }
}

export default ALogger;
