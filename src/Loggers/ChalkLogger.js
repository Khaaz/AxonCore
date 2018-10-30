'use string';

import { Console } from 'console';
import { format } from 'util';
import chalk from 'chalk';

/**
 * Logger with time and custom method
 * Colorful logger
 * Allow clean logging with only Chalk
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

    /** CTX Object
     *
     * {
     *  guild: gObj || id|name
     *  cmd: label
     *  user: userObj || id|name
     * }
     *
     * replaced with id if no obj
     */

    /**
     * Major - Critical fault
     * Crashing bugs, unexpected...
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    emerg(input, opt) {
        const mess = chalk.bold.magenta(this.parseTime() + ' - [ EMERG ] => ') + this.addCtx(opt) + input;
        super.error(mess);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    error(input, opt) {
        const mess = chalk.bold.red(this.parseTime() + ' - [ ERROR ] => ') + this.addCtx(opt) + input;
        super.error(mess);
    }

    /**
     * Warns - non critcal
     * Expected errors
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    warn(input, opt) {
        const mess = chalk.bold.yellow(this.parseTime() + ' - [ WARN  ] => ') + this.addCtx(opt) + input;
        super.warn(mess);
    }

    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    debug(input, opt) {
        const mess = chalk.blue(this.parseTime() + ' - [ DEBUG ] => ') + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * Important informations
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    notice(input, opt) {
        const mess = chalk.bold.green(this.parseTime() + ' - [NOTICE ] => ' + this.addCtx(opt) + input);
        this.log(mess);
    }

    /**
     * Default informations
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    info(input, opt) {
        const mess = chalk.green(this.parseTime() + ' - [ INFO  ] => ') + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * Other Logging
     * Commands usage...
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof ChalkLogger
     */
    verbose(input, opt) {
        const mess = chalk.white(this.parseTime() + ' - [VERBOSE] => ') + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * AxonClient informations
     *
     * @param {String} input
     * @memberof ChalkLogger
     */
    axon(input) {
        const mess = chalk.bold.cyan(this.parseTime() + ' - [ AXON  ] => ' + input);
        this.log(mess);
    }

    /**
     * Initialisation - Client infos
     *
     * @param {String} input
     * @memberof ChalkLogger
     */
    init(input) {
        const mess = chalk.cyan(this.parseTime() + ' - [ INIT  ] => ') + input;
        this.log(mess);
    }

    /**
     * Initialisation - Module infos
     *
     * @param {Module} module
     * @memberof ChalkLogger
     */
    initModule(module) {
        const mess = chalk.cyan(this.parseTime() + ' - [  MOD  ] => ' + `Initialised! | Commands loaded -${module.commands.size}- | [${module.label}]`);
        this.log(mess);
    }

    /**
     * Initialisation - Command infos
     *
     * @param {Command} command
     * @memberof ChalkLogger
     */
    initCommand(command) {
        let mess;
        if (command.hasSubcmd) {
            mess = chalk.cyan(this.parseTime() + ' - [  CMD  ] => ') + `Initialised! | SubCommands loaded -${command.subCommands.size}- | *${command.label}*`;
        } else {
            mess = chalk.cyan(this.parseTime() + ' - [  CMD  ] => ') + `Initialised! | *${command.label}*`;
        }
        this.log(mess);
    }

    /**
     * Initialisation - SubCommand infos
     *
     * @param {Command} sub
     * @memberof ChalkLogger
     */
    initSubCmd(sub) {
        let mess;
        if (sub.hasSubcmd) {
            mess = chalk.cyan(this.parseTime() + ' - [  SUB  ] => ') + `Initialised! | SubCommands loaded -${sub.subCommands.size}- | ${sub.label}`;
        } else {
            mess = chalk.cyan(this.parseTime() + ' - [  SUB  ] => ') + `Initialised! | ${sub.label}`;
        }
        this.log(mess);
    }

    /**
     * Initialisation - SubCommand infos
     *
     * @param {Command} sub
     * @memberof ChalkLogger
     */
    initEvent(bind, event) {
        let mess;
        if (bind) {
            mess = chalk.cyan(this.parseTime() + ' - [  EVT  ] => ') + `Bound ${event.size} event${event.size > 1 ? 's' : ''} for ${event.name}`;
        } else {
            mess = chalk.cyan(this.parseTime() + ' - [  EVT  ] => ') + `Registered ${event.label} for ${event.eventName}`;
        }
        this.log(mess);
    }


    addCtx(ctx = {}) {
        let context = '';
        if (ctx.guild) {
            context += ctx.guild instanceof Object
                ? `[${ctx.guild.name} - ${ctx.guild.id}] `
                : `[Guild: ${ctx.guild}] `;
        }
        if (ctx.cmd) {
            context += `-${ctx.cmd}- `;
        }
        if (ctx.user) {
            context += ctx.user instanceof Object
                ? `${ctx.user.username}#${ctx.user.discriminator} - ${ctx.user.id} `
                : `[User: ${ctx.user}] `;
        }

        return context;
    }

    parseTime() {
        const current = new Date();
        const formated = format('[ %s ]', `${current.getHours() < 10 ? `0${current.getHours()}` : current.getHours()}h`
            + `${current.getMinutes() < 10 ? `0${current.getMinutes()}` : current.getMinutes()}m`
            + `${current.getSeconds() < 10 ? `0${current.getSeconds()}` : current.getSeconds()}s`);
        return formated;
    }
}

export default new ChalkLogger();
