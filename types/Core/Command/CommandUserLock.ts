import { Command } from '../..';

/**
 * CommandUserLock. Prevents a user from initiating several instances of the same command.
 *
 * @author taO
 *
 * @class CommandUserLock
 */
export declare class CommandUserLock {
    /**
     * The base command
     */
    private _command: Command;
    /**
     * All user IDs currently locked
     */
    private _userLocked: Set<string>;

    /**
     * Creates an instance of CommandUserLock.
     * @memberof CommandUserLock
     */
    constructor(command: Command);

    // GETTERS

    /**
     * Returns the status of the userlock option.
     * @readonly
     * @memberof CommandUserLock
     */
    readonly userLock: boolean;

    // METHODS
    /**
     * Checks if the user is locked.
     * @param {String} userID - The userID
     * @returns {Boolean} Whether the user is locked or not.
     * @memberof CommandUserLock
     */
    public isLocked(userID: string): boolean;

    /**
     * Unlock a user.
     * @param {String} userID - The userID
     * @returns {Boolean} Whether the user is unlocked or not.
     * @memberof CommandUserLock
     */
    public unLock(userID: string): boolean;

    /**
     * Lock the user.
     * @param {String} userID
     * @memberof CommandUserLock
     */
    public setLock(userID: string): void;
}
