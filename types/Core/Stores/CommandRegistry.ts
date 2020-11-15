import { ARegistry, Command, AxonClient, GuildConfig } from '../../';

/**
 * Registry that holds all Commands.
 *
 * @author KhaaZ
 *
 * @class CommandRegistry
 * @extends ARegistry<Command>
 */
export declare class CommandRegistry extends ARegistry<Command> {
    /** All commands aliases. */
    public aliases: Map<string, string>;
    /**
     * Creates an instance of CommandRegistry
     */
    constructor(axon: AxonClient);
    /**
     * Get a command with its label
     *
     * @param cmd - The command label
     * @returns The found command
     * @memberof CommandRegistry
     */
    // @ts-ignore Needs separate PR
    get(cmd: string): Command | null;
    /**
     * Get a command/subcommand with the given full label.
     *
     * @param splitLabel - Full command (or subcommand) label
     * @memberof CommandRegistry
     */
    getFull(splitLabel: string[] ): Command | null;
    /**
     * Register a Command inside the CommandRegistry
     *
     * @param label - The command label
     * @param command - The command object
     * @memberof CommandRegistry
     */
    register(label: string, command: Command): void;
    /**
     * Unregister a Command from the CommandRegistry
     *
     * @param label - The command label
     * @param command - The command object
     * @memberof CommandRegistry
     */
    unregister(label: string, command?: Command): void;
    /**
     * Resolves the command Object. Only resolves the command if it's not globally disabled.
     * Doesn't resolve the command if the command is guild disabled.
     *
     * @param label - The command label/ command alias
     * @param args - Array of arguments
     * @param guildConfig - GuildConfig
     * @returns The command object or null if the command doesn't exist or is not enabled
     * @memberof CommandRegistry
     */
    resolve(label: string, args: string[], guildConfig?: GuildConfig): Command | null;
}
