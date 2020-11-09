import {
    LibMessage, CollectorHelperOptions, MessageCollector,
} from '../..';
/**
 * Builder / Helper around collectors
 *
 * @author KhaaZ
 *
 * @class NextMessage
 */
export declare class NextMessage {
    public collector: MessageCollector;
    public options: CollectorHelperOptions<LibMessage>;
    private _build: CollectorHelperOptions<LibMessage>;
    /**
     * Creates an instance of NextMessage.
     * @memberof NextMessage
     */
    constructor(collector: MessageCollector);
    /**
     * Run a collector with the given options and return the first reaction found.
     * @static
     * @memberof NextMessage
     */
    static for(collector: MessageCollector, options: object): Promise<LibMessage>;
    /**
     * The channels to listen in
     * @memberof NextMessage
     */
    in(channels: string[]|string): void;
    /**
     * The users to listen from
     * @memberof NextMessage
     */
    from(users: string[]|string): void;
    /**
     * The filter to listen with
     * @memberof NextMessage
     */
    with(filter: (param: LibMessage) => boolean): void;
    /**
     * The timeout after which the collector will ends
     * @memberof NextMessage
     */
    expires(timeout: number): void;
    /**
     * Executes the collector and returns the next reaction collected
     * @memberof NextMessage
     */
    exec(): Promise<LibMessage>;
}
