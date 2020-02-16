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
     * @returns {Promise<AxonConfig>}
     */
    async updateGuildPrefix(gID, prefixArr) {
        return this.updateGuild('prefixes', gID, prefixArr);
    }

    /**
     * Update list of disabled modules
     * @param {String} gID Guild ID
     * @param {Array<String>} modulesArr Array of disabled modules
     * @returns {Promise<AxonConfig>}
     */
    updateModule(gID, modulesArr) {
        return this.updateGuild('modules', gID, modulesArr);
    }

    /**
     * Update list of disabled commands
     * @param {String} gID Guild ID
     * @param {Array<String>} commandArr Array of disabled commands
     * @returns {Promise<AxonConfig>}
     */
    updateCommand(gID, commandArr) {
        return this.updateGuild('commands', gID, commandArr);
    }

    /**
     * Update list of disabled events
     * @param {String} gID Guild ID
     * @param {Array<String>} eventArr Array of disabled events
     * @returns {Promise<AxonConfig>}
     */
    async updateEvent(gID, eventArr) {
        return this.updateGuild('listeners', gID, eventArr);
    }

    /**
     * @param {AxonConfig} axonSchema
     * @returns {AxonConfig}
     */
    saveAxonSchema(axonSchema) {
        this.axon.axonConfig = axonSchema;
        return axonSchema;
    }

    /**
     * @param {String} gID Guild ID
     * @param {GuildConfig} guildSchema
     * @returns {null} **CONFIRM WITH NULL*
     */
    saveGuildSchema(gID, guildSchema) {
        return this.axon.guildConfigs.set(gID, guildSchema);
    }

    /**
     * Update guild config
     * @param {String} key Value to update
     * @param {String} gID Guild ID
     * @param {updateDBVal} value What the value should be updated to
     * @returns {Promise<GuildConfig>}
     */
    async updateGuild(key, gID, value) {
        const guild = await this.fetchGuild(gID);
        guild[key] = value;
        this.saveGuildSchema(gID, guild);
        return guild;
    }

    /**
     * Update Axon config
     * @param {String} key Value to update
     * @param {updateDBVal} value What the value should be updated to
     * @returns {Promise<AxonConfig>}
     */
    async updateAxon(key, value) {
        let axonConf = this.axon.axonConfig;
        if (!axonConf) {
            axonConf = await this.initAxon();
        }
        axonConf[key] = value;
        return axonConf;
    }
}

export default InMemoryProvider;
