
/**
 * Collect bunch of message object according to chosen options
 *
 * @author VoidNull
 *
 * @class MessageCollector
 * @extends EventEmitter
 */
export declare class MessageCollector extends EventEmitter {
    private _options: CollectorOptions;
    private _axon: AxonClient;
    private _actualOptions: CollectorOptions;
    private _boundMsgEvent: (msg: LibMessage) => void;
    private _boundDelEvent: (msg: LibMessage) => void;
    private _boundEditEvent: (msg: LibMessage, oldMsg: LibMessage) => void;
    private _boundCollectEvent: () => void;
    public messages: Collection<LibMessage>;

    /**
     * Creates an instance of MessageCollector
     * @param client - The axon client object
     * @param options - The default options for the message collector instance
     * @param options.timeout - The time before the collector times out in milliseconds
     * @param options.count - The amount of messages to collect before automatically ending
     * @param options.ignoreBots - Whether or not to ignore bots
     * @param options.uID - The user id to listen for (listens to all messages if not specified)
     * @param options.caseSensitive - Whether or not to return messages with lowercase content. Default: content unchanged
     *
     * @example
     * const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
     */
    constructor(client: AxonClient, options?: CollectorOptions);

    /**
     * @readonly
     */
    readonly axon: AxonClient;
    /**
     * @readonly
     */
    readonly client: LibClient;

    /**
     * Runs the message collector
     *
     * @param channel The channel object to listen to
     * @param options The options for the message collector
     * @returns Map of messages collected.
     *
     * @example
     * const messages = await collector.run(msg.channel, { caseInsensitive: false });
     */
    public run(channel: LibTextableChannel, options: CollectorOptions): Promise<Collection<LibMessage> >;
    private _onEnd(): void;
    private _startTimeout(): void;
    private _onMsgDelete(msg: LibMessage): void;
    private _onMsgEdit(msg: LibMessage): Promise<void>;
    private _onCollectEvent(): void;
    public end(): void;
    private _onMsgCreate(msg: LibMessage): void;
    /**
     * Removes a message from the messages collected
     *
     * @param mID The id of the message you want to remove
     * @returns Collection of messages collected, now excluding the removed message.
     *
     * @example
     * collector.delete('542164538347225118')
     */
    public delete(mID: string): Collection<LibMessage>;
}
