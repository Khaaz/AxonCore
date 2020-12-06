import User from '../../definitions/User';

/**
 * @typedef {import('eris').User} user
 * @typedef {import('eris').PrivateChannel} PrivateChannel
 */

class DetritusUser extends User {
    /**
     * @param {user} user
     * @returns {PrivateChannel}
     * @memberof ErisUser
     */
    getDM(user) {
        return this.lib.botClient.getDMChannel(user.id);
    }
}

export default DetritusUser;
