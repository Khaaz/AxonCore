import { EventEmitter } from 'events';
import * as Eris from 'eris';
import * as djs from 'discord.js';
import { Model, Document } from 'mongoose';
type Message = Eris.Message | djs.Message;
type Member = Eris.Member | djs.GuildMember;
type Client = Eris.Client | djs.Client;
type Guild = Eris.Guild | djs.Guild;
type User = Eris.User | djs.User;
type TextableChannel = Eris.TextableChannel | djs.TextChannel;
type Role = Eris.Role | djs.Role;
type Channel = Eris.Channel | djs.Channel;
type Permission = Eris.Permission | Eris.PermissionOverwrite | djs.PermissionOverwrites; // djs.Permissions; // No allow/deny properties

declare module 'axoncore' {

    export class Collection<T> extends Map<string | number, T> {
        public baseObject: new (...args: any[] ) => T;
        public constructor(base: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T} | [string, T][] } );
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
        public toObject(): {[key: string]: T};
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
        constructor(message: string, module: Module, subModule?: Module);
        readonly name: string;
    }

    export class AxonCommandError extends Error {
        public context: CommandContext;
        readonly short: { value: string; writable: false };
        /* Conflicting error property names
        public message: { value: string, writable: false };
        public stack: { value: string, writable: false };
        */

        constructor(commandContext: CommandContext, err: Error);
        readonly name: string;
    }

    export class NoAbstractInstanceException extends Error {
        constructor(...args: any[] );
        /* Conflicting error property names
        readonly name: { value: string, writable: false };
        readonly message: { value: string, writable: false };
        */
    }

    class NotImplementedException extends Error {
        constructor(...args: any[] );
        /* Conflicting error property names
        readonly name: { value: string, writable: false };
        readonly message: { value: string, writable: false };
        */
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

        public commandLoader: any; // Replace with CommandLoader
        public listenerLoader: any; // Replace with listenerLoader

        constructor(client: AxonClient, data?: ModuleData);

        public commands: Collection<Command>;
        public listeners?: Collection<Listener>;

        public init(): {[key: string]: Command | Listener};
        private _init(): void;
    }

    type updateDBVal = object|any[]|string|boolean;

    export abstract class ADBProvider {
        public axon: AxonClient;
        constructor(axonClient: AxonClient);
        public init(AxonOptions: AxonOptions): any; // Not Implemented
        public initAxon(): any; // Promise<AxonConfig|null>; Not Implemented
        public initGuild(gID: string): any; // Promise<GuildConfig|null>; // Not Implemented
        
        public fetchAxon(): any; // Promise<AxonConfig|null>; // Not Implemented
        public fetchGuild(gID: string): any; // Promise<GuildConfig|null>; // Not Implemented
        
        public updateAxon(key: string, value: updateDBVal): any; // Promise<boolean>; // Not Implemented
        public updateGuild(key: string, gID: string, value: updateDBVal): any; // Promise<boolean>; // Not Implemented
        public saveAxon(data: object): any; // Promise<AxonSchema | null>; // Not Implemented
        public saveGuild(gID: string, data: object): any; // Promise<GuildSchema | null>;
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
        public axonExecutor: any; // Replace with AsyncQueue
        public guildExecutors: {[key: string]: any}; // Clarify with Khaaz

        constructor(basePath: string);

        // GETTERS
        readonly axonDefault: AxonJSON;
        readonly guildDefault: GuildJSON;

        public getExecutor(guildID: string): any; // Replace with AsyncQueue
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
        initGuild(gID: string): Promise<GuildConfig|null>;

        fetchAxon(): Promise<AxonConfig|null>;
        fetchGuild(gID: string): Promise<GuildConfig|null>;

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
        initGuild(gID: string): Promise<GuildConfig|null>;

        fetchAxon(): Promise<AxonConfig|null>;
        fetchGuild(gID: string): Promise<GuildConfig|null>;
        fetchGuildSchema(gID: string): Promise<Model<GuildSchema> | null>;

        updateAxon(key: string, value: updateDBVal): Promise<boolean>;
        updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;
        saveAxon(data: AxonSchema): Promise<AxonConfig|null>;
        saveGuild(gID: string, data: GuildSchema): Promise<AxonConfig|null>;
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
        public isIgnored(msg: Message): boolean;
        public isUserIgnored(userID: string): boolean
        public isRoleIgnored(member: Member): boolean;
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
        invalidPermissionMessage?: ( (channel: TextableChannel, member: Member) => string) | null;
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
        public invalidPermissionMessage: ( (channel: TextableChannel, member: Member) => string) | null;
        public sendPermissionMessage: boolean;
        public invalidPermissionMessageTimeout: number;

        public deleteCommand?: boolean;
        public hidden?: boolean;

        public cooldown?: number;

        constructor(command: Command, override: ACommandOptions, useModuleDefault: boolean);

        readonly l: any; // Replace with MessageManager

        public isGuildOnly(): boolean;
        public isHidden(): boolean;

        public shouldSendInvalidUsageMessage(args: string[] ): boolean;
        public shouldSendInvalidPermissionMessage(guildConfig: GuildConfig): boolean;
        public shouldDeleteCommand(): boolean;
        public getInvalidPermissionMessage(channel: TextableChannel, member: Member, permission: any): string; // CommandPermissions?
    }

    export class CommandCooldown {
        private _command: Command;
        private _cooldowns: Map<string, { time: Date; post: boolean }>;

        constructor(command: Command);

        // GETTERS

        readonly cooldown: number;

        // METHODS
        public shouldCooldown(userID: string): [number, boolean] | [];
        public shouldSendCooldownMessage(cooldown: { time: Date; post: boolean } ): boolean;
        public shouldSetCooldown(response: { triggerCooldown: boolean } | null): boolean;
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
        custom(func: (i: Message) => true): true;
    }

    export class CommandPermissions implements CommandPerms {
        private _command: Command;

        public custom(func: (msg: Message) => true): true;
        constructor(command: Command, override?: CommandPerms, userModuleDefault?: boolean);
        // GETTERS
        readonly axon: AxonClient;
        readonly utils: Utils;
        readonly axonUtils: AxonUtils;
        readonly library: any; // Replace with Library class

        // METHODS

        public canExecute(msg: Message, guildConf: GuildConfig): [boolean, string | null]; // Ask Khaaz about inconsistency

        public setBot(array?: string[], toAdd?: boolean): CommandPermissions;
        public setServerMod(boolean?: boolean): CommandPermissions;
        public setServerManager(boolean?: boolean): CommandPermissions;
        public setServerAdmin(boolean?: boolean): CommandPermissions;
        public setServerOwner(boolean?: boolean): CommandPermissions;
        public setUser(object?: { bypass?: string[]; needed?: string[] }, toAdd?: boolean): CommandPermissions;
        public setUserIDs(object?: { bypass?: string[]; needed?: string[] }, toAdd?: boolean): CommandPermissions;
        public setRoleIDs(object?: { bypass?: string[]; needed?: string[] }, toAdd?: boolean): CommandPermissions;
        public setChannelIDs(object?: { bypass?: string[]; needed?: string[] }, toAdd?: boolean): CommandPermissions;
        public setStaff(object?: { bypass?: string[]; needed?: string[] }, toAdd?: boolean): CommandPermissions;

        // CHECK FOR IF PERMISSIONS ARE MET

        private _checkPermsBot(channel: TextableChannel): boolean;
        private _checkPermsUserBypass(member: Member): boolean;
        private _checkPermsUserNeeded(member: Member): [true] | [false, string];
        private _checkUserBypass(member: Member): boolean;
        private _checkUserNeeded(member: Member): boolean;
        private _checkRoleBypass(member: Member): boolean;
        private _checkRoleNeeded(member: Member): boolean;
        private _checkChannelBypass(channel: TextableChannel): boolean;
        private _checkChannelNeeded(channel: TextableChannel): boolean;
        private _checkStaffBypass(member: Member): boolean;
        private _checkStaffNeeded(member: Member): boolean;
    }

    export class CommandResponse {
        public success: boolean;
        public triggerCooldown: boolean;
        public error?: Error;
        constructor(data: { success: boolean; triggerCooldown: boolean; error?: Error } );
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

        public library: any; // Replace with Library class

        public dm: boolean;
        public guildID: string;
        public guildName: string;

        public channelID: string;
        public channelName: string;

        public callerID: string;
        public callerName: string;

        public calledAt: Date;

        constructor(command: Command, triggerMessage: Message, data?: { executed?: boolean; helpExecution?: string; executionState?: number; executionType?: object } );

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
        embeds: {[key: string]: number};
        emotes: {[key: string]: string};
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
        public subCommandAliases?: Map<string, string>; // Missing from actual class

        // GETTERS
        readonly module: Module;
        readonly template: AxonTemplate;
        readonly library: any; // Replace from Library class
        readonly fullLabel: string;

        constructor(module: Module, data?: CommandData);

        // Internal
        private _process(object: { msg: Message; args: string[]; guildConfig?: GuildConfig; isAdmin?: boolean; isOwner?: boolean } ): Promise<CommandContext>;
        private _preExecute(): void; // Blank function
        private _execute(message: { msg: Message; args?: string[]; guildConfig?: GuildConfig; isAdmin?: boolean; isOwner?: boolean } ): Promise<any>;
        private _postExecute(): void; // Blank function

        // External
        public execute(object: { msg: Message; args?: string[]; guildConfig?: GuildConfig } ): any; // Promise<CommandResponse>; // Not implemented
        public sendHelp(object: { msg: Message; guildConf?: GuildConfig; isAdmin: boolean; isOwner: boolean } ): Promise<CommandContext>;
        public sendBotPerms(channel: TextableChannel, permissions?: string[] ): Promise<CommandResponse>;
        public sendUserPerms(channel: TextableChannel, member: Member, deleteTimeout?: number, missingPermission?: any): Promise<CommandResponse>; // CommandPermissions?
        public sendTargetPerms(channel: TextableChannel): Promise<CommandContext>;
        public sendCooldown(channel: TextableChannel, time: number): Promise<CommandContext>;
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

        private _execute(guildConf: GuildConfig, ...args: string[] ): Promise<any>; // Will error, see below

        // public execute(args: any, guildConf: GuildConfig): Promise<any>; // Function does not exist
    }

    class EventManager extends Base {
        private _events: {[EventName: string]: Listener[]};
        private _handlers: Collection<any>; // Replace with AHandler
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        // GETTERS
        readonly HANDLERS: Record<string, any>; // Create each handler and group them to lib
        readonly handlers: Collection<any>; // Replace with AHandler

        public getListeners(eventName: string): Listener[];
        public bindListeners(): void;
        public bindHandlers(): void;

        public registerListener(event: Listener): Listener[];
        public registerHandler(event: string): object; // Each handler, this will become cumbersome
        public registerEvent(event: string): object; // As above
        
        public unregisterListener(event: string, label: string): boolean;
        public unregisterHandler(event: string): boolean;
        public unregisterEvent(event: string): boolean;
    }

    interface APIAxonMSGCont {
        embed?: Eris.EmbedBase;
        content?: string;
    }

    type AxonMSGCont = APIAxonMSGCont | string | djs.MessageEmbed | object;

    interface AxonMSGOpt {
        delete?: boolean;
        disableEveryone?: boolean;
        delay?: number;
    }

    export class Resolver {
        public static user(client: Client, args: string[]|string): any; // User|null; // Not implemented
        public static member(guild: Guild, args: string[]|string): any; // Member|null; // Not implemented
        public static role(guild: Guild, args: string[]|string): any; // Role|null; // Not implemented
        public static channel(guild: Guild, args: string[]|string): any; // Channel|null; // Not implemented
        public static guild(client: Client, args: string[] ): any; // Guild|null; // Not implemented
    }

    export class AxonUtils {
        private _axon: AxonClient;
        constructor(axon: AxonClient);
        readonly axon: AxonClient;
        readonly bot: Client;
        readonly template: AxonTemplate;
        readonly logger: any; // Replace with ALogger
        readonly utils: Utils;
        readonly library: any; // Replace with LibraryInterface

        public triggerWebhook(type: string, embed: Eris.EmbedBase, opt?: string): void;
        public isBotOwner(uID: string): boolean;
        public isBotAdmin(uID: string): boolean;
        public isBotStaff(uID: string): boolean;
        public isServerMod(member: Member, guildConfig: GuildConfig): boolean;
        public isServerManager(member: Member): boolean;
        public isServerAdmin(member: Member): boolean;
        public isServerOwner(member: Member, guild: Guild): boolean;

        public sendDM(user: User, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public editMessage(message: Message, content: AxonMSGCont): Promise<Message>;
        
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
        readonly bot: Client;
        readonly library: any; // Replace with LibraryInterface

        public splitMessage(content: string): string[] | string;
        public getPrefix(msg: Message): Promise<string>;
        public getRoles(guild: Guild, member: Member): Role[];
        public getHighestRole(guild: Guild, member: Member): Role;
        public sortRoles(roles: Role[] ): Role[];
        public isRoleHigher(role1: Role, role2: Role): boolean;
        public isHigherRole(guild: Guild, first: Member, second: Member): boolean;
        public hasPerms(member: Member, permissions?: string[] ): boolean;
        public hasChannelPerms(channel: TextableChannel, permissions: string[], user?: User): boolean;
        public missingPerms(member: Member, permissions?: string[] ): string[];
        public calculatePerms(data: PermissionObject): { allow: number; deny: number };

        public sleep(ms: number): Promise<void>;
        public readFileAsync(path: string): Promise<string>;
        public writeFileAsync(path: string, content: string): Promise<void>;
        public static compareObject(obj1: object, obj2: object): boolean;
    }

    export type LOG_LEVEL_TYPES = 'FATAL' | 'ERROR' | 'WARN' | 'DEBUG' | 'NOTICE' | 'INFO' | 'VERBOSE';

    interface Ctx { guild: Guild; cmd: Command; user: User }

    export class Base {
        public _axon: AxonClient;

        public readonly axon: AxonClient;
        public readonly bot: Client;
        public readonly logger: any; // Replace with ALogger
        public readonly Resolver?: Resolver;
        public readonly axonUtils?: AxonUtils;
        public readonly utils?: Utils;
        public readonly l?: any; // Replace with MessageManager
        constructor(axonClient: AxonClient);

        // Methods
        public getModule(module: string): Module | null;
        public getCommand(fullLabel: string): Command | null;

        public log(level: LOG_LEVEL_TYPES, content: string | Error, ctx?: Ctx, execWebhook?: boolean): void;

        public sendDM(user: User, content: AxonMSGCont): Promise<Message|void>;
        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public editMessage(message: Message, content: AxonMSGCont): Promise<Message>;
        public sendSuccess(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
        public sendError(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
        public error(msg: Message, err: Error, type: string, errMsg?: string): Promise<CommandResponse>;

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

    interface LibraryTypes { ERIS: 0; DISCORDJS: 1 }
    interface LoggerTypes { DEFAULT: 0; CHALK: 1; SIGNALE: 2; WINSTON: 3 }
    interface DBTypes { DBLESS: 0; JSON: 1; MONGO: 2 }
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
        public channel: TextableChannel;
        private _prompt: string;
        private _options: PromptOptions;
        private _actualOptions: PromptOptions;
        private _emitter: EventEmitter;
        public timedOut: boolean;
        public ended: boolean;
        private _boundEvent(): void;
        constructor(client: AxonClient, uID: string, channel: TextableChannel, defaultOptions?: PromptOptions);
        readonly axon: AxonClient;
        readonly client: Client;

        public run(prompt: AxonMSGCont, options?: PromptOptions): Promise<Message>;
        private _startTimeout(): void;
        private _deletePrompt(): void;
        private _checker(msg: Message): boolean;
        private _onInvalidEnd(): string;
        private _onEnded(msg: Message): Message;
        private _onTimeout(): Promise<void>;
        private _onMsgCreate(msg: Message): Promise<void>;
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
        public messages: Collection<Message>;

        constructor(client: AxonClient, options: CollectorOptions);

        readonly axon: AxonClient;
        readonly client: Client;

        public run(channel: TextableChannel, options: CollectorOptions): Promise<Collection<Message> >;
        private _onEnd(): void;
        private _startTimeout(): void;
        private _onMsgDelete(msg: Message): void;
        private _onMsgEdit(msg: Message): Promise<void>;
        private _onCollectEvent(): void;
        public end(): void;
        private _onMsgCreate(msg: Message): void;
        public delete(mID: string): Collection<Message>;
    }

    interface AxonOptionsSettings {
        lang?: string;
        debugMode?: boolean;
        library?: any; // Replace with Library class
        logger?: any; // Replace with ALogger
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

    interface Axonoptions {
        token?: string;
        prefixes?: { general: string; admin: string; owner: string };
        settings?: AxonOptionsSettings;
        lang?: Languages;
        logo?: () => void;
        info?: { name: string; description: string; version: string };
        staff?: { [key: string]: { name: string; id: string }[]};
        template?: AxonTemplate;
        custom?: object | null;
    }

    interface WebhookConfig { id: string; token: string }

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
        logger: any; // Replace with ALogger
        DBProvider: ADBProvider;
        DBLocation: string;
        axonConfig: AxonConfig;
        guildConfig: GuildConfig;
    }
    class AxonOptions {
        private _token?: string;
        public prefixes: { general: string; admin: string; owner: string };
        public settings: AxonOptionsSettings;
        public lang: Languages;
        public logo: ( () => void) | null;
        public info: { name: string; description: string; version: string };
        public staff: { [key: string]: { name: string; id: string }[]};
        public template: AxonTemplate;
        public custom: object | null;
        public webhooks: Webhooks;
        public extensions: AxonOptionsExtensions;
        constructor(data?: Axonoptions | {}, webhooks?: Webhooks | {}, extensions?: AxonOptionsExtensions | {} )
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
        public configs: AxonConfs;
        public settings: AxonParams;
        public infos: Infos;
        public axoncore: AxonInfos;
        public logger: any; // Replace with ALogger
        public axonUtils: AxonUtils;

        private _botClient: Client;
        public library: any; // REPLACE "any" WITH Library CLASS
        public utils: Utils;
        public DBProvider: ADBProvider

        public modules: Collection<Module>; // Replace with ModuleRegistry
        public commands: Collection<Command>; // Replace with CommandRegistry
        public listeners: any; // Replace with ListenerRegistry
        public eventManager: EventManager;

        public guildConfigs: Collection<object>; // Replace with GuildConfigCache

        public moduleLoader: any; // REPLACE "any" WITH ModuleLoader CLASS
        public dispatcher: any; // REPLACE "any" WITH CommandDispatcher CLASS
        public messageManager: any; // REPLACE "any" WITH MessageManager CLASS

        public staff: { [key: string]: { name: string; id: string }[]};

        constructor(botClient: Client, AxonOptions: AxonOptions, modules: object);

        readonly botClient: Client;
        readonly handlers: Collection<any>; // Replace with AHandler
        getListeners(eventName: string): Listener[];
        readonly Resolver: Resolver;
        readonly webhooks: Webhooks;
        readonly template: AxonTemplate;
        readonly custom: object | null;
        readonly l: any; // REPLACE "any" WITH MessageManager CLASS

        getModule(module: string): Module | null;
        getCommand(fullLabel: string): Command | null;

        public start(): Promise<void>;
        public onInit(): true;
        public onStart(): Promise<true>;
        public onReady(): Promise<true>;
        public log(level: LOG_LEVEL_TYPES, content: Error | string, ctx?: Ctx, execWebhook?: boolean): void;
        private _onMessageCreate(msg: Message): void;

        private _onReady(): void;
        public initErrorListeners(): void;
        public initStatus(): void;

        public _execCommand(msg: Message, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean; isOwner: boolean } ): void;
        public _execHelp(msg: Message, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean; isOwner: boolean } ): void;
        public _execListener(listener: Listener, guildConfig: GuildConfig, ...args: any[] ): void;

        public sendFullHelp(msg: Message, guildConfig?: GuildConfig): Promise<void>;
        public registerGuildPrefixes(gID: string, prefixArr: string[] ): Promise<GuildConfig>;
        toString(): string;
        toJSON(): object;
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
        public translation: any; // Replace with TranslationManager
        public parser: any; // Replace with MessageParser
        
        constructor(axonClient: AxonClient, messages: Languages, baseLang: string)

        public messages: Languages;
        public getMessages(lang?: string): AxonLanguageResponse;
        public getMessage(message: string, lang?: string): string;
        public get(message: string, args: object, lang: string): string; // What's the structure of args?
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
        public fatal(input: string, opt: any): void; // Replace with Context
        public error(input: string, opt: any): void; // Replace with Context
        public warn(input: string, opt: any): void; // Replace with Context
        public debug(input: string, opt: any): void; // Replace with Context
        public notice(input: string, opt: any): void; // Replace with Context
        public info(input: string, opt: any): void; // Replace with Context
        public verbose(input: string, opt: any): void; // Replace with Context
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

        constructor(guild: string | Guild, cmd: string, user: User | string);

        public static from(ctx?: { guild: string | Guild; cmd: string; user: string | User } ): Context;
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
        readonly library: any; // Replace with ErisInterface|DjsInterface
        public dispatch(msg: Message): Promise<void>;
    }

    export class AHandler {
        private _axon: AxonClient;
        public name: string;
        private _listeners: Listener[];
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        public size: number;
        private _handle(args: any[] ): Promise<void>;
        public handle(args: any[] ): string | null;
    }

    export class ALoader {
        public loadIn: any;
        constructor(loadIn: any);
        load(toLoad: any): any; // Not implemented
        loadAll(toLoad: any): any; // Not implemented
        unload(toUnload: any): any; // Not implemented
    }
}
