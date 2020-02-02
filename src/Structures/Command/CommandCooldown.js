/**
 * CommandCooldown. Handles cooldowns for a command.
 *
 * @author KhaaZ
 *
 * @class CommandCooldown
 *
 * @prop {Command} _command - The base command
 * @prop {Map} _cooldowns - Map of cooldowns. It maps userID => Cooldown Object { time: Date, post: Boolean}
 */
class CommandCooldown {
    /**
     * Creates an instance of CommandCooldown.
     *
     * @param {Command} command
     * @memberof CommandCooldown
     */
    constructor(command) {
        this._command = command;

        this._cooldowns = new Map();
    }

    /**
     * Returns the cooldown for this command
     *
     * @readonly
     * @type {Number}
     * @memberof CommandCooldown
     */
    get cooldown() {
        return this._command.options.cooldown;
    }

    /**
     * Checks the command cooldown of the user
     *
     * @param {String} userID - The userID
     * @returns {Array[Number,Boolean]} Empty array if no cooldowns / Array with the time left and whether we shouldsend a cooldown message or not
     * @memberof CommandCooldown
     */
    shouldCooldown(userID) {
        const cooldown = this._cooldowns.get(userID);

        // No cooldown registered yet
        if (!cooldown) {
            return []; // Doesn't cooldown
        }

        // Time spent since last uses <= cooldown chose for that command
        const timeLeft = Date.now() - cooldown.time;
        if (timeLeft <= this.cooldown) {
            return [timeLeft, this.shouldSendCooldownMessage(cooldown)]; // Return [time left, should send a cooldown message]
        }

        // Delete current time for this user.
        this._cooldowns.delete(userID);

        return []; // Doesn't cooldown
    }

    shouldSendCooldownMessage(cooldown) {
        if (cooldown.post) {
            cooldown.post = false;
            return true;
        }
        return false;
    }

    shouldSetCooldown(response = null) {
        if (!this.cooldown || this.cooldown === 0) {
            return false;
        }
        return response ? response.triggerCooldown : false;
    }
    
    /**
     * Set the cooldown for a user for this command.
     *
     * @param {String} userID
     * @memberof CommandCooldown
     */
    setCooldown(userID) {
        this._cooldowns.set(userID, { time: Date.now(), post: true } );
    }
}

export default CommandCooldown;
