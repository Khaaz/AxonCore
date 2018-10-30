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
        const mess = this.parseTime() + ' - [  MOD  ] => ' + `Initialised! | Commands loaded -${module.commands.size}- | [${module.label}]`;
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
            mess = this.parseTime() + ' - [  CMD  ] => ' + `Initialised! | SubCommands loaded -${command.subCommands.size}- | *${command.label}*`;
        } else {
            mess = this.parseTime() + ' - [  CMD  ] => ' + `Initialised! | *${command.label}*`;
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
            mess = this.parseTime() + ' - [  SUB  ] => ' + `Initialised! | SubCommands loaded -${sub.subCommands.size}- | ${sub.label}`;
        } else {
            mess = this.parseTime() + ' - [  SUB  ] => ' + `Initialised! | ${sub.label}`;
        }
        this.log(mess);
    }

    /**
     * Initialisation - SubCommand infos
     *
     * @param {Command} sub
     * @memberof DefLogger
     */
    initEvent(bind, event) {
        let mess;
        if (bind) {
            mess = this.parseTime() + ' - [  EVT  ] => ' + `Bound ${event.size} event${event.size > 1 ? 's' : ''} for ${event.name}`;
        } else {
            mess = this.parseTime() + ' - [  EVT  ] => ' + `Registered ${event.label} for ${event.eventName}`;
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

export default new DefLogger();
