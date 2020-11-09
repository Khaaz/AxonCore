import { Module } from '..';

/**
 * Custom error with better formatting + information about where the error is originated from.
 * Used for errors thrown by the client (Object validity / internal). (general error)
 *
 * @author KhaaZ
 *
 * @class AxonError
 * @extends Error
 */
export declare class AxonError extends Error {
    public module: string;
    public subMoule: string | null;
    /**
     * Creates an instance of AxonError.
     *
     * @param message - custom error message
     * @param module Module in which the error originated from
     * @param subModule Module in which the error originated from
     * @memberof AxonError
     */
    constructor(message: string, module: Module | string, subModule?: string | null);
    readonly short: string;
    readonly message: string;
    readonly name: string;
}
