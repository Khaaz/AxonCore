
class Member {
    public lib: LibraryInterface;
    /**
     * Creates an instance of Member
     * @memberof Member
     */
    constructor(lib: LibraryInterface);
    /**
     * Guild member ID
     * @memberof Member
     */
    getID(member: LibMember): string;
    /**
     * Returns Roles ids
     *
     * @returns Array of roles IDs
     * @memberof Member
     */
    getRoles(member: LibMember): string[]; // Not Implemented
    /**
     * Returns Roles object
     *
     * @returns Array of Roles object
     * @memberof Member
     */
    getRolesObject(member: LibMember): LibRole[]; // Not Implemented
    /**
     * Whether the member has this permission or not
     * @memberof Member
     */
    hasPermission(member: LibMember, permission: string): boolean; // Not Implemented
}
