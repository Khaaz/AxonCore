import Handler from '../../../Structures/Event/Handler';

class RoleDeleteHandler extends Handler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleDeleteHandler;
