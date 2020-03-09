/**
 * Build a Command Response - the formatted object used internally by the framework to resolve context.
 *
 * @class CommandResponse
 */
export declare class CommandResponse {
    public success: boolean;
    public triggerCooldown: boolean;
    public error?: Error;
    /**
     * Creates an instance of CommandResponse.
     * Build the CommandResponse from all options given in parameters
     *
     * @memberof CommandResponse
     */
    constructor(data: { success?: boolean; triggerCooldown?: boolean; error?: Error; } );
    /**
     * By default returns the Command Response asynchronously.
     *
     * @memberof CommandResponse
     */
    public resolve(): Promise<CommandResponse>;
    /**
     * Returns the Command Response in a Promise (asynchronously)
     *
     * @memberof CommandResponse
     */
    public resolveAsync(): Promise<CommandResponse>;
    /**
     * Returns the Command Response (synchronously)
     *
     * @memberof CommandResponse
     */
    public resolveSync(): CommandResponse;
}
