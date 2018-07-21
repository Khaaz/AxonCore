'use strict';

import winston from 'winston';
import chalk from 'chalk';
import util from 'util';
import moment from 'moment';

//
// Logging levels
//
const levels = {
    emerg: 0,
    error: 1,
    warn: 2,
    debug: 3,
    notice: 4,
    info: 5,
    verbose: 6,
};

const colors = {
    emerg: chalk.bold.magenta,
    error: chalk.bold.red,
    warn: chalk.bold.yellow,
    debug: chalk.blue,
    notice: chalk.cyan,
    info: chalk.green,
    verbose: chalk.white,
};

const levelDesc = {
    emerg: ' MAJOR ',
    error: ' MAJOR ',
    warn: ' WARN ',
    debug: ' WARN ',
    notice: ' INFO ',
    info: ' INFO ',
    verbose: ' MISC ',
};

const customF = winston.format.printf(info => {
    const time = moment(info.timestamp).format('HH:mm:ss');
    return `${util.format('[%s]', time)} - [${colors[info.level](levelDesc[info.level])}] ${colors[info.level](info.level)}: ${info.message}`;
});

const Logger = winston.createLogger({
    levels: levels,
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
        customF
    ),
    transports: [
        new winston.transports.Console({level: 'verbose' }),
        new winston.transports.File({
            filename: 'logs/winston/commands.log',
            level: 'verbose'
        }),
        new winston.transports.File({
            filename: 'logs/winston/infos.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'logs/winston/warns.log',
            level: 'warn'
        }),
        new winston.transports.File({
            filename: 'logs/winston/errors.log',
            level: 'error'
        })
    ]
});


export default Logger;
