import {
    LibraryInterface, LibChannel, LibGuild, LibUser, AxonMSGCont, LibMessage, LibTextableChannel, LibMember,
} from '../../';

export declare class Channel {
    public lib: LibraryInterface;
    /**
     * Creates an instance of Channel
     * @memberof Channel
     */
    constructor(lib: LibraryInterface);
    /**
     * Gets the channel ID
     * @memberof Channel
     */
    public getID(channel: LibChannel): string;
    /**
     * Gets the channel name
     * @memberof Channel
     */
    public getName(channel: LibChannel): string | undefined;
    /**
     * Gets the guild the channel belongs to
     * @memberof Channel
     */
    public getGuild(channel: LibChannel): LibGuild | undefined;
    /**
     * Gets the guild ID the channel belongs to
     * @memberof Channel
     */
    public getGuildID(channel: LibChannel): string | null;
    /**
     * Gets the guild name the channel belongs to
     * @memberof Channel
     */
    public getGuildName(channel: LibChannel): string | null;
    /**
     * Whether the user has the perm in the channel
     * @memberof Channel
     */
    public hasPermission(channel: LibChannel, user: LibUser | LibMember, perm: string): boolean; // Not Implemented
    /**
     * Send a message in the channel
     * @memberof Channel
     */
    public sendMessage<T extends LibTextableChannel = LibTextableChannel>(channel: T, content: AxonMSGCont): Promise<LibMessage<T> | LibMessage<T>[]>; // Not Implemented // LibMessage[] is for Discord.JS
}
