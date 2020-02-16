import ADBProvider from './ADBProvider';
import AxonConfig from '../Structures/DataStructure/AxonConfig';
import GuildConfig from '../Structures/DataStructure/GuildConfig';

/**
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 * @typedef {import('../Structures/DataStructure/AxonConfig')} AxonConfig
 */

/**
 * A schema designed use an InMemory solution in AxonCore
 *
 * @author VoidNull
 *
 * @class InMemoryProvider
 * @extends ADBProvider
 */
class InMemoryProvider extends ADBProvider {
    /**
     * @returns {AxonConfig}
     */
    async fetchAxon() {
        let axon = this.axon.axonConfig;
        if (!axon) {
            axon = await this.initAxon();
        }
        return Promise.resolve(axon);
    }

    init() {
        return;
    }

    /**
     * @param {String} gID Guild ID
     * @returns {Promise<GuildConfig>}
     */
    async fetchGuild(gID) {
        let guild = this.axon.guildConfigs.get(gID);
        if (!guild) {
            guild = await this.initGuild(gID);
        }
        return guild;
    }

    /**
     * @returns {Promise<AxonConfig>}
     */
    initAxon() {
        this.axon.axonConfig = new AxonConfig(this.axon, {} );
        return Promise.resolve(this.axon.axonConfig);
    }

    /**
     * @param {String} gID Guild ID
     * @returns {Promise<GuildConfig>}
     */
    initGuild(gID) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID } ) );
    }

    /**
     * Update the blacklist user list
     * @param {Array<String>} blacklistedUsers Array of blacklisted user IDs
     * @returns {Promise<AxonConfig>}
     */
    async updateBlacklistUser(blacklistedUsers) {
        return this.updateAxon('bannedUsers', blacklistedUsers);
    }

    /**
     * Update the blacklist guild list
     * @param {Array<String>} blacklistedGuilds Array of blacklisted guild IDs
     * @returns {Promise<AxonConfig>}
     */
    async updateBlacklistGuild(blacklistedGuilds) {
        return this.updateAxon('bannedGuilds', blacklistedGuilds);
    }

    /**
     * Update a guild's prefix
     * @param {String} gID Guild ID
     * @param {Array<String>} prefixArr Array of prefixes
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    async updateGuildPrefix(gID, prefixArr) {
        return this.updateGuild('prefixes', gID, prefixArr);
    }

    /**
     * Update list of disabled modules
     * @param {String} gID Guild ID
     * @param {Array<String>} modulesArr Array of disabled modules
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    updateModule(gID, modulesArr) {
        return this.updateGuild('modules', gID, modulesArr);
    }

    /**
     * Update list of disabled commands
     * @param {String} gID Guild ID
     * @param {Array<String>} commandArr Array of disabled commands
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    updateCommand(gID, commandArr) {
        return this.updateGuild('commands', gID, commandArr);
    }

    /**
     * Update list of disabled events
     * @param {String} gID Guild ID
     * @param {Array<String>} eventArr Array of disabled events
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    async updateEvent(gID, eventArr) {
        return this.updateGuild('listeners', gID, eventArr);
    }

    /**
     * @param {AxonConfig} axonSchema
     * @returns {Promise<AxonConfig>}
     */
    async saveAxon(axonSchema) {
        return new AxonConfig(this.axon, axonSchema);
    }

    /**
     * @param {String} gID Guild ID
     * @param {GuildConfig} guildSchema
     */
    async saveGuild(gID, guildSchema) {
        const guildConfig = new GuildConfig(this.axon, guildSchema);
        return guildConfig;
    }

    /**
     * Update guild config
     * @param {String} key Value to update
     * @param {String} gID Guild ID
     * @param {updateDBVal} value What the value should be updated to
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    async updateGuild(key, gID, value) {
        const guild = await this.fetchGuild(gID);
        guild[key] = value;
        this.axon.guildConfigs.set(gID, guild);
        return true;
    }

    /**
     * Update Axon config
     * @param {String} key Value to update
     * @param {updateDBVal} value What the value should be updated to
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    async updateAxon(key, value) {
        const axonConf = await this.fetchAxon();
        axonConf[key] = value;
        this.axon.axonConfig = axonConf;
        return true;
    }
}

export default InMemoryProvider;
