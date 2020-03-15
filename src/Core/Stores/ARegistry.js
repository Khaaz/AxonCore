/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';
import AxonError from '../../Errors/AxonError';

import Store from '../../Utility/Store';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 */

/**
 * Abstract class to hold and manage a set of items.
 *
 * @author KhaaZ
 *
 * @template T
 * @abstract
 * @class ARegistry
 * @extends Store<T>
 * @prop {AxonClient} _axon - The AxonClient
 * @prop {T} _base - The base definition to use for the registry
 */
class ARegistry extends Store {
    /**
     * Creates an instance of ARegistry.
     *
     * @param {AxonClient} axon - The AxonClient
     * @param {T} base - The base definition to use for the registry
     * @memberof ARegistry
     */
    constructor(axon, base) {
        super(new Map() );
        if (this.constructor === 'ARegistry') {
            throw new NoAbstractInstanceException();
        }
        this._axon = axon;
        this._base = base;
    }

    /**
     * Get the AxonClient
     *
     * @readonly
     * @type {AxonClient}
     * @memberof ARegistry
     */
    get axon() {
        return this._axon;
    }

    /**
     * Returns the current registry
     *
     * @readonly
     * @type {Map<String, T>}
     * @memberof ARegistry
     */
    get registry() {
        return this.cache;
    }

    /**
     * Check whether the item exists in the registry
     *
     * @param {String} key
     * @returns {Boolean} - Whether the item exists
     * @memberof ARegistry
     */
    has(key) {
        return this.registry.has(key.toLowerCase() );
    }

    /**
     * Get an item from the registry
     *
     * @param {String} key
     * @returns {T} - The item
     * @memberof ARegistry
     */
    get(key) {
        return this.registry.get(key.toLowerCase() );
    }

    /**
     * Add an item to the registry
     *
     * @param {String} key
     * @param {T} value
     * @returns {ARegistry<T>} - The registry
     * @memberof ARegistry
     */
    add(key, value) {
        if (!(value instanceof this._base) ) {
            throw new AxonError('Incorrect Object type', 'REGISTRY');
        }
        this.registry.set(key.toLowerCase(), value);
        return this;
    }

    /**
     * Remove an item from the registry
     *
     * @param {String} key
     * @returns {Boolean} - Whether it removed the item or not
     * @memberof ARegistry
     */
    remove(key) {
        return this.registry.delete(key.toLowerCase() );
    }

    /**
     * Register correctly an item in the registry.
     *
     * @param {String} key
     * @param {T} value
     * @memberof ARegistry
     */
    register(key, value) {
        throw new NotImplementedException();
    }

    /**
     * Unregister correctly an item from the registry.
     *
     * @param {String} key
     * @param {T} value
     * @memberof ARegistry
     */
    unregister(key, value) {
        throw new NotImplementedException();
    }
}

export default ARegistry;
