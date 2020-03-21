import AHandler from '../../../Core/Event/AHandler';

class RoleCreateHandler extends AHandler {
    handle(role) {
        return role.guild.id;
    }
}

export default RoleCreateHandler;
