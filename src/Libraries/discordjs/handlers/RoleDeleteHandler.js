import AHandler from '../../../Core/Event/AHandler';

class RoleDeleteHandler extends AHandler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleDeleteHandler;
