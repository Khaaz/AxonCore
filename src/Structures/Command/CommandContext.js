import { COMMAND_EXECUTION_TYPES } from '../../Utility/Constants/AxonEnums';

/**
 * CommandContext object that encapsulates entirely the command execution data.
 * Status, context etc...
 *
 * A command is flagged as "executed" if it was ran (went through execute method).
 * If it was not executed, we know the reason (onCooldown, invalidUsage, invalidBotPermissions, invalidUserPermissions)
 *
 * If the command was executed, it has the success flag. If it's true,it means the command worked until the end (aka normal execution).
 * Success being false can be the result of a regular stop ofthe execution flow (bad input for example, usage of this.sendError) or of catched error(usage of this.error).
 * The last possiblity is un cacthed errors.
 *
 * @author KhaaZ
 *
 * @class CommandContext
 *
 * @prop {String} raw - Raw input
 * @prop {String} commandLabel - The command name
 * @prop {String} moduleLabel - The module name
 * STATUS
 * @prop {Boolean} [executed=true] - Whether the command was actually executed or not
 * @prop {Boolean} [data.helpExecution=false]
 * @prop {Boolean} [onCooldown=false] - If the command didn't execute because of cooldown
 * @prop {Boolean} [invalidUsage=false] - If the command didn't execute because of invalidUsage
 * @prop {Boolean} [invalidBotPermissions=false] - If the command didn't execute because of invalid bot permissions
 * @prop {Boolean} [invalidUserPermissions=false] - If the command didn't execute because of invalid user permissions
 * @prop {Number<COMMAND_EXECUTION_TYPES>} executionType - The type of execution (Owner, Admin, Regular)
 * @prop {Boolean} [success=true] - Whether the command was successfully executed or not
 * @prop {Object|String} [error=null] - Optional error object in case of bad command execution
 * CONTEXT
 * @prop {Boolean} [dm=false] - Whether the command was executed in DM or not
 * @prop {String} [guildID=null] - Context: guild where the command was executed ID
 * @prop {String} [guildName=null] - Context: guild where the command was executed name
 * @prop {String} [channelID=null] - Context: channel where the command was executed ID
 * @prop {String} [channelName=null] - Context: channel where the command was executed name
 * @prop {String} [callerID=null] - Context: user that called thecommand ID
 * @prop {String} [callerName=null] - Context: user that called thecommand name
 * @prop {Date} [calledAt=Date.now()] - The execution time
 */
class CommandContext {
    /**
     * Creates an instance of CommandContext.
     *
     * @param {Object<Command>} command
     * @param {Object<Message>} triggerMessage
     * @param {Object} [data={}]
     * @param {Boolean} [data.executed=true]
     * @param {Boolean} [data.helpExecution=false]
     * @param {Number<COMMAND_EXECUTION_TYPES>} [data.executionType={}]
     * @param {Boolean} [data.dm=false]
     * @param {Boolean} [data.onCooldown=false] - If the command didn't execute because of cooldown
     * @param {Boolean} [data.invalidUsage=false] - If the command didn't execute because of invalidUsage
     * @param {Boolean} [data.invalidBotPermissions=false] - If the command didn't execute because of invalid bot permissions
     * @param {Boolean} [data.invalidUserPermissions=false] - If the command didn't execute because of invalid user permissions
     *
     * @memberof CommandContext
     */
    constructor(command, triggerMessage, data = {} ) {
        this.raw = triggerMessage.content;
        this.commandLabel = command.fullLabel;
        this.moduleLabel = command.module.label;

        /** Status */
        this.executed = data.executed !== undefined ? data.executed : true;
        this.helpExecution = (this.executed && data.helpExecution) || false;
        this.onCooldown = (!this.executed && data.onCooldown) || false;
        this.invalidUsage = (!this.executed && data.invalidUsage) || false;
        this.invalidBotPermissions = (!this.executed && data.invalidBotPermissions) || false;
        this.invalidUserPermissions = (!this.executed && data.invalidUserPermissions) || false;

        this.executionType = data.executionType !== undefined ? data.executionType : COMMAND_EXECUTION_TYPES.REGULAR;
        
        /** Execution context */
        this.dm = !triggerMessage.channel.guild;
        this.guildID = (triggerMessage.channel.guild && triggerMessage.channel.guild.id) || null;
        this.guildName = (triggerMessage.channel.guild && triggerMessage.channel.guild.name) || null;
        
        this.channelID = (triggerMessage.channel && triggerMessage.channel.id) || null;
        this.channelName = (triggerMessage.channel && triggerMessage.channel.id) || null;

        this.callerID = (triggerMessage.author && triggerMessage.author.id) || null;
        this.callerName = (triggerMessage.author && `${triggerMessage.author.username}#${triggerMessage.author.discriminator}`) || null;

        this.calledAt = new Date();
    }

    /**
     * Add the command response data to the command context object.
     * Add the state of the command success and optionaly the error.
     *
     * @param {Object<CommandResponse>} commandResponse - CommandResponse object obtained or created after the command execution
     * @returns {CommandContext}
     *
     * @memberof CommandContext
     */
    addResponseData(commandResponse) {
        this.success = commandResponse.success !== undefined ? commandResponse.success : true;
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
     * @returns {Number<COMMAND_EXECUTION_TYPES>}
     *
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
     * By default returns the Command Response asynchronously.
     *
     * @returns {Promise<CommandResponse>}
     *
     * @memberof CommandResponse
     */
    resolve() {
        return this.resolveAsync();
    }

    /**
     * Returns the Command Response in a Promise (asynchronously)
     *
     * @returns {Promise<CommandResponse>}
     *
     * @memberof CommandResponse
     */
    resolveAsync() {
        return Promise.resolve(this);
    }

    /**
     * Returns the Command Response (synchronously)
     *
     * @returns {CommandResponse}
     *
     * @memberof CommandResponse
     */
    resolveSync() {
        return this;
    }
}

export default CommandContext;
