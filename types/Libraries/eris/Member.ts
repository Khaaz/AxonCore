
export declare class ErisMember extends Member {
    /**
     * @memberof ErisMember
     */
    public getRoles(member: Eris.Member): string[];
    /**
     * @memberof ErisMember
     */
    public getRolesObject(member: Eris.Member): Eris.Role[];
    /**
     * @memberof ErisMember
     */
    public hasPermission(member: Eris.Member, permission: ERIS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
}
