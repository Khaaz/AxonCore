import { EventEmitter } from 'events';
import * as Eris from 'eris';
import * as djs from 'discord.js';
import { Model, Document } from 'mongoose';
import { RequestOptions } from 'http';
type LibMessage = Eris.Message | djs.Message;
type LibMember = Eris.Member | djs.GuildMember;
type LibClient = Eris.Client | djs.Client;
type LibGuild = Eris.Guild | djs.Guild;
type LibUser = Eris.User | djs.User;
type LibTextableChannel = Eris.TextableChannel | djs.TextChannel;
type LibRole = Eris.Role | djs.Role;
type LibChannel = Eris.Channel | djs.Channel;
type LibDMChannel = Eris.PrivateChannel | djs.DMChannel;
type LibPermission = Eris.Permission | Eris.PermissionOverwrite | djs.PermissionOverwrites; // djs.Permissions; // No allow/deny properties

declare module 'axoncore' {

    export class Collection<T> extends Map<string | number, T> {
        public baseObject: new (...args: any[] ) => T;
        public constructor(base: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );
        public add(key: string, value: T, replace?: boolean): T;
        public find(func: (i: T) => boolean): T;
        public random(): T;
        public filter(func: (i: T) => boolean): T[];
        public map<R>(func: (i: T) => R): R[];
        public reduce<U>(func: (accumulator: U, val: T) => U, initialValue?: U): U;
        public every(func: (i: T) => boolean): boolean;
        public some(func: (i: T) => boolean): boolean;
        public update(key: string, value: T): T;
        public remove(key: string): T | null;
        public toArray(): T[];
        public toObject(): {[key: string]: T;};
        public toString(): `[Collection<Name>]`;

        public apply<R>(key: string, func: 'from', args: [Array<R>, string] ): Collection<R>;
        public apply(key: string, func: 'add', args: [string, T, boolean?] ): Collection<T>;
        public apply(key: string, func: 'find', args: [(i: T) => boolean] ): Collection<T>;
        public apply(key: string, func: 'random'): Collection<T>;
        public apply(key: string, func: 'filter', args: [(i: T) => boolean] ): Collection<T>;
        public apply<R>(key: string, func: 'map', args: [(i: T) => R] ): Collection<R>;
        public apply<U>(key: string, func: 'reduce', args: [(accumulator: U, val: T) => U, U] ): Collection<U>;
        public apply(key: string, func: 'update', args: [string, T] ): Collection<T>;
        public apply(key: string, func: 'remove', args: [string] ): Collection<T | null>;
        public apply(key: string, func: 'toArray'): Collection<T>;
        public apply(key: string, func: 'toObject'): Collection<T>;
    }

    export class AxonError extends Error { // Clarify with Khaaz, incomplete?
        public module: string;
        public subMoule: string | null;
        constructor(message: string, module: Module | string, subModule?: string);
        readonly short: string;
        readonly message: string;
        readonly name: string;
    }

    export class AxonCommandError extends Error {
        public context: CommandContext;
        readonly short: string;
        public message: string;
        public stack: string;

        constructor(commandContext: CommandContext, err: Error);
        readonly name: string;
    }

    export class NoAbstractInstanceException extends Error {
        constructor(...args: any[] );
        readonly name: string;
        readonly message: string;
    }

    export class NotImplementedException extends Error {
        constructor(...args: any[] );
        readonly name: string;
        readonly message: string;
    }

    interface ModuleInfo {
        name: string;
        description: string;
        category: string;
    }
    interface ModuleData {
        label?: string;
        enabled?: boolean;
        serverBypass?: boolean;
        Infos?: ModuleInfo;
        options?: CommandOptions;
        permissions?: CommandPermissions;
    }

    export class Module extends Base {
        public label: string;
        public enabled: boolean;
        public serverBypass: boolean;
        
        public options: CommandOptions;
        public permissions: CommandPermissions;

        public Infos: ModuleInfo;

        public commandLoader: CommandLoader;
        public listenerLoader: ListenerLoader;

        constructor(client: AxonClient, data?: ModuleData);

        public commands: Collection<Command>;
        public listeners?: Collection<Listener>;

        public init(): {[key: string]: Command | Listener;};
        private _init(): void;
    }

    type updateDBVal = object|any[]|string|boolean;

    export abstract class ADBProvider {
        public axon: AxonClient;
        constructor(axonClient: AxonClient);
        public init(AxonOptions: AxonOptions): void; // Not Implemented
        public initAxon(): Promise<AxonConfig>; // Not Implemented
        public initGuild(gID: string): Promise<GuildConfig>; // Not Implemented
        
        public fetchAxon(): Promise<AxonConfig | null>; // Not Implemented
        public fetchGuild(gID: string): Promise<GuildConfig | null>; // Not Implemented
        
        public updateAxon(key: string, value: updateDBVal): Promise<AxonConfig | boolean>; // Not Implemented
        public updateGuild(key: string, gID: string, value: updateDBVal): Promise<GuildConfig | boolean>; // Not Implemented
        public saveAxon(data: object): Promise<AxonConfig | null>; // Not Implemented
        public saveGuild(gID: string, data: object): Promise<GuildConfig | null>;
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
    class JsonManager {
        private _axonDefault: AxonJSON;
        private _guildDefault: GuildJSON;
        private _basePath: string;
        private _axonPath: string;
        public axonExecutor: AsyncQueue;
        public guildExecutors: {[guildID: string]: AsyncQueue;};

        constructor(basePath: string);

        // GETTERS
        readonly axonDefault: AxonJSON;
        readonly guildDefault: GuildJSON;

        public getExecutor(guildID: string): AsyncQueue;
        public toJSON(string: string): string | object;
        public toString(json: object): string | object;

        private _buildPath(gID: string): string;

        public readFile(path: string): Promise<string>;
        public writeFile(path: string, content: string): Promise<boolean>;

        public createAxonSchema(defaultPrefix: string): Promise<AxonJSON>;
        public createGuildSchema(prefixes: string[], gID: string): Promise<GuildJSON>;

        public fetchAxonSchema(): Promise<AxonJSON>;
        public fetchGuildSchema(gID: string): Promise<GuildJSON>;

        public updateGuildKey(gID: string, key: string, value: updateDBVal): Promise<GuildJSON>;
        public updateAxonKey(key: string, value: updateDBVal): Promise<AxonJSON>;

        public writeAxonSchema(schema: object): Promise<AxonJSON>;
        public writeGuildSchema(gID: string, schema: object): Promise<GuildJSON>;
    }

    class InMemoryProvider extends ADBProvider {
        public fetchAxon(): Promise<AxonConfig>;
        public fetchGuild(gID: string): Promise<GuildConfig>;

        initAxon(): Promise<AxonConfig>;
        initGuild(gID: string): Promise<GuildConfig>;

        updateBlacklistUser(blacklistedUsers: string[] ): Promise<AxonConfig>;
        updateBlacklistGuild(blacklistedGuilds: string[] ): Promise<AxonConfig>;
        updateGuildPrefix(gID: string, prefixArr: string[] ): Promise<GuildConfig>;
        updateModule(gID: string, modulesArr: Module[] ): Promise<GuildConfig>;
        updateCommand(gID: string, commandArr: Command[] ): Promise<GuildConfig>;
        updateEvent(gID: string, eventArr: Listener[] ): Promise<GuildConfig>;
        
        // Ask Null about inconsistency
        saveAxonSchema(axonSchema: AxonConfig): AxonConfig;
        saveGuildSchema(gID: string, guildSchema: GuildConfig): void;

        updateAxon(key: 'id' | 'prefix', value: string): Promise<AxonConfig>;
        updateAxon(key: 'createdAt' | 'updatedAt', value: Date): Promise<AxonConfig>;
        updateAxon(key: 'bannedUsers' | 'bannedGuilds', value: string[] ): Promise<AxonConfig>;

        updateGuild(key: 'prefixes' | 'ignoredUsers' | 'ignoredRoles' | 'ignoredChannels' | 'modRoles' | 'modUsers', gID: string, value: string[] ): Promise<GuildConfig>;
        updateGuild(key: 'createdAt' | 'updatedAt', gID: string, value: Date): Promise<GuildConfig>;
        updateGuild(key: 'modules', gID: string, value: Module[] ): Promise<GuildConfig>;
        updateGuild(key: 'commands', gID: string, value: Command[] ): Promise<GuildConfig>;
        updateGuild(key: 'listeners', gID: string, value: Listener[] ): Promise<GuildConfig>;
        updateGuild(key: 'modOnly', gID: string, value: boolean): Promise<GuildConfig>;
    }

    class JsonProvider extends ADBProvider {
        public manager?: JsonManager;

        initAxon(): Promise<AxonConfig>;
        initGuild(gID: string): Promise<GuildConfig>;

        fetchAxon(): Promise<AxonConfig>;
        fetchGuild(gID: string): Promise<GuildConfig>;

        updateAxon(key: string, value: updateDBVal): Promise<boolean>;
        updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;

        saveAxon(data: AxonConfig): Promise<AxonConfig|null>;
        saveGuild(gID: string, data: GuildConfig): Promise<GuildConfig|null>;
    }

    interface GuildSchema extends Document {
        guildID: string;
        prefixes: string[];
        modules: string[];
        commands: string[];
        eventListeners: string[];
        createdAt: Date;
        updatedAt: Date;
        ignoredUsers: string[];
        ignoredRoles: string[];
        ignoredChannels: string[];
        modOnly: boolean;
        modRoles: string[];
        modUsers: string[];
    }
    interface AxonSchema extends Document {
        id: string;
        prefix: string;
        createdAt: Date;
        updatedAt: Date;
        bannedGuilds: string[];
        bannedUsers: string[];
    }

    class MongoProvider extends ADBProvider {
        public AxonSchema?: AxonConfig;
        public GuildSchema?: GuildConfig;

        init(AxonOptions?: AxonOptions): void;
        initAxon(): Promise<AxonConfig>;
        initGuild(gID: string): Promise<GuildConfig>;

        fetchAxon(): Promise<AxonConfig|null>;
        fetchGuild(gID: string): Promise<GuildConfig|null>;
        fetchGuildSchema(gID: string): Promise<Model<GuildSchema> | null>;

        updateAxon(key: string, value: updateDBVal): Promise<boolean>;
        updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;
        saveAxon(data: AxonSchema): Promise<AxonConfig|null>;
        saveGuild(gID: string, data: GuildSchema): Promise<GuildConfig|null>;
    }

    export class AxonConfig {
        private _axon: AxonClient;

        public id: string;
        public prefix: string;

        public createdAt: Date;
        public updatedAt: Date;

        public bannedUsers: string[];
        public bannedGuilds: string[];

        constructor(axon: AxonClient, values: AxonConfig);

        public isBlacklistedUser(userID: string): boolean;
        public isBlacklistedGuild(guildID: string): boolean;
        public updateBlacklistUser(userID: string, boolean: boolean): Promise<AxonConfig|null>;
        public updateBlacklistGuild(guildID: string, boolean: boolean): Promise<AxonConfig|null>;
        private _req(key: string, value: updateDBVal): Promise<AxonConfig|null>;
    }

    export class GuildConfig {
        private _axon: AxonClient;
        public guildID: string;
        public prefixes: string[];

        public createdAt: Date;
        public updatedAt: Date;

        public modules: Module[];
        public commands: Command[];
        public listeners: Listener[];

        public ignoredUsers: string[];
        public ignoredRoles: string[];
        public ignoredChannels: string[];

        public modOnly: boolean;
        public modRoles: string[];
        public modUsers: string[];

        constructor(axon: AxonClient, values: GuildConfig);

        public getPrefixes(): string[];
        public isIgnored(msg: LibMessage): boolean;
        public isUserIgnored(userID: string): boolean
        public isRoleIgnored(member: LibMember): boolean;
        public isChannelIgnored(channelID: string): boolean;
        public isModuleDisabled(module: Module): boolean;
        public isCommandDisabled(command: Command): boolean;
        public isListenerDisabled(listener: Listener): boolean;
        public isModOnly(): boolean;
        public isModRole(roleID: string): boolean;
        public isModUser(userID: string): boolean;
        public update(guildConfig: GuildConfig): Promise<Model<GuildSchema> | null>;
        public updatePrefixes(prefixArr: string[] ): Promise<GuildConfig|null>;
        public updateStateModule(label: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateCommand(label: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateListener(label: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateModRole(roleID: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateModUser(userID: string, boolean: boolean): Promise<GuildConfig|null>;

        private _req(key: string, value: updateDBVal): Promise<GuildConfig|null>
    }

    export interface CommandInfo {
        owners?: string[];
        description?: string;
        examples?: string[];
        usage?: string;
        name?: string;
    }

    export interface ACommandOptions {
        guildOnly?: boolean;
        argsMin?: number;

        invalidUsageMessage: boolean;
        invalidPermissionMessage?: ( (channel: LibTextableChannel, member: LibMember) => string) | null;
        sendPermissionMessage: boolean;
        invalidPermissionMessageTimeout: number;

        deleteCommand?: boolean;
        hidden?: boolean;

        cooldown?: number;
    }

    export class CommandOptions implements ACommandOptions {
        private _command: Command;
        public guildOnly?: boolean;
        public argsMin?: number;

        public invalidUsageMessage: boolean;
        public invalidPermissionMessage: ( (channel: LibTextableChannel, member: LibMember) => string) | null;
        public sendPermissionMessage: boolean;
        public invalidPermissionMessageTimeout: number;

        public deleteCommand?: boolean;
        public hidden?: boolean;

        public cooldown?: number;

        constructor(command: Command, override: ACommandOptions, useModuleDefault: boolean);

        readonly l: MessageManager;

        public isGuildOnly(): boolean;
        public isHidden(): boolean;

        public shouldSendInvalidUsageMessage(args: string[] ): boolean;
        public shouldSendInvalidPermissionMessage(guildConfig: GuildConfig): boolean;
        public shouldDeleteCommand(): boolean;
        public getInvalidPermissionMessage(channel: LibTextableChannel, member: LibMember, permission: string): string;
    }

    export class CommandCooldown {
        private _command: Command;
        private _cooldowns: Map<string, { time: Date; post: boolean; }>;

        constructor(command: Command);

        // GETTERS

        readonly cooldown: number;

        // METHODS
        public shouldCooldown(userID: string): [number, boolean] | [];
        public shouldSendCooldownMessage(cooldown: { time: Date; post: boolean; } ): boolean;
        public shouldSetCooldown(response: { triggerCooldown: boolean; } | null): boolean;
        public setCooldown(userID: string): void;
    }

    export interface CommandPerms {
        bot?: string[];
        serverMod?: boolean;
        serverManager?: boolean;
        serverAdmin?: boolean;
        serverOwner?: boolean;
        user?: {
            needed: string[];
            bypass?: string[];
        };
        usersIDs?: {
            needed: string[];
            bypass?: string[];
        };
        rolesIDs?: {
            needed: string[];
            bypass?: string[];
        };
        channelsIDs?: {
            needed: string[];
            bypass?: string[];
        };
        staff?: {
            needed: string[];
            bypass?: string[];
        };
        custom(func: (i: LibMessage) => true): true;
    }

    export class CommandPermissions implements CommandPerms {
        private _command: Command;

        public custom(func: (msg: LibMessage) => true): true;
        constructor(command: Command, override?: CommandPerms, userModuleDefault?: boolean);
        // GETTERS
        readonly axon: AxonClient;
        readonly utils: Utils;
        readonly axonUtils: AxonUtils;
        readonly library: LibraryInterface;

        // METHODS

        public canExecute(msg: LibMessage, guildConf: GuildConfig): [false, string | null] | [true, null?];

        public setBot(array?: string[], toAdd?: boolean): CommandPermissions;
        public setServerMod(boolean?: boolean): CommandPermissions;
        public setServerManager(boolean?: boolean): CommandPermissions;
        public setServerAdmin(boolean?: boolean): CommandPermissions;
        public setServerOwner(boolean?: boolean): CommandPermissions;
        public setUser(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        public setUserIDs(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        public setRoleIDs(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        public setChannelIDs(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        public setStaff(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;

        // CHECK FOR IF PERMISSIONS ARE MET

        private _checkPermsBot(channel: LibTextableChannel): boolean;
        private _checkPermsUserBypass(member: LibMember): boolean;
        private _checkPermsUserNeeded(member: LibMember): [true] | [false, string];
        private _checkUserBypass(member: LibMember): boolean;
        private _checkUserNeeded(member: LibMember): boolean;
        private _checkRoleBypass(member: LibMember): boolean;
        private _checkRoleNeeded(member: LibMember): boolean;
        private _checkChannelBypass(channel: LibTextableChannel): boolean;
        private _checkChannelNeeded(channel: LibTextableChannel): boolean;
        private _checkStaffBypass(member: LibMember): boolean;
        private _checkStaffNeeded(member: LibMember): boolean;
    }

    export class CommandResponse {
        public success: boolean;
        public triggerCooldown: boolean;
        public error?: Error;
        constructor(data: { success: boolean; triggerCooldown: boolean; error?: Error; } );
        public resolve(): Promise<CommandResponse>;
        public resolveAsync(): Promise<CommandResponse>;
        public resolveSync(): CommandResponse;
    }

    export class CommandContext {
        public raw: string;
        public commandLabel: string;
        public moduleLabel: string;

        public execute: boolean;
        public helpExecution: boolean;
        public executionState: number;
        public executionType: number;

        public library: LibraryInterface;

        public dm: boolean;
        public guildID: string;
        public guildName: string;

        public channelID: string;
        public channelName: string;

        public callerID: string;
        public callerName: string;

        public calledAt: Date;

        constructor(command: Command, triggerMessage: LibMessage, data?: { executed?: boolean; helpExecution?: string; executionState?: number; executionType?: object; } );

        public addResponseData(commandResponse?: CommandResponse): CommandContext;
        public static getExecutionType(isAdmin: boolean, isOwner: boolean): number;
        public resolve(): Promise<CommandContext>;
        public resolveAsync(): Promise<CommandContext>;
        public resolveSync(): CommandContext;
    }

    export interface CommandData {
        label: string;
        aliases: string[];
        isSubcmd: boolean;
        hasSubcmd: boolean;
        enabled: boolean;
        serverBypass: boolean;
        subcmds?: Command[] | null;
        Infos: CommandInfo;
        options: CommandOptions;
        permissions: CommandPermissions;
    }

    export interface AxonTemplate {
        embeds: {[key: string]: number;};
        emotes: {[key: string]: string;};
    }

    export class Command extends Base implements CommandData {
        private _module: Module;
        private _cooldown: CommandCooldown;

        public label: string;
        public aliases: string[];
        public isSubcmd: boolean;
        public hasSubcmd: boolean;
        public enabled: boolean;
        public serverBypass: boolean;
        public subcmds?: Command[] | null;
        public Infos: CommandInfo;
        public options: CommandOptions;
        public permissions: CommandPermissions;

        public parentCommand: Command | null;

        public subCommands: Collection<Command> | null;
        public subCommandAliases?: Map<string, string>;

        // GETTERS
        readonly module: Module;
        readonly template: AxonTemplate;
        readonly library: LibraryInterface;
        readonly fullLabel: string;

        constructor(module: Module, data?: CommandData);

        // Internal
        private _process(object: { msg: LibMessage; args: string[]; guildConfig?: GuildConfig; isAdmin?: boolean; isOwner?: boolean; } ): Promise<CommandContext>;
        private _preExecute(): void; // Blank function
        private _execute(message: { msg: LibMessage; args?: string[]; guildConfig?: GuildConfig; isAdmin?: boolean; isOwner?: boolean; } ): Promise<CommandContext>;
        private _postExecute(): void; // Blank function

        // External
        public execute(object: { msg: LibMessage; args?: string[]; guildConfig?: GuildConfig; } ): Promise<CommandResponse>; // Not implemented
        public sendHelp(object: { msg: LibMessage; guildConf?: GuildConfig; isAdmin: boolean; isOwner: boolean; } ): Promise<CommandContext>;
        public sendBotPerms(channel: LibTextableChannel, permissions?: string[] ): Promise<CommandResponse>;
        public sendUserPerms(channel: LibTextableChannel, member: LibMember, deleteTimeout?: number, missingPermission?: string): Promise<CommandResponse>;
        public sendTargetPerms(channel: LibTextableChannel): Promise<CommandResponse>;
        public sendCooldown(channel: LibTextableChannel, time: number): Promise<CommandResponse>;
    }

    export class Listener extends Base {
        private _module: Module;
        public eventName: string;
        public label: string;

        public load?: boolean;
        public enabled?: boolean;
        public serverBypass?: boolean;

        public Infos?: {
            owners?: string[];
            description?: string;
        };

        readonly module: Module;

        constructor(module: Module, data?: Listener);

        private _execute(guildConf?: GuildConfig, ...args: any[] ): Promise<any>;

        public execute(args: any, guildConf?: GuildConfig): Promise<any>;
    }

    class EventManager extends Base {
        private _events: {[EventName: string]: Listener[];};
        private _handlers: Collection<AHandler>;
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        // GETTERS
        readonly HANDLERS: object;
        readonly handlers: Collection<AHandler>;

        public getListeners(eventName: string): Listener[];
        public bindListeners(): void;
        public bindHandlers(): void;

        public registerListener(event: Listener): Listener[];
        public registerHandler(event: string): object;
        public registerEvent(event: string): object;
        
        public unregisterListener(event: string, label: string): boolean;
        public unregisterHandler(event: string): boolean;
        public unregisterEvent(event: string): boolean;
    }

    interface APIAxonMSGCont {
        embed?: Eris.EmbedOptions;
        content?: string;
    }

    type AxonMSGCont = APIAxonMSGCont | string | djs.MessageEmbed | object;

    interface AxonMSGOpt {
        delete?: boolean;
        disableEveryone?: boolean;
        delay?: number;
    }

    export class AxonUtils {
        private _axon: AxonClient;
        constructor(axon: AxonClient);
        readonly axon: AxonClient;
        readonly bot: LibClient;
        readonly template: AxonTemplate;
        readonly logger: ALogger;
        readonly utils: Utils;
        readonly library: LibraryInterface;

        public triggerWebhook(type: string, embed: Eris.EmbedOptions, opt?: string): void;
        public isBotOwner(uID: string): boolean;
        public isBotAdmin(uID: string): boolean;
        public isBotStaff(uID: string): boolean;
        public isServerMod(member: LibMember, guildConfig: GuildConfig): boolean;
        public isServerManager(member: LibMember): boolean;
        public isServerAdmin(member: LibMember): boolean;
        public isServerOwner(member: LibMember, guild: LibGuild): boolean;

        public sendDM(user: LibUser, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage>;
        public sendMessage(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage>;
        public editMessage(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;
        
        public updateGlobalStateModule(module: string, state?: boolean): void;
        public updateGlobalStateCommand(command: string, state?: boolean): void;
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

    export class Utils {
        private _axon: AxonClient;

        public userMention: RegExp;
        public roleMention: RegExp;
        public channelMention: RegExp;
        public id: RegExp;
        public hexCode: RegExp;

        static readonly userMention: RegExp;
        static readonly roleMention: RegExp;
        static readonly channelMention: RegExp;
        static readonly id: RegExp;
        static readonly hexCode: RegExp;

        constructor(client: AxonClient);

        readonly axon: AxonClient;
        readonly bot: LibClient;
        readonly library: LibraryInterface;

        public splitMessage(content: string): string[] | string;
        public getPrefix(msg: LibMessage): Promise<string>;
        public getRoles(guild: LibGuild, member: LibMember): LibRole[];
        public getHighestRole(guild: LibGuild, member: LibMember): LibRole;
        public sortRoles(roles: LibRole[] ): LibRole[];
        public isRoleHigher(role1: LibRole, role2: LibRole): boolean;
        public isHigherRole(guild: LibGuild, first: LibMember, second: LibMember): boolean;
        public hasPerms(member: LibMember, permissions?: string[] ): boolean;
        public hasChannelPerms(channel: LibTextableChannel, permissions: string[], user?: LibUser): boolean;
        public missingPerms(member: LibMember, permissions?: string[] ): string[];
        public calculatePerms(data: PermissionObject): { allow: number; deny: number; };

        public sleep(ms: number): Promise<void>;
        public readFileAsync(path: string): Promise<string>;
        public writeFileAsync(path: string, content: string): Promise<void>;
        public static compareObject(obj1: object, obj2: object): boolean;
    }

    export type LOG_LEVEL_TYPES = 'FATAL' | 'ERROR' | 'WARN' | 'DEBUG' | 'NOTICE' | 'INFO' | 'VERBOSE';

    interface Ctx { guild: LibGuild; cmd: Command; user: LibUser; }

    export class Base {
        public _axon: AxonClient;

        public readonly axon: AxonClient;
        public readonly bot: LibClient;
        public readonly logger: ALogger;
        public readonly Resolver?: Resolver;
        public readonly axonUtils?: AxonUtils;
        public readonly utils?: Utils;
        public readonly l?: MessageManager;
        constructor(axonClient: AxonClient);

        // Methods
        public getModule(module: string): Module | null;
        public getCommand(fullLabel: string): Command | null;

        public log(level: LOG_LEVEL_TYPES, content: string | Error, ctx?: Ctx, execWebhook?: boolean): void;

        public sendDM(user: LibUser, content: AxonMSGCont): Promise<LibMessage|void>;
        public sendMessage(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage>;
        public editMessage(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;
        public sendSuccess(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
        public sendError(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
        public error(msg: LibMessage, err: Error, type: string, errMsg?: string): Promise<CommandResponse>;

        public toString(): string;
        public toJSON(): object;
    }

    interface HttpCode {
        CONTINUE: 100;

        OK: 200;
        CREATED: 201;
        ACCEPTED: 202;
        NO_CONTENT: 204;

        MULTIPLE_CHOICES: 300;
        MOVED_PERMANENTLY: 301;
        FOUND: 302;

        BAD_REQUEST: 400;
        UNAUTHORIZED: 401;
        PAYMENT_REQUIRED: 402;
        FORBIDDEN: 403;
        NOT_FOUND: 404;
        METHOD_NOT_ALLOWED: 405;
        REQUEST_TIMEOUT: 408;
        CONFLICT: 409;
        GONE: 410;
        UNSUPPORTED_MEDIA_TYPE: 415;
        LOCKED: 423;
        TOO_MANY_REQUESTS: 429;

        INTERNAL_SERVER_ERROR: 500;
        NOT_IMPLEMENTED: 501;
        BAD_GATEWAY: 502;
        SERVICE_UNAVAILABLE: 503;
        GATEWAY_TIMEOUT: 504;
    }

    interface HttpMessages {
        100: 'Continue';
        101: 'Switching Protocols';
        102: 'Processing';
        103: 'Early Hints';
        200: 'OK';
        201: 'Created';
        202: 'Accepted';
        203: 'Non-Authoritative Information';
        204: 'No Content';
        205: 'Reset Content';
        206: 'Partial Content';
        207: 'Multi-Status';
        208: 'Already Reported';
        226: 'IM Used';
        300: 'Multiple Choices';
        301: 'Moved Permanently';
        302: 'Found';
        303: 'See Other';
        304: 'Not Modified';
        305: 'Use Proxy';
        307: 'Temporary Redirect';
        308: 'Permanent Redirect';
        400: 'Bad Request';
        401: 'Unauthorized';
        402: 'Payment Required';
        403: 'Forbidden';
        404: 'Not Found';
        405: 'Method Not Allowed';
        406: 'Not Acceptable';
        407: 'Proxy Authentication Required';
        408: 'Request Timeout';
        409: 'Conflict';
        410: 'Gone';
        411: 'Length Required';
        412: 'Precondition Failed';
        413: 'Payload Too Large';
        414: 'URI Too Long';
        415: 'Unsupported Media Type';
        416: 'Range Not Satisfiable';
        417: 'Expectation Failed';
        418: 'I\'m a teapot';
        421: 'Misdirected Request';
        422: 'Unprocessable Entity';
        423: 'Locked';
        424: 'Failed Dependency';
        425: 'Unordered Collection';
        426: 'Upgrade Required';
        428: 'Precondition Required';
        429: 'Too Many Requests';
        431: 'Request Header Fields Too Large';
        451: 'Unavailable For Legal Reasons';
        500: 'Internal Server Error';
        501: 'Not Implemented';
        502: 'Bad Gateway';
        503: 'Service Unavailable';
        504: 'Gateway Timeout';
        505: 'HTTP Version Not Supported';
        506: 'Variant Also Negotiates';
        507: 'Insufficient Storage';
        508: 'Loop Detected';
        509: 'Bandwidth Limit Exceeded';
        510: 'Not Extended';
    }

    interface LibraryTypes { ERIS: 0; DISCORDJS: 1; }
    interface LoggerTypes { DEFAULT: 0; CHALK: 1; SIGNALE: 2; WINSTON: 3; }
    interface DBTypes { IN_MEMORY: 0; JSON: 1; MONGO: 2; }
    interface CommandExecutionTypes {
        REGULAR: 0;
        ADMIN: 1;
        OWNER: 2;
    }
    interface CommandExecutionState {
        NO_ERROR: 0;
        COOLDOWN: 1;
        INVALID_USAGE: 2;
        INVALID_PERMISSIONS_BOT: 3;
        INVALID_PERMISSIONS_USER: 4;
    }
    interface AxonPermissionLevels {
        OWNER: 0;
        ADMINISTRATOR: 1;
        MANAGER: 2;
        MODERATOR: 3;
    }
    interface WebhookTypes {
        FATAL: 'FATAL';
        ERROR: 'ERROR';
        WARN: 'WARN';
        DEBUG: 'DEBUG';
        NOTICE: 'NOTICE';
        INFO: 'INFO';
        VERBOSE: 'VERBOSE';
    }
    interface LogLevels {
        FATAL: 'fatal';
        ERROR: 'error';
        WARN: 'warn';
        DEBUG: 'debug';
        NOTICE: 'notice';
        INFO: 'info';
        VERBOSE: 'verbose';
    }
    interface WebhookToColor {
        FATAL: 0xFF0000;
        ERROR: 0xFF0000;
        WARN: 0xFF4500;
        DEBUG: 0x0000FF;
        NOTICE: 0x00FF00;
        INFO: 0x00FF00;
        VERBOSE: 0x808080;
    }
    interface TypeErrors {
        DAPI: 'DAPI error - failed to retrieve from Discord';
        DB: 'DB error - failed to retrieve from the DB';
        INTERNAL: 'Internal error - AxonClient/internal methods';
        UNKNOWN: 'Unexpected error';
    }

    export interface AxonEnums {
        HTTP_CODE: HttpCode;
        HTTP_MESSAGES: HttpMessages;
        LIBRARY_TYPES: LibraryTypes;
        LOGGER_TYPES: LoggerTypes;
        DB_TYPES: DBTypes;
        COMMAND_EXECUTION_TYPES: CommandExecutionTypes;
        COMMAND_EXECUTION_STATE: CommandExecutionState;
        AXON_PERMISSION_LEVELS: AxonPermissionLevels;
        PERMISSION_ADMIN: 'ADMINISTRATOR';
        PERMISSION_MANAGER: 'MANAGE_GUILD';
        WEBHOOK_TYPES: WebhookTypes;
        LOG_LEVELS: LogLevels;
        WEBHOOK_TO_COLOR: WebhookToColor;
        TYPE_ERRORS: TypeErrors;
    }

    interface FieldComp {
        name: string;
        value: string;
        inline?: boolean;
    }

    export class Embed {
        public title?: string;
        public url?: string;
        public description?: string;
        public color?: string;
        public author?: {
            name: string;
            icon_url?: string;
        };
        public thumbnail?: {
            url?: string;
        };
        public fields?: FieldComp[];
        public image?: {
            url?: string;
        };
        public footer?: {
            text: string;
            icon_url?: string;
        };
        public timestamp?: string;
        public file?: string;

        constructor(data?: Embed);
        private _resolveString(data): string;

        public setTitle(title: string): Embed;
        public setDescription(description: string): Embed;
        public setURL(url: string): Embed;
        public setColor(color: number): Embed;
        public setAuthor(name: string, icon?: string, url?: string): Embed;
        public setTimestamp(timestamp?: Date): Embed;
        public addField(name: string, value: string, inline?: boolean): Embed;
        public setThumbnail(url: string): Embed;
        public setImage(url: string): Embed;
        public setFooter(text: string, icon?: string): Embed;
        public attachFile(file: string): Embed;
    }

    interface PromptOptions {
        allowed?: string[];
        wildcard?: boolean;
        caseSensitive?: boolean;
        deletePrompt?: boolean;
        sendInvalid?: boolean;
        invalidMessage?: string;
        deleteInvalidMessage?: boolean | number;
        timeoutTime?: number;
        sendTimeout?: boolean;
        timeoutMessage?: string;
        deleteTimeoutMsg?: boolean | number;
        resendWhenInvalid?: boolean;
    }

    export class Prompt {
        private _axon: AxonClient;
        public userID: string;
        public channel: LibTextableChannel;
        private _prompt: string;
        private _options: PromptOptions;
        private _actualOptions: PromptOptions;
        private _emitter: EventEmitter;
        public timedOut: boolean;
        public ended: boolean;
        private _boundEvent(): void;
        constructor(client: AxonClient, uID: string, channel: LibTextableChannel, defaultOptions?: PromptOptions);
        readonly axon: AxonClient;
        readonly client: LibClient;

        public run(prompt: AxonMSGCont, options?: PromptOptions): Promise<LibMessage>;
        private _startTimeout(): void;
        private _deletePrompt(): void;
        private _checker(msg: LibMessage): boolean;
        private _onInvalidEnd(): string;
        private _onEnded(msg: LibMessage): LibMessage;
        private _onTimeout(): Promise<void>;
        private _onMsgCreate(msg: LibMessage): Promise<void>;
    }

    interface CollectorOptions {
        timeout?: number;
        count?: number;
        ignoreBots?: boolean;
        caseSensitive?: boolean;
    }

    export class MessageCollector {
        private _options: CollectorOptions;
        private _axon: AxonClient;
        private _actualOptions: CollectorOptions;
        private _boundMsgEvent: void;
        private _boundDelEvent: void;
        private _boundEditEvent: void;
        private _boundCollectEvent: void;
        public messages: Collection<LibMessage>;

        constructor(client: AxonClient, options: CollectorOptions);

        readonly axon: AxonClient;
        readonly client: LibClient;

        public run(channel: LibTextableChannel, options: CollectorOptions): Promise<Collection<LibMessage> >;
        private _onEnd(): void;
        private _startTimeout(): void;
        private _onMsgDelete(msg: LibMessage): void;
        private _onMsgEdit(msg: LibMessage): Promise<void>;
        private _onCollectEvent(): void;
        public end(): void;
        private _onMsgCreate(msg: LibMessage): void;
        public delete(mID: string): Collection<LibMessage>;
    }

    interface AxonOptionsSettings {
        lang?: string;
        debugMode?: boolean;
        library?: LibraryInterface;
        logger?: ALogger;
        db?: 0 | 1 | 2;
        guildConfigCache?: number;
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
        prefixes?: { general: string; admin: string; owner: string; };
        settings?: AxonOptionsSettings;
        lang?: Languages;
        logo?: () => void;
        info?: { name: string; description: string; version: string; };
        staff?: { [key: string]: { name: string; id: string; }[];};
        template?: AxonTemplate;
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

    interface AxonOptionsExtensions {
        utils: Utils;
        logger: ALogger;
        DBProvider: ADBProvider;
        DBLocation: string;
        axonConfig: AxonConfig;
        guildConfig: GuildConfig;
    }
    class AxonOptions {
        private _token?: string;
        public prefixes: { general: string; admin: string; owner: string; };
        public settings: AxonOptionsSettings;
        public lang: Languages;
        public logo: ( () => void) | null;
        public info: { name: string; description: string; version: string; };
        public staff: { [key: string]: { name: string; id: string; }[];};
        public template: AxonTemplate;
        public custom: object | null;
        public webhooks: Webhooks;
        public extensions: AxonOptionsExtensions;
        constructor(data?: AxonOptionsBase | {}, webhooks?: Webhooks | {}, extensions?: AxonOptionsExtensions | {} )
    }

    interface AxonConfs {
        webhooks: Webhooks;
        template: AxonTemplate;
        custom: object | null;
    }

    interface AxonParams {
        debugMode: boolean;
        prefixes: string[];
        ownerPrefix: string;
        adminPrefix: string;
        lang: string;
        guildConfigCache: number;
    }

    interface Infos {
        name: string;
        description: string;
        version: string;
        owners: string[];
    }

    interface AxonInfos {
        name: string;
        version: string;
        author: string;
        github: string;
    }

    export class AxonClient extends EventEmitter {
        private _configs: AxonConfs;
        public settings: AxonParams;
        public infos: Infos;
        public axoncore: AxonInfos;
        public logger: ALogger;
        public axonUtils: AxonUtils;

        private _botClient: LibClient;
        public library: LibraryInterface;
        public utils: Utils;
        public DBProvider: ADBProvider

        public moduleRegistry: ModuleRegistry;
        public commandRegistry: CommandRegistry;
        public listenerRegistry: ListenerRegistry;
        public eventManager: EventManager;

        public guildConfigs: GuildConfigCache;

        public moduleLoader: ModuleLoader;
        public dispatcher: CommandDispatcher;
        private _messageManager: MessageManager;

        public staff: { [key: string]: { name: string; id: string; }[];};

        constructor(botClient: LibClient, AxonOptions: AxonOptions, modules: object);

        readonly botClient: LibClient;
        readonly handlers: Collection<AHandler>;
        getListeners(eventName: string): Listener[];
        readonly Resolver: Resolver;
        readonly webhooks: Webhooks;
        readonly template: AxonTemplate;
        readonly custom: object | null;
        readonly l: MessageManager;

        getModule(module: string): Module | null;
        getCommand(fullLabel: string): Command | null;

        public start(): Promise<void>;
        public onInit(): true;
        public onStart(): Promise<true>;
        public onReady(): Promise<true>;
        public log(level: LOG_LEVEL_TYPES, content: Error | string, ctx?: Ctx, execWebhook?: boolean): void;
        private _onMessageCreate(msg: LibMessage): void;

        private _onReady(): void;
        public initErrorListeners(): void;
        public initStatus(): void;

        public _execCommand(msg: LibMessage, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean; isOwner: boolean; } ): void;
        public _execHelp(msg: LibMessage, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean; isOwner: boolean; } ): void;
        public _execListener(listener: Listener, guildConfig: GuildConfig, ...args: any[] ): void;

        public sendFullHelp(msg: LibMessage, guildConfig?: GuildConfig): Promise<void>;
        public registerGuildPrefixes(gID: string, prefixArr: string[] ): Promise<GuildConfig>;
        toString(): string;
        toJSON(): object;

        // events
        on(event: 'commandExecution', listener: (status: boolean, commandFullLabel: string, data: { msg: LibMessage; command: Command; guildConfig: GuildConfig; context: CommandContext;} ) => void): this;
        on(event: 'commandError', listener: (commandFullLabel: string, data: { msg: LibMessage; command: Command; guildConfig: GuildConfig; error: AxonCommandError; } ) => void): this;
        on(event: 'listenerExecution', listener: (status: boolean, eventName: string, listenerName: string, data: { listener: Listener; guildConfig: GuildConfig; } ) => void): this;
        on(event: 'listenerError', listener: (eventName: string, listenerName: string, data: { listener: Listener; guildConfig: GuildConfig; error: Error; } ) => void): this;
    }

    export abstract class ASelector {
        constructor();
        static select(...args: any[] ): any; // Not Implemented
    }

    export class DBSelector extends ASelector {
        static select(axonOptions: AxonOptions, axonClient: AxonClient): InMemoryProvider | JsonProvider | MongoProvider;
    }

    export class MessageManager {
        private _axon: AxonClient;
        private _messages: Languages;
        public translation: TranslationManager;
        public parser: MessageParser;
        
        constructor(axonClient: AxonClient, messages: Languages, baseLang: string)

        public messages: Languages;
        public getMessages(lang?: string): AxonLanguageResponse;
        public getMessage(message: string, lang?: string): string;
        public get(message: string, args: AxonLanguageResponse, lang: string): string;
    }

    export class MessageParser {
        public match: RegExp;
        constructor();
        public matchAll(message: string): Generator<RegExpExecArray, void, unknown>;
        public parse(message: string, args: AxonLanguageResponse): string;
        public parse2(message: string, args: string[] ): string;
    }

    export class TranslationManager {
        private _manager: MessageManager;
        public lang: string;
        constructor(manager: MessageManager, lang: string);

        readonly messages: Languages;
        public getMessages(lang: string): Languages;
        public getMessage(message: string, lang: string): string;
    }

    export class ALogger {
        /**
         * Can be Console, Winston or Signale. Chalk will go as Console
         */
        public out: any;
        /**
         * @param out Can be Console, Winston or Signale. Chalk will go as Console
         */
        constructor(out: any);
        public fatal(input: string, opt: Context): void;
        public error(input: string, opt: Context): void;
        public warn(input: string, opt: Context): void;
        public debug(input: string, opt: Context): void;
        public notice(input: string, opt: Context): void;
        public info(input: string, opt: Context): void;
        public verbose(input: string, opt: Context): void;
        private _parseTime(): string;
    }

    // I won't include class extensions for Winston and Signale for now
    export class ChalkLogger extends ALogger {
        public out: Console;
    }

    export class DefLogger extends ALogger {
        public out: Console;
    }

    export class Context {
        public guild: string;
        public cmd: string;
        public user: string;

        constructor(guild: string | LibGuild, cmd: string, user: LibUser | string);

        public static from(ctx?: { guild: string | LibGuild; cmd: string; user: string | LibUser; } ): Context;
        public get(): string;
    }

    export class LoggerSelector extends ASelector {
        public static select(axonConfig: AxonConfig): ALogger;
        public static testLogger(Logger: ALogger): void;
    }

    export class ADispatcher {
        private _axon: AxonClient;
        constructor(axon: AxonClient);
        public dispatch(msg: any): any; // Not implemented
    }

    export class CommandDispatcher extends ADispatcher {
        mentionFormatter: RegExp;
        constructor(axon: AxonClient);
        readonly library: LibraryInterface;
        public dispatch(msg: LibMessage): Promise<void>;
    }

    export class AHandler {
        private _axon: AxonClient;
        public name: string;
        private _listeners: Listener[];
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        public size: number;
        private _handle(...args: any[] ): Promise<void>;
        public handle(...args: any[] ): string | null;
    }

    export class ALoader {
        public loadIn: any;
        constructor(loadIn: any);
        load(toLoad: any): any; // Not implemented
        loadAll(toLoad: any): any; // Not implemented
        unload(toUnload: any): any; // Not implemented
    }

    export class ClientInitialiser {
        static initStaff(staffConfig: { [key: string]: { name: string; id: string; }[];}, logger: ALogger): { [key: string]: string[]; };
        static initAxon(axon: AxonClient): Promise<void>;
    }

    export class CommandLoader extends ALoader {
        private _module: Module;
        constructor(module: Module);
        readonly axon: AxonClient;
        readonly logger: ALogger;
        load(command: Command, parent?: Command): boolean;
        loadAll(commands: { [key: string]: Command; } ): boolean;
        loadSubCommands(parentCommand: Command): void;
        unload(label: string): true;
        registerCommand(command: Command): void;
        registerSubCommand(command: Command, parent: Command): void;
        unregisterCommand(fullLabel: string): boolean;
        unregisterSubCommand(command: Command, subCommand: Command): void;
    }

    export class ListenerLoader extends ALoader {
        private _module: Module;
        constructor(module: Module);
        readonly axon: AxonClient;
        readonly module: Module;
        readonly logger: ALogger;
        load(listener: Listener): boolean;
        loadAll(listeners: { [key: string]: Listener; } ): boolean;
        unload(label: string): true;
    }

    export class ModuleLoader extends ALoader {
        constructor(axonClient: AxonClient);
        readonly axon: AxonClient;
        readonly logger: ALogger;
        load(module: Module): boolean;
        loadAll(modules: { [key: string]: Module; } ): boolean;
        unload(label: string): true;
    }

    export class ARegistry<T> {
        private _axon: AxonClient;
        public registry: Collection<T>;
        constructor(axon: AxonClient, base: T);
        readonly axon: AxonClient;
        readonly size: number;
        has(key: string): boolean;
        get(key: string): T | null;
        getAll(): Collection<T>;
        add(key: string, value: T): Collection<T>;
        remove(key: string): boolean;
        public [Symbol.iterator](): [string|number, T][];
        public register(key: string, value: T): any; // Not implemented
        public unregister(key: string, value: T): any; // Not implemented
    }

    export class CommandRegistry extends ARegistry<Command> {
        public aliases: Map<string | number, string>;
        constructor(axon: AxonClient);
        get(cmd: string): Command | null;
        getFull(splitLabel: string[] ): Command | null;
        register(label: string, command: Command): void;
        unregister(label: string, command?: Command): void;
        resolve(label: string, args: string[], guildConfig?: GuildConfig): Command | null;
    }

    export class GuildConfigCache {
        private _axon: AxonClient;
        public guildConfigs: LRUCache<GuildConfig>;
        get(key: string): GuildConfig;
        set(key: string, value: GuildConfig): void;
        public [Symbol.iterator](): [string|number, GuildConfig];
        public getOrFetch(key: string): Promise<GuildConfig|null>;
        public fetchGuildConf(gID: string): Promise<GuildConfig|null>;
    }

    export class ListenerRegistry extends ARegistry<Listener> {
        constructor(axon: AxonClient);
        register(label: string, listener: Listener): void;
        unregister(label: string, listener?: Listener): void;
    }

    export class ModuleRegistry extends ARegistry<Module> {
        constructor(axon: AxonClient);
        register(label: string, module: Module): void;
        unregister(label: string, module?: Module): void;
    }

    export class Validator {
        static validModule(module: Module): boolean;
        static validCommand(command: Command): boolean;
        static checkValidPermissionName(PERMISSIONS: string[], perm: string): boolean;
        static checkMessageValidity(content: LibMessage | string): boolean;
    }

    type DISCORD_GATEWAY_EVENTS = [
        'HELLO',
        'READY',
        'RESUMED',
        'INVALID_SESSION',
        'CHANNEL_CREATE',
        'CHANNEL_UPDATE',
        'CHANNEL_DELETE',
        'CHANNEL_PINS_UPDATE',
        'GUILD_CREATE',
        'GUILD_UPDATE',
        'GUILD_DELETE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'GUILD_EMOJIS_UPDATE',
        'GUILD_INTEGRATIONS_UPDATE',
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_REMOVE',
        'GUILD_MEMBER_UPDATE',
        'GUILD_MEMBERS_CHUNK',
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_UPDATE',
        'GUILD_ROLE_DELETE',
        'MESSAGE_CREATE',
        'MESSAGE_UPDATE',
        'MESSAGE_DELETE',
        'MESSAGE_DELETE_BULK',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        'TYPING_START',
        'USER_UPDATE',
        'VOICE_STATE_UPDATE',
        'VOICE_SERVER_UPDATE',
        'WEBHOOKS_UPDATE',
    ]

    type DISCORD_PERMISSIONS = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    // There's some inconsistency with this
    type PERMISSIONS_NUMBERS = {
        CREATE_INSTANT_INVITE: 1;
        KICK_MEMBERS: 2;
        BAN_MEMBERS: 4;
        ADMINISTRATOR: 8;
        MANAGE_CHANNELS: 16;
        MANAGE_GUILD: 32;
        ADD_REACTIONS: 64;
        VIEW_AUDIT_LOG: 128;
        PRIORITY_SPEAKER: 256;
        STREAM: 512;
        VIEW_CHANNEL: 1024;
        SEND_MESSAGES: 2048;
        SEND_TTS_MESSAGES: 4096;
        MANAGE_MESSAGES: 8192;
        EMBED_LINKS: 16384;
        ATTACH_FILES: 32768;
        READ_MESSAGE_HISTORY: 65536;
        MENTION_EVERYONE: 131072;
        USE_EXTERNAL_EMOJIS: 262144;
        VIEW_GUILD_ANALYTICS: 524288;
        CONNECT: 1048576;
        SPEAK: 2097152;
        MUTE_MEMBERS: 4194304;
        DEAFEN_MEMBERS: 8388608;
        MOVE_MEMBERS: 16777216;
        USE_VAD: 33554432;
        CHANGE_NICKNAME: 67108864;
        MANAGE_NICKNAMES: 134217728;
        MANAGE_ROLES: 268435456;
        MANAGE_WEBHOOKS: 536870912;
        MANAGE_EMOJIS: 1073741824;

        ALL: 2147483647;
    }

    type EMBED_LIMITS = {
        LIMIT_CONTENT: 2000;
        LIMIT_TOTAL_EMBED: 6000;
        LIMIT_TITLE: 256;
        LIMIT_DESCRIPTION: 2048;
        NUMBER_FIELDS: 25;
        LIMIT_FIELD_NAME: 256;
        LIMIT_FIELD_VALUE: 1024;
        LIMIT_FOOTER_TEXT: 2048;
        LIMIT_AUTHOR_NAME: 256;
    }

    type CHANNEL_TYPES = {
        GUILD_TEXT: 0;
        DM: 1;
        GUILD_VOICE: 2;
        GROUP_DM: 3;
        GUILD_CATEGORY: 4;
        GUILD_NEWS: 5;
        GUILD_STORE: 6;
    }

    type MESSAGE_TYPES = {
        DEFAULT: 0;
        RECIPIENT_ADD: 1;
        RECIPIENT_REMOVE: 2;
        CALL: 3;
        CHANNEL_NAME_CHANGE: 4;
        CHANNEL_ICON_CHANGE: 5;
        CHANNEL_PINNED_MESSAGE: 6;
        GUILD_MEMBER_JOIN: 7;
        USER_PREMIUM_GUILD_SUBSCRIPTION: 8;
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1: 9;
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2: 10;
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3: 11;
    }

    type CLIENT_STATUS_TYPES = {
        PLAYING: 0;
        STREAMING: 1;
        LISTENING: 2;
        WATCHING: 3;
        CUSTOM: 4;
    }

    export interface DiscordEnums {
        DISCORD_GATEWAY_EVENTS: DISCORD_GATEWAY_EVENTS;
        DISCORD_PERMISSIONS: DISCORD_PERMISSIONS;
        PERMISSION_NUMBERS: PERMISSIONS_NUMBERS;
        EMBED_LIMITS: EMBED_LIMITS;
        CHANNEL_TYPES: CHANNEL_TYPES;
        MESSAGE_TYPES: MESSAGE_TYPES;
        CLIENT_STATUS_TYPES: CLIENT_STATUS_TYPES;
    }

    export class Queue {
        private _functions: Function[];
        private _running: boolean;
        public stopOnError: boolean;
        constructor(stopOnError?: boolean);
        public exec(): void;
        public add(func: Function, toExec?: boolean, ...args: any[] ): void;
        public createClosure(fn: Function, ...args: any[] ): unknown;
    }

    export class AsyncQueue extends Queue {
        public exec(): Promise<void>;
        public add(func: Function, toExec?: boolean, ...args: any[] ): Promise<void>;
        public createClosure<T>(fn: Function, resolve: (value: unknown) => void, reject: (reason: Error) => void, ...args: any[] ): Promise<void>;
    }

    export class AutoQueue extends Queue {
        exec(): Promise<void>;
    }

    class Node {
        public key: any;
        public value: any;
        public next: any;
        public prev: any;
    }

    export class LRUCache<T> {
        public limit: number;
        public size: number;
        public head: Node | null;
        public queue: Node | null;
        private _cache: Collection<T>;
        constructor(limit: number, options: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );
        public set(key: string, value: T): void;
        public get(key: string): T | null;
        public remove(key: string): void;
        public clear(): void;
        private _ensureLimit(): void;
        public forEach<K>(fn: (value: T, key: K, map: Map<K, T>) => void, thisArg?: any): void;
        public find(func: (i: T) => boolean): T;
        public map<R>(func: (i: T) => R): R;
        public filter(func: (i: T) => boolean): T[];
        public some(func: (i: T) => boolean): boolean;
        public every(func: (i: T) => boolean): boolean;
        public [Symbol.iterator](): [string|number, T][];
    }

    // ReactionCollector file is empty

    export class LibrarySelector extends ASelector {
        static select(axon: AxonClient, axonOptions: AxonOptions): ErisInterface | DjsInterface;
    }

    export class Channel {
        public lib: LibraryInterface;
        constructor(lib: LibraryInterface);
        public getID(channel: LibChannel): string;
        public getName(channel: LibChannel): string;
        public getGuild(channel: LibChannel): LibGuild;
        public getGuildID(channel: LibChannel): string | null;
        public getGuildName(channel: LibChannel): string | null;
        public hasPermission(channel: LibChannel, user: LibUser, perm: string): boolean; // Not Implemented
        public sendMessage(channel: LibChannel, content: AxonMSGCont): Promise<LibMessage | LibMessage[]>; // Not Implemented // LibMessage[] is for Discord.JS
    }

    export class Client {
        public lib: LibraryInterface;
        public baseWebhookURL: 'https://discordapp.com/api/webhooks/';
        constructor(lib: LibraryInterface);
        public client: LibClient;
        public getID(): string;
        public getUsername(): string | null;
        public getMention(): string;
        public getAvatar(): string; // Not Implemented
        public getUser(): LibUser;
        public getMember(guild: LibGuild): LibMember;
        public connect(): Promise<void | string>;
        public setPresence(status: string, game: object): Promise<LibUser | void>;
        public triggerWebhook(id: string, token: string, data: ErisWebhookContent | DjsWebhookContent): Promise<Message | void>;
        private _request(url: string, params: RequestOptions, postData: any): any;
    }

    export class Guild {
        public lib: LibraryInterface
        constructor(lib: LibraryInterface);
        getID(guild: LibGuild): string;
        getName(guild: LibGuild): string;
        getOwnerID(guild: LibGuild): string;
        getMember(guild: LibGuild, userID: string): LibMember;
    }

    export class Member {
        public lib: LibraryInterface;
        constructor(lib: LibraryInterface);
        getID(member: LibMember): string;
        getRoles(member: LibMember): string[]; // Not Implemented
        getRolesObject(member: LibMember): LibRole[]; // Not Implemented
        hasPermission(member: LibMember, permission: string): boolean; // Not Implemented
    }

    export class Message {
        public lib: LibraryInterface;
        constructor(lib: LibraryInterface);
        getID(message: LibMessage): string;
        getContent(message: LibMessage): string;
        setContent(message: LibMessage, content: string): void;
        getAuthor(message: LibMessage): LibUser;
        getAuthorID(message: LibMessage): string;
        getMember(message: LibMessage): LibMember;
        getMemberID(message: LibMessage): string;
        getChannel(message: LibMessage): LibTextableChannel;
        getChannelID(message: LibMessage): string;
        getChannelName(message: LibMessage): string;
        getGuild(message: LibMessage): LibGuild;
        getGuildID(message: LibMessage): string;
        getGuildName(message: LibMessage): string;
        delete(message: LibMessage): Promise<LibMessage | void>;
        edit(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;
    }

    export class Resolver {
        public static user(client: LibClient, args: string[]|string): LibUser|null; // Not implemented
        public static member(guild: LibGuild, args: string[]|string): LibMember|null; // Not implemented
        public static role(guild: LibGuild, args: string[]|string): LibRole|null; // Not implemented
        public static channel(guild: LibGuild, args: string[]|string): LibChannel|null; // Not implemented
        public static guild(client: LibClient, args: string[] ): LibGuild|null; // Not implemented
    }

    export class User {
        public lib: LibraryInterface;
        constructor(lib: LibraryInterface);
        getID(user: LibUser): string;
        getUsername(user: LibUser): string;
        getDiscriminator(user: LibUser): string;
        getTag(user: LibUser): string;
        isBot(user: LibUser): boolean;
        getDM(user: LibUser): Promise<LibDMChannel>;
    }

    interface LibraryInterfaceStructs {
        User: User;
        Member: Member;
        Message: Message;
        Channel: Channel;
        Guild: Guild;
        Resolver: Resolver;
    }

    export class LibraryInterface {
        private _botClient: LibClient;
        public user: User;
        public member: Member;
        public message: Message;
        public channel: Channel;
        public guild: Guild;
        public resolver: Resolver;
        constructor(botClient: LibClient, structs: LibraryInterfaceStructs);
        public botClient: LibClient;
        public onMessageCreate(func: (message: LibMessage) => void): void; // Not Implemented
        public onceReady(func: () => void): void; // Not Implemented
    }

    interface PresenceGame {
        name?: string;
        url?: string;
        type?: string | number;
    }

    // Discord.JS
    interface DjsEnumsEvents {
        RATE_LIMIT: 'rateLimit';
        READY: 'ready';
        RESUME: 'resume';
        GUILD_CREATE: 'guildCreate';
        GUILD_DELETE: 'guildDelete';
        GUILD_UPDATE: 'guildUpdate';
        GUILD_UNAVAILABLE: 'guildUnavailable';
        GUILD_AVAILABLE: 'guildAvailable';
        GUILD_MEMBER_ADD: 'guildMemberAdd';
        GUILD_MEMBER_REMOVE: 'guildMemberRemove';
        GUILD_MEMBER_UPDATE: 'guildMemberUpdate';
        GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable';
        GUILD_MEMBER_SPEAKING: 'guildMemberSpeaking';
        GUILD_MEMBERS_CHUNK: 'guildMembersChunk';
        GUILD_INTEGRATIONS_UPDATE: 'guildIntegrationsUpdate';
        GUILD_ROLE_CREATE: 'roleCreate';
        GUILD_ROLE_DELETE: 'roleDelete';
        GUILD_ROLE_UPDATE: 'roleUpdate';
        GUILD_EMOJI_CREATE: 'emojiCreate';
        GUILD_EMOJI_DELETE: 'emojiDelete';
        GUILD_EMOJI_UPDATE: 'emojiUpdate';
        GUILD_BAN_ADD: 'guildBanAdd';
        GUILD_BAN_REMOVE: 'guildBanRemove';
        CHANNEL_CREATE: 'channelCreate';
        CHANNEL_DELETE: 'channelDelete';
        CHANNEL_UPDATE: 'channelUpdate';
        CHANNEL_PINS_UPDATE: 'channelPinsUpdate';
        MESSAGE_CREATE: 'message';
        MESSAGE_DELETE: 'messageDelete';
        MESSAGE_UPDATE: 'messageUpdate';
        MESSAGE_BULK_DELETE: 'messageDeleteBulk';
        MESSAGE_REACTION_ADD: 'messageReactionAdd';
        MESSAGE_REACTION_REMOVE: 'messageReactionRemove';
        MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll';
        USER_UPDATE: 'userUpdate';
        USER_NOTE_UPDATE: 'userNoteUpdate';
        USER_SETTINGS_UPDATE: 'clientUserSettingsUpdate';
        USER_GUILD_SETTINGS_UPDATE: 'clientUserGuildSettingsUpdate';
        PRESENCE_UPDATE: 'presenceUpdate';
        VOICE_STATE_UPDATE: 'voiceStateUpdate';
        TYPING_START: 'typingStart';
        TYPING_STOP: 'typingStop';
        WEBHOOKS_UPDATE: 'webhookUpdate';
        DISCONNECT: 'disconnect';
        RECONNECTING: 'reconnecting';
        ERROR: 'error';
        WARN: 'warn';
        DEBUG: 'debug';
    }
    interface DjsEnumsDiscordLibPermissions {
        CREATE_INSTANT_INVITE: 'CREATE_INSTANT_INVITE';
        KICK_MEMBERS: 'KICK_MEMBERS';
        BAN_MEMBERS: 'BAN_MEMBERS';
        ADMINISTRATOR: 'ADMINISTRATOR';
        MANAGE_CHANNELS: 'MANAGE_CHANNELS';
        MANAGE_GUILD: 'MANAGE_GUILD';
        ADD_REACTIONS: 'ADD_REACTIONS';
        VIEW_AUDIT_LOG: 'VIEW_AUDIT_LOG';
        PRIORITY_SPEAKER: 'PRIORITY_SPEAKER';
        STREAM: 'STREAM';
        VIEW_CHANNEL: 'VIEW_CHANNEL';
        SEND_MESSAGES: 'SEND_MESSAGES';
        SEND_TTS_MESSAGES: 'SEND_TTS_MESSAGES';
        MANAGE_MESSAGES: 'MANAGE_MESSAGES';
        EMBED_LINKS: 'EMBED_LINKS';
        ATTACH_FILES: 'ATTACH_FILES';
        READ_MESSAGE_HISTORY: 'READ_MESSAGE_HISTORY';
        MENTION_EVERYONE: 'MENTION_EVERYONE';
        USE_EXTERNAL_EMOJIS: 'USE_EXTERNAL_EMOJIS';
        CONNECT: 'CONNECT';
        SPEAK: 'SPEAK';
        MUTE_MEMBERS: 'MUTE_MEMBERS';
        DEAFEN_MEMBERS: 'DEAFEN_MEMBERS';
        MOVE_MEMBERS: 'MOVE_MEMBERS';
        USE_VAD: 'USE_VAD';
        CHANGE_NICKNAME: 'CHANGE_NICKNAME';
        MANAGE_NICKNAMES: 'MANAGE_NICKNAMES';
        MANAGE_ROLES: 'MANAGE_ROLES';
        MANAGE_WEBHOOKS: 'MANAGE_WEBHOOKS';
        MANAGE_EMOJIS: 'MANAGE_EMOJIS';
    }
    type DjsEnumsPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ];
    type DjsEnumsPermissionList = 'CREATE_INSTANT_INVITE' | 'KICK_MEMBERS' | 'BAN_MEMBERS' | 'ADMINISTRATOR' | 'MANAGE_CHANNELS' |
    'MANAGE_GUILD' | 'ADD_REACTIONS' | 'VIEW_AUDIT_LOG' | 'PRIORITY_SPEAKER' | 'STREAM' | 'VIEW_CHANNEL' | 'SEND_MESSAGES' |
    'SEND_TTS_MESSAGES' | 'MANAGE_MESSAGES' | 'EMBED_LINKS' | 'ATTACH_FILES' | 'READ_MESSAGE_HISTORY' | 'MENTION_EVERYONE' |
    'USE_EXTERNAL_EMOJIS' | 'CONNECT' | 'SPEAK' | 'MUTE_MEMBERS' | 'DEAFEN_MEMBERS' | 'MOVE_MEMBERS' | 'USE_VAD' | 'CHANGE_NICKNAME' |
    'MANAGE_NICKNAMES' | 'MANAGE_ROLES' | 'MANAGE_WEBHOOKS' | 'MANAGE_EMOJIS';
    interface DjsEnumsPermissionNames {
        CREATE_INSTANT_INVITE: 'Create Instant Invite';
        KICK_MEMBERS: 'Kick Members';
        BAN_MEMBERS: 'Ban Members';
        ADMINISTRATOR: 'Administrator';
        MANAGE_CHANNELS: 'Manage Channels';
        MANAGE_GUILD: 'Manage Guild';
        ADD_REACTIONS: 'Add Reactions';
        VIEW_AUDIT_LOG: 'View Audit Log';
        PRIORITY_SPEAKER: 'Priority Speaker';
        STREAM: 'stream';
        VIEW_CHANNEL: 'Read Messages';
        SEND_MESSAGES: 'Send Messages';
        SEND_TTS_MESSAGES: 'Send TTS Messages';
        MANAGE_MESSAGES: 'Manage Messages';
        EMBED_LINKS: 'Embed Links';
        ATTACH_FILES: 'Attach Files';
        READ_MESSAGE_HISTORY: 'Read Message History';
        MENTION_EVERYONE: 'Mention Everyone';
        USE_EXTERNAL_EMOJIS: 'External Emojis';
        CONNECT: 'Voice Connect';
        SPEAK: 'Voice Speak';
        MUTE_MEMBERS: 'Voice Mute Members';
        DEAFEN_MEMBERS: 'Voice Deafen Members';
        MOVE_MEMBERS: 'Voice Move Members';
        USE_VAD: 'Voice Use VAD';
        CHANGE_NICKNAME: 'Change Nickname';
        MANAGE_NICKNAMES: 'Manage Nicknames';
        MANAGE_ROLES: 'Manage Roles';
        MANAGE_WEBHOOKS: 'Manage Webhooks';
        MANAGE_EMOJIS: 'Manage Emojis';
    }
    interface DjsContent {
        content?: string;
        tts?: boolean;
        nonce?: string;
        embed?: Embed | djs.MessageEmbed | djs.MessageEmbedOptions;
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
        embeds?: (Embed | djs.MessageEmbed | djs.MessageEmbedOptions)[];
        reply?: undefined;
    }
    interface DjsPresenceGame extends PresenceGame {
        type: djs.ActivityType | 0 | 1 | 2 | 3 | 4;
    }
    
    export class DjsChannel extends Channel {
        hasPermission(channel: djs.Channel, user: djs.User, perm: string): boolean;
        sendMessage(channel: djs.Channel, content: string | DjsContent): Promise<djs.Message | djs.Message[]>
    }

    export interface DjsEnums {
        EVENTS: DjsEnumsEvents;
        DISCORD_LIB_PERMISSIONS: DjsEnumsDiscordLibPermissions;
        PERMISSIONS: DjsEnumsPermissions;
        PERMISSION_NAMES: DjsEnumsPermissionNames;
    }

    export class DjsGuild extends Guild {
        getMember(guild: djs.Guild, userID: string): djs.GuildMember;
    }

    export class DjsMember extends Member {
        getRoles(member: djs.GuildMember): string[];
        getRolesObject(member: djs.GuildMember): djs.Role[];
        hasPermission(member: djs.GuildMember, permission: DjsEnumsPermissionList): boolean;
    }

    export class DjsMessage extends Message {
        delete(message: djs.Message): Promise<djs.Message>;
        edit(message: djs.Message, content: string | DjsContent): Promise<djs.Message>
    }

    export class DjsResolver extends Resolver {
        static user(client: djs.Client, args: string | string[] ): djs.User;
        static member(guild: djs.Guild, args: string | string[] ): djs.GuildMember;
        static role(guild: djs.Guild, args: string | string[] ): djs.Role;
        static channel(guild: djs.Guild, args: string | string[] ): djs.GuildChannel;
        static guild(client: djs.Client, args: string[] ): djs.Guild;
    }

    export class DjsUser extends User {
        getDM(user: djs.User): Promise<djs.DMChannel>;
    }

    export class DjsClient extends Client {
        private _token: string;
        constructor(lib: DjsInterface, token: string);
        public client: djs.Client;
        getMember(guild: djs.Guild): djs.GuildMember;
        connect(): Promise<string>;
        setPresence(status: djs.PresenceStatus, game: DjsPresenceGame): Promise<djs.ClientUser>;
        triggerWebhook(id: string, token: string, data: DjsWebhookContent): any; // Clarify with Khaaz
    }

    export class DjsInterface extends LibraryInterface {
        public client: djs.Client;
        public type: 1;
        constructor(botClient: djs.Client, token: string);
        public enums: DjsEnums;
        public HANDLERS: object; // Not going to list them all
        public onMessageCreate(func: (message: djs.Message) => void): void;
    }

    // Eris
    interface ErisEnumsEvents {
        GUILD_CREATE: 'guildCreate';
        GUILD_DELETE: 'guildDelete';
        GUILD_UPDATE: 'guildUpdate';
        GUILD_UNAVAILABLE: 'guildUnavailable';
        GUILD_AVAILABLE: 'guildAvailable';
        GUILD_MEMBER_ADD: 'guildMemberAdd';
        GUILD_MEMBER_REMOVE: 'guildMemberRemove';
        GUILD_MEMBER_UPDATE: 'guildMemberUpdate';
        GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable';
        GUILD_MEMBER_SPEAKING: 'guildMemberSpeaking';
        GUILD_MEMBERS_CHUNK: 'guildMembersChunk';
        GUILD_ROLE_CREATE: 'roleCreate';
        GUILD_ROLE_DELETE: 'roleDelete';
        GUILD_ROLE_UPDATE: 'roleUpdate';
        GUILD_EMOJIS_UPDATE: 'guildEmojisUpdate';
        GUILD_BAN_ADD: 'guildBanAdd';
        GUILD_BAN_REMOVE: 'guildBanRemove';
        UNAVAILABLE_GUILD_CREATE: 'unavailableGuildCreate';
        CHANNEL_CREATE: 'channelCreate';
        CHANNEL_DELETE: 'channelDelete';
        CHANNEL_UPDATE: 'channelUpdate';
        CHANNEL_PIN_UPDATE: 'channelPinUpdate';
        MESSAGE_CREATE: 'messageCreate';
        MESSAGE_DELETE: 'messageDelete';
        MESSAGE_UPDATE: 'messageUpdate';
        MESSAGE_DELETE_BULK: 'messageDeleteBulk';
        MESSAGE_REACTION_ADD: 'messageReactionAdd';
        MESSAGE_REACTION_REMOVE: 'messageReactionRemove';
        MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll';
        TYPING_START: 'typingStart';
        USER_UPDATE: 'userUpdate';
        PRESENCE_UPDATE: 'presenceUpdate';
        VOICE_CHANNEL_JOIN: 'voicecChannelJoin';
        VOICE_CHANNEL_LEAVE: 'voiceChannelLeave';
        VOICE_CHANNEL_SWITCH: 'voiceChannelSwitch';
        VOICE_STATE_UPDATE: 'voiceStateUpdate';
        WEBHOOKS_UPDATE: 'webhookUpdate';
        SHARD_DISCONNECT: 'shardDisconnect';
        SHARD_PRE_READY: 'shardPreReady';
        SHARD_READY: 'shardReady';
        SHARD_RESUME: 'shardResume';
        UNKNOWN: 'unknown';
        CONNECT: 'connect';
        DISCONNECT: 'disconnect';
        ERROR: 'error';
        WARN: 'warn';
        DEBUG: 'debug';
        READY: 'ready';
        HELLO: 'hello';
        RATE_LIMIT: 'rateLimit';
        RAW_WS: 'rawWS';
    }

    interface ErisEnumsDiscordLibPermissions {
        CREATE_INSTANT_INVITE: 'createInstantInvite';
        KICK_MEMBERS: 'kickMembers';
        BAN_MEMBERS: 'banMembers';
        ADMINISTRATOR: 'administrator';
        MANAGE_CHANNELS: 'manageChannels';
        MANAGE_GUILD: 'manageGuild';
        ADD_REACTIONS: 'addReactions';
        VIEW_AUDIT_LOG: 'viewAuditLog';
        PRIORITY_SPEAKER: 'voicePrioritySpeaker';
        STREAM: 'stream';
        VIEW_CHANNEL: 'readMessages';
        SEND_MESSAGES: 'sendMessages';
        SEND_TTS_MESSAGES: 'sendTTSMessages';
        MANAGE_MESSAGES: 'manageMessages';
        EMBED_LINKS: 'embedLinks';
        ATTACH_FILES: 'attachFiles';
        READ_MESSAGE_HISTORY: 'readMessageHistory';
        MENTION_EVERYONE: 'mentionEveryone';
        USE_EXTERNAL_EMOJIS: 'externalEmojis';
        CONNECT: 'voiceConnect';
        SPEAK: 'voiceSpeak';
        MUTE_MEMBERS: 'voiceMuteMembers';
        DEAFEN_MEMBERS: 'voiceDeafenMembers';
        MOVE_MEMBERS: 'voiceMoveMembers';
        USE_VAD: 'voiceUseVAD';
        CHANGE_NICKNAME: 'changeNickname';
        MANAGE_NICKNAMES: 'manageNicknames';
        MANAGE_ROLES: 'manageRoles';
        MANAGE_WEBHOOKS: 'manageWebhooks';
        MANAGE_EMOJIS: 'manageEmojis';
    }

    type ErisEnumsPermissions = [
        'createInstantInvite',
        'kickMembers',
        'banMembers',
        'administrator',
        'manageChannels',
        'manageGuild',
        'addReactions',
        'viewAuditLog',
        'voicePrioritySpeaker',
        'stream',
        'readMessages',
        'sendMessages',
        'sendTTSMessages',
        'manageMessages',
        'embedLinks',
        'attachFiles',
        'readMessageHistory',
        'mentionEveryone',
        'externalEmojis',
        'voiceConnect',
        'voiceSpeak',
        'voiceMuteMembers',
        'voiceDeafenMembers',
        'voiceMoveMembers',
        'voiceUseVAD',
        'changeNickname',
        'manageNicknames',
        'manageRoles',
        'manageWebhooks',
        'manageEmojis',
    ]

    type ErisEnumsPermissionList = 'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' |
    'addReactions' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'stream' | 'readMessages' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' |
    'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'externalEmojis' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' |
    'voiceDeafenMembers' | 'voiceMoveMembers' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageWebhooks' | 'manageEmojis';

    interface ErisEnumsPermissionsNames {
        createInstantInvite: 'Create Instant Invite';
        kickMembers: 'Kick Members';
        banMembers: 'Ban Members';
        administrator: 'Administrator';
        manageChannels: 'Manage Channels';
        manageGuild: 'Manage Guild';
        addReactions: 'Add Reactions';
        viewAuditLog: 'View Audit Log';
        voicePrioritySpeaker: 'Priority Speaker';
        stream: 'Stream';
        readMessages: 'Read Messages';
        sendMessages: 'Send Messages';
        sendTTSMessages: 'Send TTS Messages';
        manageMessages: 'Manage Messages';
        embedLinks: 'Embed Links';
        attachFiles: 'Attach Files';
        readMessageHistory: 'Read Message History';
        mentionEveryone: 'Mention Everyone';
        externalEmojis: 'External Emojis';
        voiceConnect: 'Voice Connect';
        voiceSpeak: 'Voice Speak';
        voiceMuteMembers: 'Voice Mute Members';
        voiceDeafenMembers: 'Voice Deafen Members';
        voiceMoveMembers: 'Voice Move Members';
        voiceUseVAD: 'Voice Use VAD';
        changeNickname: 'Change Nickname';
        manageNicknames: 'Manage Nicknames';
        manageRoles: 'Manage Roles';
        manageWebhooks: 'Manage Webhooks';
        manageEmojis: 'Manage Emojis';
    }

    interface ErisContent {
        content?: string;
        tts?: boolean;
        disableEveryone?: boolean;
        embed?: Embed | Eris.EmbedOptions;
        file: Eris.MessageFile | Eris.MessageFile[];
    }
    interface ErisWebhookContent extends ErisContent {
        embed?: undefined;
        embeds?: (Embed | Eris.EmbedOptions)[];
        username?: string;
        avatarURL?: string;
        wait?: boolean;
    }
    interface ErisPresenceGame extends PresenceGame {
        type: 0 | 1 | 2 | 3 | 4;
    }

    export class ErisChannel extends Channel {
        public hasPermission(channel: Eris.Channel, user: Eris.User, perm: ErisEnumsPermissionList): boolean;
        public sendMessage(channel: Eris.Channel, content: ErisContent): Promise<Eris.Message>;
    }

    export interface ErisEnums {
        EVENTS: ErisEnumsEvents;
        DISCORD_LIB_PERMISSIONS: ErisEnumsDiscordLibPermissions;
        PERMISSIONS: ErisEnumsPermissions;
        PERMISSIONS_NAMES: ErisEnumsPermissionsNames;
    }

    export class ErisGuild extends Guild {
        public getMember(guild: Eris.Guild, userID: string): Eris.Member;
    }

    export class ErisMember extends Member {
        getRoles(member: Eris.Member): string[];
        getRolesObject(member: Eris.Member): Eris.Role[];
        hasPermission(member: Eris.Member, permission: ErisEnumsPermissionList): boolean;
    }

    export class ErisMessage extends Message {
        delete(message: Eris.Message): Promise<void>;
        edit(message: Eris.Message, content: ErisContent): Promise<Eris.Message>;
    }

    export class ErisResolver extends Resolver {
        static user(client: Eris.Client, args: string | string[] ): Eris.User | null;
        static member(guild: Eris.Guild, args: string | string[] ): Eris.Member | null;
        static role(guild: Eris.Guild, args: string | string[] ): Eris.Role | null;
        static channel(guild: Eris.Guild, args: string | string[] ): Eris.GuildChannel;
        static guild(client: Eris.Client, args: string[] ): Eris.Guild;
    }

    export class ErisUser extends User {
        getDM(user: Eris.User): Promise<Eris.PrivateChannel>;
    }

    export class ErisClient extends Client {
        public client: Eris.Client;
        public getMember(guild: Eris.Guild): Eris.Member;
        public connect(): Promise<void>;
        public setPresence(status: 'online' | 'idle' | 'dnd' | 'invisible', game: ErisPresenceGame): Promise<void>;
        public triggerWebhook(id: string, token: string, data: ErisWebhookContent): Promise<Message>;
    }

    export class ErisInterface extends LibraryInterface {
        public client: ErisClient;
        public type: 0;
        constructor(botClient: Eris.Client);
        public enums: ErisEnums;
        public HANDLERS: object;
        public onMessageCreate(func: (message: Eris.Message) => void): void;
        public onceReady(func: () => void): void;
    }
}
