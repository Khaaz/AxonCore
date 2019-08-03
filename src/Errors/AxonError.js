/**
 * Custom error with better formatting + information about wherethe erroris originated from.
 * Used for errors thrown by the client (Object validity / internal). (general error)
 *
 * @author KhaaZ
 *
 * @class AxonError
 * @extends {Error}
 */
class AxonError extends Error {
    /**
     * Creates an instance of AxonError.
     *
     * @param {String} message - custom error message
     * @param {Object<Module>|String} module Module in which the error originated from
     * @param {String} [subModule=''] Module in which the error originated from
     * @memberof AxonError
     */
    constructor(message, module, subModule = '') {
        super();


        this.module = (typeof module === 'string') ? module : module.label;
        this.subModule = subModule;

        const short = `[${this.module}] ${(subModule.length > 0) ? `| ${subModule} ` : ''}- ${message}`;
        
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
