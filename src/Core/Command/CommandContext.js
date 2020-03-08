import { COMMAND_EXECUTION_TYPES, COMMAND_EXECUTION_STATE } from '../../Utility/Constants/AxonEnums';

/**
 * @typedef {import('./Command').default} Command
 * @typedef {import('./CommandResponse').default} CommandResponse
 * @typedef {import('../../Utility/Constants/AxonEnums').COMMAND_EXECUTION_STATE} COMMAND_EXECUTION_STATE
 * @typedef {import('../../Utility/Constants/AxonEnums').COMMAND_EXECUTION_TYPES} COMMAND_EXECUTION_TYPES
 */

/**
 * CommandContext object that encapsulates entirely the command execution data.
 * Status, context etc...
 *
 * A command is flagged as "executed" if it was ran (went through execute method).
 * If it was not executed, we know the reason (onCooldown, invalidUsage, invalidBotPermissions, invalidUserPermissions)
 *
 * If the command was executed, it has the success flag. If it's true,it means the command worked until the end (aka normal execution).
 * Success being false can be the result of a regular stop of the execution flow (bad input for example, usage of this.sendError) or of caught error(usage of this.error).
 * The last possibility is uncaught errors.
 *
 * @author KhaaZ
 *
 * @class CommandContext
 *
 * @prop {String} raw - Raw input
 * @prop {String} commandLabel - The command full label
 * @prop {String} moduleLabel - The module name
 * STATUS
 * @prop {Boolean} [executed=true] - Whether the command was actually executed or not
 * @prop {Boolean} [data.helpExecution=false]
 * @prop {COMMAND_EXECUTION_STATE} executionState - The state of execution (no error, cooldown, invalid usage, invalid permission)
 * @prop {COMMAND_EXECUTION_TYPES} executionType - The type of execution (Owner, Admin, Regular)
 * @prop {Boolean} [success=true] - Whether the command was successfully executed or not
 * @prop {Object|String} [error=null] - Optional error object in case of bad command execution
 * CONTEXT
 * @prop {Boolean} [dm=false] - Whether the command was executed in DM or not
 * @prop {String} [guildID=null] - Context: guild where the command was executed ID
 * @prop {String} [guildName=null] - Context: guild where the command was executed name
 * @prop {String} [channelID=null] - Context: channel where the command was executed ID
 * @prop {String} [channelName=null] - Context: channel where the command was executed name
 * @prop {String} [callerID=null] - Context: user that called the command ID
 * @prop {String} [callerName=null] - Context: user that called the command name
 * @prop {Date} [calledAt=Date.now()] - The execution time
 */
class CommandContext {
    /**
     * Creates an instance of CommandContext.
     *
     * @param {Command} command
     * @param {Message} triggerMessage
     * @param {Object} [data={}]
     * @param {Boolean} [data.executed=true]
     * @param {Boolean} [data.helpExecution=false]
     * @param {COMMAND_EXECUTION_STATE} [data.executionState=0] - no error, cooldown, invalid usage, invalid permissions...
     * @param {COMMAND_EXECUTION_TYPES} [data.executionType=0] - Regular, admin, owner execution
     * @param {Boolean} [data.dm=false]
     * @memberof CommandContext
     */
    constructor(command, triggerMessage, data = {} ) {
        /**
         * @type {String}
         */
        this.raw = triggerMessage.content;
        this.commandLabel = command.fullLabel;
        this.moduleLabel = command.module.label;

        /* Status */
        this.executed = data.executed !== false;
        this.helpExecution = (this.executed && data.helpExecution) || false;
        this.executionState = (!data.executed && data.executionState !== undefined) ? data.executionState : COMMAND_EXECUTION_STATE.NO_ERROR;
        this.executionType = data.executionType !== undefined ? data.executionType : COMMAND_EXECUTION_TYPES.REGULAR;
        
        /* Execution context */
        const lib = command.library;

        this.dm = !lib.message.getGuild(triggerMessage);
        this.guildID = lib.message.getGuildID(triggerMessage);
        this.guildName = lib.message.getGuildName(triggerMessage);
        
        this.channelID = lib.message.getChannelID(triggerMessage);
        this.channelName = lib.message.getChannelName(triggerMessage);

        const author = lib.message.getAuthor(triggerMessage) || null;
        this.callerID = author && lib.user.getID(author);
        this.callerName = author && lib.user.getTag(author);

        this.calledAt = new Date();
    }

    /**
     * Add the command response data to the command context object.
     * Add the state of the command success and optionally the error.
     *
     * @param {CommandResponse} commandResponse - CommandResponse object obtained or created after the command execution
     * @returns {CommandContext}
     * @memberof CommandContext
     */
    addResponseData(commandResponse = {} ) {
        this.success = commandResponse.success !== false;
        this.error = (!this.success && commandResponse.error)
            ? commandResponse.error
            : null;

        return this;
    }

    /**
     * Return the type of command execution based of the execution context.
     * Admin, Owner or Regular execution.
     *
     * @static
     * @param {Boolean} isAdmin
     * @param {Boolean} isOwner
     * @returns {COMMAND_EXECUTION_TYPES}
     * @memberof CommandContext
     */
    static getExecutionType(isAdmin, isOwner) {
        if (isOwner) {
            return COMMAND_EXECUTION_TYPES.OWNER;
        } if (isAdmin) {
            return COMMAND_EXECUTION_TYPES.ADMIN;
        }
        return COMMAND_EXECUTION_TYPES.REGULAR;
    }

    /**
     * By default returns the Command Context asynchronously.
     *
     * @returns {Promise<CommandContext>}
     * @memberof CommandContext
     */
    resolve() {
        return this.resolveAsync();
    }

    /**
     * Returns the Command Context wrapped in a Promise (asynchronously)
     *
     * @returns {Promise<CommandContext>}
     * @memberof CommandContext
     */
    resolveAsync() {
        return Promise.resolve(this);
    }

    /**
     * Returns the Command Context (synchronously)
     *
     * @returns {CommandContext}
     * @memberof CommandContext
     */
    resolveSync() {
        return this;
    }
}

export default CommandContext;
