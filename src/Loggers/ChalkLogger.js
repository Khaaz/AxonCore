import chalk from 'chalk';

import ALogger from './ALogger';

import Context from './Context';

/**
 * Logger with timestamps, custom methods and terminal colors with Chalk.
 *
 * @author KhaaZ
 *
 * @class ChalkLogger
 * @extends ALogger
 */
class ChalkLogger extends ALogger {
    constructor() {
        super(console);
    }

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected errors...
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    fatal(input, opt) {
        const mess = chalk.bold.magenta(`${this._parseTime()} - [ FATAL ] => ${Context.from(opt).get()}${input}`);
        this.out.error(mess);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    error(input, opt) {
        const mess = chalk.bold.red(`${this._parseTime()} - [ ERROR ] => `) + Context.from(opt).get() + input;
        this.out.error(mess);
    }

    /**
     * Warnings - expected errors
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    warn(input, opt) {
        const mess = chalk.bold.yellow(`${this._parseTime()} - [ WARN  ] => `) + Context.from(opt).get() + input;
        this.out.warn(mess);
    }

    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    debug(input, opt) {
        const mess = chalk.blue(`${this._parseTime()} - [ DEBUG ] => `) + Context.from(opt).get() + input;
        this.out.log(mess);
    }

    /**
     * Important information
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    notice(input, opt) {
        const mess = chalk.bold.green(`${this._parseTime()} - [NOTICE ] => ${Context.from(opt).get()}${input}`);
        this.out.log(mess);
    }

    /**
     * Default information
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    info(input, opt) {
        const mess = chalk.green(`${this._parseTime()} - [ INFO  ] => `) + Context.from(opt).get() + input;
        this.out.log(mess);
    }

    /**
     * Other logs - executed commands, etc...
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    verbose(input, opt) {
        const mess = chalk.white(`${this._parseTime()} - [VERBOSE] => `) + Context.from(opt).get() + input;
        this.out.log(mess);
    }
}

export default new ChalkLogger();
