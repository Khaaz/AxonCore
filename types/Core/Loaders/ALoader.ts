/**
 * Abstract class for loaders.
 * Module Loader, Command Loader, Listener Loader
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ALoader
 */
export declare class ALoader<T> {
    /** The object in which we are loading items */
    public loadIn: T;
    /**
     * Creates an instance of ALoader.
     *
     * @memberof ALoader
     */
    constructor(loadIn: T);
    /**
     * Loads the object given in parameter.
     *
     * @param toLoad - The Object to load
     * @returns Whether it worked
     * @memberof ALoader
     */
    public load(toLoad: any, ...args: any[] ): boolean; // Not implemented
    /**
     * Loads all objects given in parameters.
     *
     * @param toLoad - All Objects to load
     * @returns Whether it worked
     * @memberof ALoader
     */
    public loadAll(toLoad: any): boolean; // Not implemented
    /**
     * Unload the object given in parameter.
     *
     * @returns Whether it worked
     * @memberof ALoader
     */
    public unload(toUnload: any): boolean; // Not implemented
}
