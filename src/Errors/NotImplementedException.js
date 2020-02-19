/**
 * Error thrown when a method not implemented (not overridden) is used.
 *
 * @author KhaaZ
 *
 * @class NotImplementedException
 * @extends Error
 */
class NotImplementedException extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NotImplementedException);

        Object.defineProperty(this, 'name', {
            value: 'NotImplementedException',
            writable: false,
        } );

        Object.defineProperty(this, 'message', {
            value: 'You didn\'t implement this method from the parent class.',
            writable: false,
        } );
    }
}

export default NotImplementedException;
