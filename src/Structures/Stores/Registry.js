/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from './../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

import Collection from './../../Utility/Collection';

/**
 * Abstract class to hold and manage a set of items.
 *
 * @author KhaaZ
 *
 * @prop {Object<AxonClient>} _axon - The AxonClient
 * @prop {Collection<*>} registry - The collection of items hold by the registry
 *
 * @class Registry
 */
class Registry {
    /**
     * Creates an instance of Registry.
     *
     * @param {Object<AxonClient>} axon - The AxonClient
     * @param {Object} base - The base definition to use for the registry
     *
     * @memberof Registry
     */
    constructor(axon, base) {
        if (this.constructor === 'Registry') {
            throw new NoAbstractInstanceException();
        }
        this._axon = axon;
        this.registry = new Collection( { base } );
    }

    /**
     * Get the AxonClient
     *
     * @readonly
     * @memberof Registry
     */
    get axon() {
        return this._axon;
    }

    /**
     * Get the size of the registry
     *
     * @readonly
     * @memberof Registry
     */
    get size() {
        return this.registry.size;
    }

    /**
     * Check whether the item exist in the registry
     *
     * @param {String} key
     * @returns {Boolean} - Whether the item exist
     * @memberof Registry
     */
    has(key) {
        return this.registry.has(key);
    }

    /**
     * Get an item from the registry
     *
     * @param {String} key
     * @returns {Object} - The item
     * @memberof Registry
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

    /**
     * Register correctly an item in the registry.
     *
     * @param {String} key
     * @param {Object} value
     * @memberof Registry
     */
    register(key, value) {
        throw new NotImplementedException();
    }

    /**
     * Unregister correctly an item from the registry.
     *
     * @param {String} key
     * @param {Object} value
     * @memberof Registry
     */
    unregister(key, value) {
        throw new NotImplementedException();
    }
}

export default Registry;
