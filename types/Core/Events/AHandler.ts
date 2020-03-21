import { AxonClient, Listener } from '../../';

/**
 * Abstract class for handlers.
 * Events root handlers.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class AHandler
 */
export declare class AHandler {
    private _axon: AxonClient;
    public name: string;
    private _listeners: Listener[];
    /**
     * Creates an instance of AHandler.
     *
     * @memberof AHandler
     */
    constructor(axon: AxonClient, name: string, listeners: Listener[] );
    /**
     * Returns the sizeof an Handler (number of listeners)
     *
     * @readonly
     * @memberof AHandler
     */
    public size: number;
    private _handle(...args: any[] ): Promise<void>;
    /**
     * Takes the event parameters as arguments and returns the guild ID if possible or null.
     *
     * @param args - All parameters for this event
     * @returns The guild ID
     * @memberof AHandler
     */
    public handle(...args: any[] ): string | null;
}
