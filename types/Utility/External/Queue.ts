
/**
 * This default Queue works in a synchronous fashion.
 * It will execute all synchronous functions sequentially.
 * Any error will be caught and unless specified otherwise won't break the queue execution.
 * The queue can be auto executed on add or the execution can be delayed.
 *
 * @author KhaaZ
 *
 * @class Queue
 */
export declare class Queue {
    private _functions: Function[];
    private _running: boolean;
    /** Whether to stop the queue execution on error. */
    public stopOnError: boolean;
    /**
     * Creates an instance of Queue.
     *
     * @param stopOnError
     * @memberof Queue
     */
    constructor(stopOnError?: boolean);
    /**
     * Execute the Queue
     * @memberof Queue
     */
    public exec(): void;
    /**
     * Adds a function to the queue.
     * Automatically will wrap the function in a closure to keep the function context.
     *
     * @param func - The function to run
     * @param toExec - Whether to auto exec the queue on add or not.
     * @param args - All arguments the function needs
     * @memberof Queue
     */
    public add(func: Function, toExec?: boolean, ...args: any[] ): void;
    public createClosure(fn: Function, ...args: any[] ): unknown;
}
