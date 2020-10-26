import { EventEmitter } from 'events';

import { CollectorContainerSettings } from '../../../';

/**
 * @param collected Collected element
 */
type collectListener<T> = (collected: T) => void
type timeoutListener = () => void;
type endListener = () => void;


/**
 * Contains all elements collected respecting settings and options.
 * Emit end, timeout, collect events.
 *
 * @class CollectorContainer
 * @extends {EventEmitter}
 */
export declare class CollectorContainer<T> extends EventEmitter {
    /** Non serialisable id only used for internal usage. */
    private _id: symbol;
    /** Custom filter function that the element need to validate in order to be collected */
    public _filter: (param: object) => {};;
    /** The time before the collector times out in milliseconds */
    public timeout: number|null;
    /** The amount of elements to collect before automatically ending */
    public count: number|null;
    /** All collected elements */
    public collected: Map<string, T>;
    /**
     * Creates an instance of CollectorContainer.
     * Contains all elements that respect the container options
     * @memberof CollectorContainer
     */
    constructor(settings: CollectorContainerSettings, options: object);
    /**
     * The non serialisable id used to identify this container.
     * @readonly
     * @memberof CollectorContainer
     */
    readonly id: symbol;
    /**
     * Fired when an element si collected
     * @event Collector#collect
     * @memberof Collector
     */
    on(event: 'collect', listener: collectListener<T>): this;
    /**
     * Fired when an element si collected
     * @event Collector#collect
     * @memberof Collector
     */
    on(event: 'timeout', listener: timeoutListener): this;
    /**
     * Fired when an element si collected
     * @event Collector#collect
     * @memberof Collector
     */
    on(event: 'end', listener: endListener): this;
    /**
     * Collect an element. Emits 'collect' event.
     * @memberof CollectorContainer
     */
    collect(id: string, collected: T): void;
    /**
     * Wether the container is full or not
     * @memberof CollectorContainer
     */
    isFull(): boolean;
    /**
     * Wait for the CollectorContainer to resolve.
     * Returns a Promise once the container ends or timeout.
     * @memberof CollectorContainer
     */
    wait(): Promise<Map<string, T>>;
    /**
     * End the CollectorContainer. Emits 'end' event.
     * @memberof CollectorContainer
     */
    end(): void;
    /**
     * Timeout the CollectorContainer. Emits 'timeout' event.
     * @memberof CollectorContainer
     */
    break(): void;
}
