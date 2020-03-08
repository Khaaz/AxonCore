import {
    CommandOptions, CommandPermissions, LibTextableChannel, LibMember, LibMessage, Command, LibGuild, LibUser, LIBRARY_TYPES, LOGGER_TYPES,
    DB_TYPES, Utils, ALogger, ADBProvider, AxonConfig, GuildConfig, User, Member, Message, Channel, Guild, Resolver, Embed, COMMAND_EXECUTION_TYPES,
} from '../';
import * as djs from 'discord.js';
import * as Eris from 'eris';

interface ModuleInfo {
    /**
     * The module name
     */
    name: string;
    /**
     * The module description
     */
    description: string;
    /**
     * The module category
     */
    category?: string;
}

interface ModuleData {
    /**
     * The module label
     */
    label?: string;
    /**
     * Whether the module is enabled or not
     */
    enabled?: boolean;
    /**
     * Whether the module can be disabled in a server or not
     */
    serverBypass?: boolean;
    info?: ModuleInfo;
    /**
     * The default options for all commands in this module
     */
    options?: CommandOptions;
    /**
     * The default poermissions for all commands in this module
     */
    permissions?: CommandPermissions;
}

interface AxonJSON {
    id: string;
    prefix: string;
    createdAt: string;
    updatedAt: string;
    bannedGuilds: string[];
    bannedUsers: string[];
}

interface GuildJSON {
    guildID: string;
    prefixes: string[];
    modules: [];
    commands: [];
    eventListeners: [];
    createdAt: string;
    updatedAt: string;
    ignoredUsers: string[];
    ignoredRoles: string[];
    ignoredChannels: string[];
    modOnly: false;
    modRoles: string[];
    modUsers: string[];
}

interface AConfig {
    id?: string;
    prefix?: string;
    createdAt?: Date;
    updatedAt?: Date;
    /**
     * Array of users that can't use bot commands
     */
    bannedUsers?: string[];
    /**
     * Array of guilds where bot commands cannot be used
     */
    bannedGuilds?: string[];
}

interface AxonConfigRaw extends AConfig {
    id: string;
    prefix: string;
    createdAt: Date;
    updatedAt: Date;
    bannedUsers: string[];
    bannedGuilds: string[];
}

interface GConfig {
    /**
     * Guild ID
     */
    guildID?: string;
    /**
     * Array of prefixes
     */
    prefixes?: string[];
    /**
     * Creation of the guild Config
     */
    createdAt?: Date;
    /**
     * Last update of the guild Config
     */
    updatedAt?: Date;
    /**
     * Guild disabled modules: Array of modules labels
     */
    modules?: string[];
    /**
     * Guild disabled commands: Array of commands labels
     */
    commands?: string[];
    /**
     * Guild disabled listeners: Array of listeners labels
     */
    eventListeners?: string[];
    /**
     * Users that cannot use commands in this guild: Users ids
     */
    ignoredUsers?: string[];
    /**
     * Roles that cannot use commands in this guild: Roles ids
     */
    ignoredRoles?: string[];
    /**
     * Channels where commands cannot be used in this guild: Channels ids
     */
    ignoredChannels?: string[];
    /**
     * Whether the guild accept commands from only mods+ or everyone
     */
    modOnly?: boolean;
    /**
     * Roles able to execute mod commands: Roles ids
     */
    modRoles?: string[];
    /**
     * Users able to execute mod commands: Users ids
     */
    modUsers?: string[];
}

interface GuildConfigRaw extends GConfig {
    guildID: string;
    prefixes: string[];
    createdAt: Date;
    updatedAt: Date;
    modules: string[];
    commands: string[];
    listeners: string[];
    ignoredUsers: string[];
    ignoredRoles: string[];
    ignoredChannels: string[];
    modOnly: boolean;
    modRoles: string[];
    modUsers: string[];
}

interface CommandInfo {
    /**
     * Command authors
     */
    owners?: string[];
    /**
     * Command description
     */
    description?: string;
    /**
     * Array of command examples
     */
    examples?: string[];
    /**
     * Command usage
     */
    usage?: string;
    /**
     * Full command name
     */
    name?: string;
}

interface ACommandOptions {
    /**
     * Whether to allow executing this command outside of guilds
     */
    guildOnly?: boolean;
    /**
     * Minimum arguments required to execute the command
     */
    argsMin?: number;

    /**
     * What the invalid usage message should be
     */
    invalidUsageMessage?: string;
    /**
     * Whether to trigger the help command on invalid usage (not enough arguments)
     */
    sendUsageMessage?: boolean;
    /**
     * What the invalid permission message should be
     */
    invalidPermissionMessage?: ( (channel: LibTextableChannel, member: LibMember) => string) | null;
    /**
     * Whether to trigger an error message on invalid permission (bot / user / custom etc)
     */
    sendPermissionMessage?: boolean;
    /**
     * What the invalid permission message deletion timeout should be
     */
    invalidPermissionMessageTimeout?: number;

    /**
     * Whether to delete the command input after trigger
     */
    deleteCommand?: boolean;
    /**
     * Whether to hide this command from help command (general / subcommands)
     */
    hidden?: boolean;

    /**
     * Cooldown between each usage of this command for a specific user (in ms)
     */
    cooldown?: number;
}

interface CommandPerms {
    /**
     * Discord permissions that the bot needs to have in order to execute the command
     */
    bot?: string[];
    /**
     * Axoncore server moderator
     */
    serverMod?: boolean;
    /**
     * Discord server manager (manageServer)
     */
    serverManager?: boolean;
    /**
     * Discord server administrator (administrator)
     */
    serverAdmin?: boolean;
    /**
     * Discord server owner
     */
    serverOwner?: boolean;
    /**
     * Discord permissions for the author
     */
    author?: {
        /**
         * Discord permissions that the author needs to have in order to execute the command
         */
        needed?: string[];
        /**
         * Discord permissions that will allow the author to execute the command no matter what
         */
        bypass?: string[];
    };
    /**
     * User IDs
     */
    users?: {
        /**
         * Discord user ids that the user needs to have in order to execute the command
         */
        needed?: string[];
        /**
         * Discord user ids that will allow the user to execute the command no matter what
         */
        bypass?: string[];
    };
    /**
     * Role IDs for the user
     */
    roles?: {
        /**
         * Discord role ids that the user needs to have in order to execute the command
         */
        needed?: string[];
        /**
         * Discord role ids that will allow the user to execute the command no matter what
         */
        bypass?: string[];
    };
    /**
     * Channel IDs
     */
    channels?: {
        /**
         * Discord channel ids that the user needs to have in order to execute the command
         */
        needed?: string[];
        /**
         * Discord channel ids that will allow the user to execute the command no matter what
         */
        bypass?: string[];
    };
    /**
     * Guild IDs
     */
    guilds?: {
        /**
         * Discord guild ids that the user needed to have in order to execute the command
         */
        needed?: string[];
        /**
         * Discord guild ids that will allow the user to execute the command no matter what
         */
        bypass?: string[];
    };
    /**
     * AxonCore staff
     */
    staff?: {
        /**
         * Axoncore staff ids that the user needs to have in order to execute the command
         */
        needed?: string[];
        /**
         * Axoncore staff ids that will allow the user to execute the command no matter what
         */
        bypass?: string[];
    };
    /**
     * Custom function that returns a boolean. True will let the command execute, False will prevent the command from executing
     */
    custom?: (i: LibMessage) => boolean;
}

interface CommandData {
    /**
     * Command label (name/id)
     */
    label?: string;
    /**
     * Array of commands aliases (including the command label)
     */
    aliases?: string[];
    /**
     * Whether the command IS a subcommand
     */
    isSubcmd?: boolean;
    /**
     * Whether the command HAS subcommands
     */
    hasSubcmd?: boolean;
    /**
     * Whether the command is enabled
     */
    enabled?: boolean;
    /**
     * Whether the command can be disabled
     */
    serverBypass?: boolean;
    /**
     * Array of subcommand objects (deleted after init)
     */
    subcmds?: (new (...args: any[] ) => Command)[] | null;
    /**
     * Default info about the command
     */
    info?: CommandInfo;
    /**
     * Options Object for the command (manage all command options)
     */
    options?: CommandOptions;
    /**
     * Permissions Object for the command (manage all command permissions)
     */
    permissions?: CommandPermissions;
}

interface AxonTemplate {
    embeds: {[key: string]: number;};
    emotes: {[key: string]: string;};
}

interface ListenerInfo {
    /**
     * Listener owners/authors
     */
    owners?: string[];
    /**
     * Listener description
     */
    description?: string;
}

interface ListenerData {
    /**
     * The Discord event name
     */
    eventName?: string;
    /**
     * The listener name
     */
    label?: string;
    /**
     * Whether to load this event on start up or not
     */
    load?: boolean;
    /**
     * Whether the event is enabled or not
     */
    enabled?: boolean;
    /**
     * Can the event be disabled?
     */
    serverBypass?: boolean;
    /**
     * Default infos about the event
     */
    info?: ListenerInfo;
}

interface APIAxonMSGCont {
    embed?: EmbedData;
    content?: string;
}

type AxonMSGCont = APIAxonMSGCont | string;

interface AxonMSGOpt {
    /**
     * Whether to delete the message or not
     */
    delete?: boolean;
    /**
     * Whether to allow mentioning everyone or not
     */
    disableEveryone?: boolean;
    /**
     * Delay after which the message will be deleted
     */
    delay?: number;
}

interface PermissionObject {
    CREATE_INSTANT_INVITE?: boolean;
    KICK_MEMBERS?: boolean;
    BAN_MEMBERS?: boolean;
    ADMINISTRATOR?: boolean;
    MANAGE_CHANNELS?: boolean;
    MANAGE_GUILD?: boolean;
    ADD_REACTIONS?: boolean;
    VIEW_AUDIT_LOG?: boolean;
    PRIORITY_SPEAKER?: boolean;
    STREAM?: boolean;
    VIEW_CHANNEL?: boolean;
    SEND_MESSAGES?: boolean;
    SEND_TTS_MESSAGES?: boolean;
    MANAGE_MESSAGES?: boolean;
    EMBED_LINKS?: boolean;
    ATTACH_FILES?: boolean;
    READ_MESSAGE_HISTORY?: boolean;
    MENTION_EVERYONE?: boolean;
    USE_EXTERNAL_EMOJIS?: boolean;
    VIEW_GUILD_ANALYTICS?: boolean;
    CONNECT?: boolean;
    SPEAK?: boolean;
    MUTE_MEMBERS?: boolean;
    DEAFEN_MEMBERS?: boolean;
    MOVE_MEMBERS?: boolean;
    USE_VAD?: boolean;
    CHANGE_NICKNAME?: boolean;
    MANAGE_NICKNAMES?: boolean;
    MANAGE_ROLES?: boolean;
    MANAGE_WEBHOOKS?: boolean;
    MANAGE_EMOJIS?: boolean;
}

interface Ctx { guild: LibGuild|string; cmd: string; user: LibUser|string; }

interface EmbedFields {
    name: string;
    value: string;
    inline?: boolean;
}

interface EmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
}

interface EmbedThumbnail {
    url: string;
}

interface EmbedImage {
    url: string;
}

interface EmbedFooter {
    text: string;
    icon_url?: string;
}

interface EmbedData {
    title?: string;
    url?: string;
    description?: string;
    color?: number;
    author?: EmbedAuthor;
    thumbnail?: EmbedThumbnail;
    fields?: EmbedFields[];
    image?: EmbedImage;
    footer?: EmbedFooter;
    timestamp?: Date;
}

interface PromptOptions {
    /**
     * An array of strings allow to pass as the prompt
     */
    allowed?: string[];
    /**
     * Whether or not the message content can contain allowed or must match allowed.
     */
    wildcard?: boolean;
    /**
     * Makes it so the prompt is case insensitive, returns the message lowercase content.
     */
    caseSensitive?: boolean;
    /**
     * Whether or not you want the prompt to be deleted
     */
    deletePrompt?: boolean;
    /**
     * Whether or not you want a message to be sent when invalid
     */
    sendInvalid?: boolean;
    /**
     * The message to send when a prompt is invalid
     */
    invalidMessage?: string;
    /**
     * The time in milliseconds to wait before deleting the invalid message
     */
    deleteInvalidMessage?: boolean | number;
    /**
     * The time to wait for the prompt to timeout
     */
    timeoutTime?: number;
    /**
     * Whether or not you want a message to be sent when timeout
     */
    sendTimeout?: boolean;
    /**
     * The message to send when the prompt times out.
     */
    timeoutMessage?: string;
    /**
     * The time to wait in milliseconds before deleting the timeout message
     */
    deleteTimeoutMsg?: boolean | number;
    /**
     * Whether or not to resend when the prompt got a invalid returned message, does not send invalid message
     */
    resendWhenInvalid?: boolean;
}

interface PromptOptionsData extends PromptOptions {
    allowed: string[];
    wildcard: boolean;
    caseSensitive: boolean;
    deletePrompt: boolean;
    sendInvalid: boolean;
    invalidMessage: string;
    deleteInvalidMessage: boolean|number;
    timeoutTime: number;
    sendTimeout: boolean;
    timeoutMessage: string;
    deleteTimeoutMsg: boolean|number;
    resendWhenInvalid: boolean;
}

interface CollectorOptions {
    /**
     * The time before the collector times out in milliseconds
     */
    timeout?: number;
    /**
     * The amount of messages to collect before automatically ending
     */
    count?: number;
    /**
     * Whether or not to ignore bots
     */
    ignoreBots?: boolean;
    /**
     * The user id to listen for (listens to all messages if not specified)
     */
    uID?: string;
    /**
     * Whether or not to return messages with lowercase content. Default: content unchanged
     */
    caseSensitive?: boolean;
}

interface AxonOptionsSettings {
    /**
     * Default lang for the bot
     */
    lang?: string;
    /**
     * Whether to run the bot in debugMode (additional info)
     */
    debugMode?: boolean;
    /**
     * Library type
     */
    library?: LIBRARY_TYPES;
    /**
     * Logger type
     */
    logger?: LOGGER_TYPES;
    /**
     * DB type
     */
    db?: DB_TYPES;
    /**
     * Max amount of guildConfigs cached at the same time (LRUCache)
     */
    guildConfigCache?: number;
}

interface AOptionsSettings extends AxonOptionsSettings {
    lang: string;
    debugMode: boolean;
    library: LIBRARY_TYPES;
    logger: LOGGER_TYPES;
    db: DB_TYPES;
    guildConfigCache: number;
}

interface AxonLanguageResponse {
    ERR_BOT_PERM?: string;
    ERR_CALLER_PERM?: string;
    ERR_DESTINATION_PERM?: string;
    ERR_COOLDOWN?: string;
    ERR_GENERAL?: string;
    [key: string]: string | undefined;
}

interface Languages {
    [language: string]: AxonLanguageResponse;
}

interface AxonOptionsBase {
    token?: string;
    /**
     * Bot prefixes
     */
    prefixes?: AxonOptionsPrefixes;
    /**
     * Bot settings
     */
    settings?: AxonOptionsSettings;
    /**
     * Translation file
     */
    lang?: Languages;
    /**
     * Custom function that will log a custom logo on startup
     */
    logo?: () => void;
    /**
     * General info about the bot
     */
    info?: AxonOptionsInfo;
    /**
     * The bot staff
     */
    staff?: AxonOptionsStaff;
    /**
     * Template information (colors / formatting / emojis)
     */
    template?: AxonTemplate;
    /**
     * Custom configs that can be provided
     */
    custom?: object | null;
}

interface WebhookConfig { id: string; token: string; }

interface Webhooks {
    FATAL: WebhookConfig;
    ERROR: WebhookConfig;
    WARN: WebhookConfig;
    DEBUG: WebhookConfig;
    NOTICE: WebhookConfig;
    INFO: WebhookConfig;
    VERBOSE: WebhookConfig;
    [key: string]: WebhookConfig;
}

interface AxonOptionsPrefixes {
    /** General Bot prefix */
    general: string;
    /** Admin prefix */
    admin: string;
    /** Owner prefix */
    owner: string;
}

interface AxonOptionsInfo {
    /** The application name */
    name: string;
    /** The application description */
    description: string;
    /** The application version */
    version: string;
}

interface AxonOptionsStaff {
    owners: {name: string; id: string;}[];
    admins: {name: string; id: string;}[];
}

interface AxonOptionsExtensions {
    /** Custom utils. Needs to be an instance of AxonCore.Utils */
    utils?: new (...args: any[] ) => Utils;
    /** Custom logger */
    logger?: new (...args: any[] ) => ALogger;
    /** DBProvider. Needs to be an instance of DBProvider */
    DBProvider?: new (...args: any[] ) => ADBProvider;
    /** Path to use as default location for usage of the JSONProvider */
    DBLocation?: string;
    /** Custom AxonConfig object to use instead of default AxonConfig */
    axonConfig?: new (...args: any[] ) => AxonConfig;
    /** Custom GuildConfig object to use instead of default GuildConfig */
    guildConfig?: new (...args: any[] ) => GuildConfig;
}

interface AxonConfs {
    /** Webhooks configs with all webhooks id and tokens */
    webhooks: Webhooks;
    /** Template config */
    template: AxonTemplate;
    /** Custom config object optionally passed via AxonOptions */
    custom: object | null;
}

interface AxonParams {
    /** Enable to show commands latency and debug informations */
    debugMode: boolean;
    /** Default bot prefixes */
    prefixes: string[];
    /** Admins prefix : override perms/cd except Owner */
    ownerPrefix: string;
    /** Owner prefix : override perms/cd */
    adminPrefix: string;
    /** Default lang for the bot */
    lang: string;
    /** Max amount of guildConfigs cached at the same time (LRUCache) */
    guildConfigCache: number;
}

interface Info {
    /** Bot name */
    name: string;
    /** Bot description */
    description: string;
    /** Bot version */
    version: string;
    /** Bot owners (array of names) */
    owners: string[];
}

interface AxonInfo {
    version: string;
    author: string;
    github: string;
}

interface AxonStaffIDs {
    /** Array of user IDs with BotOwner permissions */
    owners: string[];
    /** Array of user IDs with BotAdmin permissions */
    admins: string[];
    /** Any other names you want */
    [key: string]: string[];
}

interface LibraryInterfaceStructs {
    User: new (...args: any[] ) => User;
    Member: new (...args: any[] ) => Member;
    Message: new (...args: any[] ) => Message;
    Channel: new (...args: any[] ) => Channel;
    Guild: new (...args: any[] ) => Guild;
    Resolver: new (...args: any[] ) => Resolver;
}

interface PresenceGame {
    name?: string;
    url?: string;
    type?: string | number;
}

interface RawAttachment {
    url: string;
    filename: string;
    id: string;
    size: number;
    proxy_url: string;
    height?: number;
    width?: number;
}

interface RawUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
}

interface WebhookResponse {
    id: string;
    type: number;
    content: string;
    channel_id: string;
    author: { bot: true; id: string; username: string; avatar: string | null; discriminator: '0000'; };
    attachments: RawAttachment[];
    embeds: EmbedData[];
    mentions: RawUser[];
    mention_roles: string[];
    pinned: false;
    mention_everyone: boolean;
    tts: boolean;
    timestamp: string;
    edited_timestamp: null;
    flags: number;
    nonce: null;
    webhook_id: string;
}

interface DjsContent {
    content?: string;
    tts?: boolean;
    nonce?: string;
    embed?: Embed | djs.MessageEmbed | EmbedData;
    disableEveryone?: boolean;
    files?: (djs.FileOptions | djs.BufferResolvable | djs.MessageAttachment)[];
    code?: string | boolean;
    split?: boolean | djs.SplitOptions;
    reply?: djs.UserResolvable;
}

interface DjsWebhookContent extends DjsContent {
    username?: string;
    avatarURL?: string;
    embed?: undefined;
    embeds?: (Embed | djs.MessageEmbed | EmbedData)[];
    reply?: undefined;
}

interface DjsPresenceGame extends PresenceGame {
    type: djs.ActivityType | 0 | 1 | 2 | 3 | 4;
}

interface ErisContent {
    content?: string;
    tts?: boolean;
    disableEveryone?: boolean;
    embed?: Embed | EmbedData;
    file: Eris.MessageFile | Eris.MessageFile[];
}

interface ErisWebhookContent extends ErisContent {
    embed?: undefined;
    embeds?: (Embed | EmbedData)[];
    username?: string;
    avatarURL?: string;
    wait?: boolean;
}

interface ErisPresenceGame extends PresenceGame {
    type: 0 | 1 | 2 | 3 | 4;
}

interface CommandEnvironmentBase {
    /** The message object from the lib */
    msg: LibMessage;
    /** The array of arguments */
    args: string[];
    /** The prefix used for this command */
    prefix: string;
    command: Command|string;
    /** The GuildConfig data-structure with all DB saved settings */
    guildConfig: GuildConfig;
    /** Execution type: admin, owner, regular */
    executionType: COMMAND_EXECUTION_TYPES;
}

interface CommandEnvironmentProps extends CommandEnvironmentBase {
    /** The full label of the command being executed */
    command: string;
}

interface CommandEnvironmentParams extends CommandEnvironmentBase {
    /** The command object */
    command: Command;
}

export {
    ModuleInfo, ModuleData, AxonJSON, GuildJSON, AConfig, AxonConfigRaw, GConfig, GuildConfigRaw, CommandInfo,
    ACommandOptions, CommandPerms, CommandData, AxonTemplate, ListenerInfo, ListenerData, APIAxonMSGCont, AxonMSGCont, AxonMSGOpt, PermissionObject,
    Ctx, EmbedFields, EmbedAuthor, EmbedThumbnail, EmbedImage, EmbedFooter, EmbedData, PromptOptions, PromptOptionsData, CollectorOptions,
    AxonOptionsSettings, AOptionsSettings, AxonLanguageResponse, Languages, AxonOptionsBase, WebhookConfig, Webhooks, AxonOptionsPrefixes,
    AxonOptionsInfo, AxonOptionsStaff, AxonOptionsExtensions, AxonConfs, AxonParams, Info, AxonInfo, AxonStaffIDs, LibraryInterfaceStructs, PresenceGame,
    RawAttachment, RawUser, WebhookResponse, DjsContent, DjsWebhookContent, DjsPresenceGame, ErisContent, ErisWebhookContent, ErisPresenceGame,
    CommandEnvironmentProps, CommandEnvironmentParams,
};
