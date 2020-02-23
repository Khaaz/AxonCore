
/**
 * This default FunctionQueue works in a synchronous fashion.
 * It will execute all synchronous functions sequentially.
 * Any error will be caught and unless specified otherwise won't break the FunctionQueue execution.
 * The FunctionQueue can be auto executed on add or the execution can be delayed.
 *
 * @author KhaaZ
 *
 * @class FunctionQueue
 */
export declare class FunctionQueue {
    private _functions: Function[];
    private _running: boolean;
    /** Whether to stop the FunctionQueue execution on error. */
    public stopOnError: boolean;
    /**
     * Creates an instance of FunctionQueue.
     *
     * @param stopOnError
     * @memberof FunctionQueue
     */
    constructor(stopOnError?: boolean);
    /**
     * Execute the FunctionQueue
     * @memberof FunctionQueue
     */
    public exec(): void;
    /**
     * Adds a function to the FunctionQueue.
     * Automatically will wrap the function in a closure to keep the function context.
     *
     * @param func - The function to run
     * @param toExec - Whether to auto exec the FunctionQueue on add or not.
     * @param args - All arguments the function needs
     * @memberof FunctionQueue
     */
    public add(func: Function, toExec?: boolean, ...args: any[] ): void;
    public createClosure(fn: Function, ...args: any[] ): unknown;
}
