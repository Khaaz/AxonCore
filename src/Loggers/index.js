import DefLogger from './DefLogger';

/**
 * Logger Handler
 * Use require to dunamically load a Logger regarding dependencies
 * 
 * @author Eleos, KhaaZ
 *
 * @class LoggerHandler
 */
class LoggerHandler {

    static pickLogger(config) {
        let Logger;

        switch (config.logger) {
        
        // Default Logger
        case 0:
        default: {
            Logger = DefLogger;
            Logger.info('Logger: Default Logger.');
            break;
        }
        
        // Chalk logger
        case 1: {
            try {
                Logger = require('./ChalkLogger').default;
                Logger.info('Logger: Chalk Logger.');
            } catch (err) {
                Logger = DefLogger;
                Logger.warn('The specified logger is missing dependencies, the default logger will be used instead.');
                Logger.info('Logger: Default Logger.');
            }
            break;
        }

        // Signale Logger
        case 2: {
            try {
                Logger = require('./SignaleLogger').default;
                Logger.info('Logger: Signale Logger.');
            } catch (err) {
                Logger = DefLogger;
                Logger.warn('The specified logger is missing dependencies, the default logger will be used instead.');
                Logger.info('Logger: Default Logger.');
            }
            break;
        }
        }

        return Logger;
    }
}

export default LoggerHandler;
