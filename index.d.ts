import { EventEmitter } from "events";
import * as Eris from "eris";
import * as djs from 'discord.js';
type Message = Eris.Message | djs.Message;
type Member = Eris.Member | djs.GuildMember;
type Client = Eris.Client | djs.Client;
type Guild = Eris.Guild | djs.Guild;
type User = Eris.User | djs.User;
type TextableChannel = Eris.TextableChannel | djs.TextChannel;

declare module "axoncore" {

    // OK
    // @ts-ignore

    export class Collection<T> extends Map<string | number, T> {
        public baseObject?: new (...args: any[]) => T;
        public iterable?: object | any[];
        public constructor(base: { base: new (...args: any[]) => T, iterable?: object | any[] });
        public add(obj: T, extra?: any, replace?: boolean): T;
        public find(func: (i: T) => boolean): T;
        public random(): T;
        public filter(func: (i: T) => boolean): T[];
        public map<R>(func: (i: T) => R): R[];
        public reduce<U>(func: (accumulator: U, val: T) => U, initialValue?: U): U;
        public every(func: (i: T) => boolean): boolean;
        public some(func: (i: T) => boolean): boolean;
        public update(key: string, value: object): T;
        public remove(key: string): T | void;
        public toArray(): any[];
        public toObject(): object;
    }

    // OK
    export class AxonError extends Error {
        constructor(message: string, module?: Module, command?: Command, err?: object);
        readonly name: string;
    }

    // OK
    export class AxonCommandError extends Error {
        constructor(module: Module, command: Command, ctx: string, err: object);
        readonly name: string;
    }

    // OK
    export class NoAbstractInstanceException extends Error {
        constructor(...args: any[]);
    }

    // OK
    class NotImplementedException extends Error {
        constructor(...args: any[]);
    }

        // OK
    interface ModuleInfo {
        name?: string;
        description?: string;
        category?: string;
    }

    // OK
    export class Module extends Base {
        public label: string;
        public enabled?: boolean;
        public serverBypass?: boolean;

        public infos?: ModuleInfo;

        public commands?: Collection<Command>;
        public listeners?: Collection<any>; // Uh, replace with Collection<Listener>;

        public permissions: any; // Replace with CommandPermissions class
        public options: CommandOptions;

        public commandLoader: any; // Replace with CommandLoader
        public listenerLoader: any; // Replace with listenerLoader

        constructor(client: AxonClient);

        // Init - External available
        public init(commands: Command[], events: Listener[], schema: object): void;
    }

    type updateDBVal = object|any[]|string|boolean;

    // OK
    export abstract class DBProvider {
        constructor(axonClient: AxonClient);
        public init(axonOptions: AxonOptions): any;
        public fetchAxon(): Promise<object> | null;
        public fetchGuild(gID: string): Promise<object> | null;
        public initAxon(): Promise<object>;
        public updateAxon(key: string, value: updateDBVal): Promise<boolean>;
        public updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;
        public saveAxon(data: object): Promise<AxonConfig | null>;
        public saveGuild(gID: string, data: object): Promise<GuildConfig | null>;
    }

    // OK
    class JsonManager {
        private _axonDefault: object;
        private _guildDefault: object;
        private _basePath: string;
        private _axonPath: string;
        public axonExecutor: any; // Replace with AsyncQueue
        public guildExecutors: object;

        constructor(basePath: string);

        // GETTERS
        readonly axonDefault: string;
        readonly guildDefault: string;

        public getExecutor(guildID: string): any; // Replace with AsyncQueue
        public toJSON(string: string): string | object;
        public toString(json: object): string | object;

        private _buildPath(gID: string): string;

        public readFile(path: string): Promise<string|null>;
        public writeFile(path: string, content: string): Promise<boolean|void>;
        public createAxonSchema(defaultPrefix: string): Promise<object|void>;
        public createGuildSchema(prefixes: string[], gID: string): Promise<object|void>;
        public fetchAxonSchema(): Promise<object|void>;
        public fetchGuildSchema(gID: string): Promise<object|void>;
        public updateGuildKey(gID: string, key: string, value: updateDBVal): Promise<object|void>;
        public updateAxonKey(key: string, value: updateDBVal): Promise<object|void>;
        public writeAxonSchema(schema: object): Promise<object|void>;
        public writeGuildSchema(gID: string, schema: object): Promise<object|void>;
    }

    // OK
    class InMemoryProvider extends DBProvider {
    }

    // OK
    class JsonProvider extends DBProvider {
        public manager?: JsonManager;
    }

    // OK
    class MongoProvider extends DBProvider {
        public AxonSchema?: any;
        public GuildSchema?: any;
    }

    // OK
    export class AxonConfig {
        private _axon: AxonClient;

        public id: string;
        public prefix: string;

        public createdAt: Date;
        public updatedA: Date;

        public bannedUsers: string[];
        public bannedGuilds: string[];

        constructor(axon: AxonClient, values: object);

        public isBlacklistedUser(userID: string): boolean;
        public isBlacklistedGuild(guildID: string): boolean;
        public updateBlacklistUser(userID: string, boolean: boolean): Promise<AxonConfig|null>;
        public updateBlacklistGuild(guildID: string, boolean: boolean): Promise<AxonConfig|null>;
        private _req(key: string, value: updateDBVal): Promise<AxonConfig|null>;
    }

    // OK
    export class GuildConfig {
        private _axon: AxonClient;
        public guildID: string;
        public prefixes: string[] | [];

        public createdAt: Date;
        public updatedAt: Date;

        public modules: Module[] | [];
        public commands: Command[] | [];
        public listeners: any[] | []; // Replace any with Listeners

        public ignoredUsers: string[] | [];
        public ignoredRoles: string[] | [];
        public ignoredChannels: string[] | [];

        public modOnly: boolean;
        public modRoles: string[] | [];
        public modUsers: string[] | [];

        constructor(axon: AxonClient, values: object);

        public getPrefixes(): string[] | [];
        public isIgnored(msg: Message): boolean;
        public isUserIgnored(userID: string): boolean
        public isRoleIgnored(member: Member): boolean;
        public isChannelIgnored(channelID: string): boolean;
        public isModuleDisabled(module: Module): boolean;
        public isCommandDisabled(command: Command): boolean;
        public isListenerDisabled(listener: any): boolean; // Replace "any" with listener
        public isModOnly(): boolean;
        public isModRole(roleID: string): boolean;
        public isModUser(userID: string): boolean;
        public update(guildConfig: object): Promise<object>;
        public updatePrefixes(prefixArr: string[]): Promise<GuildConfig|null>;
        public updateStateModule(label: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateCommand(label: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateListener(label: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateModRole(roleID: string, boolean: boolean): Promise<GuildConfig|null>;
        public updateStateModUser(userID: string, boolean: boolean): Promise<GuildConfig|null>;
    }

    // OK
    export interface CommandInfo {
        owners?: string[];
        description?: string;
        examples?: string[];
        usage?: string;
        name?: string;
    }

    // OK
    export interface ACommandOptions {
        guildOnly?: boolean;
        argsMin?: number;

        invalidUsageMessage: boolean;
        invalidPermissionMessage?: ((channel: TextableChannel, member: Member) => string);
        sendPermissionMessage: boolean;
        invalidPermissionMessageTimeout: number;

        deleteCommand?: boolean;
        hidden?: boolean;

        cooldown?: number;
    }

    // OK
    export class CommandOptions implements ACommandOptions {
        private _command: Command;
        public guildOnly?: boolean;
        public argsMin?: number;

        public invalidUsageMessage: boolean;
        public invalidPermissionMessage?: ((channel: TextableChannel, member: Member) => string);
        public sendPermissionMessage: boolean;
        public invalidPermissionMessageTimeout: number;

        public deleteCommand?: boolean;
        public hidden?: boolean;

        public cooldown?: number;

        constructor(command: Command, override: object | ACommandOptions, useModuleDefault: boolean);

        public isGuildOnly(): boolean;
        public isHidden(): boolean;

        public shouldSendInvalidUsageMessage(args: string[]): boolean;
        public shouldSendInvalidPermissionMessage(guildConfig: GuildConfig): boolean;
        public shouldDeleteCommand(): boolean;
        public getInvalidPermissionMessage(channel: TextableChannel, member: Member, permission: any): String;
    }

    export class CommandCooldown {
        private _command: Command;
        private _cooldowns: Map<string, { time: Date, post: boolean }>;

        constructor(command: Command);

        // GETTERS

        readonly cooldown: number;

        // METHODS
        public shouldCooldown(userID: string): [number, boolean] | [];
        public shouldSendCooldownMessage(cooldown: { time: Date, post: boolean }): boolean;
        public shouldSetCooldown(response: { triggerCooldown: boolean } | null): boolean;
        public setCooldown(userID: string): void;
    }

    // OK
    export interface ICommandPerms {
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

    // OK
    export class CommandPermissions implements ICommandPerms {
        // Handle some stuff the class will need
        private _command?: Command;

        public custom(func: (msg: Message) => true): true;
        // OO! A CLASS CONSTRUCTOR!
        constructor(command: Command, override: object | ICommandPerms, userModuleDefault: boolean);
        // GETTERS
        readonly axon: AxonClient;
        readonly utils: Utils;
        readonly axonUtils: AxonUtils;
        readonly library: any; // REPLACE "ANY" WITH Library CLASS

        // METHODS

        // Can the command be executed with this context?
        public canExecute(msg: Message, guildConf: GuildConfig): [boolean, string | null]; // Why is this a array and not an object?

        // UPDATE PERMS, wait who would use this besides the library itself?
        public setBot(array: any[], toAdd: boolean): CommandPermissions;
        public setServerMod(boolean: boolean): CommandPermissions;
        public setServerManager(boolean: boolean): CommandPermissions;
        public setServerAdmin(boolean: boolean): CommandPermissions;
        public setServerOwner(boolean: boolean): CommandPermissions;
        public setUser(object: { bypass: string[], needed: string[] }, toAdd: boolean): CommandPermissions;
        public setUserIDs(object: { bypass: string[], needed: string[] }, toAdd: boolean): CommandPermissions;
        public setRoleIDs(object: { bypass: string[], needed: string[] }, toAdd: boolean): CommandPermissions;
        public setChannelIDs(object: { bypass: string[], needed: string[] }, toAdd: boolean): CommandPermissions;
        public setStaff(object: { bypass: string[], needed: string[] }, toAdd: boolean): CommandPermissions;

        // CHECK FOR IF PERMISSIONS ARE MET

        private _checkPermsBot(channel: TextableChannel): boolean;
        private _checkPermsUserBypass(member: Member): [boolean, string | null]; // Why is this a array and not an object?
        private _checkPermsUserNeeded(member: Member): [boolean, string | null]; // Why is this a array and not an object?
        private _checkUserBypass(member: Member): boolean;
        private _checkUserNeeded(member: Member): boolean;
        private _checkRoleBypass(member: Member): boolean;
        private _checkRoleNeeded(member: Member): boolean;
        private _checkChannelBypass(channel: TextableChannel): boolean;
        private _checkChannelNeeded(channel: TextableChannel): boolean;
        private _checkStaffBypass(member: Member): boolean;
        private _checkStaffNeeded(member: Member): boolean;
    }

    // OK
    export class CommandResponse {
        public success: boolean;
        public triggerCooldown: boolean;
        public error?: object|string;
        constructor(data: { success: boolean; triggerCooldown: boolean; error?: object|string });
        public resolve(): Promise<CommandResponse>;
        public resolveAsync(): Promise<CommandResponse>;
        public resolveSync(): CommandResponse;
    }

    // OK
    export class CommandContext {
        public raw: string | object;
        public commandLabel: string;
        public moduleLabel: string;

        public execute: boolean;
        public helpExecution: boolean;
        public executionState: number;
        public executionType: number;

        public library: any; // REPLACE "ANY" WITH Library CLASS

        public dm: boolean;
        public guildID: string;
        public guildName: string;

        public channelID: string;
        public channelName: string;

        public callerID: string;
        public callerName: string;

        public calledAt: Date;

        constructor(command: Command, triggerMessage: Message, data?: { executed?: boolean; helpExecution?: string; executionState?: number; executionType?: object; });

        public addResponseData(commandResponse: CommandResponse | object): CommandContext;
        public static getExecutionType(isAdmin: boolean, isOwner: boolean): number;
        public resolve(): Promise<CommandContext>;
        public resolveAsync(): Promise<CommandContext>;
        public resolveSync(): CommandContext;
    }

    // SEEMS OK
    export class Command extends Base {
        private _module: Module;
        private _cooldown: CommandCooldown;

        public infos?: CommandInfo;
        public label: string;
        public aliases?: string[];
        public enabled?: boolean;

        public subcmds?: Command[] | [];
        public isSubcmd?: boolean;
        public hasSubcmd?: boolean;
        public parentCommand?: Command;

        public serverBypass?: boolean;

        public options?: CommandOptions;
        public permissions?: CommandPermissions;

        public subCommands?: Collection<Command>;
        public subCommandAliases?: Map<string, string>;

        // GETTERS
        readonly module: Module;
        readonly template: object;
        readonly library: any; // REPLACE "ANY" WITH Library CLASS
        readonly fullLabel: string;

        constructor(module: Module);

        // Internal
        _process(params: { msg: Message; args: string[]; guildConfig?: object; isAdmin?: boolean; isOwner?: boolean }): CommandContext;
        public _preExecute(args?: any[]): boolean;
        public _execute(message: { msg: Message, args?: string[], guildConf?: object, isAdmin?: boolean, isOwner?: boolean }): Promise<any>;
        public _postExecute(args?: any[]): boolean | any;

        //External
        public execute(message: { msg: Message, args?: string[], guildConf?: object }): Promise<any>;
        public sendHelp(object: { msg: Message, guildConf?: object }): Promise<Message>;
        public canExecute(msg: Message, guildConf?: object): boolean;
        public sendBotPerms(channel: TextableChannel, permissions: string[]): Promise<Message>;
        public sendUserPerms(channel: TextableChannel, member: Member, permissions: string[]): Promise<Message>;
        public sendTargetPerms(channel: TextableChannel): Promise<Message>;
        public sendCooldown(channel: TextableChannel, time: number): Promise<Message>;
    }

    // OK
    export class Listener extends Base {
        private _module: Module;
        public label: string;
        public eventName: string;

        public load?: boolean;
        public enabled?: boolean;
        public serverBypass?: boolean;

        public infos?: {
            owners?: string[];
            description?: string;
        };

        readonly module: Module;

        constructor(module: Module, data?: { eventName?: string; label?: string; load?: boolean; enabled?: boolean; serverBypass?: boolean });

        private _execute(guildConf: object, ...args: string[]): Promise<any>;

        public execute(args: any, guildConf: object): Promise<any>;
    }

    // OK
    class EventManager extends Base {
        private _listeners: object;
        private _handlers: Collection<object>;
        constructor(axon: AxonClient);
        // GETTERS
        readonly HANDLERS: Object;
        readonly events: Collection<Listener>;

        public getListeners(eventName: string): any[];
        public bindListeners(): void;
        public bindHandlers(): void;

        public registerListener(event: Listener): Listener;
        public registerHandler(event: string): object;
        public registerEvent(event: string): object;
        public createHandler(events: Listener[], ...args: any[]): void;

        private _rootHandler(...args: any[]): Promise<object>;
        private _isEventDisabled(label: string, guildConf: object): boolean|undefined;

        public unregisterListener(event: string, label: string): boolean;
        public unregisterHandler(event: string): boolean;
        public unregisterEvent(event: string): boolean;
    }

    interface IAxonMSGCont {
        embed?: Eris.EmbedBase;
        content?: string;
    }

    type AxonMSGCont = IAxonMSGCont | string | djs.MessageEmbed | object;

    interface AxonMSGOpt {
        delete?: boolean;
        disableEveryone?: boolean;
        delay?: number;
    }

    // OK
    export class Resolver {
        public static user(client: Client, args: string[]|string): object|null;
        public static member(guild: Guild, args: string[]|string): object|null;
        public static role(guild: Guild, args: string[]|string): object|null;
        public static channel(guild: Guild, args: string[]|string): object|null;
        public static guild(client: Client, args: string[]): object|null;
    }

    export class AxonUtils {
        constructor(axon: AxonClient);
        readonly axon: AxonClient;
        readonly bot: Client;
        readonly template: Object;
        readonly logger: object;
        readonly utils: Utils;

        public triggerWebhook(type: string, embed: Eris.EmbedBase, opt?: string): void;
        public isBotOwner(uID: string): boolean;
        public isBotAdmin(uID: string): boolean;
        public isBotStaff(uID: string): boolean;
        public isServerMod(member: Member, guildConfig: GuildConfig): boolean;
        public isServerManager(member: Member): boolean;
        public isServerAdmin(member: Member): boolean;
        public isServerOwner(member: Member, guild: Guild): boolean;

        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public editMessage(message: Message, content: AxonMSGCont): Promise<Message>;
        public sendDM(user: User, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public sendError(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;

        public updateGlobalStateModule(module: string, state?: boolean): void;
        public updateGlobalStateCommand(command: string, state?: boolean): void;
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
        readonly library: any; // REPLACE "any" WITH Library CLASS

        public splitMessage(content: string): string[] | string;
        public getPrefix(msg: Message): string;
        public getRoles(guild: Guild, member: Member): object[];
        public getHighestRole(guild: Guild, member: Member): object;
        public sortRoles(roles: object[]): object[];
        public isRoleHigher(role1: object, role2: object): boolean;
        public isHigherRole(guild: Guild, first: Member, second: Member): boolean;
        public hasPerms(member: Member, permissions: string[]): boolean;
        public hasChannelPerms(channel: TextableChannel, permissions: string[], user?: User): boolean;
        public missingPerms(member: Member, permissions?: string[]): string[];
        calculatePerms(data: object): { allow: number, deny: number };

        public sleep(ms: number): Promise<void>;
        public readFileAsync(path: string): Promise<string>;
        public writeFile(path: string, content: string): Promise<any>;
        public static compareObject(obj1: object, obj2: object): boolean;
    }

    export class Base {
        public _axon: AxonClient;

        public readonly axon: AxonClient;
        public readonly bot: Client;
        public readonly Logger: object;
        public readonly Resolver?: Resolver;
        public readonly AxonUtils?: AxonUtils;
        public readonly Utils?: Utils;
        constructor(axonClient: AxonClient);

        // Methods
        public getModule(module: string): Module | void;
        public getCommand(fullLabel: string): Command | void;

        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public sendDM(user: User, content: AxonMSGCont): Promise<Message|void>;
        public editMessage(message: Message, content: AxonMSGCont): Promise<Message>;
        public sendError(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
        public sendSuccess(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<CommandResponse>;
        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public error(msg: AxonMSGCont, err: Error | object | string, type: String, errMsg?: string): Promise<Message>;

        public toString(): string;
        public toJSON(): object;
    }

    // Wtf,
    // OK
    export interface Enums {
        HTTP_CODE: {
            CONTINUE: number,

            OK: number,
            CREATED: number,
            ACCEPTED: number,
            NO_CONTENT: number,

            MULTIPLE_CHOICES: number,
            MOVED_PERMANENTLY: number,
            FOUND: number,

            BAD_REQUEST: number,
            UNAUTHORIZED: number,
            PAYMENT_REQUIRED: number,
            FORBIDDEN: number,
            NOT_FOUND: number,
            METHOD_NOT_ALLOWED: number,
            REQUEST_TIMEOUT: number,
            CONFLICT: number,
            GONE: number,
            UNSUPPORTED_MEDIA_TYPE: number,
            LOCKED: number,
            TOO_MANY_REQUESTS: number,

            INTERNAL_SERVER_ERROR: number,
            NOT_IMPLEMENTED: number,
            BAD_GATEWAY: number,
            SERVICE_UNAVAILABLE: number,
            GATEWAY_TIMEOUT: number,
        };
        HTTP_MESSAGES: {
            100: string,
            101: string,
            102: string,
            103: string,
            200: string,
            201: string,
            202: string,
            203: string,
            204: string,
            205: string,
            206: string,
            207: string,
            208: string,
            226: string,
            300: string,
            301: string,
            302: string,
            303: string,
            304: string,
            305: string,
            307: string,
            308: string,
            400: string,
            401: string,
            402: string,
            403: string,
            404: string,
            405: string,
            406: string,
            407: string,
            408: string,
            409: string,
            410: string,
            411: string,
            412: string,
            413: string,
            414: string,
            415: string,
            416: string,
            417: string,
            418: string,
            421: string,
            422: string,
            423: string,
            424: string,
            425: string,
            426: string,
            428: string,
            429: string,
            431: string,
            451: string,
            500: string,
            501: string,
            502: string,
            503: string,
            504: string,
            505: string,
            506: string,
            507: string,
            508: string,
            509: string,
            510: string,
            511: string,
        };
        LIBRARY_TYPES: { ERIS: number, DISCORDJS: 1 };
        LOGGER_TYPES: { DEFAULT: number; CHALK: number; SIGNALE: number; WINSTON: number; };
        DB_TYPES: { DBLESS: number, JSON: number; MONGO: number };
        AXON_PERMISSION_LEVELS: {
            OWNER: number;
            ADMINISTRATOR: number;
            MANAGER: number;
            MODERATOR: number;
        };
        PERMISSION_ADMIN: string;
        PERMISSION_MANAGER: string;
        COMMAND_EXECUTION_TYPES: {
            REGULAR: number;
            ADMIN: number;
            OWNER: number;
        };
        COMMAND_EXECUTION_STATE: {
            NO_ERROR: number;
            COOLDOWN: number;
            INVALID_USAGE: number;
            INVALID_PERMISSIONS_BOT: number;
            INVALID_PERMISSIONS_USER: number;
        };
        WEBHOOK_TYPES: {
            STATUS: string;
            LOADER: string;
            ERROR: string;
            MISC: string;
        };
        TYPE_ERRORS: {
            api: string;
            db: string;
            internal: string;
            unexpected: string;
        };
    }

    interface fieldComp {
        name: string;
        value: string;
        inline?: boolean;
    }

    interface embedData {
        title?: string;
        url?: string;
        description?: string;
        color?: string;

        author?: {
            name?: string;
            url?: string;
            icon_url?: string;
        };
        thumbnail?: {
            url?: string;
        };

        fields?: fieldComp[];

        image?: {
            url?: string;
        };

        footer?: {
            text?: string;
            icon_url?: string;
        }

        timestamp?: string;
        file?: object;
    }

    // OK?
    export class Embed {
        public title?: string;
        public url?: string;
        public description?: string;
        public color?: string;
        public author: {
            name?: string;
            icon_url?: string;
        };
        public thumbnail: {
            url?: string;
        };
        public fields: fieldComp[];
        public image: {
            url?: string;
        };
        public footer: {
            text?: string;
            icon_url?: string;
        };
        public timestamp?: string;
        public file: object;

        constructor(data: embedData);
        private _resolveString(data): string;

        public setTitle(title: string): embedData;
        public setDescription(description: string): embedData;
        public setURL(url: string): embedData;
        public setColor(color: string): embedData;
        public setAuthor(name: string, icon?: string, url?: string): embedData;
        public setTimestamp(timestamp?: string): embedData;
        public addField(name: string, value: string, inline?: boolean): embedData;
        public setThumbnail(url: string): embedData;
        public setImage(url: string): embedData;
        public setFooter(text: string, icon?: string): embedData;
        public attachFile(file: string): embedData;
    }

    interface promptOptions {
        allowed?: string[];
        wildcard?: boolean;
        caseSensitive?: boolean;
        deletePrompt?: boolean;
        sendInvalid?: boolean;
        invalidMessage?: string;
        deleteInvalidMessage?: boolean;
        timeoutTime?: number;
        sendTimeout?: boolean;
        timeoutMessage?: string;
        deleteTimeoutMsg?: number;
        resendWhenInvalid?: boolean;
    }

    // OK
    export class Prompt {
        private _axon: AxonClient;
        public userID: string;
        public channel: TextableChannel;
        private _prompt: string;
        private _options: promptOptions;
        private _actualOptions: promptOptions;
        private _emitter: EventEmitter;
        public timedOut: boolean;
        public ended: boolean;
        private _boundEvent(): void;
        constructor(client: AxonClient, uID: string, channel: TextableChannel, defaultOptions?: promptOptions);
        readonly axon: AxonClient;
        readonly client: Client;

        public run(prompt: AxonMSGCont, options?: promptOptions): Promise<Message>;
        private _startTimeout(): void;
        private _deletePrompt(): void;
        private _checker(msg: Message);
        private _onInvalidEnd(): string;
        private _onEnded(msg: Message): Message;
        private _onTimeout(): Promise<void>;
        private _onMsgCreate(msg: Message): Promise<void>;
    }

    interface mCollectorOptions {
        timeout?: number;
        count?: number;
        ignoreBots?: boolean;
        caseSensitive?: boolean;
    }

    // OK
    export class MessageCollector {
        private _options: mCollectorOptions;
        private _axon: AxonClient;
        private _actualOptions: mCollectorOptions;
        public messages: Collection<Message>;

        constructor(client: AxonClient, options: mCollectorOptions);

        readonly axon: AxonClient;
        readonly client: Client;

        public run(channel: TextableChannel, options: mCollectorOptions): Promise<Collection<Message> >;
        private _onEnd(): void;
        private _startTimeout(): void;
        private _onMsgDelete(msg: Message): void;
        private _onMsgEdit(msg: Message): Promise<void>;
        private _onCollectEvent(): void;
        public end(): void;
        private _onMsgCreate(msg: Message): void;
        public delete(mID: string): Collection<Message>;
    }

    interface axonOptions {
        botConfig?: object;
        lang?: object;
        tokenConfig?: object;

        _token?: string;

        logo?: (...args: any[]) => any;
        utils?: new (...args: any[]) => any;
        logger?: new (...args: any[]) => any;
        DBProvider?: new (...args: any[]) => any;
        DBLocation?: string;

        axonConfig?: object;
        guildConfig?: object;
    }

    // OK
    class AxonOptions implements axonOptions {
        constructor(data: axonOptions | {})
    }

    interface axonConfs {
        axonConf: object;
        templateConf: object;
        tokenConf: object;
    }

    interface axonParams {
        debugMode: boolean;
        prefixes: string[];
        ownerPrefix: string;
        adminPrefix: string;
    }

    interface infos {
        name: string;
        description: string;
        version: string;
        library: string;
        owners: string[];
    }

    interface axonInfos {
        name: string;
        version: string;
        author: string;
        github: string;
    }

    // OK
    export class AxonClient extends EventEmitter {
        private _botClient: Client;
        public library: any; // REPLACE "any" WITH Library CLASS
        public configs: object;

        public modules: Collection<Module>;
        public commands: Collection<Command>;
        public commandAliases: Map<String, Command>;
        public guildConfigs: Collection<object>;

        public moduleLoader: any; // REPLACE "any" WITH ModuleLoader CLASS
        public dispatcher: any; // REPLACE "any" WITH CommandDispatcher CLASS
        public messageManager: any; // REPLACE "any" WITH MessageManager CLASS

        public eventManager: EventManager;
        public staff: object;
        public settings: axonParams;
        public infos: infos;
        public axoncore: axonInfos;

        constructor(botClient: Client, axonOptions: axonOptions, modules: object );
        readonly botClient: Client;
        readonly events: Collection<Listener>;
        getListeners(eventName: string): Listener[];
        readonly webhooks: object;
        readonly template: object;
        readonly l: any; // REPLACE "any" WITH MessageManager CLASS

        getModule(module: string): Module | null;
        getCommand(fullLabel: string): Command | null;

        public start(): void;
        public onInit(): any;
        public onReady(): any;
        private _onMessageCreate(msg: Message): void;

        private _onReady(): void;
        public initErrorListeners(): void;
        public initStatus(): void;

        public _execCommand(msg: Message, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean, isOwner: boolean }): void;
        public _execHelp(msg: Message, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean, isOwner: boolean }): void;
        public _execListener(listener: Listener, guildConfig: GuildConfig, ...args: any[]): void;

        public sendFullHelp(msg: Message, guildConfig?: GuildConfig): void;
        public registerGuildPrefixes(gID: string, prefixArr: string[]): Promise<GuildConfig>;
        toString(): string;
        toJSON(): object;
    }
}
