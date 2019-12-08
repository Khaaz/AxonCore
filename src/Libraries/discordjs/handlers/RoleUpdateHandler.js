import Handler from '../../../Structures/Event/Handler';

class RoleUpdateHandler extends Handler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleUpdateHandler;
