import { EventEmitter } from 'events';
import {
    Collection, SortedList, AxonClient, CollectorContainer, LibClient, LibraryInterface, Timeout,
} from '../../../';

/**
 * @param collectors The collectors that will collect the element
 * @param obj Collected element and id
 */
type collectListener<T> = (collectors: CollectorContainer<T>[], obj: {
    /** The collected element id */ id: string;
    /** The collected element */ collected: T;
} ) => void
/**
 * @param id The id of the CollectorContainer that timed out
 */
type timeoutListener = (id: string) => void;

/**
 * Base Collector class.
 *
 * Collect a specific number of an element.
 * Resolve with a Collection of the element collected.
 * Timeout if needed.
 *
 * It is advised only to use one instance per Collector type.
 * This Collector handles using only one Collector instance with many collectors running.
 *
 * @class Collector
 * @extends {EventEmitter}
 */
export declare class Collector<T> extends EventEmitter {
    /** The AxonClient instance */
    private _axon: AxonClient;
    /** Collection of CollectorContainer */
    public collectors: Collection<CollectorContainer<T>>;
    /** The current timeout queue sorted with the first timeout due at the top of the queue */
    public timeoutQueue: SortedList<Timeout>;
    /** Unique increment count used to generate ids */
    private _INCREMENT: number;
    /** Whether the Collector is currently running */
    public running: boolean;
    /** setInterval ID used to clear setinterval */
    private _intervalID: string|null;
    /**
     * Creates an instance of Collector.
     * @memberof Collector
     */
    constructor(axonClient: AxonClient);

    /**
     * The AxonClient instance
     * @readonly
     * @memberof Collector
     */
    readonly axon: AxonClient;
    /**
     * The BotClient instance
     * @readonly
     * @memberof Collector
     */
    readonly bot: LibClient;
    /**
     * The LibraryInterface instance
     * @readonly
     * @memberof Collector
     */
    readonly lib: LibraryInterface;
    /**
     * The current INCREMENT count.
     * Reset at 9999
     * @readonly
     * @memberof Collector
     */
    readonly INCREMENT: number;

    /**
     * Generate a unique ID by using the current timestamp and appending a count (INCREMENT)
     * @returns The unique ID generated
     * @memberof Collector
     */
    private _genID(): string;
    /**
     * Run this Collector with the given options
     * @returns Collection of elements to resolve
     */
    public run(...args: any[] ): Promise<Map<string, T>>; // Not Implemented
    /**
     * Set all listeners to the relevant function (listen to the event)
     * @memberof Collector
     */
    public setListeners(): void; // Not Implemented
    /**
     * Unset all listeners (stop listening)
     * @memberof Collector
     */
    public unsetListeners(): void;
    private _run(options: {
        /** Number of milliseconds before timing out */ timeout?: number;
        /** Number of elements to collect before resolving */ count?: number;
    } ): Promise<Map<string, T>>;
    private _preRun<U, V = never>(options: {
        /** Number of milliseconds before timing out */ timeout?: number;
        /** Number of elements to collect before resolving */ count?: number;
    }, resolve: (value?: U | PromiseLike<U>) => Promise<U>|Promise<void>, reject: (reason: any) => Promise<V>): void;
    private _postRun(): void;
    /**
     * Handles checking for timeout via setInterval
     * @fires Collectir#collect
     * @memberof Collector
     */
    public timeout(): void;
    /**
     * Fired to collect an element
     * @event Collector#collect
     * @memberof Collector
     */
    on(event: 'collect', listener: collectListener<T>): this;
    /**
     * Fired on timeout for a CollectorContainer
     * @event Collector#timeout
     * @memberof Collector
     */
    on(event: 'timeout', listener: timeoutListener): this;
    /**
     * Handles on collect action
     * @memberof Collector
     */
    public onCollect(collectors: CollectorContainer<T>[], param: {
        id: string;
        /** Element collected */ collected: T;
    } ): void;
    /**
     * Handles on timeout action
     * @memberof Collector
     */
    public onTimeout(id: string): void;
}
