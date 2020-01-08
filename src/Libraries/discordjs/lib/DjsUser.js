import User from '../../definitions/User';

class DjsUser extends User {
    getDM(user) {
        return Promise.resolve(user.DMChannel);
    }
}

export default DjsUser;
