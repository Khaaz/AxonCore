import Queue from './Queue';
/**
 * This data structure is a queue that will run every function one by one sequentially.
 * It will run indifferently synchrones and asynchrones functions. Making sure the previous oneis over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
 * A Promise is returned on add. This promise will resolve or reject when the function is ran.
 *
 * The queue can be auto executed on add or the execution can be delayed.
 *
 * @author KhaaZ
 *
 * @class AsyncQueue
 */
class AsyncQueue extends Queue {
    /**
     * Execute the queue.
     *
     * @memberof AsyncQueue
     */
    async exec() {
        if (this._functions.length > 0) {
            this._running = true;

            const func = this._functions.shift();
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

    /**
     * Adds a function to the queue.
     * Automatically wil wrap the function in a closure to keep the function context.
     * Will also create a Promise that will be returned and will be resolved with the actual data.
     *
     * @param {Function} func - The function to run
     * @param {Boolean} [toExec=true] - Whether to auto exec the queue on add or not.
     * @param {*} args - All arguments the function needs
     * @returns {Promise}
     *
     * @memberof AsyncQueue
     */
    add(func, toExec = true, ...args) {
        const promise = new Promise( (resolve, reject) => {
            const fn = this.createClosure(func, resolve, reject, ...args);
            this._functions.push(fn);
        } );
        
        if (toExec && !this._running) {
            this.exec();
        }
        return promise;
    }

    createClosure(fn, resolve, reject, ...args) {
        return async() => {
            try {
                const res = await fn(...args);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        };
    }
}

export default AsyncQueue;
