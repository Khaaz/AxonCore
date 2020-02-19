/**
 * @typedef {import('../Structures/Module').default} Module
 */

/**
 * Custom error with better formatting + information about where the error is originated from.
 * Used for errors thrown by the client (Object validity / internal). (general error)
 *
 * @author KhaaZ
 *
 * @class AxonError
 * @extends Error
 */
class AxonError extends Error {
    /**
     * Creates an instance of AxonError.
     *
     * @param {String} message - custom error message
     * @param {Module|String} module Module in which the error originated from
     * @param {String} [subModule=null] Module in which the error originated from
     * @memberof AxonError
     */
    constructor(message, module, subModule = null) {
        super();

        this.module = (typeof module === 'string') ? module : module.label;
        this.subModule = subModule;

        const short = `[${this.module}] ${subModule && subModule.length ? `| ${subModule} ` : ''}- ${message}`;
        
        Object.defineProperty(this, 'short', {
            value: short,
            writable: false,
        } );

        Object.defineProperty(this, 'message', {
            value: short,
            writable: false,
        } );
    }

    get name() {
        return this.constructor.name;
    }
}

export default AxonError;
