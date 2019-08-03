import Base from './Base';

/**
 * Default Listener class
 * Extends Listener to create an event
 *
 * @author KhaaZ
 *
 * @class Listener
 * @extends {Base}
 */
class Listener extends Base {
    /**
     * Creates an Listener instance.
     * @param {Object<Module>} module
     *
     * @prop {Object<Module>} module - Module object [GETTER: _module]
     * @prop {String} eventName - The discord event name
     * @prop {String} label - The listener name
     *
     * @prop {Boolean} load - Whether to load this event on startup or not
     * @prop {Boolean} [enabled=module.enabled] - Whether the event is enabled or not
     * @prop {Boolean} [serverBypass=module.serverBypass] - Can the event be disabled?
     *
     * @prop {Object} infos - Default infos about the event
     * @prop {Array} infos.owners - Listener owners/authors
     * @prop {String} infos.description - Listener description
     *
     * @memberof Listener
     */
    constructor(module) {
        super(module.axon);

        this._module = module;

        /** Listener Name (Discord name) */
        this.eventName = 'event';
        /** Listener name (Function name) */
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
     * @param {Object?} guildConfig - the guildConfig or undefined if not a guild event
     * @param {Array} args - Array of the events arguments
     * @returns {Promise}
     *
     * @memberof Listener
     */
    async _execute(guildConfig, ...args) {
        return this.execute(...args, guildConfig);
    }
}

export default Listener;
