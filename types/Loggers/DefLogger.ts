import { ALogger } from '../';

/**
 * Default Logger with timestamps and custom methods. Doesn't use any dependencies.
 *
 * @author KhaaZ
 *
 * @class DefLogger
 * @extends ALogger
 */
export declare class DefLogger extends ALogger {
    /** Console */
    public out: Console;
    public type: 0;
}
