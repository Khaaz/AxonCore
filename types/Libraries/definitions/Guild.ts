import { LibraryInterface, LibGuild, LibMember } from '../../';
export declare class Guild {
    public lib: LibraryInterface
    /**
     * Creates an instance of Guild
     * @memberof Guild
     */
    constructor(lib: LibraryInterface);
    /**
     * Guild ID
     * @memberof Guild
     */
    getID(guild: LibGuild): string;
    /**
     * Guild name
     * @memberof Guild
     */
    getName(guild: LibGuild): string;
    /**
     * Guild owner ID
     * @memberof Guild
     */
    getOwnerID(guild: LibGuild): string;
    /**
     * Guild member
     * @memberof Guild
     */
    getMember(guild: LibGuild, userID: string): LibMember;
}
