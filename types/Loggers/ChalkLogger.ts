import { ALogger } from '../';

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
    public type: 1;
}
