import ALogger from './ALogger';

/**
 * Default Logger with timestamps and custom methods. Doesn't use any dependencies.
 *
 * @author KhaaZ
 *
 * @class DefLogger
 * @extends ALogger
 */
class DefLogger extends ALogger {
    constructor() {
        super(console, 0);
    }
}

export default new DefLogger();
