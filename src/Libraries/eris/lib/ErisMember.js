import Member from '../../definitions/Member';

class ErisMember extends Member {
    // **** GETTERS / SETTERS **** //

    getRoles(member) {
        return member.roles;
    }

    getRolesObject(member) {
        const { guild } = member;
        return member.roles.map(r => guild.roles.get(r) );
    }

    hasPermission(member, permission) {
        return member.permission.has(permission);
    }
}

export default ErisMember;
