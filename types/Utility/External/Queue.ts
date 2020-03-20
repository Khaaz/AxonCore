/**
 * Queue class.
 *
 * @author KhaaZ
 *
 * @class Queue
 */
export declare class Queue<T> {
    private _elements: T[];
    public max: number;
    public replaceOnMax: boolean;
    /**
     * Creates an instance of Queue.
     *
     * @param max - Maximum number of elements that can be added in this queue
     * @param replaceOnMax - Whether to replace value when adding if max is reached (dequeue first element and queue new element)
     * @memberof Queue
     */
    constructor(max?: number, replaceOnMax?: boolean);
    /**
    * Returns the Queue size
    *
    * @readonly
    * @memberof Queue
    */
    readonly size: number;

    /**
     * Return first element of this queue
     *
     * @memberof Queue
     */
    public first(): T;
    /**
     * Queue up an element.
     *
     * @returns Whether element was successfully added
     * @memberof Queue
     */
    public queue(elem: T, replaceOnMax?: boolean): boolean;
    /**
     * Dequeue an element and returns it
     *
     * @memberof Queue
     */
    public dequeue(): T;
}
