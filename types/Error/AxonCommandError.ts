import { CommandContext } from '..';
/**
 * Custom error with better formatting and context informations.
 * Used for errors thrown by AxonCore commands.
 *
 * @author KhaaZ
 *
 * @class AxonCommandError
 * @extends Error
 *
 * @prop {CommandContext} context - Command Context containing all informations about the command execution
 */
export declare class AxonCommandError extends Error {
    public context: CommandContext;
    readonly short: string;
    public message: string;
    public stack: string;

    constructor(commandContext: CommandContext, err: Error);
    readonly name: string;
}
