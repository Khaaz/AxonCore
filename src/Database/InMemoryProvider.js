import ADBProvider from './ADBProvider';
import AxonConfig from '../Structures/DataStructure/AxonConfig';
import GuildConfig from '../Structures/DataStructure/GuildConfig';

/**
 * A schema designed use an InMemory solution in AxonCore
 *
 * @author VoidNulll
 *
 * @class InMemoryProvider
 * @extends ADBProvider
 */
class InMemoryProvider extends ADBProvider {
    init() {
        return;
    }

    async fetchAxon() {
        let { axonConfig } = this.axon;
        if (!axonConfig) {
            axonConfig = await this.initAxon();
        }
        return axonConfig;
    }

    async fetchGuild(gID) {
        let guildConfig = this.axon.guildConfigs.get(gID);
        if (!guildConfig) {
            guildConfig = await this.initGuild(gID);
        }
        return guildConfig;
    }

    async initAxon() {
        return new AxonConfig(this.axon, {
            prefix: this.axon.settings.prefixes[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        } );
    }

    async initGuild(gID) {
        return new GuildConfig(this.axon, {
            guildID: gID,
            prefixes: [this.axon.settings.prefixes[0]],
            createAt: new Date(),
            updatedAt: new Date(),
        } );
    }

    async saveAxon(axonSchema) {
        return new AxonConfig(this.axon, axonSchema);
    }

    async saveGuild(gID, guildSchema) {
        return new GuildConfig(this.axon, guildSchema);
    }

    async updateGuild(key, gID, value) {
        const guildConf = await this.fetchGuild(gID);
        guildConf[key] = value;
        guildConf.updatedAt = new Date();
        this.axon.guildConfigs.set(gID, guildConf);
        return true;
    }

    async updateAxon(key, value) {
        const axonConf = await this.fetchAxon();
        axonConf[key] = value;
        axonConf.updatedAt = new Date();
        this.axon.axonConfig = axonConf;
        return true;
    }
}

export default InMemoryProvider;
