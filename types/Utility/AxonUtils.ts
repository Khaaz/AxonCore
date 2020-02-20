
/**
 * AxonCore Utility Class.
 *
 * AxonCore specific methods + internal uses
 *
 * @author KhaaZ
 *
 * @class AxonUtils
 */
export declare class AxonUtils {
    /**
     * Axon Client
     */
    private _axon: AxonClient;
    /**
     * Creates an AxonUtils instance.
     *
     * @memberof AxonUtils
     */
    constructor(axon: AxonClient);
    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @memberof AxonUtils
     */
    readonly axon: AxonClient;
    /**
     * Returns the BotClient instance
     *
     * @readonly
     * @memberof AxonUtils
     */
    readonly bot: LibClient;
    /**
     * Returns the template object
     *
     * @readonly
     * @memberof AxonUtils
     */
    readonly template: AxonTemplate;
    /**
     * Returns the Logger instance
     *
     * @readonly
     * @memberof AxonUtils
     */
    readonly logger: ALogger;
    /**
     * Returns the Utils instance
     *
     * @readonly
     * @memberof AxonUtils
     */
    readonly utils: Utils;
    /**
     * Returns the LibraryInterface instance
     *
     * @readonly
     * @memberof AxonUtils
     */
    readonly library: LibraryInterface;

    /**
     * Trigger an Axon Webhook.
     * Works directly with axon._configs.webhooks.
     *
     * @param type - Type of the webhook [status, loader, error, misc]
     * @param embed - Embed object
     * @param opt - Optional string to use as bot username
     * @memberof AxonUtils
     */
    public triggerWebhook(type: string, embed: EmbedData, opt?: string): void;
    /**
     * Check if the user is a bot owner.
     *
     * @param uID - the user ID
     * @memberof AxonUtils
     */
    public isBotOwner(uID: string): boolean;
    /**
     * Check if the user is a bot admin.
     *
     * @param uID - the user ID
     * @memberof AxonUtils
     */
    public isBotAdmin(uID: string): boolean;
    /**
     * Check if the user is part of the bot staff.
     *
     * @param uID - the user ID
     * @memberof AxonUtils
     */
    public isBotStaff(uID: string): boolean;
    /**
     * Check if the user is a moderator or higher. Admins are also moderators.
     * Managers, Admins and Owner are automatically Mod.
     *
     * @param member - The member object
     * @param guildConfig - The guild Config from the DB
     * @returns True if user is a mod / False if not
     * @memberof AxonUtils
     */
    public isServerMod(member: LibMember, guildConfig: GuildConfig): boolean;
    /**
     * Check is the user is a server manager (manage server permission).
     * Admin and Owner are automatically Manager.
     *
     * @param member - The member object
     * @returns True if admin / False if not
     * @memberof AxonUtils
     */
    public isServerManager(member: LibMember): boolean;
    /**
     * Check is the user is an admin (administrator permission).
     * Owner is automatically Admin.
     *
     * @param member - The member object
     * @returns True if admin / False if not
     * @memberof AxonUtils
     */
    public isServerAdmin(member: LibMember): boolean;
    /**
     * Check is the user is the server owner.
     *
     * @param member - The member object
     * @returns True if admin / False if not
     * @memberof AxonUtils
     */
    public isServerOwner(member: LibMember, guild: LibGuild): boolean;

    /**
     * Message the targeted user if the bot is able to retrieve their DM channel.
     * Reject promise if not
     *
     * @param user - User object to get the DM channel
     * @param content - String or object (embed)
     * @param options - Options
     * @param options.disableEveryone - Whether to allow mentioning everyone or not
     * @param options.delete - Whether to delete the message or not
     * @param options.delay - Delay after which the message will be deleted
     * @returns Message Object
     * @memberof AxonUtils
     */
    public sendDM(user: LibUser, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage>;
    /**
     * Send a message.
     * Checks for bot permissions + message/embed length.
     * Doesn't support file uploads.
     *
     * @param channel - The channel Object
     * @param content - Message content: String or Embed Object
     * @param options - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param options.disableEveryone - Whether to allow mentioning everyone or not
     * @param options.delete - Whether to delete the message or not
     * @param options.delay - Delay after which the message will be deleted
     * @returns Message Object
     * @memberof AxonUtils
     */
    public sendMessage(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage>;
    /**
     * Edit a message.
     * Checks for bot permissions + message embed/length.
     *
     * @param message - The message object to edit
     * @param content - Object (embed) or String
     * @returns Message Object
     * @memberof AxonUtils
     */
    public editMessage(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;

    /**
     * Enables or disables a module globally.
     *
     * @param module - Module name
     * @param state - Whether to enable or disable
     * @memberof AxonClient
     */
    public updateGlobalStateModule(module: string, state?: boolean): void;
    /**
     * Enables or disables a command globally.
     *
     * @param command - Command name
     * @param state - Whether to enable or disable
     * @memberof AxonClient
     */
    public updateGlobalStateCommand(command: string, state?: boolean): void;
}
