'use string';

import { Console } from 'console';
import { format } from 'util';
import chalk from 'chalk';

/**
 * Logger with time and custom method
 * Colorful logger
 * Allow clean logging without any dependency
 *
 * @author KhaaZ
 *
 * @class ChalkLogger
 * @extends {Console}
 */
class ChalkLogger extends Console {
    constructor() {
        super(process.stdout, process.stderr); // Create default Console instance - Node v8 support
    }

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected...
     *
     * @param {String} input
     * @memberof DefLogger
     */
    emerg(input) {
        const mess = chalk.bold.magenta(this.parseTime() + ' - [ EMERG ] => ') + input;
        super.error(mess);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @memberof DefLogger
     */
    error(input) {
        const mess = chalk.bold.red(this.parseTime() + ' - [ ERROR ] => ') + input;
        super.error(mess);
    }

    /**
     * Warns - non critcal
     * Expected errors
     *
     * @param {String} input
     * @memberof DefLogger
     */
    warn(input) {
        const mess = chalk.bold.yellow(this.parseTime() + ' - [ WARN  ] => ') + input;
        super.warn(mess);
    }

    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @memberof DefLogger
     */
    debug(input) {
        const mess = chalk.blue(this.parseTime() + ' - [ DEBUG ] => ') + input;
        this.log(mess);
    }

    /**
     * Important informations
     *
     * @param {String} input
     * @memberof DefLogger
     */
    notice(input) {
        const mess = chalk.bold.green(this.parseTime() + ' - [NOTICE ] => ') + input;
        this.log(mess);
    }

    /**
     * Default informations
     *
     * @param {String} input
     * @memberof DefLogger
     */
    info(input) {
        const mess = chalk.green(this.parseTime() + ' - [ INFO  ] => ') + input;
        this.log(mess);
    }

    /**
     * Other Logging
     * Commands usage...
     *
     * @param {String} input
     * @memberof DefLogger
     */
    verbose(input) {
        const mess = chalk.white(this.parseTime() + ' - [VERBOSE] => ') + input;
        this.log(mess);
    }

    /**
     * AxonClient informations
     *
     * @param {String} input
     * @memberof DefLogger
     */
    axon(input) {
        const mess = chalk.bold.cyan(this.parseTime() + ' - [ AXON  ] => ' + input);
        this.log(mess);
    }

    /**
     * Initialisation - Client infos
     *
     * @param {String} input
     * @memberof DefLogger
     */
    init(input) {
        const mess = chalk.cyan(this.parseTime() + ' - [ INIT  ] => ') + input;
        this.log(mess);
    }

    /**
     * Initialisation - Module infos
     *
     * @param {Module} module
     * @memberof DefLogger
     */
    initModule(module) {
        const mess = chalk.cyan(this.parseTime() + ' - [MODULE ] => ') + `[${module.label}] Initialised! Commands loaded -${module.commands.size}-`;
        this.log(mess);
    }

    /**
     * Initialisation - Command infos
     *
     * @param {Command} command
     * @memberof DefLogger
     */
    initCommand(command) {
        let mess;
        if (command.hasSubcmd) {
            mess = chalk.cyan(this.parseTime() + ' - [COMMAND] => ') + `*${command.label} | Initialised! SubCommands loaded -${command.subCommands.size}-`;
        } else {
            mess = chalk.cyan(this.parseTime() + ' - [COMMAND] => ') + `*${command.label} | Initialised!`;
        }
        this.log(mess);
    }

    /**
     * Initialisation - SubCommand infos
     *
     * @param {Command} sub
     * @memberof DefLogger
     */
    initSubCmd(sub) {
        let mess;
        if (sub.hasSubcmd) {
            mess = chalk.cyan(this.parseTime() + ' - [SUBCMD ] => ') + `${sub.label} | Initialised! SubCommands loaded -${sub.subCommands.size}-`;
        } else {
            mess = chalk.cyan(this.parseTime() + ' - [SUBCMD ] => ') + `${sub.label} | Initialised!`;
        }
        this.log(mess);
    }

    parseTime() {
        const current = new Date();
        const formated = format('[ %s ]', current.getHours() + 'h:' + current.getMinutes() + 'm:' + current.getSeconds() + 's');
        return formated;
    }
}

export default new ChalkLogger();
