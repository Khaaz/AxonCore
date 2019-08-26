import Member from '../../definitions/Member';

class DjsMember extends Member {
    // **** GETTERS / SETTERS **** //

    getRoles(member) {
        return member.roles.keys();
    }

    getRolesObject(member) {
        return [...member.roles.values()];
    }

    hasPermission(member, permission) {
        return member.hasPermission(permission);
    }
}

export default DjsMember;
