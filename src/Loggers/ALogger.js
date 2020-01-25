import { format } from 'util';

import NoAbstractInstanceException from './../Errors/NoAbstractInstanceException';

import Context from './Context';

/**
 * Abstract Logger, based to create all loggers used in AxonCore.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ALogger
 */
class ALogger {
    constructor(out) {
        this.out = out;
        if (this.constructor === 'ALogger') {
            throw new NoAbstractInstanceException();
        }
    }

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected errors...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof DefLogger
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
     * @memberof DefLogger
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
     * @memberof DefLogger
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
     * @memberof DefLogger
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
     * @memberof DefLogger
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
     * @memberof DefLogger
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
     * @memberof DefLogger
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
