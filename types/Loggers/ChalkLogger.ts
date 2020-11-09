import { ALogger, LOGGER_TYPES } from '../';

/**
 * Logger with timestamps, custom methods and terminal colors with Chalk.
 *
 * @author KhaaZ
 *
 * @class ChalkLogger
 * @extends ALogger
 */
export declare class ChalkLogger extends ALogger {
    /** Console */
    public out: Console;
    public type: LOGGER_TYPES.CHALK;
}
