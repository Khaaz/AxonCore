import Queue from './Queue';

/**
 * @typedef {import('./Queue').default} Queue
 */

/**
 * This default FunctionQueue works in a synchronous fashion.
 * It will execute all synchronous functions sequentially.
 * Any error will be caught and unless specified otherwise won't break the FunctionQueue execution.
 * The FunctionQueue can be auto executed on add or the execution can be delayed.
 *
 * @author KhaaZ
 *
 * @class FunctionQueue
 *
 * @prop {Queue<Function>} _functions - The queue of function
 * @prop {Boolean} [_running=false] - Whether the FunctionQueue is running.
 * @prop {Boolean} [stopOnError=false] - Whether to stop the FunctionQueue execution on error.
 */
class FunctionQueue {
    /**
     * Creates an instance of FunctionQueue.
     *
     * @param {Boolean} [stopOnError=false] - Whether to stop the FunctionQueue execution on error.
     * @memberof FunctionQueue
     */
    constructor(stopOnError = false) {
        /**
         * @type {Queue<Function>}
         */
        this._functions = new Queue();
        this._running = false;

        this.stopOnError = stopOnError;
    }

    /**
     * Execute the FunctionQueue
     * @memberof FunctionQueue
     */
    exec() {
        if (this._functions.size > 0) {
            this._running = true;
            const func = this._functions.dequeue();

            try {
                func();
            } catch (err) {
                if (this.stopOnError) {
                    throw err;
                }
                console.log(err);
            }

            this.exec();
        } else {
            this._running = false;
        }
    }

    /**
     * Adds a function to the FunctionQueue.
     * Automatically will wrap the function in a closure to keep the function context.
     *
     * @param {Function} func - The function to run
     * @param {Boolean} [toExec=true] - Whether to auto exec the FunctionQueue on add or not.
     * @param {...any} args - All arguments the function needs
     * @memberof FunctionQueue
     */
    add(func, toExec = true, ...args) {
        const fn = this.createClosure(func, ...args);

        this._functions.queue(fn);

        if (toExec && !this._running) {
            this.exec();
        }
    }

    /**
     * @param {Function} fn
     * @param  {...any} args
     * @returns {unknown}
     */
    createClosure(fn, ...args) {
        return () => fn(...args);
    }
}

export default FunctionQueue;
