import DefLogger from './DefLogger';

class LoggerHandler {
    static pickLogger(config) {
        let Logger;

        switch (config.logger) {
        // Default Logger
        case 0:
        default: {
            Logger = DefLogger;
            break;
        }
            
        // Signale Logger
        case 1: {
            try {
                Logger = require('./SignaleLogger').default;
            } catch (err) {
                Logger = DefLogger;
                Logger.error('The specified logger is missing dependencies, the default logger will be used instead.');
            }
            break;
        }
            
        // Chalk logger
        case 2: {
            try {
                Logger = require('./ChalkLogger').default;
            } catch (err) {
                Logger = DefLogger;
                Logger.error('The specified logger is missing dependencies, the default logger will be used instead.');
            
            }
            break;
        }
        }

        return Logger;
    }
}

export default LoggerHandler;
