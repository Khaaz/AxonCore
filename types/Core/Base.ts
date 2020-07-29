import {
    AxonClient, LibClient, ALogger, Resolver, AxonUtils, Utils, MessageManager, Module, Command, LOG_LEVELS,
    Ctx, LibUser, AxonMSGCont, AxonMSGOpt, LibMessage, LibTextableChannel, CommandResponse, LibDMChannel,
} from '../';

/**
 * Base Class with default properties and utility methods used by all Commands / Modules / Events.
 *
 * @author KhaaZ
 *
 * @class Base
 */
export declare class Base {
    /**
     * AxonClient
     */
    public _axon: AxonClient;

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @memberof Base
     */
    readonly axon: AxonClient;
    /**
     * Returns the bot client instance
     *
     * @readonly
     * @memberof Base
     */
    readonly bot: LibClient;
    /**
     * Returns the Logger instance
     *
     * @readonly
     * @memberof Base
     */
    readonly logger: ALogger;
    /**
     * Returns the Resolver class (Based on AxonClient.Resolver (default: use the current library Resolver))
     *
     * @readonly
     * @memberof Base
     */
    readonly Resolver: Resolver;
    /**
     * Returns the AxonUtils instance
     *
     * @readonly
     * @memberof Base
     */
    readonly axonUtils: AxonUtils;
    /**
     * Returns the Utils instance
     *
     * @readonly
     * @memberof Base
     */
    readonly utils: Utils;
    /**
     * Returns the MessageManager instance
     *
     * @readonly
     * @memberof Base
     */
    readonly l: MessageManager;
    /**
     * Creates an instance of Base.
     *
     * @memberof Base
     */
    constructor(axonClient: AxonClient);
    
    // Methods
    /**
     * Get a module from AxonClient with the label
     *
     * @param module - Module label
     * @memberof Base
     */
    public getModule(module: string): Module | null;
    /**
     * Get a command/subcommand from AxonClient with the full label
     *
     * @param fullLabel - Full command (or subcommand) label
     * @memberof Base
     */
    public getCommand(fullLabel: string): Command | null;

    /**
     * Log both to console and to the correct webhook
     *
     * @param level - The LOG-LEVEL
     * @param content - The content or the error to log
     * @param ctx - Additional context to be passed to logger
     * @param execWebhook - Whether to execute the webhook
     * @memberof AxonClient
     */
    public log(level: LOG_LEVELS, content: string | Error, ctx?: Ctx, execWebhook?: boolean): void;

    /**
     * DM targeted user if the bot is able to retrieve DM channel.
     * Reject promise if not
     *
     * @param user - User object to get the DM channel
     * @param content - String or object (embed)
     * @param options - Options
     * @param options.allowedMentions - Custom allowed mentions object
     * @param options.delete - Whether to delete the message or not
     * @param options.delay - Delay after which the message will be deleted
     * @returns Message Object
     * @memberof Base
     */
    public sendDM(user: LibUser, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage<LibDMChannel>|void>;
    /**
     * Send a message.
     * Check for bot permissions + message/embed length
     * Doesn't support file
     *
     * @param channel - The channel Object
     * @param content - Message content, String or Embed Object
     * @param options - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
     * @param options.allowedMentions - Custom allowed mentions object
     * @param options.delete - Whether to delete the message or not
     * @param options.delay - Delay after which the message will be deleted
     * @returns Message Object
     * @memberof Base
     */
    public sendMessage<T extends LibTextableChannel>(channel: T, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage<T>>;
    /**
     * Edit a message
     * Check for bot permissions + message embed/length
     *
     * @param message - The message object to edit
     * @param content - Object (embed) or String
     * @returns Message Object
     * @memberof Base
     */
    public editMessage<T extends LibTextableChannel>(message: LibMessage<T>, content: AxonMSGCont): Promise<LibMessage<T>>;
    /**
     * Send a success message. If the content is a string, suffix the success emote to the content.
     * Check for sendMessage perms.
     * Await for sendMessage to throw correctly potential errors.
     *
     * @param channel - The channel Object
     * @param content - Success message content
     * @param options - Additional options
     * @param options.allowedMentions - Custom allowed mentions object
     * @param options.delete - Whether to delete the message or not
     * @param options.delay - Delay after which the message will be deleted
     * @param options.triggerCooldown - Whether the command should trigger cooldown or not
     * @returns The successful Command Response
     * @memberof Base
     */
    public sendSuccess(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
    /**
     * Send an error message. If the content is a string, suffix the error emote to the content.
     * Check for sendMessage perms.
     * Await for sendMessage to throw correctly potential errors.
     *
     * @param channel - The channel Object
     * @param content - Success message content
     * @param options - Additional options
     * @param options.allowedMentions - Custom allowed mentions object
     * @param options.delete - Whether to delete the message or not
     * @param options.delay - Delay after which the message will be deleted
     * @param options.triggerCooldown - Whether the command should trigger cooldown or not
     * @param options.error - Whether the command should trigger cooldown or not
     * @returns The non successful Command Response
     * @memberof Base
     */
    public sendError(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
    /**
     * Handles errors and sends an error message/log.
     * Calls sendError().
     *
     * @param msg - The message Object
     * @param err - The error message
     * @param type - Type of error (api, db, internal)
     * @param errMsg - Optional error message
     * @returns The non successful Command Response
     * @memberof Base
     */
    public error(msg: LibMessage, err: Error, type: string, errMsg?: string): Promise<CommandResponse>;

    /**
     * Custom toString method.
     *
     * @memberof Base
     */
    public toString(): string;
    /**
     * Custom toJSON method.
     * (Based of Eris')
     *
     * @returns JSON-like Object
     * @memberof Base
     */
    public toJSON(): object;
}
