'use string';

import { Console } from 'console';
import { format } from 'util';

/**
 * Default Logger with time and custom method
 * Allow clean logging without any dependency
 *
 * @author KhaaZ
 *
 * @class DefLogger
 * @extends {Console}
 */
class DefLogger extends Console {
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
     * @memberof DefLogger
     */
    emerg(input, opt) {
        const mess = this.parseTime() + ' - [ EMERG ] => ' + this.addCtx(opt) + input;
        super.error(mess);
    }

    /**
     * Major - critical error
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof DefLogger
     */
    error(input, opt) {
        const mess = this.parseTime() + ' - [ ERROR ] => ' + this.addCtx(opt) + input;
        super.error(mess);
    }

    /**
     * Warns - non critcal
     * Expected errors
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof DefLogger
     */
    warn(input, opt) {
        const mess = this.parseTime() + ' - [ WARN  ] => ' + this.addCtx(opt) + input;
        super.warn(mess);
    }

    /**
     * Eval - Debugging logs
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof DefLogger
     */
    debug(input, opt) {
        const mess = this.parseTime() + ' - [ DEBUG ] => ' + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * Important informations
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof DefLogger
     */
    notice(input, opt) {
        const mess = this.parseTime() + ' - [NOTICE ] => ' + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * Default informations
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof DefLogger
     */
    info(input, opt) {
        const mess = this.parseTime() + ' - [ INFO  ] => ' + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * Other Logging
     * Commands usage...
     *
     * @param {String} input
     * @param {Object} opt - context object
     * @memberof DefLogger
     */
    verbose(input, opt) {
        const mess = this.parseTime() + ' - [VERBOSE] => ' + this.addCtx(opt) + input;
        this.log(mess);
    }

    /**
     * AxonClient informations
     *
     * @param {String} input
     * @memberof DefLogger
     */
    axon(input) {
        const mess = this.parseTime() + ' - [ AXON  ] => ' + input;
        this.log(mess);
    }

    /**
     * Initialisation - Client infos
     *
     * @param {String} input
     * @memberof DefLogger
     */
    init(input) {
        const mess = this.parseTime() + ' - [ INIT  ] => ' + input;
        this.log(mess);
    }

    /**
     * Initialisation - Module infos
     *
     * @param {Module} module
     * @memberof DefLogger
     */
    initModule(module) {
        const mess = this.parseTime() + ' - [MODULE ] => ' + `Initialised! | [${module.label}] | Commands loaded -${module.commands.size}-`;
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
            mess = this.parseTime() + ' - [COMMAND] => ' + `Initialised! | *${command.label}* | SubCommands loaded -${command.subCommands.size}-`;
        } else {
            mess = this.parseTime() + ' - [COMMAND] => ' + `Initialised! | *${command.label}*`;
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
            mess = this.parseTime() + ' - [SUBCMD ] => ' + `Initialised! | ${sub.label} | SubCommands loaded -${sub.subCommands.size}-`;
        } else {
            mess = this.parseTime() + ' - [SUBCMD ] => ' + `Initialised! | ${sub.label}`;
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
        const formated = format('[ %s ]', current.getHours() + 'h:' + current.getMinutes() + 'm:' + current.getSeconds() + 's');
        return formated;
    }
}

export default new DefLogger();
