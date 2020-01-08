/* eslint-disable no-unused-vars */
import NoAbstractInstanceException from '../../Errors/NoAbstractInstanceException';
import NotImplementedException from '../../Errors/NotImplementedException';

class Guild {
    constructor(lib) {
        this.lib = lib;
        if (this.constructor === 'Guild') {
            throw new NoAbstractInstanceException();
        }
    }
    
    // **** GETTERS / SETTERS **** //
    
    getID(guild) {
        return guild.id;
    }

    getName(guild) {
        return guild.name;
    }

    getOwnerID(guild) {
        return guild.ownerID;
    }

    getMember(guild, userID) {
        return guild.members.get(userID);
    }
}

export default Guild;
