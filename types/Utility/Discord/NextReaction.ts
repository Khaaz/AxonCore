import {
    LibMessage, LibEmoji, ReactionCollectorHelperOptions,
} from '../..';
import { MessageCollector } from './Collectors/MessageCollector';

/**
 * Builder / Helper around collectors
 *
 * @author KhaaZ
 *
 * @class NextReaction
 */
export declare class NextReaction {
    public collector: MessageCollector;
    public options: ReactionCollectorHelperOptions;
    private _build: ReactionCollectorHelperOptions;
    /**
     * Creates an instance of NextReaction.
     * @memberof NextReaction
     */
    constructor(collector: MessageCollector);
    /**
     * Run a collector with the given options and return the first reaction found.
     * @static
     * @memberof NextReaction
     */
    static for(collector: MessageCollector, options: object): Promise<{message: LibMessage; emoji: LibEmoji; userID: string;}>;
    /**
     * The messages to listen
     * @memberof NextReaction
     */
    for(messages: string[]|string): void;
    /**
     * The channels to listen in
     * @memberof NextReaction
     */
    in(channels: string[]|string): void;
    /**
     * The users to listen from
     * @memberof NextReaction
     */
    from(users: string[]|string): void;
    /**
     * The emotes to listen
     * @memberof NextReaction
     */
    about(emotes: string[]|string): void;
    /**
     * The filter to listen with
     * @memberof NextReaction
     */
    with(filter: (param: object) => {} ): void;
    /**
     * The timeout after which the collector will ends
     * @memberof NextReaction
     */
    expires(timeout: number): void;
    /**
     * Executes the collector and returns the next reaction collected
     * @memberof NextReaction
     */
    exec(): Promise<{message: LibMessage; emoji: LibEmoji; userID: string;}>;
}

export default NextReaction;
