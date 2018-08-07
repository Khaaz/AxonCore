'use strict';

import util from 'util';

/**
 * Base Class with default methods used by all Commands / Modules / Events
 * toString
 * toJson
 * inspect
 *
 * Based of Eris.Base
 * 
 * @author KhaaZ
 * 
 * @class Base
 */
class Base {
    constructor(axonClient) {
        this._axon = axonClient;
    }

    //
    // ****** GETTER ******
    //

    get axon() {
        return this._axon;
    }

    get bot() {
        return this._axon.client;
    }

    get Logger() {
        return this._axon.Logger;
    }

    get Resolver() {
        return this._axon.Resolver;
    }

    get AxonUtils() {
        return this._axon.AxonUtils;
    }

    get Utils() {
        return this._axon.Utils;
    }

    //
    // ****** MISC ******
    //

    toString() {
        return this.constructor.name;
    }

    toJSON() {
        const base = {};
        for(const key in this) {
            if(!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_')) {
                if(!this[key]) {
                    base[key] = this[key];
                } else if(this[key] instanceof Set) {
                    base[key] = Array.from(this[key]);
                } else if(this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values());
                } else if(typeof this[key].toJSON === 'function') {
                    base[key] = this[key].toJSON();
                } else {
                    base[key] = this[key];
                }
            }
        }
        return base;
    }

    [util.inspect.custom]() {
        // http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new {[this.constructor.name]: class {}}[this.constructor.name]();
        for(const key in this) {
            if(this.hasOwnProperty(key) && !key.startsWith('_') && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
}


export default Base;
