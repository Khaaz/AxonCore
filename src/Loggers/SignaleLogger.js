import { Signale } from 'signale';
import figures from 'figures';

import ALogger from './ALogger';
import Context from './Context';

/**
 * @typedef {import('signale').SignaleOptions} SignaleOptions
 */

const logOptions = {
    types: {
        verbose: {
            badge: figures.info,
            label: 'verbose',
            color: 'gray',
        },
    },
};

/**
 * A different Logger that uses Signale to format console output. See DefLogger for documentation.
 * https://github.com/klauscfhq/signale
 *
 * @author KhaaZ, Eleos
 *
 * @class SignaleLogger
 * @extends ALogger
 */
class SignaleLogger extends ALogger {
    constructor() {
        super(new Signale(logOptions), 2);

        this.out.config( {
            displayTimestamp: true,
        } );
    }

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected errors...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    fatal(input, opt) {
        this.out.fatal(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    error(input, opt) {
        this.out.error(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Warns - expected errors
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    warn(input, opt) {
        this.out.warn(`${Context.from(opt).get()}${input}`);
    }
    
    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    debug(input, opt) {
        this.out.debug(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Important information
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    notice(input, opt) {
        this.out.note(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Default information
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    info(input, opt) {
        this.out.info(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Other Logging - executed commands, etc...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof SignaleLogger
     */
    verbose(input, opt) {
        this.out.verbose(`${Context.from(opt).get()}${input}`);
    }
}

export default new SignaleLogger();
