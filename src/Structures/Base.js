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
    constructor() {
    }

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

    inspect() {
        // http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new (new Function(`return function ${this.constructor.name}(){}`)());
        for(const key in this) {
            if(this.hasOwnProperty(key) && !key.startsWith('_') && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
}

// Node 6+ util.custom.inspect symbol support - https://github.com/nodejs/node/issues/15549
if(util.inspect.custom) {
    Base.prototype[util.inspect.custom] = Base.prototype.inspect;
}

export default Base;
