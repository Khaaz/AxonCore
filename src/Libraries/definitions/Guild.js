/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

/**
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 */

class Guild {
    /**
     * Creates an instance of Guild
     * @param {LibraryInterface} lib
     */
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Guild') {
            throw new NoAbstractInstanceException();
        }
    }
    
    // **** GETTERS / SETTERS **** //
    
    /**
     * Guild ID
     * @param {Guild} guild
     * @returns {String}
     * @memberof Guild
     */
    getID(guild) {
        return guild.id;
    }

    /**
     * Guild name
     * @param {Guild} guild
     * @returns {String}
     * @memberof Guild
     */
    getName(guild) {
        return guild.name;
    }

    /**
     * Guild owner ID
     * @param {Guild} guild
     * @returns {String}
     * @memberof Guild
     */
    getOwnerID(guild) {
        return guild.ownerID;
    }

    /**
     * Guild member
     * @param {Guild} guild
     * @param {String} userID
     * @memberof Guild
     */
    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default Guild;
