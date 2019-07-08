import { EventEmitter } from "events";
import { Member, Message, Client, EmbedBase, TextableChannel, Guild, User } from "eris";

declare module "axoncore" {

    export class Collection<T> extends Map<string | number, T> {
        public baseObject?: new (...args: any[]) => T;
        public limit?: number;
        public constructor(baseObject: new (...args: any[]) => T, iterable?: object);
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

    export class AxonError extends Error {
        constructor(message: string, module?: Module, command?: Command, err?: object);
        public name: string;
    }

    export class AxonCommandError extends Error {
        constructor(module: Module, command: Command, ctx: string, err: object);
        public name: string;
    }

    interface ModuleInfo {
        name?: string;
        description?: string;
        category?: string;
    }

    export class Module extends Base {
        public label: string;
        public enabled?: boolean;
        public serverBypass?: boolean;

        public infos?: ModuleInfo;

        constructor(client: AxonClient);

        // Init - External available
        public init(commands: Command[], events: Event[], schema: object): void;
        public initAllCommands(commands: Command[]): void;
        public initSubCommands(subCommands: Command): void;
        public initAllEvents(events: Event[]): void;
        public initAllSchemas(schemas: object): void;

        // Register - External available
        public registerCommand(command: Command): boolean;
        public registerSubCommand(command: Command, subCommand: Command): boolean;
        public registerEvent(event: Event): boolean;
        public registerSchema(key: string, schema: object): boolean;

        // Unregister - External available
        public unregisterCommand(fullLabel: string): boolean;
        public unregisterSubCommand(command: Command, subCommand: Command): void;
        public unregisterSchema(label: string): boolean;
        public unregisterEvent(label: string): boolean;
    }

    export class DBService {
        constructor();
        public fetchAxon(): Promise<object> | null;
        public fetchGuild(gID: string): Promise<object> | null;
        public initAxon(): Promise<object>;
        public initGuild(axonClient: AxonClient, gID: string): Promise<object> | null;
        public updateBlacklistUser(blacklistedUsers: string[]): Promise<object> | null;
        public updateBlacklistGuild(blacklistedUsers: string[]): Promise<object> | null;
        public updateGuildPrefix(gID: string, prefixArr: string[]): Promise<object> | null;
        public updateModule(gID: string, modulesArr: string[]): Promise<object> | null;
        public updateCommand(gID: string, commandsArr: string[]): Promise<object> | null;
        public saveAxonSchema(schema: object): Promise<object> | null;
        public saveGuildSchema(gID: string, schema: object): Promise<object> | null;
    }

    interface CommandInfo {
        owners?: string[];
        description?: string;
        examples?: string[];
        usage?: string;
        name?: string;
    }

    interface CommandOptions {
        guildOnly?: boolean;
        argsMin?: number;

        invalidUsage?: boolean;
        invalidPermissionsMessage?: boolean;

        deleteCommand?: boolean;
        hidden?: boolean;

        cooldown?: number;
    }

    interface CommandPermissions {
        bot?: string[];
        serverMod?: boolean;
        serverAdmin?: boolean;
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
        }
        staff?: {
            needed: string[];
            bypass?: string[];
        }
        custom(func: (i: Message) => true): true;
    }

    export class Command extends Base {
        public infos?: CommandInfo;
        public label: string;
        public aliases?: string[];
        public enabled?: boolean;

        public subcmds?: object[];
        public isSubcmd?: boolean;
        public hasSubcmd?: boolean;
        public parentCommand?: Command;

        public serverBypass?: boolean;

        public options?: CommandOptions;
        public permissions?: CommandPermissions;

        constructor(module: Module);

        // Internal
        public _execute(message: { msg: Message, args?: string[], guildConf: object }): Promise<any>;
        public _executeAdmin(message: { msg: Message, args?: string[], guildConf: object }): Promise<any>;
        public _shouldCooldown(msg: Message): false|number;
        public _checkPermsBot(channel: TextableChannel): boolean;
        public _checkPermsUserBypass(member: Member): boolean;
        public _checkPermsUserNeeded(member: Member): boolean;
        public _checkUserBypass(member: Member): boolean;
        public _checkUserNeeded(member: Member): boolean;
        public _checkRoleBypass(member: Member): boolean;
        public _checkRoleNeeded(member: Member): boolean;
        public _checkChannelBypass(channel: TextableChannel): boolean;
        public _checkChannelNeeded(channel: TextableChannel): boolean;
        public _checkStaffBypass(member: Member): boolean;
        public _checkStaffNeeded(member: Member): boolean;

        //External
        public execute(message: { msg: Message, args?: string[], guildConf: object }): Promise<any>;
        public sendHelp(object: { msg: Message, guildConf?: object }): Promise<Message>;
        public canExecute(msg: Message, guildConf?: object): boolean;
        public sendBotPerms(channel: TextableChannel, permissions: string[]): Promise<Message>;
        public sendUserPerms(channel: TextableChannel, member: Member, permissions: string[]): Promise<Message>;
        public sendTargetPerms(channel: TextableChannel): Promise<Message>;
        public sendCooldown(channel: TextableChannel, time: number): Promise<Message>;
    }

    export class Event extends Base {
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

        constructor(module: Module);

        private _execute(guildConf: object, ...args: string[]): Promise<any>;

        public execute(args: any, guildConf: object): Promise<any>;
    }

    class EventManager extends Base {
        private _listeners: object;
        private _handlers: Collection<object>;
        constructor(axon: AxonClient);
        public getListeners(eventName: string): any[];
        public bindListeners(): void;
        public bindHandlers(): void;

        public registerListener(event: Event): Event;
        public registerHandler(event: string): object;
        public registerEvent(event: string): object;
        public createHandler(events: Event[], ...args: any[]): void;

        private _rootHandler(...args: any[]): Promise<object>;
        private _isEventDisabled(label: string, guildConf: object): boolean|undefined;

        public unregisterListener(event: string, label: string): boolean;
        public unregisterHandler(event: string): boolean;
        public unregisterEvent(event: string): boolean;
    }

    interface AxonMSGCont {
        embed?: EmbedBase;
        content?: string;
    }

    interface AxonMSGOpt {
        delete?: boolean;
        disableEveryone?: boolean;
        delay?: number;
    }

    export class Resolver {
        public user(client: Client, args: string[]|string): object|null;
        public member(guild: Guild, args: string[]|string): object|null;
        public role(guild: Guild, args: string[]|string): object|null;
        public channel(guild: Guild, args: string[]|string): object|null;
        public guild(client: Client, args: string[]): object|null;
    }

    export class AxonUtils {
        constructor(axon: AxonClient);

        public triggerWebhook(type: string, embed: EmbedBase, opt?: string): void;
        public isIgnored(msg: Message, guildConf: object): boolean;
        public isModuleDisabled(command: Command, guildConf: object): boolean|undefined;
        public isCommandDisabled(command: Command, guildConf: object): boolean|undefined;
        public isBotOwner(uID: string): boolean;
        public isBotAdmin(uID: string): boolean;
        public isBotStaff(uID: string): boolean;
        public isAdmin(member: Member): boolean;
        public isMod(member: Member, guildConf: object): boolean;
        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public editMessage(message: Message, content: AxonMSGCont): Promise<Message>;
        public sendDM(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public sendError(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public sendSuccess(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public error(msg: AxonMSGCont, err: object, type: String, errMsg?: string): Promise<Message>;

        public updateBlacklistUser(userID: string, boolean: boolean): Promise<object>;
        public updateBlacklistGuild(guildID: string, boolean: boolean): Promise<object>;
        public updateGuildStateModule(guildID: string, label: string, boolean: boolean): Promise<object>;
        public updateGuildStateCommand(guildID: string, label: string, boolean: boolean): Promise<object>;
        public updateGuildStateEvent(guildID: string, label: string, boolean: boolean): Promise<object>;
        public updateGlobalStateModule(module: string, state: boolean): void;
        public updateGlobalStateCommand(module: string, state: boolean): void;
    }

    export class Utils {
        constructor(client: AxonClient);

        public splitMessage(content: string): string[] | string;
        public getPrefix(msg: Message): string;
        public getRoles(guild: Guild, member: Member): object[];
        public getHighestRole(guild: Guild, member: Member): object;
        public sortRoles(roles: object[]): object[];
        public isRoleHigher(role1: object, role2: object): boolean;
        public isHigherRole(guild: Guild, first: Member, second: Member): boolean;
        public hasPerms(member: Member, permissions: string[]): boolean;
        public hasChannelPerms(channel: TextableChannel, permissions: string[], user: User): boolean;
        public missingPerms(member: Member, permissions: string[]): string[];

        public sleep(ms: number): Promise<void>;
        public readFile(path: string): Promise<string>;
        public writeFile(path: string, content: string): Promise<any>;
        public compareObject(obj1: object, obj2: object): boolean;
    }

    export class Base {
        public axon: AxonClient;
        public bot: Client;
        public Logger: object;
        public Resolver?: Resolver;
        public AxonUtils?: AxonUtils;
        public Utils?: Utils;
        constructor(axonClient: AxonClient);

        // Methods
        public getModule(module: string): Module | void;
        public getCommand(fullLabel: string): Command | void;

        public sendDM(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public editMessage(message: Message, content: AxonMSGCont): Promise<Message>;
        public sendError(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public sendMessage(channel: TextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<Message>;
        public error(msg: AxonMSGCont, err: object, type: String, errMsg?: string): Promise<Message>;

        public toString(): string;
    }

    export interface Enums {
        permissions: string[];
        permissionsNames: object;
        adminPerms: string[];
        typeWH: object;
        typeError: object;
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
        public axon: AxonClient;
        public client: Client;

        public run(prompt: AxonMSGCont, options?: promptOptions): Promise<Message>;
        private _startTimeout(): void;
        private _deletePrompt(): void;
        private _checker(msg: Message);
        private _onInvalidEnd(): string;
        private _onEnded(msg: Message): Message;
        private _onTimeout(): Promise<void>;
        private _onMsgCreate(msg: Message): void;
    }

    interface mCollectorOptions {
        timeout?: number;
        count?: number;
        ignoreBots?: boolean;
        caseSensitive?: boolean;
    }

    export class MessageCollector {
        private _options: mCollectorOptions;
        private _axon: AxonClient;
        private _actualOptions: mCollectorOptions;
        public messages: Collection<Message>;

        constructor(client: AxonClient, options: mCollectorOptions);

        public axon: AxonClient;
        public client: Client;

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
        axonConf?: object;
        templateConf?: object;
        tokenConf?: object;
        utils?: object;
        logger?: object;
        db?: object;
        axonSchema?: object;
        guildSchema?: object;
    }

    interface axonConfs {
        axonConf: object;
        templateConf: object;
        tokenConf: object;
    }

    interface axonParams {
        debugMode: boolean;
        prefix: string[];
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

    export class AxonClient extends EventEmitter {
        public client: Client;

        public modules: Collection<Module>;
        public commands: Collection<Command>;
        public commandAliases: Map<String, Command>;
        public events: Collection<Event>;
        public schemas: Collection<object>;
        public guildConfigs: Collection<object>;

        public EventManager: EventManager;
        public AxonUtils: AxonUtils;
        public Utils: Utils;
        public Logger: object;

        public blacklistedUsers: Set<string>;
        public blacklistedGuilds: Set<string>;

        public params: axonParams;
        public infos: infos;
        public axonInfos: axonInfos;
        public DBprovider: DBService;

        public constructor(ErisClient: object, axonOptions: axonOptions, modules: object );

        private _initConfigs(object: axonConfs): void;
        private _initStaff(axonConf: object): void;
        public start(): void;
        private _init(): Promise<boolean>;
        private _onReady(): void;
        public initErrorListeners(): void;
        private initAllModules(modules): void;
        public registerModule(module: Module): void;
        public unregisterModule(label: string): void;
        private _initAxon(): void;
        public initStatus(): void;

        public _execCommand(msg: Message, args: string[], command: Command, guildConf: object): void;
        public _execAdminCommand(msg: Message, args: string[], command: Command, guildConf: object, isOwner: boolean): void;
        public _execHelp(msg: Message, args: string[], guildConf: object): Promise<Message>;
        public _sendFullHelp(msg: Message): Promise<void>;
        public fetchAxonConf(): Promise<object>;
        public fetchGuildConf(gID: string): Promise<object>;

        public resolvePrefix(msg: Message): String | undefined;
        public resolveCommand(label: string, args: string[], guildConf?: object|false): object | undefined;
        public getGuildConf(gID: string): Promise<object>;
        public getModule(module: string): Module | null;
        public getCommand(fullLabel: string): Command | null;
        public updateGuildConf(gID: string, guildSchema: object): Promise<object>;
        public registerGuildPrefix(gID: string, prefixArr: string[]): Promise<object>;
        public toString(): string;
        public toJSON(): object;
    }
}
