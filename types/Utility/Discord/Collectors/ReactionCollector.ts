import {
    CollectorOptions, ReactionCollectorOptions, AxonClient, LibMessage, LibTextableChannel, Collector, LibEmoji,
} from '../../..';
import { CollectorContainer } from './CollectorContainer';

/**
 * Collect bunch of message object according to chosen options
 *
 * @author KhaaZ, VoidNull
 *
 * @class ReactionCollector
 * @extends EventEmitter
 */
export declare class ReactionCollector extends Collector<{message: LibMessage; emoji: LibEmoji; userID: string;}> {
    public options: CollectorOptions;
    public onMessageReactionAdd: (msg: LibMessage, emoji: LibEmoji, userID: string) => void;
    public onMessageReactionRemove: (msg: LibMessage, emoji: LibEmoji, userID: string) => void;
    public onMessageReactionRemoveAll: (msg: LibMessage) => void
    public onMessageReactionRemoveEmoji: (msg: LibMessage, emoji: LibEmoji) => void;

    /**
     * Creates an instance of ReactionCollector
     * @param client - The axon client object
     * @param options - The default options for the message collector instance
     * @example
     * const collector = new ReactionCollector(this.axon, { count: 10, ignoreBots: false });
     * @memberof ReactionCollector
     */
    constructor(client: AxonClient, options?: CollectorOptions);

    /**
     * Runs the message collector
     * @example
     * const messages = await collector.run({ caseInsensitive: false });
     * @memberof ReactionCollector
     */
    public run<T extends LibTextableChannel>(options?: ReactionCollectorOptions): Promise<Map<string, {message: LibMessage<T>; emoji: LibEmoji; userID: string;}>>;
    /**
     * Runs the message collector
     * @example
     * const messages = await collector.collect({ caseInsensitive: false });
     * @memberof ReactionCollector
     */
    public collect<T extends LibTextableChannel>(options?: ReactionCollectorOptions): CollectorContainer<{message: LibMessage<T>; emoji: LibEmoji; userID: string;}>;
    /**
     * Get all CollectorContainers that will collect from this particular message
     * @memberof ReactionCollector
     */
    public getCollectors<T extends LibTextableChannel>(message: LibMessage<T>, emoji: LibEmoji): CollectorContainer<{message: LibMessage<T>; emoji: LibEmoji; userID: string;}>[];
    /**
     * Function bound to messageReactionAdd event.
     * Collect the reaction for all collectors that responds to the criteria.
     * Emits collect event
     * @emits ReactionCollector#collect
     * @memberof ReactionCollector
     */
    private _onMessageReactionAdd(msg: LibMessage, emoji: LibEmoji, userID: string): void;
    /**
     * Function bound to messageReactionRemove event.
     * Remove the reaction from all collectors that collected this reaction
     * @memberof ReactionCollector
     */
    private _onMessageReactionRemove(msg: LibMessage, emoji: LibEmoji, userID: string): void;
    /**
     * Function bound to messageReactionRemoveAll event.
     * Updates the reaction from all collector that collected this reaction
     * @memberof ReactionCollector
     */
    private _onMessageReactionRemoveAll(msg: LibMessage): void;
    /**
     * Function bound to messageReactionRemoveEmoji event.
     * Remove the reaction from all collectors that collected this reaction
     * @memberof ReactionCollector
     */
    private _onMessageReactionRemoveEmoji(msg: LibMessage, emoji: LibEmoji): void;
}
