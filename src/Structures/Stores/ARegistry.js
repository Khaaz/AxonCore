/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

import Collection from '../../Utility/Collection';

/**
 * Abstract class to hold and manage a set of items.
 *
 * @author KhaaZ
 *
 * @prop {AxonClient} _axon - The AxonClient
 * @prop {Collection<*>} registry - The collection of items hold by the registry
 *
 * @abstract
 * @class ARegistry
 */
class ARegistry {
    /**
     * Creates an instance of ARegistry.
     *
     * @param {AxonClient} axon - The AxonClient
     * @param {Object} base - The base definition to use for the registry
     * @memberof ARegistry
     */
    constructor(axon, base) {
        if (this.constructor === 'ARegistry') {
            throw new NoAbstractInstanceException();
        }
        this._axon = axon;
        this.registry = new Collection( { base } );
    }

    /**
     * Get the AxonClient
     *
     * @readonly
     * @memberof ARegistry
     */
    get axon() {
        return this._axon;
    }

    /**
     * Get the size of the registry
     *
     * @readonly
     * @memberof ARegistry
     */
    get size() {
        return this.registry.size;
    }

    /**
     * Check whether the item exist in the registry
     *
     * @param {String} key
     * @returns {Boolean} - Whether the item exist
     * @memberof ARegistry
     */
    has(key) {
        return this.registry.has(key);
    }

    /**
     * Get an item from the registry
     *
     * @param {String} key
     * @returns {Object} - The item
     * @memberof ARegistry
     */
    get(key) {
        return this.registry.get(key.toLowerCase() );
    }

    /**
     * Get the registry
     *
     * @returns {Collection} - The current registry
     * @memberof CommandRegistry
     */
    getAll() {
        return this.registry;
    }

    /**
     * Add an item to the registry
     *
     * @param {String} key
     * @param {Object} value
     * @param {Collection} - The registry
     */
    add(key, value) {
        return this.registry.set(key.toLowerCase(), value);
    }

    /**
     * Remove an item from the registry
     *
     * @param {String} key
     * @param {Boolean} - Whether it could remove the item or not
     */
    remove(key) {
        return this.registry.delete(key);
    }

    // for - of directly on the registry
    [Symbol.iterator]() {
        return this.registry[Symbol.iterator]();
    }

    /**
     * Register correctly an item in the registry.
     *
     * @param {String} key
     * @param {Object} value
     * @memberof ARegistry
     */
    register(key, value) {
        throw new NotImplementedException();
    }

    /**
     * Unregister correctly an item from the registry.
     *
     * @param {String} key
     * @param {Object} value
     * @memberof ARegistry
     */
    unregister(key, value) {
        throw new NotImplementedException();
    }
}

export default ARegistry;
