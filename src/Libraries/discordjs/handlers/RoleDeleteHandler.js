import AHandler from '../../../Structures/Event/AHandler';

class RoleDeleteHandler extends AHandler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleDeleteHandler;
