import Member from '../../definitions/Member';

class ErisMember extends Member {
    // **** GETTERS / SETTERS **** //

    getRoles(member) {
        return member.roles;
        // djs return member.roles.keys()
    }

    getRolesObject(member) {
        const { guild } = member;
        return member.map(r => guild.roles.get(r) );
        // djs return [...member.roles.values()]
    }

    hasPermission(member, permission) {
        return member.permission.has(permission);
        // djs return member.hasPermission(permission)
    }
}

export default ErisMember;
