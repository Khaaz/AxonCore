
export declare class DjsMember extends Member {
    /**
     * @memberof DjsMember
     */
    getRoles(member: djs.GuildMember): string[];
    /**
     * @memberof DjsMember
     */
    getRolesObject(member: djs.GuildMember): djs.Role[];
    /**
     * @memberof DjsMember
     */
    hasPermission(member: djs.GuildMember, permission: DJS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
}
