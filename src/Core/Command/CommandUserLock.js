/**
 * @typedef {import('./Command').default} Command
 */

/**
 * CommandUserLock. Prevents a user from initiating several instances of the same command.
 *
 * @author taO
 *
 * @class CommandUserLock
 *
 * @prop {Command} _command - The base command
 * @prop {Set<String>} _usersLocked - All user IDs currently locked
 *  */
class CommandUserLock {
    /**
     * Creates an instance of CommandUserLock.
     *
     * @param {Command} command
     * @memberof CommandUserLock
     */
    constructor(command) {
        this._command = command;

        /**
         * @type {Set<string>}
         */
        this._usersLocked = new Set();
    }

    /**
     * Returns the status of the userlock option.
     *
     * @readonly
     * @type {Boolean} Options of userLock.
     * @memberof CommandUserLock
     */
    get userLock() {
        return this._command.options.userLock;
    }

    /**
     * Checks if the user is locked.
     * Lock the user if not locked.
     * @param {String} userID - The userID
     * @returns {Boolean} Whether the user is locked or not.
     *
     * @memberof CommandUserLock
     */
    isLocked(userID) {
        const lock = this._usersLocked.has(userID);

        // Not locked yet
        if (!lock) {
            this._setLock(userID); // lock the user.
            return false;
        }

        return true;
    }

    /**
     * Unlock a user.
     *
     * @param {String} userID - The userID
     * @returns {Boolean} Whether the user is unlocked or not.
     * @memberof CommandUserLock
     */
    unLock(userID) {
        const lock = this._usersLocked.has(userID);
        
        if (lock) {
            this._usersLocked.delete(userID); // User is now unlocked.
            return true;
        }

        return false;
    }
 
    /**
     * Lock the user.
     *
     * @param {String} userID
     * @memberof CommandUserLock
     */
    _setLock(userID) {
        this._usersLocked.add(userID); // User is now locked.
    }
}

export default CommandUserLock;
