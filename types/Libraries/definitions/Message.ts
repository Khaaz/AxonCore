import {
    LibraryInterface, LibMessage, LibUser, LibMember, LibTextableChannel, LibGuild, AxonMSGCont,
} from '../..';

export declare class Message {
    public lib: LibraryInterface;
    /**
     * Creates an instance of Message
     * @memberof Message
     */
    constructor(lib: LibraryInterface);
    /**
     * Message ID
     * @memberof Message
     */
    getID(message: LibMessage): string;
    /**
     * Message content
     * @memberof Message
     */
    getContent(message: LibMessage): string;
    /**
     * Sets the message content
     * @param content Updated message content
     * @memberof Message
     */
    setContent(message: LibMessage, content: string): void;
    /**
     * Message author
     * @memberof Message
     */
    getAuthor(message: LibMessage): LibUser;
    /**
     * Message author ID
     * @memberof Message
     */
    getAuthorID(message: LibMessage): string;
    /**
     * Member who sent the message
     * @memberof Message
     */
    getMember(message: LibMessage): LibMember;
    /**
     * Member ID who sent the message
     * @memberof Message
     */
    getMemberID(message: LibMessage): string;
    /**
     * Message channel
     * @memberof Message
     */
    getChannel(message: LibMessage): LibTextableChannel;
    /**
     * Message channel ID
     * @memberof Message
     */
    getChannelID(message: LibMessage): string;
    /**
     * Message channel name
     * @memberof Message
     */
    getChannelName(message: LibMessage): string;
    /**
     * Guild the message belongs to
     * @memberof Message
     */
    getGuild(message: LibMessage): LibGuild;
    /**
     * Guild ID the message belongs to
     * @memberof Message
     */
    getGuildID(message: LibMessage): string;
    /**
     * Guild name the message belongs to
     * @memberof Message
     */
    getGuildName(message: LibMessage): string;
    /**
     * Delete the message
     * @memberof Message
     */
    delete(message: LibMessage): Promise<LibMessage | void>;
    /**
     * Edit the message
     * @memberof Message
     */
    edit(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;
}
