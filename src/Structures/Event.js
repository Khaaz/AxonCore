'use strict';

import Base from './Base';

/**
 * Default Event class
 *
 * Extends Event to create an event
 *
 * @author KhaaZ
 *
 * @class Event
 * @extends {Base}
 */
class Event extends Base {
    /**
     * Creates an instance of Event.
     * @param {Object<Module>} module
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} Resolver - Resolver Object/Methods [GETTER: axon.Resolver]
     * @prop {Object} AxonUtils - AxonUtils Object/Methods [GETTER: axon.AxonUtils]
     * @prop {Object} Utils - Utils Object/Methods [GETTER: axon.Utils]
     *
     * @prop {Object<Module>} module - Module object [GETTER: _module]
     * @prop {String} eventName - The discord event name
     * @prop {String} label - The function name
     *
     * @prop {Boolean} load - Whether to load this event on startup or not
     * @prop {Boolean} [enabled=module.enabled] - Whether the event is enabled or not
     * @prop {Boolean} [serverBypass=module.serverBypass] - Command can't be server disabled
     *
     * @prop {Object} infos - Default infos about the event
     * @prop {Array} infos.owners - Event owners/authors
     * @prop {String} infos.description - Event description
     *
     * @memberof Event
     */
    constructor(module) {
        super(module.axon);

        this._module = module;

        /** Event Name (Discord name) */
        this.eventName = 'event';
        /** Event name (Function name) */
        this.label = 'label';

        this.load = true;
        this.enabled = module.enabled;
        /** Bypass all perms - can/can't be server disabled */
        this.serverBypass = module.serverBypass;

        this.infos = {
            owners: [],
            description: 'description',
        };
    }

    get module() {
        return this._module;
    }

    /**
     * Promisify the return execute return to prevent promise issue
     *
     * @param {Object?} guildConf - the guildConfig or undefined if not a guild event
     * @param {Array} args - Array of the events arguments
     * @returns {Promise}
     * @memberof Event
     */
    async _execute(guildConf, ...args) {
        return this.execute(...args, guildConf);
    }
}

export default Event;
