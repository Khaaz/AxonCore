import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('./Listener').default} Listener
 */

/**
 * Abstract class for handlers.
 * Events root handlers.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class AHandler
 *
 * @prop {AxonClient} _axon
 * @prop {String} name
 * @prop {Array<Listener>} _listeners
 */
class AHandler {
    /**
     * Creates an instance of AHandler.
     *
     * @param {AxonClient} axon
     * @param {String} name
     * @param {Array<Listener>} listeners
     * @memberof AHandler
     */
    constructor(axon, name, listeners) {
        if (this.constructor === 'AHandler') {
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
     * @memberof AHandler
     */
    get size() {
        return this._listeners.length;
    }

    async _handle(...args) {
        const guildID = this.handle(...args);

        // Tries to resolve guildConf if there is a guild
        try {
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
                this._axon.executor.listener(listener, guildConfig, ...args);
            }
        } catch (err) {
            // this should never happen but exist for safety reason in order to not crash all other currently running listeners
            console.error('AHandler::_handle - ', err);
        }
    }

    /**
     * Takes the event parameters as arguments and returns the guild ID if possible or null.
     *
     * @param {...any} args - All parameters for this event
     * @returns {String|null} The guild ID
     * @memberof AHandler
     */
    handle(...args) { // eslint-disable-line no-unused-vars
        throw new NotImplementedException();
    }
}

export default AHandler;
