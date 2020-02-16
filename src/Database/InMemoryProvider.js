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

    async fetchGuild(gID) {
        let guild = this.axon.guildConfigs.get(gID);
        if (!guild) {
            guild = await this.initGuild(gID);
        }
        return guild;
    }

    initAxon() {
        this.axon.axonConfig = new AxonConfig(this.axon, {} );
        return Promise.resolve(this.axon.axonConfig);
    }

    initGuild(gID) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID } ) );
    }

    async updateBlacklistUser(blacklistedUsers) {
        return this.updateAxon('bannedUsers', blacklistedUsers);
    }

    async updateBlacklistGuild(blacklistedGuilds) {
        return this.updateAxon('bannedGuilds', blacklistedGuilds);
    }

    async updateGuildPrefix(gID, prefixArr) {
        return this.updateGuild('prefixes', gID, prefixArr);
    }

    updateModule(gID, modulesArr) {
        return this.updateGuild('modules', gID, modulesArr);
    }

    updateCommand(gID, commandArr) {
        return this.updateGuild('commands', gID, commandArr);
    }

    async updateEvent(gID, eventArr) {
        return this.updateGuild('listeners', gID, eventArr);
    }

    async saveAxon(axonSchema) {
        return new AxonConfig(this.axon, axonSchema);
    }

    async saveGuild(gID, guildSchema) {
        const guildConfig = new GuildConfig(this.axon, guildSchema);
        return guildConfig;
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
