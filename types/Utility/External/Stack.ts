
/**
 * Stack class.
 *
 * @author KhaaZ
 *
 * @class Stack
 */
export declare class Stack<T> {
    private _elements: T[];
    public max: number;
    public replaceOnMax: boolean;
    /**
     * Creates an instance of Stack.
     *
     * @param max - Maximum number of elements that can be added in this stack
     * @param replaceOnMax - Whether to replace value when adding if max is reached (unstack first element and stack new element)
     * @memberof Stack
     */
    constructor(max?: number, replaceOnMax?: boolean);
    /**
    * Returns the Stack size
    *
    * @readonly
    * @memberof Stack
    */
    readonly size: number;

    /**
     * Return first element of this stack (top of the Stack).
     *
     * @memberof Stack
     */
    public first(): T;
    /**
     * Stack up an element.
     *
     * @returns Whether element was successfully added
     * @memberof Stack
     */
    public stack(elem: T, replaceOnMax?: boolean): boolean;
    /**
     * Unstack an element and returns it
     *
     * @memberof Stack
     */
    public destack(): T;
}
