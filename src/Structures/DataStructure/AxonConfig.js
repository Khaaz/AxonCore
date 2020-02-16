/**
 * Default AxonConfig data structure used in AxonCore.
 * This class can be extended and changed as you want.
 * All methods flagged with "is used internally" can be overriden but need to keep the same name.
 *
 * @author KhaaZ
 *
 * @class AxonConfig
 *
 * @prop {String} id
 * @prop {String} prefix
 *
 * @prop {Date} createdAt
 * @prop {Date} updatedAt
 * @prop {Array<String>} [bannedUsers=[]] - Array of users that can't use bot commands
 * @prop {Array<String>} [bannedGuilds=[]] - Array of guilds where bot commands cannot be used
 */
class AxonConfig {
    /**
     * Creates an instance of AxonConfig.
     *
     * @param {AxonClient} axon
     *
     * @param {Object} values DB values for the current Guild
     * @memberof AxonConfig
     */
    constructor(axon, values) {
        this._axon = axon;

        this.id = values.id || '1';
        this.prefix = values.prefix || axon.settings.prefixes[0];

        this.createdAt = values.createdAt || new Date();
        this.updatedAt = values.updatedAt || new Date();

        this.bannedUsers = values.bannedUsers || [];
        this.bannedGuilds = values.bannedGuilds || [];
    }

    // **** CHECKERS (used IN the framework) **** //
    /* Can be overriden/changed but need to exists / keep the same name */
    //

    /**
     * Whether the user is blacklisted or not
     * *used internally*
     *
     * @param {String} userID
     * @returns {Boolean}
     * @memberof AxonConfig
     */
    isBlacklistedUser(userID) {
        return this.bannedUsers.includes(userID);
    }

    /**
     * Whether the guild is blacklisted or not
     * *used internally*
     *
     * @param {String} guildID
     * @returns {Boolean}
     * @memberof AxonConfig
     */
    isBlacklistedGuild(guildID) {
        return this.bannedGuilds.includes(guildID);
    }

    //
    // **** UPDATER - never used directly IN the framework **** //
    /* Easily overridable. Can be changed as will (even methods name etc) */
    //

    /**
     * Updates the state of a blacklisted user.
     * true = add the user, false = remove the user.
     * *not used internally*
     *
     * @param {String} userID - The guild ID
     * @param {Boolean} [boolean=true] - Whether to add (true) the user or remove (false) it.
     * @returns {Promise<AxonConfig|null>} Updated axonConfig / Error
     * @memberof AxonConfig
     */
    async updateBlacklistUser(userID, boolean = true) {
        if (boolean) {
            !this.isBlacklistedUser(userID) && this.bannedUsers.push(userID);
        } else {
            this.isBlacklistedUser(userID) && (this.bannedUsers = this.bannedUsers.filter(g => g === userID) );
        }

        return this._req('bannedGuilds', this.bannedUsers);
    }

    /**
     * Updates the state of a blacklisted guild.
     * true = add the guild, false = remove the guild.
     * *not used internally*
     *
     * @param {String} guildID - The guild ID
     * @param {Boolean} [boolean=true] - Whether to add (true) the guild or remove (false) it.
     * @returns {Promise<AxonConfig|null>} Updated axonConfig / Error
     * @memberof AxonConfig
     */
    async updateBlacklistGuild(guildID, boolean = true) {
        if (boolean) {
            !this.isBlacklistedGuild(guildID) && this.bannedGuilds.push(guildID);
        } else {
            this.isBlacklistedGuild(guildID) && (this.bannedGuilds = this.bannedGuilds.filter(g => g === guildID) );
        }

        return this._req('bannedGuilds', this.bannedGuilds);
    }

    async _req(key, value) {
        const newConf = await this._axon.DBProvider.updateAxon(key, value);
        return newConf ? this : null;
    }
}

export default AxonConfig;
