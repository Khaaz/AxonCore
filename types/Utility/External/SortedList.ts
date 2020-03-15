/**
 * SortedList Object. Sorted Array of element (ascending or descending order)
 * @author KhaaZ
 * @class SortedList
 */
export declare class SortedList<T> {
    public ascending: boolean;
    /** Whether toInsert is bigger than baseElement */
    public comparator: (toInsert: T, baseElement: T) => boolean;
    public list: T[];
    /**
     * Creates an instance of SortedList
     * @memberof SortedList
     */
    constructor(comparator?: (toInsert: T, baseElement: T) => boolean, ascending?: boolean);

    /**
     * Size of the list
     * @readonly
     * @memberof SortedList
     */
    readonly size: number;

    /**
     * Whether the list is empty or not
     * @memberof SortedList
     */
    public isEmpty(): boolean;
    /**
     * Returns the first element of the list without removing it
     * @memberof SortedList
     */
    public first(): T;
    /**
     * Returns the first element of the list without removing it
     * @memberof SortedList
     */
    public first(): T;
    /**
     * Returns the last element of the list without removing it
     * @memberof SortedList
     */
    public last(): T;
    /**
     * Adds an element in the queue, sorting by ascending timeout
     * @memberof SortedList
     */
    add(element: T, comparator?: (toInsert: T, baseElement: T) => boolean): void;
    /**
     * Get the first element in the queue and removes it
     * @memberof SortedList
     */
    shift(): T;
    /**
     * Get the last element in the queue and removes it
     * @memberof SortedList
     */
    pop(): T;
}
