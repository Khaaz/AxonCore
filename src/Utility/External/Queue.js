/**
 * Queue class.
 *
 * @author KhaaZ
 *
 * @template T
 *
 * @prop {Array<T>} _elements
 * @prop {Boolean} max
 * @prop {Boolean} replaceOnMax
 *
 * @class Queue
 */
class Queue {
    /**
     * Creates an instance of Queue.
     *
     * @param {Number} [max=null] - Maximum number of elements that can be added in this queue
     * @param {Boolean} [replaceOnMax=true] - Whether to replace value when adding if max is reached (dequeue first element and queue new element)
     * @memberof Queue
     */
    constructor(max = null, replaceOnMax = true) {
        this._elements = [];
        this.max = max;
        this.replaceOnMax = replaceOnMax;
    }

    /**
     * Returns the Queue size
     *
     * @readonly
     * @type {Number}
     * @memberof Queue
     */
    get size() {
        return this._elements.length;
    }

    /**
     * Return first element of this queue
     *
     * @returns {T}
     * @memberof Queue
     */
    first() {
        return this._elements[0];
    }

    /**
     * Queue up an element.
     *
     * @param {T} elem
     * @param {Boolean} [replaceOnMax] - Whether to replace value when adding if max is reached (dequeue first element and queue new element)
     * @returns {Boolean} Whether element was successfully added
     * @memberof Queue
     */
    queue(elem, replaceOnMax) {
        if (this.max && this._elements.length === this.max) {
            if ( (replaceOnMax !== undefined) ? replaceOnMax : this.replaceOnMax) {
                this._elements.shift();
            } else {
                return false;
            }
        }
        this._elements.push(elem);
        return true;
    }

    /**
     * Dequeue an element and returns it
     *
     * @returns {T}
     * @memberof Queue
     */
    dequeue() {
        return this._elements.shift();
    }
}

export default Queue;
