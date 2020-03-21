import User from '../../definitions/User';

/**
 * @typedef {import('discord.js').User} djsUser
 * @typedef {import('discord.js').DMChannel} DMChannel
 */

class DjsUser extends User {
    /**
     * @param {djsUser} user
     * @returns {Promise<DMChannel>}
     * @memberof DjsUser
     */
    getDM(user) {
        return user.createDM();
    }
}

export default DjsUser;
