import {
    CollectorOptions, CollectorFullOptions, AxonClient, LibMessage, LibTextableChannel, Collector,
} from '../../..';
import { Collection } from '../../Collection';
import { CollectorContainer } from './CollectorContainer';

/**
 * Collect bunch of message object according to chosen options
 *
 * @author VoidNull, KhaaZ
 *
 * @class MessageCollector
 * @extends EventEmitter
 */
export declare class MessageCollector extends Collector<LibMessage> {
    public options: CollectorOptions;
    public onMessageCreate: (msg: LibMessage) => void;
    public onMessageDelete: (msg: LibMessage) => void;
    public onMessageUpdate: (msg: LibMessage, msg1: LibMessage) => void

    /**
     * Creates an instance of MessageCollector
     * @param client - The axon client object
     * @param options - The default options for the message collector instance
     * @example
     * const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
     * @memberof MessageCollector
     */
    constructor(client: AxonClient, options?: CollectorOptions);

    /**
     * Runs the message collector
     * @example
     * const messages = await collector.run({ caseInsensitive: false });
     * @memberof MessageCollector
     */
    public run<T extends LibTextableChannel>(options?: CollectorFullOptions): Promise<Collection<LibMessage<T>>>;
    /**
     * Runs the message collector
     * @example
     * const messages = await collector.collect({ caseInsensitive: false });
     * @memberof MessageCollector
     */
    public collect<T extends LibTextableChannel>(options?: CollectorFullOptions): CollectorContainer<LibMessage<T>>;
    /**
     * Get all CollectorContainers that will collect from this particular message
     * @memberof MessageCollector
     */
    public getCollectors<T extends LibTextableChannel>(message: LibMessage<T>): CollectorContainer<LibMessage<T>>[];
    /**
     * Function bound to messageCreate event.
     * Collect the message for all collectors that responds to the criteria.
     * Emits collect event
     * @emits MessageCollector#collect
     * @memberof MessageCollector
     */
    private _onMessageCreate(msg: LibMessage): void;
    /**
     * Function bound to messageDelete event.
     * Remove the message from all collectors that collected this message
     * @memberof MessageCollector
     */
    private _onMessageDelete(msg: LibMessage): void;
    /**
     * Function bound to messageUpdate event.
     * Updates the message from all collector that collected this message
     * @memberof MessageCollector
     */
    private _onMessageUpdate(oldMsg: LibMessage, msg: LibMessage): void;
}
