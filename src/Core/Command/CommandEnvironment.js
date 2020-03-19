import { COMMAND_EXECUTION_TYPES } from '../../Utility/Constants/AxonEnums';

/**
 * @typedef {import('./Command').default} Command
 * @typedef {import('../Models/GuildConfig').default} GuildConfig
 */

/**
 * CommandEnvironment structure. Contains all the environment used in command execution (all variables used in Command.execute).
 *
 * @author KhaaZ
 *
 * @class CommandEnvironment
 * @prop {String} raw - The raw message content
 * @prop {Message} msg - The message object from the lib
 * @prop {Array<String>} args - The array of arguments
 * @prop {GuildConfig} guildConfig - The GuildConfig data-structure with all DB saved settings
 * @prop {String} prefix - The prefix used for this command
 * @prop {String} command - The full label of the command being executed
 * @prop {COMMAND_EXECUTION_TYPES} executionType - Execution type: admin, owner, regular
 */
class CommandEnvironment {
    /**
     * Creates an instance of CommandEnvironment.
     *
     * @param {Object} data
     * @param {Message} data.msg - The message object from the lib
     * @param {Array<String>} data.args - The array of arguments
     * @param {GuildConfig} data.guildConfig - The GuildConfig data-structure with all DB saved settings
     * @param {String} data.prefix - The prefix used for this command
     * @param {Command} data.command - The command object
     * @param {COMMAND_EXECUTION_TYPES} data.executionType - Execution type: admin, owner, regular
     * @memberof CommandEnvironment
     */
    constructor(data) {
        this.raw = data.msg.content;
        
        this.msg = data.msg || {};
        this.args = data.args || [];
        this.prefix = data.prefix || null;

        this.command = data.command !== undefined ? data.command.fullLabel : null;

        this.guildConfig = data.guildConfig || null;
        
        this.executionType = data.executionType !== undefined ? data.executionType : COMMAND_EXECUTION_TYPES.OWNER;
    }

    /**
     * Whether this is an admin execution environment (owner or admin)
     *
     * @readonly
     * @type {Boolean}
     * @memberof CommandEnvironment
     */
    get isAdmin() {
        return this.executionType === COMMAND_EXECUTION_TYPES.ADMIN || this.isOwner;
    }

    /**
     * Whether this is an owner execution environment
     *
     * @readonly
     * @type {Boolean}
     * @memberof CommandEnvironment
     */
    get isOwner() {
        return this.executionType === COMMAND_EXECUTION_TYPES.OWNER;
    }

    /**
     * Set the prefix
     *
     * @param {String} prefix
     * @returns {CommandEnvironment} This CommandEnvironment
     * @memberof CommandEnvironment
     */
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }

    /**
     * Set the guildConfig
     *
     * @param {GuildConfig} guildConfig
     * @returns {CommandEnvironment} This CommandEnvironment
     * @memberof CommandEnvironment
     */
    setGuildConfig(guildConfig) {
        this.guildConfig = guildConfig;
        return this;
    }

    /**
     * Set the command label from the command object
     *
     * @param {Command} command
     * @returns {CommandEnvironment} This CommandEnvironment
     * @memberof CommandEnvironment
     */
    setCommand(command) {
        this.command = command.fullLabel;
        return this;
    }

    /**
     * Resolve the argument from the args string.
     * Uses the custom parser given in params
     *
     * @param {Object} parser
     * @param {String} args - Arguments string
     * @memberof CommandEnvironment
     */
    resolveArgs(parser, args) {
        if (!parser) {
            this.args = args.length > 0
                ? args.split(' ')
                : [];
        } else {
            this.args = parser.parse(args);
        }
    }
}

export default CommandEnvironment;
