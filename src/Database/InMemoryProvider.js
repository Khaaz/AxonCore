import ADBProvider from './ADBProvider';

/**
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 * @typedef {import('../Core/Models/AxonConfig')} AxonConfig
 * @typedef {{
 * id: String, prefix: String, createdAt: Date, updatedAt: Date, bannedUsers: Array<String>, bannedGuilds: Array<String>
 * }} AxonConfigRaw
 * @typedef {{
 * guildID: string, prefixes: Array<String>, createdAt: Date, updatedAt: Date, modules: Array<String>, commands: Array<String>, listeners: Array<String>,
 * ignoredUsers: Array<String>, ignoredRoles: Array<String>, ignoredChannels: Array<String>, modOnly: Boolean, modRoles: Array<String>, modUsers: Array<String>
 * }} GuildConfigRaw
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
    init() {
        return this;
    }

    /**
     * @async
     * @returns {Promise<AxonConfig>}
     */
    async fetchAxon() {
        let { axonConfig } = this.axon;
        if (!axonConfig) {
            axonConfig = await this.initAxon();
        }
        return axonConfig;
    }

    /**
     * @async
     * @param {String} gID Guild ID
     * @returns {Promise<GuildConfig>}
     */
    async fetchGuild(gID) {
        let guildConfig = this.axon.guildConfigs.get(gID);
        if (!guildConfig) {
            guildConfig = await this.initGuild(gID);
        }
        return guildConfig;
    }

    /**
     * @async
     * @returns {Promise<AxonConfig>}
     */
    async initAxon() {
        return new this.axon._axonConfig(this.axon, {
            prefix: this.axon.settings.prefixes[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        } );
    }

    /**
     * @async
     * @param {String} gID Guild ID
     * @returns {Promise<GuildConfig>}
     */
    async initGuild(gID) {
        return new this.axon._guildConfig(this.axon, {
            guildID: gID,
            prefixes: [this.axon.settings.prefixes[0]],
            createAt: new Date(),
            updatedAt: new Date(),
        } );
    }

    /**
     * @param {AxonConfig|AxonConfigRaw} axonSchema
     * @returns {Promise<AxonConfig>}
     */
    async saveAxon(axonSchema) {
        return new this.axon._axonConfig(this.axon, axonSchema);
    }

    /**
     * @param {String} gID Guild ID
     * @param {GuildConfig|GuildConfigRaw} guildSchema
     * @returns {Promise<GuildConfig>}
     */
    async saveGuild(gID, guildSchema) {
        return new this.axon._guildConfig(this.axon, guildSchema);
    }

    /**
     * Update guild config
     * @param {String} key Value to update
     * @param {String} gID Guild ID
     * @param {updateDBVal} value What the value should be updated to
     * @returns {Promise<Boolean>} Whether the request was successful or not
     */
    async updateGuild(key, gID, value) {
        const guildConf = await this.fetchGuild(gID);
        guildConf[key] = value;
        guildConf.updatedAt = new Date();
        this.axon.guildConfigs.set(gID, guildConf);
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
        axonConf.updatedAt = new Date();
        this.axon.axonConfig = axonConf;
        return true;
    }
}

export default InMemoryProvider;
