/**
 * Stack class.
 *
 * @author KhaaZ
 *
 * @template T
 *
 * @prop {Array<T>} _elements
 * @prop {Boolean} max - Maximum number of elements that can be added in this Stack
 * @prop {Boolean} replaceOnMax - Whether to replace value when adding if max is reached (unstack first element and stack new element)
 *
 * @class Stack
 */
class Stack {
    /**
     * Creates an instance of Stack.
     *
     * @param {Number} [max=null] - Maximum number of elements that can be added in this Stack
     * @param {Boolean} [replaceOnMax=true] - Whether to replace value when adding if max is reached (unstack first element and stack new element)
     * @memberof Stack
     */
    constructor(max = null, replaceOnMax = true) {
        this._elements = [];
        this.max = max;
        this.replaceOnMax = replaceOnMax;
    }

    /**
     * Returns the Stack size
     *
     * @readonly
     * @type {Number}
     * @memberof Stack
     */
    get size() {
        return this._elements.length;
    }

    /**
     * Return first element of this Stack (top of the Stack).
     *
     * @returns {T}
     * @memberof Stack
     */
    first() {
        return this._elements[this._elements.length - 1];
    }

    /**
     * Stack up an element.
     *
     * @param {T} elem
     * @param {Boolean} [replaceOnMax] - Whether to replace value when adding if max is reached (unstack first element and stack new element)
     * @returns {Boolean} Whether element was successfully added
     * @memberof Stack
     */
    stack(elem, replaceOnMax) {
        if (this.max && this._elements.length === this.max) {
            if ( (replaceOnMax !== undefined) ? replaceOnMax : this.replaceOnMax) {
                this._elements.pop();
            } else {
                return false;
            }
        }
        this._elements.push(elem);
        return true;
    }

    /**
     * Unstack an element and returns it
     *
     * @returns {T}
     * @memberof Stack
     */
    unstack() {
        return this._elements.pop();
    }
}

export default Stack;
