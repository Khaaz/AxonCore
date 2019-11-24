import Handler from '../../../Structures/Event/Handler';

class RoleCreateHandler extends Handler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleCreateHandler;
