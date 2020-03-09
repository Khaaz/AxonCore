import { Timeout } from '../../../';

/**
 * TimeoutQueue Object. Sorted Array of timeout, with the next due timeout at the top
 *
 * @class TimeoutQueue
 */
export declare class TimeoutQueue {
    public queue: Timeout[];
    /**
     * Creates an instance of TimeoutQueue
     * @memberof TimeoutQueue
     */
    constructor();

    /**
     * Whether the queue is empty or not
     * @memberof TimeoutQueue
     */
    public isEmpty(): boolean;
    /**
     * Returns the first element of the queue without removing it
     * @memberof TimeoutQueue
     */
    public peek(): Timeout;
    /**
     * Adds an element in the queue, sorting by ascending timeout
     * @memberof TimeoutQueue
     */
    add(id: string, timeout: number): void;
    /**
     * Get the first timeout in the queue and removes it
     * @memberof TimeoutQueue
     */
    getNext(): Timeout;
}
