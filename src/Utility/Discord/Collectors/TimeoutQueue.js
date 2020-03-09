/**
 * @typedef {{ id: String, timeout: Number }} Timeout
 */

/**
 * TimeoutQueue Object. Sorted Array of timeout, with the next due timeout at the top
 *
 * @class TimeoutQueue
 * @prop {Array<Timeout>} queue
 */
class TimeoutQueue {
    constructor() {
        this.queue = [];
    }

    /**
     * Whether the queue is empty or not
     *
     * @returns {Boolean}
     * @memberof TimeoutQueue
     */
    isEmpty() {
        return this.queue.length === 0;
    }

    /**
     * Returns the first element of the queue without removing it
     *
     * @returns {Timeout}
     * @memberof TimeoutQueue
     */
    peek() {
        return this.queue[0];
    }

    /**
     * Adds an element in the queue, sorting by ascending timeout
     *
     * @param {String} id
     * @param {Number} timeout
     * @memberof TimeoutQueue
     */
    add(id, timeout) {
        let i;
        for (i = 0; i < this.queue.length; i++) {
            if (this.queue[i].timeout > timeout) {
                break;
            }
        }

        this.queue.splice(i, 0, { id, timeout } );
    }

    /**
     * Get the first timeout in the queue and removes it
     *
     * @returns {Timeout}
     * @memberof TimeoutQueue
     */
    getNext() {
        return this.queue.shift();
    }
}

export default TimeoutQueue;
