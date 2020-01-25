import ADBProvider from './ADBProvider';
import AxonConfig from '../Structures/DataStructure/AxonConfig';
import GuildConfig from '../Structures/DataStructure/GuildConfig';

/**
 * A schema designed use an InMemory solution in AxonCore
 *
 * @author VoidNull
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

    saveAxonSchema(axonSchema) {
        this.axon.axonConfig = axonSchema;
        return axonSchema;
    }

    saveGuildSchema(gID, guildSchema) {
        return this.axon.guildConfigs.set(gID, guildSchema);
    }

    async updateGuild(key, gID, value) {
        const guild = await this.fetchGuild(gID);
        guild[key] = value;
        this.saveGuildSchema(gID, guild);
        return guild;
    }

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
