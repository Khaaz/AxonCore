import NoAbstractInstanceException from '../Errors/NoAbstractInstanceException';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * Abstract class for handlers.
 * Events root handlers.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class Handler
 *
 * @prop {Object<AxonClient>} _axon
 * @prop {String} name
 * @prop {Array<Listener>} _listeners
 */
class Handler {
    /**
     * Creates an instance of Handler.
     *
     * @param {Object<AxonClient>} axon
     * @param {String} name
     * @param {Array<Listener>} listeners
     *
     * @memberof Handler
     */
    constructor(axon, name, listeners) {
        if (this.constructor === 'Handler') {
            throw new NoAbstractInstanceException();
        }

        this._axon = axon;

        this.name = name;
        this._listeners = listeners;

        this._handle = this._handle.bind(this);
    }

    /**
     * Returns the sizeof an Handler (number of listeners)
     *
     * @readonly
     * @type {Number}
     * @memberof Handler
     */
    get size() {
        return this._listeners.length;
    }

    async _handle(...args) {
        const guildID = this.handle(...args);

        // Tries to resolve guildConf if there is a guild
        const guildConfig = guildID ? await this._axon.guildConfigs.getOrFetch(guildID) : null;

        // Ignore blacklisted guilds
        if (guildID && this._axon.axonConfig.isBlacklistedGuild(guildID) ) {
            return;
        }
        for (const listener of this._listeners) {
            if (!listener.load || !listener.module.enabled || !listener.enabled) { // globally disabled
                continue;
            }
            // Ignore guild disabled Module/Event
            if (guildConfig && (
                (guildConfig.isModuleDisabled(listener.module) && !listener.module.serverBypass) || (guildConfig.isListenerDisabled(listener) && !listener.serverBypass) ) ) {
                continue;
            }
            this._axon._execListener(listener, guildConfig, ...args);
        }
    }

    /**
     * Takes the event parameters as arguments and returns the guild ID if possible or null.
     *
     * @param {Object} args - All parameters for this event
     * @returns {String|null} The guild ID
     *
     * @memberof Handler
     */
    handle(...args) { // eslint-disable-line no-unused-vars
        throw new NotImplementedException();
    }
}

export default Handler;
