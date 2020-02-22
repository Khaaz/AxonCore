
/**
 * Logger Handler
 * Use require to dynamically load a Logger depending on installed dependencies.
 *
 * @author Eleos, KhaaZ
 *
 * @class LoggerSelector
 * @extends ASelector
 */
export declare class LoggerSelector extends ASelector {
    public select(axonConfig: AOptionsSettings): ChalkLogger | DefLogger | SignaleLogger;
    static testLogger(Logger: ALogger): void;
}
