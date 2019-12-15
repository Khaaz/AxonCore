import DBService from './DBProvider';
import AxonConfig from '../Structures/DataStructure/AxonConfig';
import GuildConfig from '../Structures/DataStructure/GuildConfig';

/**
 * A schema designed to remove databases from AxonCore
 *
 * @author VoidNulll
 *
 * @class DatabaselessService
 * @extends DBService
 */
class DDBLessService extends DBService {
    // eslint-disable-next-line no-useless-constructor
    constructor(axonClient) {
        super(axonClient);
        this.databaseless = true;
    }

    // eslint-disable-next-line
    init(axonOptions = {} ) {

    }

    fetchAxon() {
        return Promise.resolve(new AxonConfig(this.axon, {} ) );
    }

    fetchGuild(gID) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID } ) );
    }

    initAxon() {
        return Promise.resolve(new AxonConfig(this.axon, {} ) );
    }

    initGuild(gID) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID } ) );
    }

    updateBlacklistUser(blacklistedUsers) {
        return Promise.resolve(new AxonConfig(this.axon, { bannedUsers: blacklistedUsers } ) );
    }

    updateBlacklistGuild(blacklistedGuilds) {
        return Promise.resolve(new AxonConfig(this.axon, { bannedGuilds: blacklistedGuilds } ) );
    }

    updateGuildPrefix(gID, prefixArr) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID, prefixes: prefixArr } ) );
    }

    updateModule(gID, modulesArr) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID, modules: modulesArr } ) );
    }

    updateCommand(gID, commandArr) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID, commands: commandArr } ) );
    }

    updateEvent(gID, eventArr) {
        return Promise.resolve(new GuildConfig(this.axon, { guildID: gID, listeners: eventArr } ) );
    }

    saveAxonSchema(axonSchema) {
        return Promise.resolve(new AxonConfig(this.axon, axonSchema) );
    }

    saveGuildSchema(gID, guildSchema) {
        return Promise.resolve(new GuildConfig(this.axon, guildSchema) );
    }
}

export default DDBLessService;
