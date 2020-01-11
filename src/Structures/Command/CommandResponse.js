/**
 * Build a Command Response - the formatted object used internally by the framework to resolve context.
 *
 * @class CommandResponse
 *
 * @prop {Boolean} success
 * @prop {Boolean} triggerCooldown
 * @prop {Error|null} error
 */
class CommandResponse {
    /**
     * Creates an instance of CommandResponse.
     * Build the commandresponse from all options given in parameters
     *
     * @param {Object} [data={}]
     * @param {Boolean} [data.success=true]
     * @param {Boolean} [data.triggerCooldown=true]
     * @param {Object|String} [data.error=null]
     *
     * @memberof CommandResponse
     */
    constructor(data = {} ) {
        this.success = data.success !== false;
        this.triggerCooldown = data.triggerCooldown !== false;
        this.error = data.error || null;
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

export default CommandResponse;
