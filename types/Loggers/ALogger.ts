import { Context, LOGGER_TYPES } from '../';

/**
 * Abstract Logger, based to create all loggers used in AxonCore.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ALogger
 */
export declare class ALogger {
    /**
     * Can be Console, Winston or Signale. Chalk will go as Console
     */
    public out: unknown;
    /**
     * The Logger type.
     */
    public type: LOGGER_TYPES
    /**
     * Creates an instance of ALogger
     * @param out Can be Console, Winston or Signale. Chalk will go as Console
     * @memberof ALogger
     */
    constructor(out: unknown, type?: LOGGER_TYPES);
    /**
     * Major - Critical fault
     * Crashing bugs, unexpected errors...
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public fatal(input: string, opt?: Context): void;
    /**
     * Major - critical error
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public error(input: string, opt?: Context): void;
    /**
     * Warns - expected errors
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public warn(input: string, opt?: Context): void;
    /**
     * Eval - Debugging logs
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public debug(input: string, opt?: Context): void;
    /**
     * Important information
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public notice(input: string, opt?: Context): void;
    /**
     * Default information
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public info(input: string, opt?: Context): void;
    /**
     * Other Logging - executed commands, etc...
     *
     * @param opt - context object
     * @memberof ALogger
     */
    public verbose(input: string, opt?: Context): void;
    private _parseTime(): string;
}
