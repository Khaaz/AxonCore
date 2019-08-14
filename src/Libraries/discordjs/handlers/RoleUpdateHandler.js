import Handler from '../../../Structures/Handler';

class RoleUpdateHandler extends Handler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleUpdateHandler;
