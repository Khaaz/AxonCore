import User from '../../definitions/User';

class ErisUser extends User {
    getDM(user) {
        return this.lib.botClient.getDMChannel(user.id);
    }
}

export default ErisUser;
