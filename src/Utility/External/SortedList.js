/**
 * SortedList Object. Sorted Array of element (ascending or descending order)
 *
 * @author KhaaZ
 *
 * @template T
 *
 * @class SortedList
 * @prop {Boolean} acending
 * @prop {(toInsert: T, baseElement: T) => Boolean)} comparator - Whether toInsert is bigger than baseElement
 * @prop {Array<T>} list
 */
class SortedList {
    constructor(comparator = null, ascending = true) {
        this.comparator = comparator || ( (toInsert, baseElement) => toInsert >= baseElement);
        this.ascending = ascending;
        this.list = [];
    }

    /**
     * Size of the list
     *
     * @readonly
     * @type {Number}
     * @memberof SortedList
     */
    get size() {
        return this.list.length;
    }

    /**
     * Whether the list is empty or not
     *
     * @returns {Boolean}
     * @memberof SortedList
     */
    isEmpty() {
        return this.list.length === 0;
    }

    /**
     * Returns the first element of the list without removing it
     *
     * @returns {T}
     * @memberof SortedList
     */
    first() {
        return this.list[0];
    }

    /**
     * Returns the last element of the list without removing it
     *
     * @returns {T}
     * @memberof SortedList
     */
    last() {
        return this.list[this.list.length - 1];
    }

    /**
     * Adds an element in the queue, sorting by ascending element
     *
     * @param {T} element
     * @param {(toInsert: T, baseElement: T) => Boolean} comparator
     * @memberof SortedList
     */
    add(element, comparator = null) {
        const comp = comparator || this.comparator;

        let i;
        for (i = 0; i < this.list.length; i++) {
            // Next condition is optimised for: this.ascending ? !comp(element, this.list[i] ) : comp(element, this.list[i] )
            if (!(this.ascending === comp(element, this.list[i] ) ) ) {
                break;
            }
        }
        
        
        this.list.splice(i, 0, element);
    }

    /**
     * Get the first element in the list and removes it
     *
     * @returns {T}
     * @memberof SortedList
     */
    shift() {
        return this.list.shift();
    }

    /**
     * Get the last element in the list and removes it
     *
     * @returns {T}
     * @memberof SortedList
     */
    pop() {
        return this.list.pop();
    }
}

export default SortedList;
