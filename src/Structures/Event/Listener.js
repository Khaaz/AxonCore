import Base from '../Base';

import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * Default Listener class
 * Extends Listener to create an event
 *
 * @author KhaaZ
 *
 * @class Listener
 * @extends Base
 *
 * @prop {Module} _module - Module instance
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
 */
class Listener extends Base {
    /**
     * Creates an Listener instance.
     *
     * @param {Module} module
     * @param {Object} [data={}] - All events parameters
     * @param {String} [data.eventName]
     * @param {String} [data.label]
     * @param {Boolean} [data.load]
     * @param {Boolean} [data.enabled]
     * @param {Boolean} [data.serverBypass]
     * @param {Object} [data.infos]
     * @memberof Listener
     */
    constructor(module, data = {} ) {
        super(module.axon);

        this._module = module;

        /* Event Name (Discord name) */
        this.eventName = data.eventName || null;
        /* Listener name (Function name) */
        this.label = data.label || null;

        this.load = data.load !== undefined ? data.load : true;
        this.enabled = data.enabled !== undefined ? data.enabled : module.enabled;
        /* Bypass all perms - can/can't be server disabled */
        this.serverBypass = data.serverBypass !== undefined ? data.serverBypass : module.serverBypass;

        this.infos = data.infos || {
            owners: [],
            description: 'description',
        };
    }

    /**
     * Returns the parent Module instance
     *
     * @readonly
     * @type {Module}
     * @memberof Listener
     */
    get module() {
        return this._module;
    }

    /**
     * Promisify the return execute return to prevent promise issue
     *
     * @param {Object?} guildConfig - the guildConfig or undefined if not a guild event
     * @param {Array} args - Array of the events arguments
     * @returns {Promise}
     * @memberof Listener
     */
    async _execute(guildConfig, ...args) {
        return this.execute(...args, guildConfig);
    }

    /**
     * Main execute function, need to be overriden in child.
     *
     * @param {Array} args - Array of the events arguments (as separate parameters)
     * @param {GuildConfig?} guildConfig - The guildConfig or undefined if not a guild event
     * @returns {Promise}
     * @memberof Listener
     */
    // eslint-disable-next-line no-unused-vars
    async execute(args, guildConfig) {
        throw new NotImplementedException();
    }
}

export default Listener;
