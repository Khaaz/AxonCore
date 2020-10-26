export { JsonManager } from './Database/JSON/JsonManager';
export { AxonDocument, AxonSchema } from './Database/Mongo/AxonSchema';
export { GuildDocument, GuildSchema } from './Database/Mongo/GuildSchema';
export { ADBProvider } from './Database/ADBProvider';
export { DBSelector } from './Database/DBSelector';
export { InMemoryProvider } from './Database/InMemoryProvider';
export { JsonProvider } from './Database/JsonProvider';
export { MongoProvider } from './Database/MongoProvider';

export { AxonCommandError } from './Error/AxonCommandError';
export { AxonError } from './Error/AxonError';
export { NoAbstractInstanceException } from './Error/NoAbstractInstanceException';
export { NotImplementedException } from './Error/NotImplementedException';

export { MessageManager, MessageManagerType } from './Langs/MessageManager';
export { MessageParser } from './Langs/MessageParser';
export { TranslationManager } from './Langs/TranslationManager';

export {
    Channel, Client, Enums, Guild, LibraryInterface, Member, Message, Resolver, User,
    LibMessage, LibMember, LibClient, LibGuild, LibUser, LibTextableChannel, LibRole, LibChannel, LibDMChannel, LibPermission, LibAllowedMentions, LibEmoji,
    EVENTS, DISCORD_LIB_PERMISSIONS, PERMISSIONS, PERMISSIONS_NAMES,
} from './Libraries';
export { LibrarySelector } from './Libraries/LibrarySelector';

export { ALogger } from './Loggers/ALogger';
export { ChalkLogger } from './Loggers/ChalkLogger';
export { Context } from './Loggers/Context';
export { DefLogger } from './Loggers/DefLogger';
export { LoggerSelector } from './Loggers/LoggerSelector';
export { SignaleLogger } from './Loggers/SignaleLogger';
export { WinstonLogger } from './Loggers/WinstonLogger';

export {
    ModuleInfo, ModuleData, AxonJSON, GuildJSON, AConfig, AxonConfigRaw, GConfig, GuildConfigRaw, CommandInfo,
    ACommandOptions, CommandPerms, CommandData, AxonTemplate, ListenerInfo, ListenerData, APIAxonMSGCont, AxonMSGCont, AxonMSGOpt, PermissionObject,
    Ctx, EmbedFields, EmbedAuthor, EmbedThumbnail, EmbedImage, EmbedFooter, EmbedData, PromptOptions, PromptOptionsData, CollectorContainerSettings, CollectorOptions, CollectorFullOptions, ReactionCollectorOptions, CollectorHelperOptions, ReactionCollectorHelperOptions,
    AxonOptionsSettings, AOptionsSettings, AxonLanguageResponse, DefaultLanguageResponse, Languages, AxonOptionsBase, WebhookConfig, Webhooks, AxonOptionsPrefixes,
    AxonOptionsInfo, AxonOptionsStaff, AxonOptionsExtensions, AxonConfs, AxonParams, Info, AxonInfo, AxonStaffIDs, LibraryInterfaceStructs, PresenceGame,
    RawAttachment, RawUser, WebhookResponse, DjsContent, DjsWebhookContent, DjsPresenceGame, ErisContent, ErisWebhookContent, ErisPresenceGame,
    CommandEnvironmentParams, CommandEnvironmentProps, Timeout, ExtentionInitReturn,
} from './misc/interfaces';

export { Command } from './Core/Command/Command';
export { CommandContext } from './Core/Command/CommandContext';
export { CommandCooldown } from './Core/Command/CommandCooldown';
export { CommandEnvironment } from './Core/Command/CommandEnvironment';
export { CommandOptions } from './Core/Command/CommandOptions';
export { CommandPermissions } from './Core/Command/CommandPermissions';
export { CommandResponse } from './Core/Command/CommandResponse';

export { AxonConfig } from './Core/Models/AxonConfig';
export { GuildConfig } from './Core/Models/GuildConfig';

export { AHandler } from './Core/Events/AHandler';
export { EventManager } from './Core/Events/EventManager';
export { Listener } from './Core/Events/Listener';

export { ALoader } from './Core/Loaders/ALoader';
export { ClientInitialiser } from './Core/Loaders/ClientInitialiser';
export { CommandLoader } from './Core/Loaders/CommandLoader';
export { ListenerLoader } from './Core/Loaders/ListenerLoader';
export { ModuleLoader } from './Core/Loaders/ModuleLoader';

export { ARegistry } from './Core/Stores/ARegistry';
export { CommandRegistry } from './Core/Stores/CommandRegistry';
export { GuildConfigCache } from './Core/Stores/GuildConfigCache';
export { ListenerRegistry } from './Core/Stores/ListenerRegistry';
export { ModuleRegistry } from './Core/Stores/ModuleRegistry';

export { ASelector } from './Core/ASelector';
export { Base } from './Core/Base';
export { CommandDispatcher } from './Core/CommandDispatcher';
export { Executor } from './Core/Executor';
export { Module } from './Core/Module';
export { Validator } from './Core/Validator';

export {
    AxonEnums, HTTP_CODE, HttpMessages as HTTP_MESSAGES, LIBRARY_TYPES, LOGGER_TYPES, DB_TYPES, COMMAND_EXECUTION_TYPES, COMMAND_EXECUTION_STATE,
    AXON_PERMISSION_LEVELS, WEBHOOK_TYPES, LOG_LEVELS, WEBHOOK_TO_COLOR, TYPE_ERRORS, DEBUG_FLAGS, PERMISSION_ADMIN, PERMISSION_MANAGER,
} from './Utility/Constants/AxonEnums';
export {
    DiscordEnums, DISCORD_GATEWAY_EVENTS, DISCORD_PERMISSIONS, PERMISSIONS_NUMBERS,
    EMBED_LIMITS, CHANNEL_TYPES, MESSAGE_TYPES, CLIENT_STATUS_TYPES, PUBLIC_FLAGS,
} from './Utility/Constants/DiscordEnums';

export { Embed } from './Utility/Discord/Embed';
export { Prompt } from './Utility/Discord/Prompt';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore Typings file is currently empty, waiting for #51
export { ReactionCollector } from './Utility/Discord/Collectors/ReactionCollector';
export { MessageCollector } from './Utility/Discord/Collectors/MessageCollector';
export { Collector } from './Utility/Discord/Collectors/Collector';

export { AsyncQueue } from './Utility/External/AsyncQueue';
export { AutoQueue } from './Utility/External/AutoQueue';
export { FunctionQueue } from './Utility/External/FunctionQueue';
export { LRUCache } from './Utility/External/LRUCache';
export { Queue } from './Utility/External/Queue';
export { SortedList } from './Utility/External/SortedList';
export { Stack } from './Utility/External/Stack';
export { BitwiseHandler } from './Utility/External/BitwiseHandler';

export { AxonUtils } from './Utility/AxonUtils';
export { Collection } from './Utility/Collection';
export { Store } from './Utility/Store';
export { Utils } from './Utility/Utils';

export { AxonClient } from './AxonClient';
export { AxonOptions } from './AxonOptions';

export type updateDBVal = string | boolean | object | any[] | number | Date
