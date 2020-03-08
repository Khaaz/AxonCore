import AHandler from '../../../Core/Event/AHandler';

class RoleUpdateHandler extends AHandler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleUpdateHandler;
