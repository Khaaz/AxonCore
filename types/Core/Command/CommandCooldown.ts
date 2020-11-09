import { Command } from '../../';

/**
 * CommandCooldown. Handles cooldowns for a command.
 *
 * @author KhaaZ
 *
 * @class CommandCooldown
 */
export declare class CommandCooldown {
    /**
     * The base command
     */
    private _command: Command;
    /**
     * Map of cooldowns
     */
    private _cooldowns: Map<string, { time: Date; post: boolean; }>;

    /**
     * Creates an instance of CommandCooldown.
     *
     * @memberof CommandCooldown
     */
    constructor(command: Command);

    // GETTERS

    /**
     * Returns the cooldown for this command
     *
     * @readonly
     * @memberof CommandCooldown
     */
    readonly cooldown: number;

    // METHODS
    /**
     * Checks the command cooldown of the user
     *
     * @param userID - The userID
     * @returns Empty array if no cooldowns / Array with the time left and whether we should send a cooldown message or not
     *
     * @memberof CommandCooldown
     */
    public shouldCooldown(userID: string): [number, boolean] | [];
    /**
     * Checks if the cooldown message should be sent
     *
     * @memberof CommandCooldown
     */
    public shouldSendCooldownMessage(cooldown: { time: Date; post: boolean; } ): boolean;
    /**
     * @memberof CommandCooldown
     */
    public shouldSetCooldown(response?: { triggerCooldown: boolean; } | null): boolean;
    /**
     * Set the cooldown for a user for this command.
     *
     * @memberof CommandCooldown
     */
    public setCooldown(userID: string): void;
}
