import winston, {
    createLogger, transports, format,
} from 'winston';

const levelConfig = {
    levels: {
        emerg: 0,
        error: 1,
        warn: 2,
        success: 3,
        failure: 4,
        info: 5,
        verbose: 6,
        debug: 7,
    },
    colors: {
        emerg: 'bold magenta',
        error: 'bold red',
        warn: 'bold yellow',
        success: 'italic green',
        failure: 'italic red',
        info: 'cyan',
        verbose: 'grey',
        debug: 'blue',
    },
};

/**
 * Logger
 * Winston logger as a class
 *
 * TODO: winston-sentry + whatever other transport needed
 *
 * @class Logger
 */
class WinstonLogger {
    constructor() {
        this.createTransport();

        winston.addColors(levelConfig.colors);

        return createLogger( {
            levels: levelConfig.levels,
            transports: [
                this.consoleTransport,
                // this.emergTransport,
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
            exceptionHandlers: [this.consoleTransport/* , this.emergTransport*/],
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
        
        this.emergTransport = new transports.File( {
            filename: 'emerg.winston.log',
            level: 'emerg',
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

export default new WinstonLogger();
