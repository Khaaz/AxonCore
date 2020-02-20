import FunctionQueue from './FunctionQueue';

/**
 * This data structure is a queue that will run every function one by one sequentially.
 * It will run indifferently synchronous and asynchronous functions. Making sure the previous function is over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
 * It has no return value, it will just run the function added sometimes in the future.
 *
 * The queue can be auto executed on add or the execution can be delayed.
 *
 * @KhaaZ
 *
 * @class AutoQueue
 * @extends FunctionQueue
 */
class AutoQueue extends FunctionQueue {
    /**
     * Execute the queue.
     * @memberof AutoQueue
     */
    async exec() {
        if (this._functions.size > 0) {
            this._running = true;

            const func = this._functions.dequeue();
            try {
                await func();
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
}

export default AutoQueue;
