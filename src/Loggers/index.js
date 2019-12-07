import DefaultLogger from './Logger';

import { LOGGER_TYPES } from '../Utility/Constants/AxonEnums';

/**
 * Logger Handler
 * Use require to dynamically load a Logger depending on installed dependencies.
 *
 * @author Eleos, KhaaZ
 *
 * @class LoggerHandler
 */
class LoggerHandler {
    static pickLogger(axonConfig) {
        let Logger;

        switch (axonConfig.logger) {
            // Default Logger
            case LOGGER_TYPES.DEFAULT:
            default: {
                Logger = DefaultLogger;
                Logger.info('Selected Logger: Default Logger.');
                break;
            }

            // Chalk logger
            case LOGGER_TYPES.CHALK: {
                try {
                    Logger = require('./ChalkLogger').default;
                    Logger.info('Selected Logger: Chalk Logger.');
                } catch (err) {
                    Logger = DefaultLogger;
                    Logger.warn('The specified logger is missing dependencies, the default logger will be used instead.');
                    Logger.info('Logger: Default Logger.');
                }
                break;
            }

            // Signale Logger
            /** @TODO incompatibility with full logging */
            case LOGGER_TYPES.SIGNALE: {
                try {
                    Logger = require('./SignaleLogger').default;
                    Logger.info('Selected Logger: Signale Logger.');
                } catch (err) {
                    Logger = DefaultLogger;
                    Logger.warn('The specified logger is missing dependencies, the default logger will be used instead.');
                    Logger.info('Selected Logger: Default Logger.');
                }
                break;
            }

            // Winston Logger
            /** @TODO incompatibility with full logging */
            case LOGGER_TYPES.WINSTON: {
                try {
                    Logger = require('./WinstonLogger').default;
                    Logger.info('Selected Logger: Winston Logger.');
                } catch (err) {
                    Logger = DefaultLogger;
                    Logger.warn('The specified logger is missing dependencies, the default logger will be used instead.');
                    Logger.info('Selected Logger: Default Logger.');
                }
                break;
            }
        }
        
        try {
            axonConfig.debugMode && this.testLogger(Logger);
        } catch (err) {
            /** Fallback to DefLogger */
            Logger = DefaultLogger;
            Logger.warn('Logger error, fallback to default Logger.');
            Logger.info('Selected Logger: Default Logger.');
        }

        Logger.axon('Logger ready');
        return Logger;
    }

    static testLogger(Logger) {
        /** LOGGER TESTING */
        console.log(' ');
        Logger.emerg('- Test EMERG -');
        Logger.error('- Test ERROR -');
        Logger.warn('- Test WARN -');
        Logger.debug('- Test DEBUG -');
        Logger.notice('- Test notice -');
        Logger.info('- Test info -');
        Logger.verbose('- Test verbose -');
        Logger.axon('- Test AXON -');
        Logger.init('- Test INIT -');
        console.log(' ');
    }
}

export default LoggerHandler;
