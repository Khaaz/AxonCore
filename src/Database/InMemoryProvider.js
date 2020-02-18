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
        return new AxonConfig(this.axon, {} );
    }

    async initGuild(gID) {
        return new GuildConfig(this.axon, { guildID: gID } );
    }

    async saveAxon(axonSchema) {
        return new AxonConfig(this.axon, axonSchema);
    }

    async saveGuild(gID, guildSchema) {
        return new GuildConfig(this.axon, guildSchema);
    }

    async updateGuild(key, gID, value) {
        const guild = await this.fetchGuild(gID);
        guild[key] = value;
        this.axon.guildConfigs.set(gID, guild);
        return true;
    }

    async updateAxon(key, value) {
        const axonConf = await this.fetchAxon();
        axonConf[key] = value;
        this.axon.axonConfig = axonConf;
        return true;
    }
}

export default InMemoryProvider;
