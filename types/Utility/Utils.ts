import {
    AxonClient, LibClient, LibraryInterface, LibMessage, LibGuild, LibMember, LibRole, LibTextableChannel, LibUser, PermissionObject,
} from '../';

/**
 * General Utility Class for AxonCore
 * All methods useful and usable everywhere
 *
 * @author KhaaZ
 *
 * @class Utils
 */
export declare class Utils {
    /**
     * AxonClient
     */
    private _axon: AxonClient;

    /**
     * Regular Expression to match a userMention
     */
    public userMention: RegExp;
    /**
     * Regular Expression to match a roleMention
     */
    public roleMention: RegExp;
    /**
     * Regular Expression to match a channelMention
     */
    public channelMention: RegExp;
    /**
     * Regular Expression to match an ID
     */
    public id: RegExp;
    /**
     * Regular Expression to match a hexCode
     */
    public hexCode: RegExp;
    /**
     * Returns the UserMention regex
     *
     * @readonly
     * @static
     * @memberof Utils
     */

    static readonly userMention: RegExp;
    /**
     * Returns the RoleMention regex
     *
     * @readonly
     * @static
     * @memberof Utils
     */
    static readonly roleMention: RegExp;
    /**
     * Returns the ChannelMention regex
     *
     * @readonly
     * @static
     * @memberof Utils
     */
    static readonly channelMention: RegExp;
    /**
     * Returns the ID regex
     *
     * @readonly
     * @static
     * @memberof Utils
     */
    static readonly id: RegExp;
    /**
     * Return the HexCode regex
     *
     * @readonly
     * @static
     * @memberof Utils
     */
    static readonly hexCode: RegExp;

    /**
     * Creates an instance of Utils.
     *
     * @memberof Utils
     */
    constructor(client: AxonClient);
    
    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @memberof Utils
     */
    readonly axon: AxonClient;
    /**
     * Returns the BotClient instance
     *
     * @readonly
     * @memberof Utils
     */
    readonly bot: LibClient;
    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @memberof Utils
     */
    readonly library: LibraryInterface;
    /**
     * Split the given content (String), according to correct linebreaks.
     * Split at 1900 characters.
     *
     * @returns The array of content string splitted or the original String
     * @memberof Utils
     */
    public splitMessage(content: string): string[] | string;
    /**
     * Returns the guild prefix of the given msg.
     *
     * @param msg - Message object given at the command.
     * @returns The prefix as string.
     * @memberof Utils
     */
    public getPrefix(msg: LibMessage): Promise<string>;
    /**
     * Get an array of role objects from a member.
     *
     * @returnsArray of roles object
     * @memberof Utils
     */
    public getRoles(guild: LibGuild, member: LibMember): LibRole[];
    /**
     * Get highest role of the given member.
     *
     * @returns Role Object
     * @memberof Utils
     */
    public getHighestRole(guild: LibGuild, member: LibMember): LibRole;
    /**
     * Sort a users roles from highest role to lowest role.
     *
     * @param array - The roles to sort
     * @returns Sorted array (per position) of Role Object
     * @memberof Utils
     */
    public sortRoles(roles: LibRole[] ): LibRole[];
    /**
     * Check if the first role is higher than the other.
     *
     * @memberof Utils
     */
    public isRoleHigher(role1: LibRole, role2: LibRole): boolean;
    /**
     * Check if the highest role of first is higher than the highest role of second
     *
     * @memberof Utils
     */
    public isHigherRole(guild: LibGuild, first: LibMember, second: LibMember): boolean;
    /**
     * Check if the member has correct permissions to execute
     *
     * @param member - Member object
     * @param permissions - List of permissions to test
     * @returns Whether the member has permissions or not
     *
     * @memberof Utils
     */
    public hasPerms(member: LibMember, permissions?: string[] ): boolean;
    /**
     * Check if the given user has correct permissions to execute in the specific channel.
     *
     * @param channel - Channel object
     * @param permissions - List of permissions to test
     * @param user - User to test
     * @returns Whether the member has permissions or not
     * @memberof Utils
     */
    public hasChannelPerms(channel: LibTextableChannel, permissions: string[], user?: LibUser): boolean;
    /**
     * List all missing permissions of the given user.
     *
     * @param permissions - List of permissions to test
     * @returns An array of missing permissions
     * @memberof Utils
     */
    public missingPerms(member: LibMember, permissions?: string[] ): string[];
    /**
     * Calculate permissions using a object of perms
     *
     * @param data - The permissions to calculate for
     * @returns Object containing the perms denied & allowed
     * @memberof Utils
     */
    public calculatePerms(data: PermissionObject): { allow: number; deny: number; };

    /**
     * Wait for a specified amount of milliseconds..
     *
     * @returns Resolve after the delay is passed
     * @memberof Utils
     */
    public sleep(ms: number): Promise<void>;
    /**
     * Promisified readFile method
     *
     * @returns Content
     * @memberof Utils
     */
    public readFileAsync(path: string): Promise<string>;
    /**
     * Promisified writeFile method
     *
     * @memberof Utils
     */
    public writeFileAsync(path: string, content: string): Promise<void>;
    /**
     * Ensures that all property names of obj1 exists in obj2.
     * Doesn't compare values. Except if it is an object, then it checks for property names recursively.
     *
     * @param obj1 - Default config/object
     * @param obj2 - Custom config/Object (Config/Object to compare with)
     * @returns True: obj2 has at least all prop of obj1
     * @memberof Utils
     */
    public static compareObject(obj1: object, obj2: object): boolean;
}
