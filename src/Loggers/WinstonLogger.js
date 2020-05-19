/* eslint-disable max-classes-per-file */
import winston, {
    createLogger, transports, format,
} from 'winston';

import ALogger from './ALogger';
import Context from './Context';

const levelConfig = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        debug: 3,
        notice: 4,
        info: 5,
        verbose: 6,
    },
    colors: {
        fatal: 'bold magenta',
        error: 'bold red',
        warn: 'bold yellow',
        debug: 'italic green',
        notice: 'italic red',
        info: 'cyan',
        verbose: 'grey',
    },
};

class Winston {
    constructor() {
        this.createTransport();

        winston.addColors(levelConfig.colors);

        return createLogger( {
            levels: levelConfig.levels,
            transports: [
                this.consoleTransport,
                // this.fatalTransport,
                // this.errorTransport,
                // this.infoTransport,
                // this.globalTransport,
            ],
            format: format.combine(
                format.errors( { stack: true } ),
                format.json(),
                format.timestamp( {
                    format: 'YYYY-MM-DD HH:mm:ss',
                } ),
                format.printf(this.format),
            ),
            exitOnError: false,
            exceptionHandlers: [this.consoleTransport/* , this.fatalTransport*/],
        } );
    }

    format(info) {
        return `${info.timestamp} - [${info.level.toUpperCase()}]: ${info.message}`;
    }

    createTransport() {
        this.consoleTransport = new transports.Console( {
            level: 'debug',
            format: format.combine(
                format.colorize( { all: true } ),
            ),
        } );
        
        this.fatalTransport = new transports.File( {
            filename: 'fatal.winston.log',
            level: 'fatal',
        } );
        
        this.errorTransport = new transports.File( {
            filename: 'error.winston.log',
            level: 'error',
            
        } );
        
        this.infoTransport = new transports.File( {
            filename: 'info.winston.log',
            level: 'info',
        } );

        this.globalTransport = new transports.File( {
            filename: 'global.winston.log',
            level: 'verbose',
        } );
    }
}

/**
 * Logger using Winston
 *
 * @TODO winston-sentry + whatever other transport needed
 *
 * @author KhaaZ
 *
 * @class WinstonLogger
 * @extends ALogger
 */
class WinstonLogger extends ALogger {
    constructor() {
        super(new Winston(), 3);
    }

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected errors...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    fatal(input, opt) {
        this.out.fatal(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    error(input, opt) {
        this.out.error(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Warns - expected errors
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    warn(input, opt) {
        this.out.warn(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    debug(input, opt) {
        this.out.debug(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Important information
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    notice(input, opt) {
        this.out.notice(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Default information
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    info(input, opt) {
        this.out.info(`${Context.from(opt).get()}${input}`);
    }

    /**
     * Other Logging - executed commands, etc...
     *
     * @param {String} input
     * @param {Context} opt - context object
     * @memberof WinstonLogger
     */
    verbose(input, opt) {
        this.out.verbose(`${Context.from(opt).get()}${input}`);
    }
}


export default new WinstonLogger();
