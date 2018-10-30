import DefLogger from './DefLogger';

/**
 * Logger Handler
 * Use require to dynamically load a Logger regarding dependencies
 *
 * @author Eleos, KhaaZ
 *
 * @class LoggerHandler
 */
class LoggerHandler {
    static pickLogger(debug, config) {
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

        Logger.axon('Logger ready');
        debug && this.testLogger(Logger);
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
        // Logger.module('- Test module -');
        // Logger.command('- Test command -');
        console.log(' ');
    }
}

export default LoggerHandler;
