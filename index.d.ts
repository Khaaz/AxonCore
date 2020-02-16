import { EventEmitter } from 'events';
import * as Eris from 'eris';
import * as djs from 'discord.js';
import { Model, Document } from 'mongoose';
import { RequestOptions } from 'http';
import { Signale, SignaleOptions } from 'signale';
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

    /**
     * Extended Map with built in methods for ease of data manipulation.
     * Based on Eris.Collection
     *
     * @author KhaaZ
     *
     * @class Collection
     * @extends
     *
     * @prop {Class} baseObject - The base class for all items
     */
    export class Collection<T> extends Map<string | number, T> {
        public baseObject: new (...args: any[] ) => T;
        /**
         * Creates an instance of Collection.
         * @memberof Collection
         */
        public constructor(base: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );

        /**
         * Creates a collection from an array
         * @static
         * @param array - The array of object
         * @param key - The property to use as key
         * @returns A newly created Collection
         * @memberof Collection
         */
        static from<R>(array: R[], key: string): Collection<R>;

        /**
         * Add an object
         * If baseObject, add only if instance of baseObject
         * If no baseObject, add
         *
         * @param key - The ID of the object
         * @param value - The object data
         * @param replace - Whether to replace an existing object with the same ID
         * @returns The existing or newly created object
         * @memberof Collection
         */
        public add(key: string, value: T, replace?: boolean): T;

        /**
         * Return the first object to make the function evaluate true
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns The first matching object, or null if no match
         * @memberof Collection
         */
        public find(func: (i: T) => boolean): T;

        /**
         * Get a random object from the Collection
         *
         * @returns The random object, or null if there is no match
         * @memberof Collection
         */
        public random(): T;

        /**
         * Return all the objects that make the function evaluate true
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns An array containing all the objects that matched
         * @memberof Collection
         */
        public filter(func: (i: T) => boolean): T[];

        /**
         * Return an array with the results of applying the given function to each element
         *
         * @param func - A function that takes an object and returns something
         * @returns An array containing the results
         * @memberof Collection
         */
        public map<R>(func: (i: T) => R): R[];

        /**
    	 * Reduce values by function
         *
         * @param func - Function to execute on each element in the array
         * @param initialValue - Value to use as the first argument to the first call of the callback
         * @returns Accumulator
         * @memberof Collection
	     */
        public reduce<U>(func: (accumulator: U, val: T) => U, initialValue?: number): U;

        /**
         * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns An array containing all the objects that matched
         * @memberof Collection
         */
        public every(func: (i: T) => boolean): boolean;

        /**
         * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns An array containing all the objects that matched
         * @memberof Collection
         */
        public some(func: (i: T) => boolean): boolean;

        /**
         * Update an object
         *
         * @param key - The ID of the object
         * @param value - The updated object data
         * @returns The updated object
         * @memberof Collection
         */
        public update(key: string, value: T): T;

        /**
         * Remove an object
         *
         * @param {String} key - The ID of the object
         * @returns {T} The removed object, or null if nothing was removed
         *
         * @memberof Collection
         */
        public remove(key: string): T | null;

        /**
         * Map to array
         * [ value, value, value ]
         * @memberof Collection
         */
        public toArray(): T[];

        /**
         * Map to object
         * { key: value, key: value }
         * @memberof Collection
         */
        public toObject(): {[key: string]: T;};

        public toString(): `[Collection<Name>]`;

        /**
         * Apply a function to the Collection and returns a new Collection
         * @param key - The property to use as key for the new Collection
         * @param func - The function name to apply to the Collection
         * @param args - All the argument that need to be applied to the Collection
         * @returns A new Collection modified by the apply call
         */
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
    
    /**
     * Custom error with better formatting + information about where the error is originated from.
     * Used for errors thrown by the client (Object validity / internal). (general error)
     *
     * @author KhaaZ
     *
     * @class AxonError
     * @extends Error
     */
    export class AxonError extends Error {
        public module: string;
        public subMoule: string | null;
        /**
         * Creates an instance of AxonError.
         *
         * @param message - custom error message
         * @param module Module in which the error originated from
         * @param subModule Module in which the error originated from
         * @memberof AxonError
         */
        constructor(message: string, module: Module | string, subModule?: string);
        readonly short: string;
        readonly message: string;
        readonly name: string;
    }

    /**
     * Custom error with better formatting and context informations.
     * Used for errors thrown by AxonCore commands.
     *
     * @author KhaaZ
     *
     * @class AxonCommandError
     * @extends Error
     *
     * @prop {CommandContext} context - Command Context containing all informations about the command execution
     */
    export class AxonCommandError extends Error {
        public context: CommandContext;
        readonly short: string;
        public message: string;
        public stack: string;

        constructor(commandContext: CommandContext, err: Error);
        readonly name: string;
    }

    /**
     * Error thrown when an abstract class is instantiated.
     *
     * @author KhaaZ
     *
     * @class NoAbstractInstanceException
     * @extends Error
     */
    export class NoAbstractInstanceException extends Error {
        constructor(...args: any[] );
        readonly name: string;
        readonly message: string;
    }

    /**
     * Error thrown when a method not implemented (not overridden) is used.
     *
     * @author KhaaZ
     *
     * @class NotImplementedException
     * @extends Error
     */
    export class NotImplementedException extends Error {
        constructor(...args: any[] );
        readonly name: string;
        readonly message: string;
    }

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
        infos?: ModuleInfo;
        /**
         * The default options for all commands in this module
         */
        options?: CommandOptions;
        /**
         * The default poermissions for all commands in this module
         */
        permissions?: CommandPermissions;
    }

    /**
     * AxonCore Module.
     * A Module holds commands and listeners.
     * It also has default CommandOptions and CommandPermissions that can potentially be used as base when creating a Command.
     *
     * @author KhaaZ
     *
     * @class Module
     * @extends Base
     */
    export class Module extends Base {
        /**
         * Module label (name/id)
         */
        public label: string;
        /**
         * Whether the module is enabled or not
         */
        public enabled: boolean;
        /**
         * Whether the module can be disabled or not (will bypass guild disabled)
         */
        public serverBypass: boolean;
        
        /**
         * Default values potentially used for CommandOptions
         */
        public options: CommandOptions;
        /**
         * Default values potentially used for CommandPermissions
         */
        public permissions: CommandPermissions;

        /**
         * Default info about the module
         */
        public infos: ModuleInfo;

        /**
         * Load all commands in the module / register / unregister
         */
        public commandLoader: CommandLoader;
        /**
         * Load all events in the module / register / unregister
         */
        public listenerLoader: ListenerLoader;

        /**
         * Creates a Module instance.
         *
         * @param client
         * @param data - All module parameters
         * @param data.label - The module label
         * @param data.enabled - Whether the module is enabled or not
         * @param data.serverBypass - Whether the module can be disabled in a server or not
         * @param data.infos
         * @param data.infos.name - The module name
         * @param data.infos.description - The module description
         * @param data.infos.category - The module category
         * @param data.options - The default options for all commands in this module
         * @param data.permissions - The default permissions for all commands in this module
         * @memberof Module
         */
        constructor(client: AxonClient, data?: ModuleData);

        /**
         * A Collection of all commands the module holds
         *
         * @readonly
         * @memberof Module
         */
        readonly commands: Collection<Command>;
        /**
         * A Collection of all listeners the module holds
         *
         * @readonly
         * @memberof Module
         */
        readonly listeners?: Collection<Listener>;

        /**
         * Override this method to returns { commands, listeners }
         *
         * @returns {Object.<string, Command|Listener>} An object containing commands and listeners to initialise. { commands, listeners}
         * @memberof Module
         */
        public init(): { commands?: {[key: string]: new (...args: any[] ) => Command;}; listeners?: {[key: string]: new (...args: any[] ) => Listener;}; };
        /**
         * Init a module with all commands and listeners.
         * @memberof Module
         */
        private _init(): void;
    }

    type updateDBVal = object|any[]|string|boolean|number|Date;

    /**
     * Abstract class for all DB services.
     * Extend this class to create your own Database provider.
     * You just need to write these methods for the framework to be able to interact with the database.
     *
     * The provider creates guildconfigs with DB data.
     *
     * @author KhaaZ
     *
     * @abstract
     * @class ADBProvider
     */
    export abstract class ADBProvider {
        /**
         * The AxonClient
         */
        public axon: AxonClient;
        /**
         * Creates an instance of ADBProvider.
         *
         * @memberof ADBProvider
         */
        constructor(axonClient: AxonClient);
        /**
         * Init the ADBProvider.
         * Method called just after instantiation. Can be overridden with anything that will be used by the provider.
         *
         * @memberof ADBProvider
         */
        public init(AxonOptions?: AxonOptions): void; // Not Implemented
        /**
         * Initialises a default Axon config.
         *
         * @returns Newly created Axon config from the DB
         *
         * @memberof ADBProvider
         */
        public initAxon(): Promise<AxonConfig>; // Not Implemented
        /**
         * Initialises a default Guild config.
         * Use default AxonClient prefix settings when creating the new guild config.
         *
         * @param gID - Guild ID
         *
         * @returns Newly created Guild config from the DB
         *
         * @memberof ADBProvider
         */
        public initGuild(gID: string): Promise<GuildConfig>; // Not Implemented
        
        /**
         * Retrieves the axon config from the DB
         *
         * @returns AxonSchema Object or null
         *
         * @memberof ADBProvider
         */
        public fetchAxon(): Promise<AxonConfig | null>; // Not Implemented
        /**
         * Retrieves the Guild config for the specified guild.
         *
         * @param gID - Guild ID
         *
         * @memberof ADBProvider
         */
        public fetchGuild(gID: string): Promise<GuildConfig | null>; // Not Implemented
        
        /**
         * Update AxonConfig in the DB.
         * Update the specific key with the value given as second parameters.
         * Generic method to update Database.
         *
         * @param key - The identifier in the Database
         * @param value - The value to update in the DB
         * @returns Whether the update was successful or not
         *
         * @memberof ADBProvider
         */
        public updateAxon(key: string, value: updateDBVal): Promise<boolean>; // Not Implemented
        /**
         * Update GuildConfig in the DB.
         * Update the specific key with the value given as third parameters.
         * Specify the guild with the guild ID.
         * Generic method to update Database.
         *
         * @param key - The identifier in the Database
         * @param gID - The guild ID to update
         * @param value - The value to update in the DB
         * @returns The updated GuildConfig
         *
         * @memberof ADBProvider
         */
        public updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>; // Not Implemented
        /**
         * Updates the Axon config in the DB with a new Axon config object.
         *
         * @param data - the schema object to update
         * @returns Updated AxonConfig from the DB
         *
         * @memberof ADBProvider
         */
        public saveAxon(data: AxonConfig): Promise<AxonConfig | null>; // Not Implemented
        /**
         * Updates the given guild in the DB with a new schema object.
         *
         * @param gID - Guild ID
         * @param data - The schema object to update
         * @returns Updated GuildConfig from the DB
         *
         * @memberof ADBProvider
         */
        public saveGuild(gID: string, data: GuildConfig): Promise<GuildConfig | null>; // Not Implemented
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

    /**
     * Manager class for handling Json database
     *
     * @author KhaaZ, Olybear
     *
     * @class JsonManager
     */
    class JsonManager {
        private _axonDefault: AxonJSON;
        private _guildDefault: GuildJSON;
        private _basePath: string;
        private _axonPath: string;
        public axonExecutor: AsyncQueue;
        public guildExecutors: {[guildID: string]: AsyncQueue;};

        /**
         * Creates an instance of JsonManager.
         *
         * @param basePath - The path / location where to create and use the database
         *
         * @memberof JsonManager
         */
        constructor(basePath: string);

        // GETTERS
        /**
         * Returns default data structure for axon
         *
         * @readonly
         * @memberof JsonManager
         */
        readonly axonDefault: AxonJSON;
        /**
         * Returns default data structure for guild
         *
         * @readonly
         * @memberof JsonManager
         */
        readonly guildDefault: GuildJSON;

        /**
         * Get guild executor
         * @param guildID Guild ID
         */
        public getExecutor(guildID: string): AsyncQueue;
        /**
         * Parse JSON string as object/array
         * @param string JSON string
         * @returns Parsed array/object or input string if failed
         */
        public toJSON(string: string): string | object | any[];
        /**
         * Parse object/array as JSON string
         * @param json Object/array to be parsed into JSON string
         * @returns JSON string or parsed array/object if failed
         */
        public toString(json: object): string | object | any[];

        /**
         * Get guild config path
         * @param gID Guild ID
         */
        private _buildPath(gID: string): string;

        /**
         * Read a file and return the string of the file content or null
         *
         * @param path
         *
         * @memberof JsonManager
         */
        public readFile(path: string): Promise<string>;
        /**
         * Write a file
         *
         * @returns Whether or not the task completed successfully
         *
         * @memberof JsonManager
         */
        public writeFile(path: string, content: string): Promise<boolean>;

        /**
         * Create a file and schema for Axon global file.
         * @param defaultPrefix Default prefix
         * @returns The newly created Schema || null
         *
         * @memberof JsonManager
         */
        public createAxonSchema(defaultPrefix: string): Promise<AxonJSON>;
        /**
         * Create a file and schema for the given guild.
         *
         * @param prefixes Array of prefixes
         * @param gID Guild ID
         * @returns The newly created Schema || null
         *
         * @memberof JsonManager
         */
        public createGuildSchema(prefixes: string[], gID: string): Promise<GuildJSON>;

        /**
         * Fetch the axon schema
         *
         * @returns AxonSchema || null
         *
         * @memberof JsonManager
         */
        public fetchAxonSchema(): Promise<AxonJSON>;
        /**
         * Fetch the guild schema for the given guild
         *
         * @param gID Guild ID
         * @returns GuildSchema || null
         *
         * @memberof JsonManager
         */
        public fetchGuildSchema(gID: string): Promise<GuildJSON>;

        /**
         * Update the schema with the given value for the given guild
         *
         * @param gID Guild ID
         * @param key Value to update
         * @param value - The value to update for the given key (can be anything)
         * @returns GuildSchema || null
         *
         * @memberof JsonManager
         */
        public updateGuildKey(gID: string, key: string, value: updateDBVal): Promise<GuildJSON>;
        /**
         * Update the schema with the given value
         *
         * @param key Value to update
         * @param value - The value to update for the given key (can be anything)
         * @returns AxonSchema || null
         *
         * @memberof JsonManager
         */
        public updateAxonKey(key: string, value: updateDBVal): Promise<AxonJSON>;

        /**
         * Write the updated schema in the file.
         *
         * @param schema AxonSchema
         * @returns AxonSchema || null
         *
         * @memberof JsonManager
         */
        public writeAxonSchema(schema: object): Promise<AxonJSON>;
        /**
         * Write the updated schema in the file (for the given guild).
         *
         * @param gID Guild ID
         * @param schema GuildSchema
         * @returns GuildSchema || null
         *
         * @memberof JsonManager
         */
        public writeGuildSchema(gID: string, schema: object): Promise<GuildJSON>;
    }

    /**
     * A schema designed use an InMemory solution in AxonCore
     *
     * @author VoidNull
     *
     * @class InMemoryProvider
     * @extends ADBProvider
     */
    class InMemoryProvider extends ADBProvider {
        public fetchAxon(): Promise<AxonConfig>;
        public init(): void;
        /**
         * @param gID Guild ID
         */
        public fetchGuild(gID: string): Promise<GuildConfig>;

        initAxon(): Promise<AxonConfig>;
        /**
         * @param gID Guild ID
         */
        initGuild(gID: string): Promise<GuildConfig>;

        /**
         * Update the blacklist user list
         * @param blacklistedUsers Array of blacklisted user IDs
         */
        updateBlacklistUser(blacklistedUsers: string[] ): Promise<AxonConfig>;
        /**
         * Update the blacklist guild list
         * @param blacklistedGuilds Array of blacklisted guild IDs
         */
        updateBlacklistGuild(blacklistedGuilds: string[] ): Promise<AxonConfig>;
        /**
         * Update a guild's prefix
         * @param gID Guild ID
         * @param prefixArr Array of prefixes
         */
        updateGuildPrefix(gID: string, prefixArr: string[] ): Promise<GuildConfig>;
        /**
         * Update list of disabled modules
         * @param gID Guild ID
         * @param modulesArr Array of disabled modules
         */
        updateModule(gID: string, modulesArr: string[] ): Promise<GuildConfig>;
        /**
         * Update list of disabled commands
         * @param gID Guild ID
         * @param commandArr Array of disabled commands
         */
        updateCommand(gID: string, commandArr: string[] ): Promise<GuildConfig>;
        /**
         * Update list of disabled events
         * @param gID Guild ID
         * @param eventArr Array of disabled events
         */
        updateEvent(gID: string, eventArr: string[] ): Promise<GuildConfig>;
        
        saveAxon(axonSchema: AxonConfig): AxonConfig;
        saveGuild(gID: string, guildSchema: GuildConfig): GuildConfig;

        /**
         * Update Axon config
         * @param key Value to update
         * @param value What the value should be updated to
         * @returns Whether the update was successful or not
         */
        public updateAxon(key: 'id' | 'prefix', value: string): Promise<boolean>;
        public updateAxon(key: 'createdAt' | 'updatedAt', value: Date): Promise<boolean>;
        public updateAxon(key: 'bannedUsers' | 'bannedGuilds', value: string[] ): Promise<boolean>;

        /**
         * Update guild config
         * @param key Value to update
         * @param gID Guild ID
         * @param value What the value should be updated to
         */
        updateGuild(key: 'prefixes' | 'ignoredUsers' | 'ignoredRoles' | 'ignoredChannels' | 'modRoles' | 'modUsers', gID: string, value: string[] ): Promise<GuildConfig>;
        updateGuild(key: 'createdAt' | 'updatedAt', gID: string, value: Date): Promise<GuildConfig>;
        updateGuild(key: 'modules', gID: string, value: Module[] ): Promise<GuildConfig>;
        updateGuild(key: 'commands', gID: string, value: Command[] ): Promise<GuildConfig>;
        updateGuild(key: 'listeners', gID: string, value: Listener[] ): Promise<GuildConfig>;
        updateGuild(key: 'modOnly', gID: string, value: boolean): Promise<GuildConfig>;
    }

    /**
     * DB interface to interact with a Json Database.
     *
     * @author Olybear, KhaaZ
     *
     * @class JsonProvider
     * @extends ADBProvider
     */
    class JsonProvider extends ADBProvider {
        /**
         * Class responsible to read / write data to the DB as json.
         */
        public manager?: JsonManager;
        
        /**
         * Override init method.
         *
         * @param {AxonOptions}
         * @memberof JsonProvider
         */
        init(axonOptions?: AxonOptions): void
        /**
         * Initialises a default Axon config.
         *
         * @returns Newly created Axon config from the DB
         * @memberof JsonProvider
         */
        initAxon(): Promise<AxonConfig>;
        /**
         * Initialises a default Guild config.
         * Use default AxonClient prefix settings when creating the new guild config.
         *
         * @param gID - Guild ID
         *
         * @returns Newly created Guild config from the DB
         * @memberof JsonProvider
         */
        initGuild(gID: string): Promise<GuildConfig>;

        /**
         * Retrieves the axon config from the DB
         *
         * @returns AxonSchema Object or null
         * @memberof JsonProvider
         */
        fetchAxon(): Promise<AxonConfig>;
        /**
         * Retrieves the Guild config for the specified guild.
         *
         * @param gID - guild ID
         * @memberof JsonProvider
         */
        fetchGuild(gID: string): Promise<GuildConfig>;

        /**
         * Update AxonConfig in the DB.
         * Update the specific key with the value given as second parameters.
         * Generic method to update Database.
         *
         * @param key - The identifier in the Database
         * @param value - The value to update in the DB
         * @returns Whether the request was successful or not
         *
         * @memberof JsonProvider
         */
        updateAxon(key: string, value: updateDBVal): Promise<boolean>;
        /**
         * Update GuildConfig in the DB.
         * Update the specific key with the value given as third parameters.
         * Specify the guild with the guild ID.
         * Generic method to update Database.
         *
         * @param key - The identifier in the Database
         * @param gID - The guild ID to update
         * @param value - The value to update in the DB
         * @returns Whether the request was successful or not
         *
         * @memberof JsonProvider
         */
        updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;

        /**
         * Updates the Axon config in the DB with a new Axon config object.
         *
         * @param data - the schema object to update
         * @returns Updated AxonConfig from the DB
         *
         * @memberof JsonProvider
         */
        saveAxon(data: AxonConfig): Promise<AxonConfig|null>;
        /**
         * Updates the given guild in the DB with a new schema object.
         *
         * @param gID - Guild id
         * @param data - the schema object to update
         * @returns Updated GuildConfig from the DB
         * @memberof JsonProvider
         */
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

        /**
         * Override init method.
         *
         * @param axonOptions
         *
         * @memberof MongoProvider
         */
        init(AxonOptions?: AxonOptions): void;
        /**
         * Initialises a default Axon config.
         *
         * @returns Newly created Axon config from the DB
         * @memberof MongoProvider
         */
        initAxon(): Promise<AxonConfig>;
        /**
         * Initialises a default Guild config.
         * Use default AxonClient prefix settings when creating the new guild config.
         *
         * @param gID - Guild ID
         *
         * @returns Newly created Guild config from the DB
         * @memberof MongoProvider
         */
        initGuild(gID: string): Promise<GuildConfig>;

        /**
         * Retrieves the axon config from the DB
         *
         * @returns AxonSchema Object or null
         * @memberof MongoProvider
         */
        fetchAxon(): Promise<AxonConfig|null>;
        /**
         * Retrieves the Guild config for the specified guild.
         *
         * @param gID - Guild ID
         * @memberof MongoProvider
         */
        fetchGuild(gID: string): Promise<GuildConfig|null>;
        /**
         * Retrieves the Guild **Schema** for the specified guild.
         * Does not lean and return the actual mongoose Schema.
         * MongoProvider specific method.
         *
         * @param gID - Guild ID
         * @returns GuildSchema or null
         * @memberof MongoProvider
         */
        fetchGuildSchema(gID: string): Promise<Model<GuildSchema> | null>;

        /**
         * Update AxonConfig in the DB.
         * Update the specific key with the value given as second parameters.
         * Generic method to update Database.
         *
         * @param key - The identifier in the Database
         * @param value - The value to update in the DB
         * @returns Whether the request was successful or not
         *
         * @memberof MongoProvider
         */
        updateAxon(key: string, value: updateDBVal): Promise<boolean>;
        /**
         * Update GuildConfig in the DB.
         * Update the specific key with the value given as third parameters.
         * Specify the guild with the guild ID.
         * Generic method to update Database.
         *
         * @param key - The identifier in the Database
         * @param gID - The guild ID to update
         * @param value - The value to update in the DB
         * @returns Whether the request was successful or not
         *
         * @memberof MongoProvider
         */
        updateGuild(key: string, gID: string, value: updateDBVal): Promise<boolean>;
        /**
         * Updates the Axon config in the DB with a new Axon config object.
         *
         * @param data - the schema object to update
         * @returns Updated AxonConfig from the DB
         * @memberof MongoProvider
         */
        saveAxon(data: AxonConfig): Promise<AxonConfig|null>;
        /**
         * Updates the given guild in the DB with a new schema object.
         *
         * @param gID - Guid id
         * @param data - the schema object to update
         * @returns Updated GuildConfig from the DB
         * @memberof MongoProvider
         */
        saveGuild(gID: string, data: GuildConfig): Promise<GuildConfig|null>;
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

        invalidUsageMessage?: boolean;
        invalidPermissionMessage?: ( (channel: LibTextableChannel, member: LibMember) => string) | null;
        sendPermissionMessage?: boolean;
        invalidPermissionMessageTimeout?: number;

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

        constructor(command: Command, override: ACommandOptions, useModuleDefault?: boolean);

        readonly l: MessageManager;

        public isGuildOnly(): boolean;
        public isHidden(): boolean;

        public shouldSendInvalidUsageMessage(args: string[] ): boolean;
        public shouldSendInvalidPermissionMessage(guildConfig: GuildConfig): boolean;
        public shouldDeleteCommand(): boolean;
        public getInvalidPermissionMessage(channel: LibTextableChannel, member: LibMember, permission: string): string;
        public getInvalidUsageMessage(): string;
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
            needed?: string[];
            bypass?: string[];
        };
        usersIDs?: {
            needed?: string[];
            bypass?: string[];
        };
        rolesIDs?: {
            needed?: string[];
            bypass?: string[];
        };
        channelsIDs?: {
            needed?: string[];
            bypass?: string[];
        };
        staff?: {
            needed?: string[];
            bypass?: string[];
        };
        custom?: (i: LibMessage) => boolean;
    }

    export class CommandPermissions implements CommandPerms {
        private _command: Command;

        public custom?: (msg: LibMessage) => boolean;
        constructor(command: Command|Module, override?: CommandPerms, userModuleDefault?: boolean);
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
        constructor(data: { success?: boolean; triggerCooldown?: boolean; error?: Error; } );
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
        subcmds?: (new (...args: any[] ) => Command)[] | null;
        infos: CommandInfo;
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
        public subcmds?: (new (...args: any[] ) => Command)[] | null;
        public infos: CommandInfo;
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

        public infos?: {
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
        public readonly Resolver: Resolver;
        public readonly axonUtils: AxonUtils;
        public readonly utils: Utils;
        public readonly l: MessageManager;
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

    enum HTTP_CODE {
        CONTINUE = 100,
       
        OK = 200,
        CREATED = 201,
        ACCEPTED = 202,
        NO_CONTENT = 204,
       
        MULTIPLE_CHOICES = 300,
        MOVED_PERMANENTLY = 301,
        FOUND = 302,
       
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        PAYMENT_REQUIRED = 402,
        FORBIDDEN = 403,
        NOT_FOUND = 404,
        METHOD_NOT_ALLOWED = 405,
        REQUEST_TIMEOUT = 408,
        CONFLICT = 409,
        GONE = 410,
        UNSUPPORTED_MEDIA_TYPE = 415,
        LOCKED = 423,
        TOO_MANY_REQUESTS = 429,
       
        INTERNAL_SERVER_ERROR = 500,
        NOT_IMPLEMENTED = 501,
        BAD_GATEWAY = 502,
        SERVICE_UNAVAILABLE = 503,
        GATEWAY_TIMEOUT = 504,
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

    enum LIBRARY_TYPES { ERIS = 0, DISCORDJS = 1 }
    enum LOGGER_TYPES { DEFAULT = 0, CHALK = 1, SIGNALE = 2, WINSTON = 3, }
    enum DB_TYPES { IN_MEMORY = 0, JSON = 1, MONGO = 2, } // eslint-disable-line no-shadow
    enum COMMAND_EXECUTION_TYPES {
        REGULAR = 0,
        ADMIN = 1,
        OWNER = 2,
    }
    enum COMMAND_EXECUTION_STATE {
        NO_ERROR = 0,
        COOLDOWN = 1,
        INVALID_USAGE = 2,
        INVALID_PERMISSIONS_BOT = 3,
        INVALID_PERMISSIONS_USER = 4,
    }
    enum AXON_PERMISSION_LEVELS {
        OWNER = 0,
        ADMINISTRATOR = 1,
        MANAGER = 2,
        MODERATOR = 3,
    }
    enum WEBHOOK_TYPES {
        FATAL = 'FATAL',
        ERROR = 'ERROR',
        WARN = 'WARN',
        DEBUG = 'DEBUG',
        NOTICE = 'NOTICE',
        INFO = 'INFO',
        VERBOSE = 'VERBOSE',
    }
    enum LOG_LEVELS {
        FATAL = 'fatal',
        ERROR = 'error',
        WARN = 'warn',
        DEBUG = 'debug',
        NOTICE = 'notice',
        INFO = 'info',
        VERBOSE = 'verbose',
    }
    enum WEBHOOK_TO_COLOR {
        FATAL = 0xFF0000,
        ERROR = 0xFF0000,
        WARN = 0xFF4500,
        DEBUG = 0x0000FF,
        NOTICE = 0x00FF00,
        INFO = 0x00FF00,
        VERBOSE = 0x808080,
    }
    enum TYPE_ERRORS {
        DAPI = 'DAPI error - failed to retrieve from Discord',
        DB = 'DB error - failed to retrieve from the DB',
        INTERNAL = 'Internal error - AxonClient/internal methods',
        UNKNOWN = 'Unexpected error',
    }

    export const AxonEnums: {
        HTTP_CODE: HTTP_CODE;
        HTTP_MESSAGES: HttpMessages;
        LIBRARY_TYPES: LIBRARY_TYPES;
        LOGGER_TYPES: LOGGER_TYPES;
        DB_TYPES: DB_TYPES;
        COMMAND_EXECUTION_TYPES: COMMAND_EXECUTION_TYPES;
        COMMAND_EXECUTION_STATE: COMMAND_EXECUTION_STATE;
        AXON_PERMISSION_LEVELS: AXON_PERMISSION_LEVELS;
        PERMISSION_ADMIN: 'ADMINISTRATOR';
        PERMISSION_MANAGER: 'MANAGE_GUILD';
        WEBHOOK_TYPES: WEBHOOK_TYPES;
        LOG_LEVELS: LOG_LEVELS;
        WEBHOOK_TO_COLOR: WEBHOOK_TO_COLOR;
        TYPE_ERRORS: TYPE_ERRORS;
    };

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

    export class MessageCollector extends EventEmitter {
        private _options: CollectorOptions;
        private _axon: AxonClient;
        private _actualOptions: CollectorOptions;
        private _boundMsgEvent: void;
        private _boundDelEvent: void;
        private _boundEditEvent: void;
        private _boundCollectEvent: void;
        public messages: Collection<LibMessage>;

        constructor(client: AxonClient, options?: CollectorOptions);

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
        library?: LibraryInterface | number;
        logger?: ALogger | number;
        db?: number;
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
        utils?: new (...args: any[] ) => Utils;
        logger?: new (...args: any[] ) => ALogger;
        DBProvider?: new (...args: any[] ) => ADBProvider;
        DBLocation?: string;
        axonConfig?: new (...args: any[] ) => AxonConfig;
        guildConfig?: new (...args: any[] ) => GuildConfig;
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

        public staff: { [key: string]: string[];};

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
        select(axonClient: AxonClient, axonOptions: AxonOptions): InMemoryProvider | JsonProvider | MongoProvider;
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
        public getMessages(lang: string): AxonLanguageResponse;
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
        public fatal(input: string, opt?: Context): void;
        public error(input: string, opt?: Context): void;
        public warn(input: string, opt?: Context): void;
        public debug(input: string, opt?: Context): void;
        public notice(input: string, opt?: Context): void;
        public info(input: string, opt?: Context): void;
        public verbose(input: string, opt?: Context): void;
        private _parseTime(): string;
    }

    // I won't include class extensions for Winston for now
    export class ChalkLogger extends ALogger {
        public out: Console;
    }

    export class DefLogger extends ALogger {
        public out: Console;
    }

    export class SignaleLogger extends ALogger {
        public out: Signale;
        constructor(options: SignaleOptions);
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
        public select(axonConfig: AxonConfig): ALogger;
        public static testLogger(Logger: ALogger): void;
    }

    export class CommandDispatcher {
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

    export class ALoader<T> {
        public loadIn: T;
        constructor(loadIn: T);
        load(toLoad: any): boolean; // Not implemented
        loadAll(toLoad: any): boolean; // Not implemented
        unload(toUnload: any): boolean; // Not implemented
    }

    export class ClientInitialiser {
        static initStaff(staffConfig: { [key: string]: {id: string; name: string;}[];}, logger: ALogger): { [key: string]: string[]; };
        initAxon(axon: AxonClient): Promise<void>;
    }

    export class CommandLoader extends ALoader<Module> {
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

    export class ListenerLoader extends ALoader<AxonClient> {
        private _module: Module;
        constructor(module: Module);
        readonly axon: AxonClient;
        readonly module: Module;
        readonly logger: ALogger;
        load(listener: Listener): boolean;
        loadAll(listeners: { [key: string]: Listener; } ): boolean;
        unload(label: string): true;
    }

    export class ModuleLoader extends ALoader<AxonClient> {
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

    export const DiscordEnums: {
        DISCORD_GATEWAY_EVENTS: DISCORD_GATEWAY_EVENTS;
        DISCORD_PERMISSIONS: DISCORD_PERMISSIONS;
        PERMISSION_NUMBERS: PERMISSIONS_NUMBERS;
        EMBED_LIMITS: EMBED_LIMITS;
        CHANNEL_TYPES: CHANNEL_TYPES;
        MESSAGE_TYPES: MESSAGE_TYPES;
        CLIENT_STATUS_TYPES: CLIENT_STATUS_TYPES;
    };

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
        public add(func: Function, toExec?: boolean, ...args: any[] ): Promise<any>;
        public createClosure(fn: Function, resolve: (value: unknown) => void, reject: (reason: Error) => void, ...args: any[] ): Promise<Function>;
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
        public forEach<K>(fn: (value: T, key: K, map: Map<K, T>) => void): void;
        public find(func: (i: T) => boolean): T;
        public map<R>(func: (i: T) => R): R[];
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
        public triggerWebhook(id: string, token: string, data: ErisWebhookContent | DjsWebhookContent): Promise<WebhookResponse | null>;
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
        embeds: djs.MessageEmbedOptions[];
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
        triggerWebhook(id: string, token: string, data: DjsWebhookContent): Promise<WebhookResponse>;
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
        public triggerWebhook(id: string, token: string, data: ErisWebhookContent): Promise<WebhookResponse>;
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
