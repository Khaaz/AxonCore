/**
 * Construct a context object to use as a string when logging.
 *
 * @author KhaaZ
 *
 * @prop {String} guild
 * @prop {String} cmd
 * @prop {String} user
 *
 * @class Context
 */
class Context {
    /**
     * Creates an instance of Context.
     * @param {Object|String} guild
     * @param {String} cmd
     * @param {Object|String} user
     * @memberof Context
     */
    constructor(guild, cmd, user) {
        if (guild) {
            this.guild = guild instanceof Object
                ? `[${guild.name} - ${guild.id}] `
                : `[Guild: ${guild}] `;
        }
        if (cmd) {
            this.cmd = `-${cmd}- `;
        }
        if (user) {
            this.user = user instanceof Object
                ? `${user.username}#${user.discriminator} - ${user.id} `
                : `[User: ${user}] `;
        }
    }

    /**
     *
     *
     * @static
     * @param {Object} [ctx={}]
     * @param {Object|String} ctx.guild
     * @param {String} ctx.cmd
     * @param {Object|String} ctx.user
     * @returns {Context} A new instance of Context
     * @memberof Context
     */
    static from(ctx = {} ) {
        if (!ctx) {
            ctx = {};
        }
        return new Context(ctx.guild, ctx.cmd, ctx.user);
    }

    get() {
        let ctx = '';
        if (this.guild) {
            ctx += this.guild;
        }
        if (this.cmd) {
            ctx += this.cmd;
        }
        if (this.user) {
            ctx += this.user;
        }
        return ctx;
    }
}

export default Context;
