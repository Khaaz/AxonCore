import { LibraryInterface, LibUser, LibDMChannel } from '../../../';

export declare class User {
    public lib: LibraryInterface;
    /**
     * Creates an instance of User
     * @memberof User
     */
    constructor(lib: LibraryInterface);
    /**
     * User ID
     * @memberof User
     */
    getID(user: LibUser): string;
    /**
     * User's username
     * @memberof User
     */
    getUsername(user: LibUser): string;
    /**
     * User's discrim
     * @memberof User
     */
    getDiscriminator(user: LibUser): string;
    /**
     * User's username+discrim
     * @memberof User
     */
    getTag(user: LibUser): string;
    /**
     * If user is a bot
     * @memberof User
     */
    isBot(user: LibUser): boolean;
    /**
     * Get the DM channel for this user.
     *
     * @returns The DM channel
     * @memberof User
     */
    getDM(user: LibUser): Promise<LibDMChannel>;
}
