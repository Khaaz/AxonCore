/**
 * This default Queue works in a synchronous fashion.
 * It will execute all synchronous functions sequentially.
 * Any error will be catched and unless specified otherwise won't break the queue execution.
 * The queue can be auto executed on add or the execution can be delayed.
 *
 * @author KhaaZ
 *
 * @class Queue
 *
 * @prop {Boolean} [stopOnError=false] Whether to stop the queue execution on error.
 */
class Queue {
    /**
     * Creates an instance of Queue.
     *
     * @param {boolean} [stopOnError=false]
     *
     * @memberof Queue
     */
    constructor(stopOnError = false) {
        this._functions = [];
        this._running = false;

        this.stopOnError = stopOnError;
    }

    /**
     * Execute the Queue
     *
     * @memberof Queue
     */
    exec() {
        if (this._functions.length > 0) {
            this._running = true;
            const func = this._functions.shift();

            try {
                func();
            } catch (err) {
                if (this.stopOnError) {
                    throw err;
                }
                console.log(func);
            }

            this.exec();
        } else {
            this._running = false;
        }
    }

    /**
     * Adds a function to the queue.
     * Automatically wil wrap the function in a closure to keep the function context.
     *
     * @param {Function} func - The function to run
     * @param {Boolean} [toExec=true] - Whether to auto exec the queue on add or not.
     * @param {*} args - All arguments the function needs
     *
     * @memberof Queue
     */
    add(func, toExec = true, ...args) {
        const fn = this.createClosure(func, ...args);

        this._functions.add(fn);

        if (toExec && !this._running) {
            this.exec();
        }
    }

    createClosure(fn, ...args) {
        return () => fn(...args);
    }
}

export default Queue;
