/**
 * Custom error with better formatting and context informations.
 * Used for errors thrown by AxonCore commands.
 *
 * @author KhaaZ
 *
 * @class AxonCommandError
 * @extends {Error}
 *
 * @prop {Object<CommandContext>} context - Command Context containing all informations about the command execution
 */
class AxonCommandError extends Error {
    /**
     * Creates an instance of AxonCommandError.
     *
     * @param {Object<CommandContext>} commandContext - The command context that contains all information about the command execution
     * @param {Object<Error>} err - Discord Error (givin by eris/discord/other)
     *
     * @memberof AxonCommandError
     */
    constructor(commandContext, err) {
        super();

        this.context = commandContext;

        const short = `[${this.context.moduleLabel}] - ${this.context.commandLabel}] | `
            + `${this.context.dm ? `DM: ${this.context.callerID}` : `Guild: ${this.context.guildID}`} / Channel: ${this.context.channelID}\n`;
        
        Object.defineProperty(this, 'short', {
            value: `${short}Error: ${err.name ? err.name : ''}`,
            writable: false,
        } );

        Object.defineProperty(this, 'message', {
            value: `${short}Error: ${err.message ? err.message : ''}`,
            writable: false,
        } );

        if (err.stack) {
            Object.defineProperty(this, 'stack', {
                value: `${short}Error: ${err.stack ? err.stack : ''}`,
                writable: false,
            } );
        }
    }

    get name() {
        return this.constructor.name;
    }
}

export default AxonCommandError;
