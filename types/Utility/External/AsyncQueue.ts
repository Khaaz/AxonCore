import { FunctionQueue } from '../../';

/**
 * This data structure is a queue that will run every function one by one sequentially.
 * It will run indifferently synchronous and asynchronous functions. Making sure the previous one is over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
 * A Promise is returned on add. This promise will resolve or reject when the function is ran.
 *
 * The queue can be auto executed on add or the execution can be delayed.
 *
 * @author KhaaZ
 *
 * @class AsyncQueue
 * @extends FunctionQueue
 */
export declare class AsyncQueue extends FunctionQueue {
    public exec(): Promise<void>;
    /**
     * Adds a function to the queue.
     * Automatically will wrap the function in a closure to keep the function context.
     *
     * @param func - The function to run
     * @param toExec - Whether to auto exec the queue on add or not.
     * @param args - All arguments the function needs
     * @memberof AsyncQueue
     */
    public add(func: Function, toExec?: boolean, ...args: any[] ): Promise<any>;
    public createClosure(fn: Function, resolve: (value: unknown) => void, reject: (reason: Error) => void, ...args: any[] ): Promise<Function>;
}
