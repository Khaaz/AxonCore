/**
 * Error thrown when an abstract class is instantiated.
 *
 * @author KhaaZ
 *
 * @class NoAbstractInstanceException
 * @extends Error
 */
class NoAbstractInstanceException extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NoAbstractInstanceException);

        Object.defineProperty(this, 'name', {
            value: 'NoAbstractInstanceException',
            writable: false,
        } );

        Object.defineProperty(this, 'message', {
            value: 'You cannot instantiate abstract class.',
            writable: false,
        } );
    }
}

export default NoAbstractInstanceException;
