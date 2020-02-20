import { EventEmitter } from 'events';
import * as Eris from 'eris';
import * as djs from 'discord.js';
import { Model, Document } from 'mongoose';
import { RequestOptions } from 'http';
import { Signale } from 'signale';
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
    class Collection<T> extends Map<string | number, T> {
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
    class AxonCommandError extends Error {
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
    class Module extends Base {
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
    abstract class ADBProvider {
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
         * @returns Whether the request was successful or not
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
         * @returns Whether the request was successful or not
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
        public saveAxon(data: AxonConfig|AxonConfigRaw): Promise<AxonConfig | null>; // Not Implemented
        /**
         * Updates the given guild in the DB with a new schema object.
         *
         * @param gID - Guild ID
         * @param data - The schema object to update
         * @returns Updated GuildConfig from the DB
         *
         * @memberof ADBProvider
         */
        public saveGuild(gID: string, data: GuildConfig|GuildConfigRaw): Promise<GuildConfig | null>; // Not Implemented
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
         * @memberof JsonManager
         */
        public getExecutor(guildID: string): AsyncQueue;
        /**
         * Parse JSON string as object/array
         * @param string JSON string
         * @returns Parsed array/object or input string if failed
         * @memberof JsonManager
         */
        public toJSON(string: string): string | object | any[];
        /**
         * Parse object/array as JSON string
         * @param json Object/array to be parsed into JSON string
         * @returns JSON string or parsed array/object if failed
         * @memberof JsonManager
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
         * @returns Whether the request was successful or not
         */
        updateGuildPrefix(gID: string, prefixArr: string[] ): Promise<boolean>;
        /**
         * Update list of disabled modules
         * @param gID Guild ID
         * @param modulesArr Array of disabled modules
         * @returns Whether the request was successful or not
         */
        updateModule(gID: string, modulesArr: string[] ): Promise<boolean>;
        /**
         * Update list of disabled commands
         * @param gID Guild ID
         * @param commandArr Array of disabled commands
         * @returns Whether the request was successful or not
         */
        updateCommand(gID: string, commandArr: string[] ): Promise<boolean>;
        /**
         * Update list of disabled events
         * @param gID Guild ID
         * @param eventArr Array of disabled events
         * @returns Whether the request was successful or not
         */
        updateEvent(gID: string, eventArr: string[] ): Promise<boolean>;
        
        saveAxon(axonSchema: AxonConfig|AxonConfigRaw): Promise<AxonConfig>;
        saveGuild(gID: string, guildSchema: GuildConfig|GuildConfigRaw): Promise<GuildConfig>;

        /**
         * Update Axon config
         * @param key Value to update
         * @param value What the value should be updated to
         * @returns Whether the request was successful or not
         */
        public updateAxon(key: 'id' | 'prefix', value: string): Promise<boolean>;
        public updateAxon(key: 'createdAt' | 'updatedAt', value: Date): Promise<boolean>;
        public updateAxon(key: 'bannedUsers' | 'bannedGuilds', value: string[] ): Promise<boolean>;

        /**
         * Update guild config
         * @param key Value to update
         * @param gID Guild ID
         * @param value What the value should be updated to
         * @return Whether the request was successful or not
         */
        updateGuild(key: 'prefixes' | 'ignoredUsers' | 'ignoredRoles' | 'ignoredChannels' | 'modRoles' | 'modUsers', gID: string, value: string[] ): Promise<boolean>;
        updateGuild(key: 'createdAt' | 'updatedAt', gID: string, value: Date): Promise<boolean>;
        updateGuild(key: 'modules', gID: string, value: Module[] ): Promise<boolean>;
        updateGuild(key: 'commands', gID: string, value: Command[] ): Promise<boolean>;
        updateGuild(key: 'listeners', gID: string, value: Listener[] ): Promise<boolean>;
        updateGuild(key: 'modOnly', gID: string, value: boolean): Promise<boolean>;
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
        saveAxon(data: AxonConfig|AxonConfigRaw): Promise<AxonConfig|null>;
        /**
         * Updates the given guild in the DB with a new schema object.
         *
         * @param gID - Guild id
         * @param data - the schema object to update
         * @returns Updated GuildConfig from the DB
         * @memberof JsonProvider
         */
        saveGuild(gID: string, data: GuildConfig|GuildConfigRaw): Promise<GuildConfig|null>;
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

    /**
     * DB interface to interact with a MongoDB Database.
     *
     * @author KhaaZ
     *
     * @class MongoProvider
     * @extends ADBProvider
     */
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
        saveAxon(data: AxonConfig|AxonConfigRaw): Promise<AxonConfig|null>;
        /**
         * Updates the given guild in the DB with a new schema object.
         *
         * @param gID - Guid id
         * @param data - the schema object to update
         * @returns Updated GuildConfig from the DB
         * @memberof MongoProvider
         */
        saveGuild(gID: string, data: GuildConfig|GuildConfigRaw): Promise<GuildConfig|null>;
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

    /**
     * Default AxonConfig data structure used in AxonCore.
     * This class can be extended and changed as you want.
     * All methods flagged with "is used internally" can be overridden but need to keep the same name.
     *
     * @author KhaaZ
     *
     * @class AxonConfig
     */
    class AxonConfig implements AxonConfigRaw {
        private _axon: AxonClient;

        public id: string;
        public prefix: string;

        public createdAt: Date;
        public updatedAt: Date;

        public bannedUsers: string[];
        public bannedGuilds: string[];

        /**
         * Creates an instance of AxonConfig.
         *
         * @param values DB values for the current Guild
         *
         * @memberof AxonConfig
         */
        constructor(axon: AxonClient, values: AConfig);

        /**
         * Whether the user is blacklisted or not
         *
         * *used internally*
         * @memberof AxonConfig
         */
        public isBlacklistedUser(userID: string): boolean;
        /**
         * Whether the guild is blacklisted or not
         *
         * *used internally*
         * @memberof AxonConfig
         */
        public isBlacklistedGuild(guildID: string): boolean;
        /**
         * Updates the state of a blacklisted user.
         *
         * *not used internally*
         *
         * @param userID - The guild ID
         * @param boolean - Whether to add (true) the user or remove (false) it.
         * @returns Updated axonConfig / Error
         * @memberof AxonConfig
         */
        public updateBlacklistUser(userID: string, boolean: boolean): Promise<AxonConfig|null>;
        /**
         * Updates the state of a blacklisted guild.
         *
         * *not used internally*
         *
         * @param guildID - The guild ID
         * @param boolean - Whether to add (true) the guild or remove (false) it.
         * @returns Updated axonConfig / Error
         * @memberof AxonConfig
         */
        public updateBlacklistGuild(guildID: string, boolean: boolean): Promise<AxonConfig|null>;
        private _req(key: string, value: updateDBVal): Promise<AxonConfig|null>;
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
        listeners?: string[];
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

    /**
     * Default GuildConfig data structure used in AxonCore.
     * This class can be extended and changed as you want.
     * All methods flagged with "is used internally" can be overridden but need to keep the same name.
     *
     * @author KhaaZ
     *
     * @class GuildConfig
     */
    class GuildConfig implements GuildConfigRaw {
        private _axon: AxonClient;
        public guildID: string;
        public prefixes: string[];

        public createdAt: Date;
        public updatedAt: Date;

        public modules: string[];
        public commands: string[];
        public listeners: string[];

        public ignoredUsers: string[];
        public ignoredRoles: string[];
        public ignoredChannels: string[];

        public modOnly: boolean;
        public modRoles: string[];
        public modUsers: string[];

        /**
         * Creates an instance of GuildConfig.
         *
         * @param values - DB values for the current guild
         * @memberof GuildConfig
         */
        constructor(axon: AxonClient, values: GConfig);

        /**
         * Get guild prefixes for this guild.
         *
         * @memberof GuildConfig
         */
        public getPrefixes(): string[];
        /**
         * Check if the user/role/channel is ignored on the specified guild.
         * *used internally*
         *
         * @returns True if either one of the three is ignored
         * @memberof GuildConfig
         */
        public isIgnored(msg: LibMessage): boolean;
        /**
         * Check if the user/role/channel is ignored on the specified guild.
         *
         * @returns True if the user is one of the ignored users
         *
         * @memberof GuildConfig
         */
        public isUserIgnored(userID: string): boolean
        /**
         * Check if the user/role/channel is ignored on the specified guild.
         *
         * @returns True if the member has one of the ignored roles
         * @memberof GuildConfig
         */
        public isRoleIgnored(member: LibMember): boolean;
        /**
         * Check if the user/role/channel is ignored on the specified guild.
         *
         * @returns True if the channel is one of the ignored channels
         * @memberof GuildConfig
         */
        public isChannelIgnored(channelID: string): boolean;
        /**
         * Check if the module is disabled on the specified guild.
         *
         * *used internally*
         *
         * @param module - The module object
         * @returns Whether the module is disabled or not
         * @memberof GuildConfig
         */
        public isModuleDisabled(module: Module): boolean;
        /**
         * Check if the command is disabled on the specified guild.
         *
         * *used internally*
         *
         * @param command - The command object
         * @returns Whether the command is disabled or not
         * @memberof GuildConfig
         */
        public isCommandDisabled(command: Command): boolean;
        /**
         * Check if the listener is disabled on the specified guild.
         *
         * *used internally*
         *
         * @param listener - The listener object
         * @returns Whether the listener is disabled or not
         * @memberof GuildConfig
         */
        public isListenerDisabled(listener: Listener): boolean;
        /**
         * Whether the guild is set up to mod only or not.
         *
         * *used internally*
         * @memberof GuildConfig
         */
        public isModOnly(): boolean;
        /**
         * Whether the role ID is in the guild mod roles.
         *
         * *used internally*
         *
         * @memberof GuildConfig
         */
        public isModRole(roleID: string): boolean;
        /**
         * Whether the user ID is in the guild mod users.
         *
         * *used internally*
         *
         * @memberof GuildConfig
         */
        public isModUser(userID: string): boolean;
        /**
         * Update the guild config in the cache and DB.
         *
         * *not used internally*
         *
         * @param guildConfig - Guild schema Object
         * @returns Updated guildSchema
         * @memberof GuildConfig
         */
        public update(guildConfig: GuildConfig): Promise<GuildSchema | null>;
        /**
         * Register prefixes for this guild.
         *
         * *not used internally*
         *
         * @param prefixArr - The array of prefix
         * @returns Updated guildConfig / error
         * @memberof GuildConfig
         */
        public updatePrefixes(prefixArr: string[] ): Promise<GuildConfig|null>;
        /**
         * Updates the state of a module.
         *
         * *not used internally*
         *
         * @param label - The module label
         * @param boolean - Whether to enable (true) the module or disable (false) it.
         * @returns Updated guildConfig / Error
         * @memberof GuildConfig
         */
        public updateStateModule(label: string, boolean: boolean): Promise<GuildConfig|null>;
        /**
         * Updates the state of a command.
         *
         * *not used internally*
         *
         * @param label - The command label
         * @param boolean - Whether to enable (true) the command or disable (false) it.
         * @returns Updated guildConfig / Error
         * @memberof GuildConfig
         */
        public updateStateCommand(label: string, boolean: boolean): Promise<GuildConfig|null>;
        /**
         * Updates the state of a listener.
         *
         * *not used internally*
         *
         * @param label - The listener label
         * @param boolean - Whether to enable (true) the listener or disable (false) it.
         * @returns Updated guildConfig / Error
         * @memberof GuildConfig
         */
        public updateStateListener(label: string, boolean: boolean): Promise<GuildConfig|null>;
        /**
         * Updates the state of a mod role.
         *
         * *not used internally*
         *
         * @param roleID - The role ID
         * @param boolean - Whether to add (true) the role or remove (false) it.
         * @returns Updated guildConfig / Error
         * @memberof GuildConfig
         */
        public updateStateModRole(roleID: string, boolean: boolean): Promise<GuildConfig|null>;
        /**
         * Updates the state of a mod user.
         *
         * *not used internally*
         *
         * @param userID - The user ID
         * @param boolean - Whether to add (true) the user or remove (false) it.
         * @returns Updated guildConfig / Error
         * @memberof GuildConfig
         */
        public updateStateModUser(userID: string, boolean: boolean): Promise<GuildConfig|null>;

        private _req(key: string, value: updateDBVal): Promise<GuildConfig|null>
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

    /**
     * CommandOptions.
     * Holds options for a command and all necessary checkers.
     *
     * @author KhaaZ
     *
     * @class CommandOptions
     */
    class CommandOptions implements ACommandOptions {
        private _command: Command;
        public guildOnly?: boolean;
        public argsMin?: number;

        public invalidUsageMessage: string;
        public invalidPermissionMessage: ( (channel: LibTextableChannel, member: LibMember) => string) | null;
        public sendPermissionMessage: boolean;
        public invalidPermissionMessageTimeout: number;

        public deleteCommand?: boolean;
        public hidden?: boolean;

        public cooldown?: number;

        /**
         * Creates an instance of CommandOptions.
         *
         * @param command - The base command
         * @param override - The specific options for this command (format - CommandOptions)
         * @param useModuleDefault - Whether to use or not the module's base options before applying override permissions
         * @memberof CommandOptions
         */
        constructor(command: Command, override: ACommandOptions, useModuleDefault?: boolean);

        /**
         * Returns the MessageManager instance
         *
         * @readonly
         * @memberof CommandOptions
         */
        readonly l: MessageManager;

        /**
         * Whether the command is guild only or not
         *
         * @memberof CommandOptions
         */
        public isGuildOnly(): boolean;
        /**
         * Whether the command is hidden or not
         *
         * @memberof CommandOptions
         */
        public isHidden(): boolean;

        /**
         * Whether args for this command are correct or not (enough args).
         *
         * @memberof CommandOptions
         */
        public hasCorrectArgs(args: string[] ): boolean;
        /**
         * Whether we should send an invalid usage message or not (help command)
         *
         * @memberof CommandOptions
         */
        public shouldSendInvalidUsageMessage(args: string[] ): boolean;
        /**
         * Whether we should send the invalid permission message or not
         *
         * @memberof CommandOptions
         */
        public shouldSendInvalidPermissionMessage(guildConfig: GuildConfig): boolean;
        /**
         * Whether we should delete the command or not
         *
         * @memberof CommandOptions
         */
        public shouldDeleteCommand(): boolean;
        /**
         * Get the invalid permission message
         *
         * @param channel - The guild channel
         * @param member - The guild member
         * @param permission - The missing permission
         */
        public getInvalidPermissionMessage(channel: LibTextableChannel, member: LibMember, permission: string): string;
        /**
         * Get the invalid usage message
         */
        public getInvalidUsageMessage(): string;
    }

    /**
     * CommandCooldown. Handles cooldowns for a command.
     *
     * @author KhaaZ
     *
     * @class CommandCooldown
     */
    class CommandCooldown {
        /**
         * The base command
         */
        private _command: Command;
        /**
         * Map of cooldowns
         */
        private _cooldowns: Map<string, { time: Date; post: boolean; }>;

        /**
         * Creates an instance of CommandCooldown.
         *
         * @memberof CommandCooldown
         */
        constructor(command: Command);

        // GETTERS

        /**
         * Returns the cooldown for this command
         *
         * @readonly
         * @memberof CommandCooldown
         */
        readonly cooldown: number;

        // METHODS
        /**
         * Checks the command cooldown of the user
         *
         * @param userID - The userID
         * @returns Empty array if no cooldowns / Array with the time left and whether we should send a cooldown message or not
         *
         * @memberof CommandCooldown
         */
        public shouldCooldown(userID: string): [number, boolean] | [];
        /**
         * Checks if the cooldown message should be sent
         *
         * @memberof CommandCooldown
         */
        public shouldSendCooldownMessage(cooldown: { time: Date; post: boolean; } ): boolean;
        /**
         * @memberof CommandCooldown
         */
        public shouldSetCooldown(response: { triggerCooldown: boolean; } | null): boolean;
        /**
         * Set the cooldown for a user for this command.
         *
         * @memberof CommandCooldown
         */
        public setCooldown(userID: string): void;
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
         * Discord permissions for the user
         */
        user?: {
            /**
             * Discord permissions that the user needs to have in order to execute the command
             */
            needed?: string[];
            /**
             * Discord permissions that will allow the user to execute the command no matter what
             */
            bypass?: string[];
        };
        /**
         * User IDs
         */
        usersIDs?: {
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
        rolesIDs?: {
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
        channelsIDs?: {
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

    /**
     * CommandPermissions.
     * Holds permissions for a command and all necessary checkers.
     *
     * needed => needed to have **ALL** <NEEDED> permissions to execute the command
     *
     * bypass => needed to have **ONE** <BYPASS> permission to execute the command
     *
     * @author KhaaZ
     *
     * @class CommandPermissions
     */
    class CommandPermissions implements CommandPerms {
        private _command: Command;

        public bot: string[]
        public serverMod: boolean;
        public serverManager: boolean;
        public serverAdmin: boolean;
        public serverOwner: boolean;
        public user: { needed: string[]; bypass: string[]; };
        public usersIDs: { needed: string[]; bypass: string[]; };
        public rolesIDs: { needed: string[]; bypass: string[]; };
        public channelsIDs: { needed: string[]; bypass: string[]; };
        public staff: { needed: string[]; bypass: string[]; };
        public custom: (msg: LibMessage) => boolean;
        /**
         * Creates an instance of CommandPermissions.
         *
         * @param command - The base command/module
         * @param override - The specific permissions for this command/module (format - CommandPermissions)
         * @param useModuleDefault - Whether to use or not the module's base permissions before applying override permissions
         * @memberof CommandPermissions
         */
        constructor(command: Command|Module, override?: CommandPerms, userModuleDefault?: boolean);
        // GETTERS
        /**
         * Returns the AxonClient instance
         *
         * @readonly
         * @memberof CommandPermissions
         */
        readonly axon: AxonClient;
        /**
         * Return the Utils instance
         *
         * @readonly
         * @memberof CommandPermissions
         */
        readonly utils: Utils;
        /**
         * Returns the AxonUtils instance
         *
         * @readonly
         * @memberof CommandPermissions
         */
        readonly axonUtils: AxonUtils;
        /**
         * Returns the LibraryInterface instance
         *
         * @readonly
         * @memberof CommandPermissions
         */
        readonly library: LibraryInterface;

        // METHODS

        /**
         * Permission checker - Does the user have permission to use the command or not?
         *
         * Bypass - Only needs of of these permissions, doesn't check for other permissions
         *
         * Needed - Needs all specified permissions => Goes through other checkers
         *
         * ServerMod
         *
         * @param msg - The Message Object
         * @param guildConf - GuildConfig
         * @returns True if the user can execute command / False if not. Second element is the missing permission || null
         * @memberof Command
         */
        public canExecute(msg: LibMessage, guildConf: GuildConfig): [false, string | null] | [true, null?];

        /**
         * Set the permissions the bot needs to have to execute this command.
         *
         * @param array - Array of permissions
         * @param toAdd - Whether to add the permissions to the existing permissions
         * @memberof CommandPermissions
         */
        public setBot(array?: string[], toAdd?: boolean): CommandPermissions;
        /**
         * Set/unset the command to serverMod only.
         *
         * @param boolean - Whether to make the command serverMod only
         * @memberof CommandPermissions
         */
        public setServerMod(boolean?: boolean): CommandPermissions;
        /**
         * Set/unset the command to serverManager only.
         *
         * @param boolean - Whether to make the command serverManager only
         * @memberof CommandPermissions
         */
        public setServerManager(boolean?: boolean): CommandPermissions;
        /**
         * Set/unset the command to serverAdmin only.
         *
         * @param boolean - Whether to make the command serverAdmin only
         * @memberof CommandPermissions
         */
        public setServerAdmin(boolean?: boolean): CommandPermissions;
        /**
         * Set/unset the command to serverOwner only.
         *
         * @param boolean - Whether to make the command serverOwner only
         * @memberof CommandPermissions
         */
        public setServerOwner(boolean?: boolean): CommandPermissions;
        /**
         * Set the permissions the user needs to have to execute this command.
         *
         * @param object - Object of permissions
         * @param toAdd - Whether to add the permissions to the existing permissions
         * @memberof CommandPermissions
         */
        public setUser(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        /**
         * Set the user IDs the user needs to have to execute this command.
         *
         * @param object - Object of permissions
         * @param toAdd - Whether to add the permissions to the existing permissions
         * @memberof CommandPermissions
         */
        public setUserIDs(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        /**
         * Set the role IDs the user needs to have to execute this command.
         *
         * @param object - Object of permissions
         * @param toAdd - Whether to add the permissions to the existing permissions
         * @memberof CommandPermissions
         */
        public setRoleIDs(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        /**
         * Set the channel IDs needed to be in to execute this command.
         *
         * @param object - Object of permissions
         * @param toAdd - Whether to add the permissions to the existing permissions
         * @memberof CommandPermissions
         */
        public setChannelIDs(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;
        /**
         * Set the AxonCore staff members that can execute this command.
         *
         * @param object - Object of permissions
         * @param toAdd - Whether to add the permissions to the existing permissions
         * @memberof CommandPermissions
         */
        public setStaff(object?: { bypass?: string[]; needed?: string[]; }, toAdd?: boolean): CommandPermissions;

        // CHECK FOR IF PERMISSIONS ARE MET

        /**
         * Check bot permission
         *
         * @memberof CommandPermissions
         */
        private _checkPermsBot(channel: LibTextableChannel): boolean;
        /**
         * Check user permissions [bypass]
         *
         * @memberof CommandPermissions
         */
        private _checkPermsUserBypass(member: LibMember): boolean;
        /**
         * Check user permissions [needed]
         *
         * @memberof CommandPermissions
         */
        private _checkPermsUserNeeded(member: LibMember): [true] | [false, string];
        /**
         * Check userIDs [bypass]
         *
         * @memberof CommandPermissions
         */
        private _checkUserBypass(member: LibMember): boolean;
        /**
         * Check userIDs [needed]
         *
         * @memberof CommandPermissions
         */
        private _checkUserNeeded(member: LibMember): boolean;
        /**
         * Check roleIDs [bypass]
         *
         * @memberof CommandPermissions
         */
        private _checkRoleBypass(member: LibMember): boolean;
        /**
         * Check roleIDs [needed]
         *
         * @memberof CommandPermissions
         */
        private _checkRoleNeeded(member: LibMember): boolean;
        /**
         * Check channelIDs [bypass]
         *
         * @memberof CommandPermissions
         */
        private _checkChannelBypass(channel: LibTextableChannel): boolean;
        /**
         * Check channelIDs [needed]
         *
         * @memberof CommandPermissions
         */
        private _checkChannelNeeded(channel: LibTextableChannel): boolean;
        /**
         * Check if the user is bot staff [bypass]
         *
         * @returns True if Staff / False if not
         * @memberof CommandPermissions
         */
        private _checkStaffBypass(member: LibMember): boolean;
        /**
         * Check if the user is bot staff [needed]
         *
         * @returns True if Staff / False if not
         * @memberof CommandPermissions
         */
        private _checkStaffNeeded(member: LibMember): boolean;
    }
    /**
     * Build a Command Response - the formatted object used internally by the framework to resolve context.
     *
     * @class CommandResponse
     */
    class CommandResponse {
        public success: boolean;
        public triggerCooldown: boolean;
        public error?: Error;
        /**
         * Creates an instance of CommandResponse.
         * Build the CommandResponse from all options given in parameters
         *
         * @memberof CommandResponse
         */
        constructor(data: { success?: boolean; triggerCooldown?: boolean; error?: Error; } );
        /**
         * By default returns the Command Response asynchronously.
         *
         * @memberof CommandResponse
         */
        public resolve(): Promise<CommandResponse>;
        /**
         * Returns the Command Response in a Promise (asynchronously)
         *
         * @memberof CommandResponse
         */
        public resolveAsync(): Promise<CommandResponse>;
        /**
         * Returns the Command Response (synchronously)
         *
         * @memberof CommandResponse
         */
        public resolveSync(): CommandResponse;
    }

    class CommandContext {
        /**
         * Raw input
         */
        public raw: string;
        /**
         * The command full label
         */
        public commandLabel: string;
        /**
         * The module name
         */
        public moduleLabel: string;

        /**
         * Whether the command was actually executed or not
         */
        public execute: boolean;
        public helpExecution: boolean;
        /**
         * The state of execution (no error, cooldown, invalid usage, invalid permission)
         */
        public executionState: number;
        /**
         * The type of execution (Owner, Admin, Regular)
         */
        public executionType: number;
        /**
         * Whether the command was successfully executed or not
         */
        public success: boolean;
        /**
         * Optional error object in case of bad command execution
         */
        public error: string|Error;

        /**
         * Whether the command was executed in DM or not
         */
        public dm: boolean;
        /**
         * Context: guild where the command was executed ID
         */
        public guildID: string;
        /**
         * Context: guild where the command was executed name
         */
        public guildName: string;

        /**
         * Context: channel where the command was executed ID
         */
        public channelID: string;
        /**
         * Context: channel where the command was executed name
         */
        public channelName: string;

        /**
         * Context: user that called the command ID
         */
        public callerID: string;
        /**
         * Context: user that called the command name
         */
        public callerName: string;

        /**
         * The execution time
         */
        public calledAt: Date;

        /**
         * Creates an instance of CommandContext.
         *
         * @param data.executionState - no error, cooldown, invalid usage, invalid permissions...
         * @param data.executionType - Regular, admin, owner execution
         * @memberof CommandContext
         */
        constructor(command: Command, triggerMessage: LibMessage, data?: { executed?: boolean; helpExecution?: string; executionState?: COMMAND_EXECUTION_STATE; executionType?: COMMAND_EXECUTION_TYPES; } );

        /**
         * Add the command response data to the command context object.
         * Add the state of the command success and optionally the error.
         *
         * @param commandResponse - CommandResponse object obtained or created after the command execution
         * @memberof CommandContext
         */
        public addResponseData(commandResponse?: CommandResponse): CommandContext;
        /**
         * Return the type of command execution based of the execution context.
         * Admin, Owner or Regular execution.
         *
         * @static
         * @memberof CommandContext
         */
        static getExecutionType(isAdmin: boolean, isOwner: boolean): COMMAND_EXECUTION_TYPES;
        /**
         * By default returns the Command Context asynchronously.
         *
         * @memberof CommandContext
         */
        public resolve(): Promise<CommandContext>;
        /**
         * Returns the Command Context wrapped in a Promise (asynchronously)
         *
         * @memberof CommandContext
         */
        public resolveAsync(): Promise<CommandContext>;
        /**
         * Returns the Command Context (synchronously)
         *
         * @memberof CommandContext
         */
        public resolveSync(): CommandContext;
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
        infos?: CommandInfo;
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

    /**
     * AxonCore - Command constructor
     *
     * @author KhaaZ
     *
     * @class Command
     * @extends Base
     */
    class Command extends Base implements CommandData {
        /**
         * Module object
         */
        private _module: Module;
        /**
         * Cooldown Object for the command (manage all command cooldowns)
         */
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

        /**
         * Collection of subcommands
         */
        public subCommands: Collection<Command> | null;
        /**
         * Map of subcommand aliases
         */
        public subCommandAliases?: Map<string, string>;

        // GETTERS
        /**
         * Returns the parent module instance
         *
         * @readonly
         * @memberof Command
         */
        readonly module: Module;
        /**
         * Returns the template object
         *
         * @readonly
         * @memberof Command
         */
        readonly template: AxonTemplate;
        /**
         * Returns the library Interface instance
         *
         * @readonly
         * @memberof Command
         */
        readonly library: LibraryInterface;
        /**
         * Returns the full label for this command (label + all parent labels)
         *
         * @readonly
         * @memberof Command
         */
        readonly fullLabel: string;

        /**
         * Creates a Command instance.
         * Handles execution of this command.
         * Overrides the execute method. Execute method will be called every time the command is called.
         *
         * @param data - All command parameters
         * @memberof Command
         */
        constructor(module: Module, data?: CommandData);

        // Internal
        /**
         * Process the command, and executes it if it can (permissions, options etc..).
         *
         * @returns Return a CommandContext or throw an AxonCommandError.
         * @memberof Command
         */
        private _process(object: { msg: LibMessage; args: string[]; guildConfig?: GuildConfig; isAdmin?: boolean; isOwner?: boolean; } ): Promise<CommandContext>;
        private _preExecute(): void; // Blank function
        /**
         * Execute the command.
         * Get the CommandResponse from the command execution or create it in case of errors.
         * Create the CommandContext and returns it.
         * @memberof Command
         */
        private _execute(message: { msg: LibMessage; args?: string[]; guildConfig?: GuildConfig; isAdmin?: boolean; isOwner?: boolean; } ): Promise<CommandContext>;
        private _postExecute(): void; // Blank function

        // External
        /**
         * Override this method in all Command child.
         * Main method - command logic being executed when the command is actually ran.
         *
         * @param object - An Object with all arguments to use execute
         * @param object.message - The message Object
         * @param object.args - The Array of arguments
         * @param object.guildConfig - The guildConfig if it exists
         *
         * @returns Returns a CommandResponse that will be used to create the CommandContext
         * @memberof Command
         */
        public execute(object: { msg: LibMessage; args?: string[]; guildConfig?: GuildConfig; } ): Promise<CommandResponse>; // Not implemented
        /**
         * Send help message in the current channel with perm checks done before.
         * Call a custom sendHelp method if it exists, use the default one if it doesn't.
         *
         * @memberof Command
         */
        public sendHelp(object: { msg: LibMessage; guildConf?: GuildConfig; isAdmin: boolean; isOwner: boolean; } ): Promise<CommandContext>;
        /**
         * Send an error message in case of invalid bot permissions, delete it automatically after a delay.
         *
         * @param channel - The channel Object
         * @param permissions - Optional array of permissions string
         * @memberof Command
         */
        public sendBotPerms(channel: LibTextableChannel, permissions?: string[] ): Promise<CommandResponse>;
        /**
         * Send an error message in case of invalid user permissions, delete it automatically after a delay.
         * Uses the template message in config/template.
         *
         * @param channel - The channel object
         * @param member - The member object
         * @param deleteTimeout - The permission message deletion timeout, if `null` the the message will not delete
         * @param missingPermission - The missing permission
         * @memberof Command
         */
        public sendUserPerms(channel: LibTextableChannel, member: LibMember, deleteTimeout?: number, missingPermission?: string): Promise<CommandResponse>;
        /**
         * Send an error message in case of invalid target permissions (serverMod/serverAdmin).
         * Uses the template message in config/template.
         *
         * @param channel - The channel Object
         * @memberof Command
         */
        public sendTargetPerms(channel: LibTextableChannel): Promise<CommandResponse>;
        /**
         * Send an error message in case of invalid cooldown, delete it automatically after a delay.
         *
         * @param channel - The channel Object
         * @param time - How long since the last command
         * @memberof Command
         */
        public sendCooldown(channel: LibTextableChannel, time: number): Promise<CommandResponse>;
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
        infos?: ListenerInfo;
    }

    class Listener extends Base implements ListenerData {
        /**
         * Module instance
         */
        private _module: Module;
        public eventName: string;
        public label: string;

        public load: boolean;
        public enabled: boolean;
        public serverBypass: boolean;

        public infos: {
            owners: string[];
            description: string;
        };

        /**
         * Returns the parent Module instance
         *
         * @readonly
         * @memberof Listener
         */
        readonly module: Module;

        /**
         * Creates an Listener instance.
         *
         * @param data - All events parameters
         * @memberof Listener
         */
        constructor(module: Module, data?: ListenerData);

        /**
         * Promisify the return execute return to prevent promise issue
         *
         * @param guildConfig - the guildConfig or undefined if not a guild event
         * @param args - Array of the events arguments
         * @memberof Listener
         */
        private _execute(guildConf?: GuildConfig, ...args: any[] ): Promise<any>;

        /**
         * Main execute function, need to be overridden in child.
         *
         * @param args - Array of the events arguments (as separate parameters)
         * @param guildConfig - The guildConfig or undefined if not a guild event
         * @memberof Listener
         */
        public execute(args: any, guildConf?: GuildConfig): Promise<any>;
    }

    /**
     * Event Manager class
     *
     * @author KhaaZ
     *
     * @class EventManager
     * @extends Base
     */
    class EventManager extends Base {
        /**
         * Object that links an event name to an array of Listener objects
         */
        private _events: {[EventName: string]: Listener[];};
        /**
         * Collection of handler keyed to the event name
         */
        private _handlers: Collection<AHandler>;
        /**
         * Creates an EventManager instance.
         *
         * @memberof EventManager
         */
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        // GETTERS
        /**
         * Returns all Handlers base
         *
         * @readonly
         * @memberof EventManager
         */
        readonly HANDLERS: object;
        /**
         * Returns Collection of every handlers for every Discord event
         *
         * @readonly
         * @memberof EventManager
         */
        readonly handlers: Collection<AHandler>;

        /**
         * Get all functions bound to the event passed in parameters.
         *
         * @param eventName - The library event name
         * @returns Array of the functions bound to the event
         * @memberof EventManager
         */
        public getListeners(eventName: string): Listener[];
        /**
         * Bind all listeners to a handler.
         * Create and register a handler for each event.
         * Called by AxonClient in start method.
         * If the bot is ready, also call bindHandlers()
         * @memberof EventManager
         */
        public bindListeners(): void;
        /**
         * Bind every handler to the correct Discord event and start listening to this event.
         * @memberof EventManager
         */
        public bindHandlers(): void;

        /**
         * Register a listener for the given discord event.
         * Add the Listener in the array of Listener for each discord event.
         * Called by ModuleLoader when registering an event.
         *
         * @param listener - The Listener Object
         * @returns Array of the functions bound to the event
         *
         * @memberof EventManager
         */
        public registerListener(event: Listener): Listener[];
        /**
         * Register a handler.
         * Remove the current event listener if the handler already exists.
         * Create a new handler from the array of listeners for the given event.
         *
         * @param event - The Discord event name
         * @returns The new Handler created
         * @memberof EventManager
         */
        public registerHandler(event: string): AHandler;
        /**
         * Register an event handler and start listen to this event.
         * Recreate a handler and bind it to the event emitter.
         *
         * @param event - The Discord event name to register
         * @returns The Handler Object
         * @memberof EventManager
         */
        public registerEvent(event: string): object;

        /**
         * Unregister a listener.
         * Recreate the handler without the unregistered listener and listen to the updated handler
         *
         * @param event - Name of the Discord event
         * @param label - Label of the listener
         * @returns True if worked / False if label or event doesn't exist
         * @memberof EventManager
         */
        public unregisterListener(event: string, label: string): boolean;
        /**
         * Unregister a handler. Unregister the event and delete the handler.
         *
         * @param event - Name of the Discord event
         * @returns True if worked / False if event doesn't exist
         * @memberof EventManager
         */
        public unregisterHandler(event: string): boolean;
        /**
         * Unregister the given event without deleting the handler.
         * Just stop listening to the discord event emitted.
         *
         * @param event - Name of the Discord event
         * @returns True if worked / False if event doesn't exist
         * @memberof EventManager
         */
        public unregisterEvent(event: string): boolean;
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

    /**
     * AxonCore Utility Class.
     *
     * AxonCore specific methods + internal uses
     *
     * @author KhaaZ
     *
     * @class AxonUtils
     */
    class AxonUtils {
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

    /**
     * General Utility Class for AxonCore
     * All methods useful and usable everywhere
     *
     * @author KhaaZ
     *
     * @class Utils
     */
    class Utils {
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

    interface Ctx { guild: LibGuild|string; cmd: string; user: LibUser|string; }

    /**
     * Base Class with default properties and utility methods used by all Commands / Modules / Events.
     *
     * @author KhaaZ
     *
     * @class Base
     */
    class Base {
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
         * @param options.disableEveryone - Whether to allow mentioning everyone or not
         * @param options.delete - Whether to delete the message or not
         * @param options.delay - Delay after which the message will be deleted
         * @returns Message Object
         * @memberof Base
         */
        public sendDM(user: LibUser, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage|void>;
        /**
         * Send a message.
         * Check for bot permissions + message/embed length
         * Doesn't support file
         *
         * @param channel - The channel Object
         * @param content - Message content, String or Embed Object
         * @param options - Options { disableEveryone: Boolean, delete: Boolean, delay: Number }
         * @param options.disableEveryone - Whether to allow mentioning everyone or not
         * @param options.delete - Whether to delete the message or not
         * @param options.delay - Delay after which the message will be deleted
         * @returns Message Object
         * @memberof Base
         */
        public sendMessage(channel: LibTextableChannel, content: AxonMSGCont, options?: AxonMSGOpt): Promise<LibMessage>;
        /**
         * Edit a message
         * Check for bot permissions + message embed/length
         *
         * @param message - The message object to edit
         * @param content - Object (embed) or String
         * @returns Message Object
         * @memberof Base
         */
        public editMessage(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;
        /**
         * Send a success message. If the content is a string, suffix the success emote to the content.
         * Check for sendMessage perms.
         * Await for sendMessage to throw correctly potential errors.
         *
         * @param channel - The channel Object
         * @param content - Success message content
         * @param options - Additional options
         * @param options.disableEveryone - Whether to allow mentioning everyone or not
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
         * @param options.disableEveryone - Whether to allow mentioning everyone or not
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

    const AxonEnums: {
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

    /**
     * Embed class to create Embed without without using raw json format
     *
     * @author DutchVanDerLinde
     *
     * @class Embed
     */
    class Embed implements EmbedData {
        public title?: string;
        public url?: string;
        public description?: string;
        public color?: number;
        public author?: EmbedAuthor;
        public thumbnail?: EmbedThumbnail
        public fields: EmbedFields[];
        public image?: EmbedImage;
        public footer?: EmbedFooter
        public timestamp?: Date;

        constructor(data?: EmbedData);
        private _resolveString(data): string;

        /**
         * Sets the title of this embed.
         *
         * @param title - The title
         * @returns This embed
         * @example Embed.setTitle('My New Embed');
         * @memberof Embed
         */
        public setTitle(title: string): Embed;
        /**
         * Sets the description of this embed.
         *
         * @param description -The description
         * @returns This embed
         * @example Embed.setDescription('Hi, this is my description!!!');
         * @memberof Embed
         */
        public setDescription(description: string): Embed;
        /**
         * @description Sets the URL of this embed.
         * @param url The URL
         * @returns This embed
         * @memberof Embed
         */
        public setURL(url: string): Embed;
        /**
         * Sets the color of this embed.
         *
         * @param color - The color of the embed
         * @returns This embed
         * @example Embed.setColor(0xFFFFFF);
         * @memberof Embed
         */
        public setColor(color: number): Embed;
        /**
         * Sets the author of this embed.
         *
         * @param name - The name of the author
         * @param icon - The icon URL of the author
         * @param url - The URL of the author
         * @returns This embed
         * @example Embed.setAuthor('KhaaZ', 'https://www.image.com/khaaz.png');
         * @memberof Embed
         */
        public setAuthor(name: string, icon?: string, url?: string): Embed;
        /**
         * Sets the timestamp of this embed.
         *
         * @param timestamp - The timestamp
         * @returns This embed
         * @memberof Embed
         */
        public setTimestamp(timestamp?: Date): Embed;
        /**
         * Adds a field to the embed (max 25).
         *
         * @param name - The name of the field
         * @param value - The value of the field
         * @param inline - Set the field to display inline
         * @returns This embed
         * @example Embed.addField('My Field', 'This is a new field!', true);
         * @memberof Embed
         */
        public addField(name: string, value: string, inline?: boolean): Embed;
        /**
         * Set the thumbnail of this embed.
         *
         * @param url - The URL of the thumbnail
         * @returns This embed
         * @memberof Embed
         */
        public setThumbnail(url: string): Embed;
        /**
         * Sets the image of this embed
         *
         * @param url - The URL of the image
         * @returns This embed
         * @example Embed.setImage('https://www.image.com/myImageUrl.png');
         * @memberof Embed
         */
        public setImage(url: string): Embed;
        /**
         * Sets the footer of this embed.
         *
         * @param text - The text of the footer
         * @param icon - The icon URL of the footer
         * @returns This embed
         * @example Embed.setFooter('My Footer', 'https://www.image.com/footer.png');
         * @memberof Embed
         */
        public setFooter(text: string, icon?: string): Embed;
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

    /**
     * Create a Prompt, waiting for specific input before resolving with the message Object
     *
     * @author VoidNull
     *
     * @class Prompt
     * @example let prompt = new Prompt(this.axon, msg.author.id, msg.channel, { timeoutMessage: 'Be quicker next time' });
     */
    export class Prompt {
        private _axon: AxonClient;
        /**
         * The user ID that is bound to the current prompt
         */
        public userID: string;
        /**
         * The channel where the prompt is running
         */
        public channel: LibTextableChannel;
        private _prompt: string;
        private _options: PromptOptionsData;
        private _actualOptions: PromptOptionsData;
        private _emitter: EventEmitter;
        /**
         * Whether the Prompt timed out
         */
        public timedOut: boolean;
        /**
         * Whether the Prompt ended
         */
        public ended: boolean;
        private _boundEvent(): void;
        constructor(client: AxonClient, uID: string, channel: LibTextableChannel, defaultOptions?: PromptOptions);
        /**
         * @readonly
         */
        readonly axon: AxonClient;
        /**
         * @readonly
         */
        readonly client: LibClient;

        /**
         * Runs the prompt.
         *
         * @param prompt The prompt you would like to send
         * @param options The options for the prompt.
         *
         * @example
         * const output = await prompt.run('Who would you like to wave to?', { timeout: 10000 });
         * this.sendMessage(msg.channel, output.content);
         *
         * @returns The message object, or a reject error if timed out or message was invalid
         */
        public run(prompt: AxonMSGCont, options?: PromptOptions): Promise<LibMessage>;
        private _startTimeout(): void;
        private _deletePrompt(): void;
        /**
         * Checker for this._onMsgCreate
         *
         * @param msg The message object to check against.
         * @returns Whether the check completed successfully
         */
        private _checker(msg: LibMessage): boolean;
        private _onInvalidEnd(): string;
        private _onEnded(msg: LibMessage): LibMessage;
        private _onTimeout(): Promise<void>;
        /**
         * Message event for prompt
         * When a message is created
         *
         * @param msg The message object
         */
        private _onMsgCreate(msg: LibMessage): Promise<void>;
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
    
    /**
     * Collect bunch of message object according to chosen options
     *
     * @author VoidNull
     *
     * @class MessageCollector
     * @extends EventEmitter
     */
    export class MessageCollector extends EventEmitter {
        private _options: CollectorOptions;
        private _axon: AxonClient;
        private _actualOptions: CollectorOptions;
        private _boundMsgEvent: (msg: LibMessage) => void;
        private _boundDelEvent: (msg: LibMessage) => void;
        private _boundEditEvent: (msg: LibMessage, oldMsg: LibMessage) => void;
        private _boundCollectEvent: () => void;
        public messages: Collection<LibMessage>;

        /**
         * Creates an instance of MessageCollector
         * @param client - The axon client object
         * @param options - The default options for the message collector instance
         * @param options.timeout - The time before the collector times out in milliseconds
         * @param options.count - The amount of messages to collect before automatically ending
         * @param options.ignoreBots - Whether or not to ignore bots
         * @param options.uID - The user id to listen for (listens to all messages if not specified)
         * @param options.caseSensitive - Whether or not to return messages with lowercase content. Default: content unchanged
         *
         * @example
         * const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
         */
        constructor(client: AxonClient, options?: CollectorOptions);

        /**
         * @readonly
         */
        readonly axon: AxonClient;
        /**
         * @readonly
         */
        readonly client: LibClient;

        /**
         * Runs the message collector
         *
         * @param channel The channel object to listen to
         * @param options The options for the message collector
         * @returns Map of messages collected.
         *
         * @example
         * const messages = await collector.run(msg.channel, { caseInsensitive: false });
         */
        public run(channel: LibTextableChannel, options: CollectorOptions): Promise<Collection<LibMessage> >;
        private _onEnd(): void;
        private _startTimeout(): void;
        private _onMsgDelete(msg: LibMessage): void;
        private _onMsgEdit(msg: LibMessage): Promise<void>;
        private _onCollectEvent(): void;
        public end(): void;
        private _onMsgCreate(msg: LibMessage): void;
        /**
         * Removes a message from the messages collected
         *
         * @param mID The id of the message you want to remove
         * @returns Collection of messages collected, now excluding the removed message.
         *
         * @example
         * collector.delete('542164538347225118')
         */
        public delete(mID: string): Collection<LibMessage>;
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
    class AxonOptions {
        /**
         * The discord token to automatically connect the bot client
         */
        private _token: string;
        /**
         * Bot prefixes
         */
        public prefixes: AxonOptionsPrefixes;
        /**
         * Bot settings
         */
        public settings: AOptionsSettings;
        /**
         * Translation file
         */
        public lang: Languages;
        /**
         * Custom function that will log a custom logo on startup
         */
        public logo: ( () => void) | null;
        /**
         * General info about the bot
         */
        public info: AxonOptionsInfo;
        /**
         * The bot staff (owner, admins)
         */
        public staff: AxonOptionsStaff;
        /**
         * Template information (colours / formatting / emojis)
         */
        public template: AxonTemplate;
        /**
         * Custom configs that can be provided
         */
        public custom: object | null;
        /**
         * Webhooks tokens / id
         */
        public webhooks: Webhooks;
        /**
         * Classes overrides
         */
        public extensions: AxonOptionsExtensions;
        /**
         * Creates an instance of AxonOptions.
         *
         * @param data - AxonOptions data
         * @param webhooks - Webhooks tokens / id
         * @param extensions - Classes overrides
         * @memberof AxonOptions
         */
        constructor(data?: AxonOptionsBase | {}, webhooks?: Webhooks | {}, extensions?: AxonOptionsExtensions | {} )
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

    interface Infos {
        /** Bot name */
        name: string;
        /** Bot description */
        description: string;
        /** Bot version */
        version: string;
        /** Bot owners (array of names) */
        owners: string[];
    }

    interface AxonInfos {
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

    class AxonClient extends EventEmitter {
        /** Configs (webhooks, template, custom) */
        private _configs: AxonConfs;
        /** Bot settings */
        public settings: AxonParams;
        /** General infos about the current application */
        public infos: Infos;
        public axoncore: AxonInfos;
        /** The Logger instance */
        public logger: ALogger;
        /** Util methods (AxonCore) */
        public axonUtils: AxonUtils;

        /** Discord library Client */
        private _botClient: LibClient;
        public library: LibraryInterface;
        /** Utils methods (general) */
        public utils: Utils;
        /** The DBProvider instance */
        public DBProvider: ADBProvider

        /** Registry holding all modules */
        public moduleRegistry: ModuleRegistry;
        /** Registry holding all commands */
        public commandRegistry: CommandRegistry;
        /** Registry holding all listeners */
        public listenerRegistry: ListenerRegistry;
        /** The EventManager instance that handle all AxonCore listeners */
        public eventManager: EventManager;

        /** The Manager that handles GuildConfigs (cache / DB etc) */
        public guildConfigs: GuildConfigCache;
        /** The AxonConfig object that handles globally blacklisted users and guilds */
        public axonConfig?: AxonConfig;

        /** Load, unload modules. */
        public moduleLoader: ModuleLoader;
        /** Dispatch commands onMessageCreate. */
        public dispatcher: CommandDispatcher;
        /** Message manager object accessible with `<AxonClient>.l` */
        private _messageManager: MessageManager;

        /** Bot Staff (owners, admins, +...) */
        public staff: AxonStaffIDs;

        /**
         * Creates an AxonClient instance.
         *
         * @param botClient - Eris or Discordjs Client instance
         * @param axonOptions - Axon options
         * @param modules - Object with all modules to add in the bot
         * @memberof AxonClient
         */
        constructor(botClient: LibClient, AxonOptions: AxonOptions, modules: object);

        /**
         * Returns the bot client instance
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly botClient: LibClient;
        /**
         * Returns all event handlers in eventManager
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly handlers: Collection<AHandler>;
        /**
         * Returns all registered listeners for the discord event name
         *
         * @memberof AxonClient
         */
        getListeners(eventName: string): Listener[];
        /**
         * Returns all the resolver for the default current library used.
         * Can be easily overridden with a custom Resolver by overriding this getter.
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly Resolver: Resolver;
        /**
         * Return the webhooks config
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly webhooks: Webhooks;
        /**
         * Returns the template config
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly template: AxonTemplate;
        /**
         * Returns the custom config
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly custom: object | null;
        /**
         * Return the MessageManager instance
         *
         * @readonly
         * @memberof AxonClient
         */
        readonly l: MessageManager;

        /**
         * Get a module from AxonClient with the given label.
         *
         * @param module - Module label
         * @memberof AxonClient
         */
        getModule(module: string): Module | null;
        /**
         * Get a command/subcommand from AxonClient with the given full label.
         *
         * @param fullLabel - Full command (or subcommand) label
         * @memberof AxonClient
         */
        getCommand(fullLabel: string): Command | null;
        
        /**
         * Start AxonClient.
         * Start bot client.
         * Bind error listeners and event listeners.
         *
         * Calls custom onStart() method at the beginning.
         * Calls custom onReady() method when AxonClient is ready.
         *
         * @async
         * @memberof AxonClient
         */
        public start(): Promise<void>;
        /**
         * Override this method.
         * Method executed after the object is finished to be constructed (in the constructor)
         *
         * @memberof AxonClient
         */
        public onInit(): true;
        /**
         * Override this method.
         * Method executed at the beginning of the start method.
         *
         * @memberof AxonClient
         */
        public onStart(): Promise<true>;
        /**
         * Override this method.
         * Method executed at the end of the start method (when the AxonClient is ready).
         *
         * @memberof AxonClient
         */
        public onReady(): Promise<true>;
        /**
         * Log both to console and to the correct webhook
         *
         * @param level - The LOG-LEVEL
         * @param content - The content or the error to log
         * @param ctx - Additional context to be passed to logger
         * @param execWebhook - Whether to execute the webhook
         * @memberof AxonClient
         */
        public log(level: LOG_LEVELS, content: Error | string, ctx?: Ctx, execWebhook?: boolean): void;
        /**
         * Function executed on the global messageCreate event and dispatch to the correct command and execution
         *
         * @memberof AxonClient
         */
        private _onMessageCreate(msg: LibMessage): void;
        
        /**
         * Function executed when the bot client is ready.
         * Bind events and initialise client status/game.
         * @memberof AxonClient
         */
        private _onReady(): void;
        /**
         * Initialize error listeners and webhooks.
         * Override this method to setup your own error listeners.
         * @memberof AxonClient
         */
        public initErrorListeners(): void;
        /**
         * Set the bot status. Override to setup your own status.
         * Called after the client ready event.
         * @memberof AxonClient
         */
        public initStatus(): void;

        public _execCommand(msg: LibMessage, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean; isOwner: boolean; } ): void;
        public _execHelp(msg: LibMessage, args: string[], command: Command, guildConfig: GuildConfig, optionals: { isAdmin: boolean; isOwner: boolean; } ): void;
        public _execListener(listener: Listener, guildConfig: GuildConfig, ...args: any[] ): void;

        /**
         * Send full help in DM.
         * Doesn't show commands that the user can't execute.
         * This method can be overridden in child.
         *
         * @param msg - The message object
         *
         * @memberof AxonClient
         */
        public sendFullHelp(msg: LibMessage, guildConfig?: GuildConfig): Promise<void>;
        /**
         * Register a guild prefix.
         * Shortcut to guildConfig.registerPrefix()
         *
         * @param gID - The guild ID
         * @param prefixArr - The array of prefixes
         * @returns The guild Schema from the DB / Error if error
         *
         * @memberof AxonClient
         */
        public registerGuildPrefixes(gID: string, prefixArr: string[] ): Promise<GuildConfig>;
        /**
         * Custom toString method.
         *
         * @memberof AxonClient
         */
        toString(): string;
        /**
         * Custom ToJSON method.
         * (Based of Eris')
         *
         * @returns JSON-like Object
         * @memberof AxonClient
         */
        toJSON(): object;

        // events
        on(event: 'debug', listener: (debugMessage: string) => void): this;
        on(event: 'commandExecution', listener: (status: boolean, commandFullLabel: string, data: { msg: LibMessage; command: Command; guildConfig: GuildConfig; context: CommandContext;} ) => void): this;
        on(event: 'commandError', listener: (commandFullLabel: string, data: { msg: LibMessage; command: Command; guildConfig: GuildConfig; error: AxonCommandError; } ) => void): this;
        on(event: 'listenerExecution', listener: (status: boolean, eventName: string, listenerName: string, data: { listener: Listener; guildConfig: GuildConfig; } ) => void): this;
        on(event: 'listenerError', listener: (eventName: string, listenerName: string, data: { listener: Listener; guildConfig: GuildConfig; error: Error; } ) => void): this;
    }
    
    /**
     * Static class
     * Select and instantiate dependencies.
     *
     * @abstract
     * @static
     * @class ASelector
     */
    abstract class ASelector {
        constructor();
        static select(...args: any[] ): any; // Not Implemented
    }

    /**
     * Database Selector
     * Use require to dynamically load a Database Provider depending on installed dependencies.
     *
     * @author KhaaZ
     *
     * @class DBSelector
     * @extends ASelector
     */
    export class DBSelector extends ASelector {
        /**
         * Select the DB to use
         * @param axonClient AxonClient
         * @param axonOptions AxonOptions
         */
        select(axonClient: AxonClient, axonOptions: AxonOptions): InMemoryProvider | JsonProvider | MongoProvider;
    }

    /**
     * Holds all messages.
     * Used as an interface to get the message in the correct lang and parse arguments from the message.
     *
     * @author KhaaZ
     *
     * @class MessageManager
     */
    class MessageManager {
        private _axon: AxonClient;
        /** All messages (all langs) */
        private _messages: Languages;
        public translation: TranslationManager;
        public parser: MessageParser;

        /**
         * Creates an instance of MessageManager.
         * Dynamically create one method for each message so we can use <this>.MESSAGE_CONSTANT() directly. It will actually call the get method.
         *
         * @memberof MessageManager
         */
        constructor(axonClient: AxonClient, messages: Languages, baseLang: string)

        /**
         * Returns all messages (all langs)
         *
         * @readonly
         * @memberof MessageManager
         */
        readonly messages: Languages;
        /**
         * All message from the given lang (or default lang)
         *
         * @returns Object with all messages
         * @memberof MessageManager
         */
        public getMessages(lang?: string): AxonLanguageResponse;
        /**
         * The message in the given lang (or default lang)
         *
         * @returns The message
         * @memberof MessageManager
         */
        public getMessage(message: string, lang?: string): string;
        /**
         * Get the message in the correct lang, parsed to replace {{key}} with the correct argument
         *
         * @returns The actual message
         * @memberof MessageManager
         */
        public get(message: string, args: AxonLanguageResponse, lang: string): string;
    }
    
    /**
     * Parse a message and replace custom variable with arguments
     *
     * @author KhaaZ
     *
     * @class MessageParser
     */
    class MessageParser {
        public match: RegExp;
        constructor();
        /**
         * Generator function that will match all occurrence of the regex and yield a Match structure
         *
         * @generator
         * @yields Match
         * @memberof MessageParser
         */
        public matchAll(message: string): Generator<RegExpExecArray, void, unknown>;
        /**
         * Parse the message by replacing the dynamic content.
         *
         * @param args - Custom object with all arguments that needs to be inserted in the string
         * @returns - The Parsed message
         * @memberof MessageParser
         */
        public parse(message: string, args: AxonLanguageResponse): string;
        /**
         * Same as above but arguments are unnamed and passed as parameters instead of inside one object.
         *
         * @returns The Parsed message
         * @memberof MessageParser
         */
        public parse2(message: string, ...args: string[] ): string;
    }

    /**
     * Class dedicated to manage translations.
     * Holds all translations and get the message for the default lang or the specified lang.
     *
     * @author KhaaZ
     *
     * @class TranslationManager
     */
    class TranslationManager {
        private _manager: MessageManager;
        /** The default lang */
        public lang: string;
        /**
         * Creates an instance of TranslationManager.
         * @memberof TranslationManager
         */
        constructor(manager: MessageManager, lang: string);

        /**
         * Returns all messages (all langs)
         *
         * @readonly
         * @memberof TranslationManager
         */
        readonly messages: Languages;
        /**
         * Return all messages for the specified lang or the default lang if no specified lang.
         *
         * @memberof TranslationManager
         */
        public getMessages(lang: string): AxonLanguageResponse;
        /**
         * Return a specified message for the specified lang or the default lang if no specified lang
         *
         * @memberof TranslationManager
         */
        public getMessage(message: string, lang: string): string;
    }

    /**
     * Abstract Logger, based to create all loggers used in AxonCore.
     *
     * @author KhaaZ
     *
     * @abstract
     * @class ALogger
     */
    class ALogger {
        /**
         * Can be Console, Winston or Signale. Chalk will go as Console
         */
        public out: any;
        /**
         * Creates an instance of ALogger
         * @param out Can be Console, Winston or Signale. Chalk will go as Console
         * @memberof ALogger
         */
        constructor(out: any);
        /**
         * Major - Critical fault
         * Crashing bugs, unexpected errors...
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public fatal(input: string, opt?: Context): void;
        /**
         * Major - critical error
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public error(input: string, opt?: Context): void;
        /**
         * Warns - expected errors
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public warn(input: string, opt?: Context): void;
        /**
         * Eval - Debugging logs
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public debug(input: string, opt?: Context): void;
        /**
         * Important information
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public notice(input: string, opt?: Context): void;
        /**
         * Default information
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public info(input: string, opt?: Context): void;
        /**
         * Other Logging - executed commands, etc...
         *
         * @param opt - context object
         * @memberof ALogger
         */
        public verbose(input: string, opt?: Context): void;
        private _parseTime(): string;
    }

    // I won't include class extensions for Winston for now

    /**
     * Logger with timestamps, custom methods and terminal colors with Chalk.
     *
     * @author KhaaZ
     *
     * @class ChalkLogger
     * @extends ALogger
     */
    export class ChalkLogger extends ALogger {
        /** Console */
        public out: Console;
    }

    /**
     * Default Logger with timestamps and custom methods. Doesn't use any dependencies.
     *
     * @author KhaaZ
     *
     * @class DefLogger
     * @extends ALogger
     */
    export class DefLogger extends ALogger {
        /** Console */
        public out: Console;
    }

    /**
     * A different Logger that uses Signale to format console output. See DefLogger for documentation.
     * https://github.com/klauscfhq/signale
     *
     * @author KhaaZ, Eleos
     *
     * @class SignaleLogger
     * @extends ALogger
     */
    export class SignaleLogger extends ALogger {
        /** Signale */
        public out: Signale;
    }

    /**
     * Construct a context object to use as a string when logging.
     *
     * @author KhaaZ
     * @class Context
     */
    class Context {
        public guild: string;
        public cmd: string;
        public user: string;

        /**
         * Creates an instance of Context.
         * @memberof Context
         */
        constructor(guild: string | LibGuild, cmd: string, user: LibUser | string);

        /**
         * @static
         * @returns A new instance of Context
         * @memberof Context
         */
        static from(ctx?: { guild: string | LibGuild; cmd: string; user: string | LibUser; } ): Context;
        public get(): string;
    }

    /**
     * Logger Handler
     * Use require to dynamically load a Logger depending on installed dependencies.
     *
     * @author Eleos, KhaaZ
     *
     * @class LoggerSelector
     * @extends ASelector
     */
    export class LoggerSelector extends ASelector {
        public select(axonConfig: AOptionsSettings): ALogger;
        static testLogger(Logger: ALogger): void;
    }

    /**
     * Class responsible to call the correct command and correct execution flow when needed.
     * Dispatch to the correct command on message create event.
     * Handles prefix resolving and command resolving.
     *
     * @author KhaaZ
     *
     * @class CommandDispatcher
     */
    class CommandDispatcher {
        public mentionFormatter: RegExp;
        private _axon: AxonClient;
        /**
         * Creates an instance of CommandDispatcher.
         *
         * @memberof CommandDispatcher
         */
        constructor(axon: AxonClient);
        /**
         * Returns the LibraryInterface instance
         *
         * @readonly
         * @memberof CommandDispatcher
         */
        readonly library: LibraryInterface;
        /**
         * Dispatches the messageCreate event to:
         * - end of execution if:
         *      - no prefix
         *      - no command
         *      - no permissions
         * - command execution with different execution flow:
         *      - Owner execution
         *      - Admin execution
         *      - Regular execution
         *      - DM execution
         *
         * @param msg - Message Object from Eris
         * @memberof CommandDispatcher
         */
        public dispatch(msg: LibMessage): Promise<void>;
        /**
         * Give the execution type: Owner or Admin execution.
         * It uses the global admin and owner prefixes and checks for the BotStaff rank of the caller.
         *
         * @memberof CommandDispatcher
         */
        public getExecutionType(msg: LibMessage): { isAdmin: boolean; isOwner: boolean; }
        /**
         * Resolves the prefix for the guild of the message.
         * Will resolve the owner or admin prefix if it's an owner or admin execution.
         * It will otherwise regularly resolve the prefix for this particular guild.
         *
         * @param sg - The message object
         * @param guildConfig - The guildConfig Object
         * @param isAdmin - Whether admin prefix was used
         * @param isOwner - Whether owner prefix was used
         * @returns {String?} The prefix if found / Undefined if not
         * @memberof CommandDispatcher
         */
        public resolvePrefix(msg: LibMessage, guildConfig: GuildConfig, isAdmin?: boolean, isOwner?: boolean): string;
        /**
         * Resolves the prefix for the guild of the message.
         * If the message starts with one of the guild prefixes it returns the prefix, otherwise it returns undefined.
         * Global prefixes will only take over if no prefix are specified in this guild.
         *
         * @param msg - The message object
         * @param guildConfig - The guildConfig Object
         * @returns The prefix if found / Undefined if not
         * @memberof CommandDispatcher
         */
        public resolveGuildPrefix(msg: LibMessage, guildConfig: GuildConfig): string;
    }

    /**
     * Abstract class for handlers.
     * Events root handlers.
     *
     * @author KhaaZ
     *
     * @abstract
     * @class AHandler
     */
    class AHandler {
        private _axon: AxonClient;
        public name: string;
        private _listeners: Listener[];
        /**
         * Creates an instance of AHandler.
         *
         * @memberof AHandler
         */
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        /**
         * Returns the sizeof an Handler (number of listeners)
         *
         * @readonly
         * @memberof AHandler
         */
        public size: number;
        private _handle(...args: any[] ): Promise<void>;
        /**
         * Takes the event parameters as arguments and returns the guild ID if possible or null.
         *
         * @param args - All parameters for this event
         * @returns The guild ID
         * @memberof AHandler
         */
        public handle(...args: any[] ): string | null;
    }

    /**
     * Abstract class for loaders.
     * Module Loader, Command Loader, Listener Loader
     *
     * @author KhaaZ
     *
     * @abstract
     * @class ALoader
     */
    class ALoader<T> {
        /** The object in which we are loading items */
        public loadIn: T;
        /**
         * Creates an instance of ALoader.
         *
         * @memberof ALoader
         */
        constructor(loadIn: T);
        /**
         * Loads the object given in parameter.
         *
         * @param toLoad - The Object to load
         * @returns Whether it worked
         * @memberof ALoader
         */
        load(toLoad: any): boolean; // Not implemented
        /**
         * Loads all objects given in parameters.
         *
         * @param toLoad - All Objects to load
         * @returns Whether it worked
         * @memberof ALoader
         */
        loadAll(toLoad: any): boolean; // Not implemented
        /**
         * Unload the object given in parameter.
         *
         * @returns Whether it worked
         * @memberof ALoader
         */
        unload(toUnload: any): boolean; // Not implemented
    }

    /**
     * Loads the AxonClient.
     *
     * @author KhaaZ
     *
     * @static
     * @class ClientInitialiser
     */
    export class ClientInitialiser {
        /**
         * Initialise AxonStaff from the configuration file.
         *
         * @static
         * @returns Axon staff newly created.
         * @memberof ClientInitialiser
         */
        static initStaff(staffConfig: { [key: string]: {id: string; name: string;}[];}, logger: ALogger): { [key: string]: string[]; };
        /**
         * Initialise AxonConfig from the DB.
         * Either create or fetch it.
         *
         * This method needs to directly add the axonConfig to axonClient.
         * Otherwise the return value is a promise.
         *
         * @static
         * @memberof ClientInitialiser
         */
        initAxon(axon: AxonClient): Promise<void>;
    }

    /**
     * Load commands in a Module.
     * Validate the command validity entirely.
     *
     * @author KhaaZ
     *
     * @class CommandLoader
     * @extends ALoader<Command>
     */
    class CommandLoader extends ALoader<Command> {
        private _module: Module;
        /**
         * Creates an instance of CommandLoader
         * @param module
         */
        constructor(module: Module);
        /**
         * Returns the AxonClient instance
         *
         * @readonly
         * @memberof CommandLoader
         */
        readonly axon: AxonClient;
        /**
         * Returns the Logger instance
         *
         * @readonly
         * @memberof CommandLoader
         */
        readonly logger: ALogger;
        /**
         * Load one command instance in the module.
         * Validate and correct the command before registering it.
         *
         * @param command - The command to load
         * @param parent - The optional parent command
         * @memberof CommandLoader
         */
        load(command: Command, parent?: Command): boolean;
        /**
         * Load all commands in the module.
         * Instantiate all commands.
         *
         * @memberof CommandLoader
         */
        loadAll(commands: { [key: string]: Command; } ): boolean;
        /**
         * Init and construct/instance all subcommands of the given parent command
         *
         * @param parentCommand - The command Object
         * @memberof Command
         */
        loadSubCommands(parentCommand: Command): void;
        /**
         * Unload a Command from the client
         *
         * @param label - The Command label to unload
         * @returns Whether it worked
         * @memberof CommandLoader
         */
        unload(label: string): true;
        /**
         * Register a Command. Register its subcommands if it has any.
         *
         * @param command - Command object
         * @memberof CommandLoader
         */
        registerCommand(command: Command): void;
        /**
         * Register a SubCommand.Register its subcommands if it has any
         *
         * @param command - The subcommand to register
         * @param parent - The parent command
         * @memberof CommandLoader
         */
        registerSubCommand(command: Command, parent: Command): void;
        /**
         * Remove a command from the module and the global cache.
         *
         * @param fullLabel - Full command label
         * @returns True if successful / Error otherwise
         * @memberof CommandLoader
         */
        unregisterCommand(fullLabel: string): boolean;
        /**
         * Remove a subcommand from a command
         *
         * @param command - The parent Command
         * @param subCommand - The Subcommand to unregister
         * @memberof CommandLoader
         */
        unregisterSubCommand(command: Command, subCommand: Command): void;
    }

    /**
     * Load listeners in AxonClient.
     * Validate the listener entirely.
     *
     * @class ListenerLoader
     * @extends ALoader<AxonClient>
     */
    class ListenerLoader extends ALoader<AxonClient> {
        private _module: Module;
        /**
         * Creates an instance of ListenerLoader
         */
        constructor(module: Module);
        /**
         * Returns the Module instance
         *
         * @readonly
         * @memberof ListenerLoader
         */
        readonly axon: AxonClient;
        /**
         * Returns the Logger instance
         *
         * @readonly
         * @memberof ListenerLoader
         */
        readonly logger: ALogger;
        /**
         * Load one event instance in the module.
         * Validate and correct the event before registering it.
         *
         * @param listener - The event to load
         * @memberof ListenerLoader
         */
        load(listener: Listener): boolean;
        /**
         * Load all events in the module.
         * Instantiate all events.
         *
         * @memberof ListenerLoader
         */
        loadAll(listeners: { [key: string]: Listener; } ): boolean;
        /**
         * Unload a Listener from the client
         *
         * @param label - The Listener label to unload
         * @returns Whether it worked
         * @memberof ListenerLoader
         */
        unload(label: string): true;
    }

    /**
     * Load modules in AxonClient.
     * Validate the module validity entirely.
     *
     * @author KhaaZ
     *
     * @class ModuleLoader
     * @extends ALoader<AxonClient>
     */
    class ModuleLoader extends ALoader<AxonClient> {
        /**
         * Creates an instance of ModuleLoader
         * @param {AxonClient} axonClient
         */
        constructor(axonClient: AxonClient);
        /**
         * Returns the AxonClient instance
         *
         * @readonly
         * @memberof ModuleLoader
         */
        readonly axon: AxonClient;
        /**
         * Returns the Logger instance
         *
         * @readonly
         * @memberof ModuleLoader
         */
        readonly logger: ALogger;
        /**
         * Load one module instance in the client.
         * Validate and correct the module before registering it.
         *
         * @parammodule - The module to load
         * @memberof ModuleLoader
         */
        load(module: Module): boolean;
        /**
         * Load all modules in the client.
         * Instantiate all modules.
         *
         * @memberof ModuleLoader
         */
        loadAll(modules: { [key: string]: Module; } ): boolean;
        /**
         * Unload a Module from the client
         *
         * @param label - The Module label to unload
         * @returns Whether it worked
         * @memberof ModuleLoader
         */
        unload(label: string): true;
    }

    /**
     * Abstract class to hold and manage a set of items.
     *
     * @author KhaaZ
     *
     * @abstract
     * @class ARegistry
     */
    class ARegistry<T> {
        /** The AxonClient */
        private _axon: AxonClient;
        /** The collection of items hold by the registry */
        public registry: Collection<T>;
        /**
         * Creates an instance of ARegistry.
         *
         * @param axon - The AxonClient
         * @param base - The base definition to use for the registry
         * @memberof ARegistry
         */
        constructor(axon: AxonClient, base: T);
        /**
         * Get the AxonClient
         *
         * @readonly
         * @memberof ARegistry
         */
        readonly axon: AxonClient;
        /**
         * Get the size of the registry
         *
         * @readonly
         * @memberof ARegistry
         */
        readonly size: number;
        /**
         * Check whether the item exist in the registry
         *
         * @returns Whether the item exists
         * @memberof ARegistry
         */
        has(key: string): boolean;
        /**
         * Get an item from the registry
         *
         * @returns The item
         * @memberof ARegistry
         */
        get(key: string): T | null;
        /**
         * Get the registry
         *
         * @returns The current registry
         * @memberof ARegistry
         */
        getAll(): Collection<T>;
        /**
         * Add an item to the registry
         *
         * @returns The registry
         * @memberof ARegistry
         */
        add(key: string, value: T): Collection<T>;
        /**
         * Remove an item from the registry
         *
         * @returns {Boolean} - Whether it could remove the item or not
         * @memberof ARegistry
         */
        remove(key: string): boolean;
        public [Symbol.iterator](): [string|number, T][];
        /**
         * Register correctly an item in the registry.
         *
         * @memberof ARegistry
         */
        public register(key: string, value: T): any; // Not implemented
        /**
         * Unregister correctly an item from the registry.
         *
         * @memberof ARegistry
         */
        public unregister(key: string, value: T): any; // Not implemented
    }

    /**
     * Registry that holds all Commands.
     *
     * @author KhaaZ
     *
     * @class CommandRegistry
     * @extends ARegistry<Command>
     */
    class CommandRegistry extends ARegistry<Command> {
        /** All commands aliases. */
        public aliases: Map<string | number, string>;
        /**
         * Creates an instance of CommandRegistry
         */
        constructor(axon: AxonClient);
        /**
         * Get a command with its label
         *
         * @param cmd - The command label
         * @returns The found command
         * @memberof CommandRegistry
         */
        get(cmd: string): Command | null;
        /**
         * Get a command/subcommand with the given full label.
         *
         * @param splitLabel - Full command (or subcommand) label
         * @memberof CommandRegistry
         */
        getFull(splitLabel: string[] ): Command | null;
        /**
         * Register a Command inside the CommandRegistry
         *
         * @param label - The command label
         * @param command - The command object
         * @memberof CommandRegistry
         */
        register(label: string, command: Command): void;
        /**
         * Unregister a Command from the CommandRegistry
         *
         * @param label - The command label
         * @param command - The command object
         * @memberof CommandRegistry
         */
        unregister(label: string, command?: Command): void;
        /**
         * Resolves the command Object. Only resolves the command if it's not globally disabled.
         * Doesn't resolve the command if the command is guild disabled.
         *
         * @param label - The command label/ command alias
         * @param args - Array of arguments
         * @param guildConfig - GuildConfig
         * @returns The command object or null if the command doesn't exist or is not enabled
         * @memberof CommandRegistry
         */
        resolve(label: string, args: string[], guildConfig?: GuildConfig): Command | null;
    }

    /**
     * Handles GuildConfigs cache.
     * Can be extended to a redis or memcached cache easily for instance.
     *
     * @author KhaaZ
     *
     * @class GuildConfigsCache
     */
    class GuildConfigCache {
        private _axon: AxonClient;
        public guildConfigs: LRUCache<GuildConfig>;
        /**
         * Creates an instance of GuildConfigsCache.
         *
         * @memberof GuildConfigsCache
         */
        constructor(axonClient: AxonClient);
        /**
         * Get a GuildConfig from the guild ID.
         *
         * @memberof GuildConfigsCache
         */
        get(key: string): GuildConfig;
        /**
         * Set a GuildConfig with the Guild ID as key.
         *
         * @memberof GuildConfigsCache
         */
        set(key: string, value: GuildConfig): void;
        public [Symbol.iterator](): [string|number, GuildConfig];
        /**
         * Get a GuildConfig from the cache or from the DB if not in the cache.
         *
         * @memberof GuildConfigsCache
         */
        public getOrFetch(key: string): Promise<GuildConfig|null>;
        /**
         * Fetches and resolves the guild config of the given ID from the DB, creates a schema if none was found or there was an error.
         *
         * @param gID - The guild ID to fetch the DB
         * @returns Guild schema from the DB / Error
         * @memberof GuildConfigsCache
         */
        public fetchGuildConf(gID: string): Promise<GuildConfig|null>;
    }

    /**
     * Registry that holds all Commands.
     *
     * @author KhaaZ
     *
     * @class ListenerRegistry
     * @extends ARegistry<Listener>
     */
    class ListenerRegistry extends ARegistry<Listener> {
        /**
         * Creates an instance of ListenerRegistry
         */
        constructor(axon: AxonClient);
        /**
         * Register a Listener inside the ListenerRegistry
         *
         * @param label - The listener label
         * @param listener - The listener object
         * @memberof ListenerRegistry
         */
        register(label: string, listener: Listener): void;
        /**
         * Unregister a Listener from the ListenerRegistry
         *
         * @param label - The listener label
         * @param listener - The listener object
         * @memberof ListenerRegistry
         */
        unregister(label: string, listener?: Listener): void;
    }

    /**
     * Registry that holds all Modules.
     *
     * @author KhaaZ
     *
     * @class ModuleRegistry
     * @extends ARegistry<Module>
     */
    class ModuleRegistry extends ARegistry<Module> {
        /**
         * Creates an instance of ModuleRegistry
         */
        constructor(axon: AxonClient);
        /**
         * Register a Module inside the ModuleRegistry
         *
         * @param label - The module label
         * @param module - The module object
         *
         * @memberof ModuleRegistry
         */
        register(label: string, module: Module): void;
        /**
         * Unregister a Module from the ModuleRegistry
         *
         * @param label - The module label
         * @param module - The module object
         * @memberof ModuleRegistry
         */
        unregister(label: string, module?: Module): void;
    }

    /**
     * Static Class that makes sure objects are formatted correctly.
     *
     * @author KhaaZ
     *
     * @class Validator
     */
    export class Validator {
        /**
         * @returns Whether the module is considered valid or not
         */
        static validModule(module: Module): boolean;
        /**
         * Valid that a command uses the correct format.
         * Will automatically correct the command by using default for some part
         *
         * @static
         * @returns Whether the command is considered valid or not
         * @memberof Validator
         */
        static validCommand(command: Command): boolean;
        /**
         * Check if the permissions names are valid
         *
         * @param PERMISSIONS - Array of library permissions
         * @param perm - Name of a permission
         * @returns  True if yes / False if the name doesn't exist
         * @memberof Module
         */
        static checkValidPermissionName(PERMISSIONS: string[], perm: string): boolean;
        /**
         * Check whether a message content / embed comply with discord limits.
         *
         * @static
         * @returns Returns true if the message is valid, otherwise throw an AxonError
         * @memberof Validator
         */
        static checkMessageValidity(content: LibMessage | string): boolean;
    }

    enum DISCORD_GATEWAY_EVENTS {
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
    }

    enum DISCORD_PERMISSIONS {
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
        'VIEW_GUILD_ANALYTICS',
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
    }

    // There's some inconsistency with this
    enum PERMISSIONS_NUMBERS {
        CREATE_INSTANT_INVITE = 1,
        KICK_MEMBERS = 2,
        BAN_MEMBERS = 4,
        ADMINISTRATOR = 8,
        MANAGE_CHANNELS = 16,
        MANAGE_GUILD = 32,
        ADD_REACTIONS = 64,
        VIEW_AUDIT_LOG = 128,
        PRIORITY_SPEAKER = 256,
        STREAM = 512,
        VIEW_CHANNEL = 1024,
        SEND_MESSAGES = 2048,
        SEND_TTS_MESSAGES = 4096,
        MANAGE_MESSAGES = 8192,
        EMBED_LINKS = 16384,
        ATTACH_FILES = 32768,
        READ_MESSAGE_HISTORY = 65536,
        MENTION_EVERYONE = 131072,
        USE_EXTERNAL_EMOJIS = 262144,
        VIEW_GUILD_ANALYTICS = 524288,
        CONNECT = 1048576,
        SPEAK = 2097152,
        MUTE_MEMBERS = 4194304,
        DEAFEN_MEMBERS = 8388608,
        MOVE_MEMBERS = 16777216,
        USE_VAD = 33554432,
        CHANGE_NICKNAME = 67108864,
        MANAGE_NICKNAMES = 134217728,
        MANAGE_ROLES = 268435456,
        MANAGE_WEBHOOKS = 536870912,
        MANAGE_EMOJIS = 1073741824,
       
        ALL = 2147483647,
    }

    enum EMBED_LIMITS {
        LIMIT_CONTENT = 2000,
        LIMIT_TOTAL_EMBED = 6000,
        LIMIT_TITLE = 256,
        LIMIT_DESCRIPTION = 2048,
        NUMBER_FIELDS = 25,
        LIMIT_FIELD_NAME = 256,
        LIMIT_FIELD_VALUE = 1024,
        LIMIT_FOOTER_TEXT = 2048,
        LIMIT_AUTHOR_NAME = 256,
    }

    enum CHANNEL_TYPES {
        GUILD_TEXT = 0,
        DM = 1,
        GUILD_VOICE = 2,
        GROUP_DM = 3,
        GUILD_CATEGORY = 4,
        GUILD_NEWS = 5,
        GUILD_STORE = 6,
    }

    enum MESSAGE_TYPES {
        DEFAULT = 0,
        RECIPIENT_ADD = 1,
        RECIPIENT_REMOVE = 2,
        CALL = 3,
        CHANNEL_NAME_CHANGE = 4,
        CHANNEL_ICON_CHANGE = 5,
        CHANNEL_PINNED_MESSAGE = 6,
        GUILD_MEMBER_JOIN = 7,
        USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    }

    enum CLIENT_STATUS_TYPES {
        PLAYING = 0,
        STREAMING = 1,
        LISTENING = 2,
        WATCHING = 3,
        CUSTOM = 4,
    }

    const DiscordEnums: {
        DISCORD_GATEWAY_EVENTS: DISCORD_GATEWAY_EVENTS;
        DISCORD_PERMISSIONS: DISCORD_PERMISSIONS;
        PERMISSION_NUMBERS: PERMISSIONS_NUMBERS;
        EMBED_LIMITS: EMBED_LIMITS;
        CHANNEL_TYPES: CHANNEL_TYPES;
        MESSAGE_TYPES: MESSAGE_TYPES;
        CLIENT_STATUS_TYPES: CLIENT_STATUS_TYPES;
    };

    /**
     * This default Queue works in a synchronous fashion.
     * It will execute all synchronous functions sequentially.
     * Any error will be caught and unless specified otherwise won't break the queue execution.
     * The queue can be auto executed on add or the execution can be delayed.
     *
     * @author KhaaZ
     *
     * @class Queue
     */
    class Queue {
        private _functions: Function[];
        private _running: boolean;
        /** Whether to stop the queue execution on error. */
        public stopOnError: boolean;
        /**
         * Creates an instance of Queue.
         *
         * @param stopOnError
         * @memberof Queue
         */
        constructor(stopOnError?: boolean);
        /**
         * Execute the Queue
         * @memberof Queue
         */
        public exec(): void;
        /**
         * Adds a function to the queue.
         * Automatically will wrap the function in a closure to keep the function context.
         *
         * @param func - The function to run
         * @param toExec - Whether to auto exec the queue on add or not.
         * @param args - All arguments the function needs
         * @memberof Queue
         */
        public add(func: Function, toExec?: boolean, ...args: any[] ): void;
        public createClosure(fn: Function, ...args: any[] ): unknown;
    }

    /**
     * This data structure is a queue that will run every function one by one sequentially.
     * It will run indifferently synchronous and asynchronous functions. Making sure the previous one is over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
     * A Promise is returned on add. This promise will resolve or reject when the function is ran.
     *
     * The queue can be auto executed on add or the execution can be delayed.
     *
     * @author KhaaZ
     *
     * @class AsyncQueue
     * @extends Queue
     */
    class AsyncQueue extends Queue {
        public exec(): Promise<void>;
        /**
         * Adds a function to the queue.
         * Automatically will wrap the function in a closure to keep the function context.
         *
         * @param func - The function to run
         * @param toExec - Whether to auto exec the queue on add or not.
         * @param args - All arguments the function needs
         * @memberof AsyncQueue
         */
        public add(func: Function, toExec?: boolean, ...args: any[] ): Promise<any>;
        public createClosure(fn: Function, resolve: (value: unknown) => void, reject: (reason: Error) => void, ...args: any[] ): Promise<Function>;
    }

    /**
     * This data structure is a queue that will run every function one by one sequentially.
     * It will run indifferently synchronous and asynchronous functions. Making sure the previous function is over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
     * It has no return value, it will just run the function added sometimes in the future.
     *
     * The queue can be auto executed on add or the execution can be delayed.
     *
     * @KhaaZ
     *
     * @class AutoQueue
     * @extends Queue
     */
    export class AutoQueue extends Queue {
        exec(): Promise<void>;
    }

    class Node<T> {
        public key: string;
        public value: T;
        public next: Node<T>;
        public prev: Node<T>;
        /**
         * Creates an instance of Node
         */
        constructor(key: string, value: T, next?: Node<T>, prev?: Node<T>)
    }

    /**
     * Least Recently Used cache implementation.
     * Read and Write operations are in O(1)
     *
     * https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
     *
     * @author KhaaZ
     *
     * @class LRUCache
     */
    class LRUCache<T> {
        /** Maximum size of the LRU */
        public limit: number;
        /** Current size of the LRU */
        public size: number;
        public head: Node<T> | null;
        public queue: Node<T> | null;
        /** The Collection holding the cache (private, handled by the LRU structure) */
        private _cache: Collection<T>;
        /**
         * Creates an instance of LRUCache.
         *
         * @param limit - Max number of element in the Collection
         * @param options - Options used to construct the Collection
         * @memberof LRUCache
         */
        constructor(limit: number, options: { base?: new (...args: any[] ) => T; iterable?: {[key: string]: T;} | [string, T][]; } );
        /**
         * Add a value in the LRU cache.
         *
         * @memberof LRUCache
         */
        public set(key: string, value: T): void;
        /**
         * Retrieve a value from the LRU cache
         *
         * @returns Value
         * @memberof LRUCache
         */
        public get(key: string): T | null;
        /**
         * Remove an element from the LRUCache
         *
         * @memberof LRUCache
         */
        public remove(key: string): void;
        /**
         * Empty the LRUCache entirely
         * @memberof LRUCache
         */
        public clear(): void;
        private _ensureLimit(): void;
        /**
         * Execute a function against every element of the Collection
         *
         * @memberof LRUCache
         */
        public forEach<K>(fn: (value: T, key: K, map: Map<K, T>) => void): void;
        /**
         * Return the first object to make the function evaluate true
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns The first matching object, or null if no match
         * @memberof LRUCache
         */
        public find(func: (i: T) => boolean): T;
        /**
         * Return an array with the results of applying the given function to each element
         *
         * @param func - A function that takes an object and returns something
         * @returns An array containing the results
         * @memberof LRUCache
         */
        public map<R>(func: (i: T) => R): R[];
        /**
         * Return all the objects that make the function evaluate true
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns An array containing all the objects that matched
         * @memberof LRUCache
         */
        public filter(func: (i: T) => boolean): T[];
        /**
         * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns An array containing all the objects that matched
         * @memberof LRUCache
         */
        public some(func: (i: T) => boolean): boolean;
        /**
         * Test if all elements pass the test implemented by the provided function. Returns true if yes, or false if not.
         *
         * @param func - A function that takes an object and returns true if it matches
         * @returns An array containing all the objects that matched
         * @memberof LRUCache
         */
        public every(func: (i: T) => boolean): boolean;
        public [Symbol.iterator](): [string|number, T][];
    }

    // ReactionCollector file is empty

    /**
     * Library Handler
     * Use eris or discord.js.
     *
     * @author KhaaZ
     *
     * @class LibrarySelector
     * @extends ASelector
     */
    export class LibrarySelector extends ASelector {
        static select(axon: AxonClient, axonOptions: AxonOptions): ErisInterface | DjsInterface;
    }

    class Channel {
        public lib: LibraryInterface;
        /**
         * Creates an instance of Channel
         * @memberof Channel
         */
        constructor(lib: LibraryInterface);
        /**
         * Gets the channel ID
         * @memberof Channel
         */
        public getID(channel: LibChannel): string;
        /**
         * Gets the channel name
         * @memberof Channel
         */
        public getName(channel: LibChannel): string;
        /**
         * Gets the guild the channel belongs to
         * @memberof Channel
         */
        public getGuild(channel: LibChannel): LibGuild;
        /**
         * Gets the guild ID the channel belongs to
         * @memberof Channel
         */
        public getGuildID(channel: LibChannel): string | null;
        /**
         * Gets the guild name the channel belongs to
         * @memberof Channel
         */
        public getGuildName(channel: LibChannel): string | null;
        /**
         * Whether the user has the perm in the channel
         * @memberof Channel
         */
        public hasPermission(channel: LibChannel, user: LibUser, perm: string): boolean; // Not Implemented
        /**
         * Send a message in the channel
         * @memberof Channel
         */
        public sendMessage(channel: LibChannel, content: AxonMSGCont): Promise<LibMessage | LibMessage[]>; // Not Implemented // LibMessage[] is for Discord.JS
    }

    class Client {
        public lib: LibraryInterface;
        public baseWebhookURL: 'https://discordapp.com/api/webhooks/';
        /**
         * Creates an instance of Client
         * @memberof Client
         */
        constructor(lib: LibraryInterface);
        /**
         * Bot client
         * @readonly
         * @memberof Client
         */
        readonly client: LibClient;
        /**
         * Bot user ID
         * @memberof Client
         */
        public getID(): string;
        /**
         * Bot username
         * @memberof Client
         */
        public getUsername(): string | null;
        /**
         * Bot mention
         * @memberof Client
         */
        public getMention(): string;
        /**
         * Bot avatar
         * @memberof Client
         */
        public getAvatar(): string; // Not Implemented
        /**
         * Bot user
         * @memberof Client
         */
        public getUser(): LibUser;
        /**
         * Bot guild member
         * @memberof Client
         */
        public getMember(guild: LibGuild): LibMember;
        /**
         * Connect the client to the gateway
         * @memberof Client
         */
        public connect(): Promise<void | string>;
        /**
         * Set the bot Presence
         * @memberof Client
         */
        public setPresence(status: string, game: object): Promise<LibUser | void>;
        /**
         * Execute a webhook and send a message
         * @memberof Client
         */
        public triggerWebhook(id: string, token: string, data: ErisWebhookContent | DjsWebhookContent): Promise<WebhookResponse | null>;
        private _request(url: string, params: RequestOptions, postData: any): any;
    }

    class Guild {
        public lib: LibraryInterface
        /**
         * Creates an instance of Guild
         * @memberof Guild
         */
        constructor(lib: LibraryInterface);
        /**
         * Guild ID
         * @memberof Guild
         */
        getID(guild: LibGuild): string;
        /**
         * Guild name
         * @memberof Guild
         */
        getName(guild: LibGuild): string;
        /**
         * Guild owner ID
         * @memberof Guild
         */
        getOwnerID(guild: LibGuild): string;
        /**
         * Guild member
         * @memberof Guild
         */
        getMember(guild: LibGuild, userID: string): LibMember;
    }

    class Member {
        public lib: LibraryInterface;
        /**
         * Creates an instance of Member
         * @memberof Member
         */
        constructor(lib: LibraryInterface);
        /**
         * Guild member ID
         * @memberof Member
         */
        getID(member: LibMember): string;
        /**
         * Returns Roles ids
         *
         * @returns Array of roles IDs
         * @memberof Member
         */
        getRoles(member: LibMember): string[]; // Not Implemented
        /**
         * Returns Roles object
         *
         * @returns Array of Roles object
         * @memberof Member
         */
        getRolesObject(member: LibMember): LibRole[]; // Not Implemented
        /**
         * Whether the member has this permission or not
         * @memberof Member
         */
        hasPermission(member: LibMember, permission: string): boolean; // Not Implemented
    }

    class Message {
        public lib: LibraryInterface;
        /**
         * Creates an instance of Message
         * @memberof Message
         */
        constructor(lib: LibraryInterface);
        /**
         * Message ID
         * @memberof Message
         */
        getID(message: LibMessage): string;
        /**
         * Message content
         * @memberof Message
         */
        getContent(message: LibMessage): string;
        /**
         * Sets the message content
         * @param content Updated message content
         * @memberof Message
         */
        setContent(message: LibMessage, content: string): void;
        /**
         * Message author
         * @memberof Message
         */
        getAuthor(message: LibMessage): LibUser;
        /**
         * Message author ID
         * @memberof Message
         */
        getAuthorID(message: LibMessage): string;
        /**
         * Member who sent the message
         * @memberof Message
         */
        getMember(message: LibMessage): LibMember;
        /**
         * Member ID who sent the message
         * @memberof Message
         */
        getMemberID(message: LibMessage): string;
        /**
         * Message channel
         * @memberof Message
         */
        getChannel(message: LibMessage): LibTextableChannel;
        /**
         * Message channel ID
         * @memberof Message
         */
        getChannelID(message: LibMessage): string;
        /**
         * Message channel name
         * @memberof Message
         */
        getChannelName(message: LibMessage): string;
        /**
         * Guild the message belongs to
         * @memberof Message
         */
        getGuild(message: LibMessage): LibGuild;
        /**
         * Guild ID the message belongs to
         * @memberof Message
         */
        getGuildID(message: LibMessage): string;
        /**
         * Guild name the message belongs to
         * @memberof Message
         */
        getGuildName(message: LibMessage): string;
        /**
         * Delete the message
         * @memberof Message
         */
        delete(message: LibMessage): Promise<LibMessage | void>;
        /**
         * Edit the message
         * @memberof Message
         */
        edit(message: LibMessage, content: AxonMSGCont): Promise<LibMessage>;
    }

    /**
     * Static Resolver class for AxonCore
     *
     * @author KhaaZ
     *
     * @static
     * @class Resolver
     */
    class Resolver {
        /**
         * Resolve a user within all the users the bot has.
         *
         * @param client - The bot client
         * @param args - Array of arguments resolved by the command.
         * @returns The user object / Null if not found / Error
         * @memberof Resolver
         */
        static user(client: LibClient, args: string[]|string): LibUser|null; // Not implemented
        /**
         * Resolve a member within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The member object / Null if not found / Error
         * @memberof Resolver
         */
        static member(guild: LibGuild, args: string[]|string): LibMember|null; // Not implemented
        /**
         * Resolve a role within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The role object / Null if not found / Error
         * @memberof Resolver
         */
        static role(guild: LibGuild, args: string[]|string): LibRole|null; // Not implemented
        /**
         * Resolve a channel within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The channel object / Null if not found / Error
         * @memberof Resolver
         */
        static channel(guild: LibGuild, args: string[]|string): LibChannel|null; // Not implemented
        /**
         * Resolve a guild within all guilds the bot is in.
         *
         * @param client - The bot client
         * @param args - Array with guild name/ID
         * @returns The guild object / Null if not found / Error
         * @memberof Resolver
         */
        static guild(client: LibClient, args: string[] ): LibGuild|null; // Not implemented
    }

    class User {
        public lib: LibraryInterface;
        /**
         * Creates an instance of User
         * @memberof User
         */
        constructor(lib: LibraryInterface);
        /**
         * User ID
         * @memberof User
         */
        getID(user: LibUser): string;
        /**
         * User's username
         * @memberof User
         */
        getUsername(user: LibUser): string;
        /**
         * User's discrim
         * @memberof User
         */
        getDiscriminator(user: LibUser): string;
        /**
         * User's username+discrim
         * @memberof User
         */
        getTag(user: LibUser): string;
        /**
         * If user is a bot
         * @memberof User
         */
        isBot(user: LibUser): boolean;
        /**
         * Get the DM channel for this user.
         *
         * @returns The DM channel
         * @memberof User
         */
        getDM(user: LibUser): Promise<LibDMChannel>;
    }

    interface LibraryInterfaceStructs {
        User: new (...args: any[] ) => User;
        Member: new (...args: any[] ) => Member;
        Message: new (...args: any[] ) => Message;
        Channel: new (...args: any[] ) => Channel;
        Guild: new (...args: any[] ) => Guild;
        Resolver: new (...args: any[] ) => Resolver;
    }

    /**
     * Base class that handle any interaction with the library.
     *
     * @author KhaaZ
     *
     * @class LibraryInterface
     */
    class LibraryInterface {
        private _botClient: LibClient;
        public user: User;
        public member: Member;
        public message: Message;
        public channel: Channel;
        public guild: Guild;
        public resolver: Resolver;
        /**
         * Creates an instance of LibraryInterface
         * @memberof LibraryInterface
         */
        constructor(botClient: LibClient, structs: LibraryInterfaceStructs);
        /**
         * Bot client
         * @readonly
         * @memberof LibraryInterface
         */
        readonly botClient: LibClient;
        /**
         * @memberof LibraryInterface
         */
        public onMessageCreate(func: (message: LibMessage) => void): void; // Not Implemented
        /**
         * @memberof LibraryInterface
         */
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

    // Discord.JS
    enum DJS_ENUMS_EVENTS {
        RATE_LIMIT = 'rateLimit',
        READY = 'ready',
        RESUME = 'resume',
        GUILD_CREATE = 'guildCreate',
        GUILD_DELETE = 'guildDelete',
        GUILD_UPDATE = 'guildUpdate',
        GUILD_UNAVAILABLE = 'guildUnavailable',
        GUILD_AVAILABLE = 'guildAvailable',
        GUILD_MEMBER_ADD = 'guildMemberAdd',
        GUILD_MEMBER_REMOVE = 'guildMemberRemove',
        GUILD_MEMBER_UPDATE = 'guildMemberUpdate',
        GUILD_MEMBER_AVAILABLE = 'guildMemberAvailable',
        GUILD_MEMBER_SPEAKING = 'guildMemberSpeaking',
        GUILD_MEMBERS_CHUNK = 'guildMembersChunk',
        GUILD_INTEGRATIONS_UPDATE = 'guildIntegrationsUpdate',
        GUILD_ROLE_CREATE = 'roleCreate',
        GUILD_ROLE_DELETE = 'roleDelete',
        GUILD_ROLE_UPDATE = 'roleUpdate',
        GUILD_EMOJI_CREATE = 'emojiCreate',
        GUILD_EMOJI_DELETE = 'emojiDelete',
        GUILD_EMOJI_UPDATE = 'emojiUpdate',
        GUILD_BAN_ADD = 'guildBanAdd',
        GUILD_BAN_REMOVE = 'guildBanRemove',
        CHANNEL_CREATE = 'channelCreate',
        CHANNEL_DELETE = 'channelDelete',
        CHANNEL_UPDATE = 'channelUpdate',
        CHANNEL_PINS_UPDATE = 'channelPinsUpdate',
        MESSAGE_CREATE = 'message',
        MESSAGE_DELETE = 'messageDelete',
        MESSAGE_UPDATE = 'messageUpdate',
        MESSAGE_BULK_DELETE = 'messageDeleteBulk',
        MESSAGE_REACTION_ADD = 'messageReactionAdd',
        MESSAGE_REACTION_REMOVE = 'messageReactionRemove',
        MESSAGE_REACTION_REMOVE_ALL = 'messageReactionRemoveAll',
        USER_UPDATE = 'userUpdate',
        USER_NOTE_UPDATE = 'userNoteUpdate',
        USER_SETTINGS_UPDATE = 'clientUserSettingsUpdate',
        USER_GUILD_SETTINGS_UPDATE = 'clientUserGuildSettingsUpdate',
        PRESENCE_UPDATE = 'presenceUpdate',
        VOICE_STATE_UPDATE = 'voiceStateUpdate',
        TYPING_START = 'typingStart',
        TYPING_STOP = 'typingStop',
        WEBHOOKS_UPDATE = 'webhookUpdate',
        DISCONNECT = 'disconnect',
        RECONNECTING = 'reconnecting',
        ERROR = 'error',
        WARN = 'warn',
        DEBUG = 'debug',
    }
    enum DJS_ENUMS_DISCORD_LIB_PERMISSIONS {
        CREATE_INSTANT_INVITE = 'CREATE_INSTANT_INVITE',
        KICK_MEMBERS = 'KICK_MEMBERS',
        BAN_MEMBERS = 'BAN_MEMBERS',
        ADMINISTRATOR = 'ADMINISTRATOR',
        MANAGE_CHANNELS = 'MANAGE_CHANNELS',
        MANAGE_GUILD = 'MANAGE_GUILD',
        ADD_REACTIONS = 'ADD_REACTIONS',
        VIEW_AUDIT_LOG = 'VIEW_AUDIT_LOG',
        PRIORITY_SPEAKER = 'PRIORITY_SPEAKER',
        STREAM = 'STREAM',
        VIEW_CHANNEL = 'VIEW_CHANNEL',
        SEND_MESSAGES = 'SEND_MESSAGES',
        SEND_TTS_MESSAGES = 'SEND_TTS_MESSAGES',
        MANAGE_MESSAGES = 'MANAGE_MESSAGES',
        EMBED_LINKS = 'EMBED_LINKS',
        ATTACH_FILES = 'ATTACH_FILES',
        READ_MESSAGE_HISTORY = 'READ_MESSAGE_HISTORY',
        MENTION_EVERYONE = 'MENTION_EVERYONE',
        USE_EXTERNAL_EMOJIS = 'USE_EXTERNAL_EMOJIS',
        VIEW_GUILD_ANALYTICS = 'VIEW_GUILD_ANALYTICS',
        CONNECT = 'CONNECT',
        SPEAK = 'SPEAK',
        MUTE_MEMBERS = 'MUTE_MEMBERS',
        DEAFEN_MEMBERS = 'DEAFEN_MEMBERS',
        MOVE_MEMBERS = 'MOVE_MEMBERS',
        USE_VAD = 'USE_VAD',
        CHANGE_NICKNAME = 'CHANGE_NICKNAME',
        MANAGE_NICKNAMES = 'MANAGE_NICKNAMES',
        MANAGE_ROLES = 'MANAGE_ROLES',
        MANAGE_WEBHOOKS = 'MANAGE_WEBHOOKS',
        MANAGE_EMOJIS = 'MANAGE_EMOJIS',
    }
    enum DJS_ENUMS_PERMISSIONS {
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
    }

    enum DJS_ENUMS_PERMISSIONS_NAMES {
        CREATE_INSTANT_INVITE = 'Create Instant Invite',
        KICK_MEMBERS = 'Kick Members',
        BAN_MEMBERS = 'Ban Members',
        ADMINISTRATOR = 'Administrator',
        MANAGE_CHANNELS = 'Manage Channels',
        MANAGE_GUILD = 'Manage Guild',
        ADD_REACTIONS = 'Add Reactions',
        VIEW_AUDIT_LOG = 'View Audit Log',
        PRIORITY_SPEAKER = 'Priority Speaker',
        STREAM = 'stream',
        VIEW_CHANNEL = 'Read Messages',
        SEND_MESSAGES = 'Send Messages',
        SEND_TTS_MESSAGES = 'Send TTS Messages',
        MANAGE_MESSAGES = 'Manage Messages',
        EMBED_LINKS = 'Embed Links',
        ATTACH_FILES = 'Attach Files',
        READ_MESSAGE_HISTORY = 'Read Message History',
        MENTION_EVERYONE = 'Mention Everyone',
        USE_EXTERNAL_EMOJIS = 'External Emojis',
        VIEW_GUILD_ANALYTICS = 'View Guild Analytics',
        CONNECT = 'Voice Connect',
        SPEAK = 'Voice Speak',
        MUTE_MEMBERS = 'Voice Mute Members',
        DEAFEN_MEMBERS = 'Voice Deafen Members',
        MOVE_MEMBERS = 'Voice Move Members',
        USE_VAD = 'Voice Use VAD',
        CHANGE_NICKNAME = 'Change Nickname',
        MANAGE_NICKNAMES = 'Manage Nicknames',
        MANAGE_ROLES = 'Manage Roles',
        MANAGE_WEBHOOKS = 'Manage Webhooks',
        MANAGE_EMOJIS = 'Manage Emojis',
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
    
    class DjsChannel extends Channel {
        /**
         * @memberof DjsChannel
         */
        hasPermission(channel: djs.Channel, user: djs.User, perm: DJS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
        /**
         * @memberof DjsChannel
         */
        sendMessage(channel: djs.Channel, content: string | DjsContent): Promise<djs.Message | djs.Message[]>
    }

    interface DjsEnums {
        EVENTS: DJS_ENUMS_EVENTS;
        DISCORD_LIB_PERMISSIONS: DJS_ENUMS_DISCORD_LIB_PERMISSIONS;
        PERMISSIONS: DJS_ENUMS_PERMISSIONS;
        PERMISSION_NAMES: DJS_ENUMS_PERMISSIONS_NAMES;
    }

    class DjsGuild extends Guild {
        /**
         * @memberof DjsGuild
         */
        getMember(guild: djs.Guild, userID: string): djs.GuildMember;
    }

    class DjsMember extends Member {
        /**
         * @memberof DjsMember
         */
        getRoles(member: djs.GuildMember): string[];
        /**
         * @memberof DjsMember
         */
        getRolesObject(member: djs.GuildMember): djs.Role[];
        /**
         * @memberof DjsMember
         */
        hasPermission(member: djs.GuildMember, permission: DJS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
    }

    class DjsMessage extends Message {
        /**
         * @memberof DjsMessage
         */
        delete(message: djs.Message): Promise<djs.Message>;
        /**
         * @memberof DjsMessage
         */
        edit(message: djs.Message, content: string | DjsContent): Promise<djs.Message>
    }

    class DjsResolver extends Resolver {
        /**
         * Resolve a user within all the users the bot has.
         *
         * @param client - The bot client
         * @param args - Array of arguments resolved by the command.
         * @returns The user object / Null if not found / Error
         * @memberof DjsResolver
         */
        static user(client: djs.Client, args: string | string[] ): djs.User;
        /**
         * Resolve a member within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The member object / Null if not found / Error
         * @memberof DjsResolver
         */
        static member(guild: djs.Guild, args: string | string[] ): djs.GuildMember;
        /**
         * Resolve a role within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The role object / Null if not found / Error
         * @memberof DjsResolver
         */
        static role(guild: djs.Guild, args: string | string[] ): djs.Role;
        /**
         * Resolve a channel within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The channel object / Null if not found / Error
         * @memberof DjsResolver
         */
        static channel(guild: djs.Guild, args: string | string[] ): djs.GuildChannel;
        /**
         * Resolve a guild within all guilds the bot is in.
         *
         * @param client - The bot client
         * @param args - Array with guild name/ID
         * @returns The guild object / Null if not found / Error
         * @memberof DjsResolver
         */
        static guild(client: djs.Client, args: string[] ): djs.Guild;
    }

    class DjsUser extends User {
        /**
         * @memberof DjsUser
         */
        getDM(user: djs.User): Promise<djs.DMChannel>;
    }

    class DjsClient extends Client {
        private _token: string;
        /**
         * Creates an instance of DjsClient
         * @memberof DjsClient
         */
        constructor(lib: DjsInterface, token: string);
        /**
         * @readonly
         * @memberof DjsClient
         */
        readonly client: djs.Client;
        /**
         * @memberof DjsClient
         */
        public getMember(guild: djs.Guild): djs.GuildMember;
        /**
         * @memberof DjsClient
         */
        public connect(): Promise<string>;
        /**
         * @memberof DjsClient
         */
        public setPresence(status: djs.PresenceStatus, game: DjsPresenceGame): Promise<djs.ClientUser>;
        /**
         * @memberof DjsClient
         */
        public triggerWebhook(id: string, token: string, data: DjsWebhookContent): Promise<WebhookResponse>;
    }

    class DjsInterface extends LibraryInterface {
        public user: DjsUser;
        public member: DjsMember;
        public message: DjsMessage;
        public channel: DjsChannel;
        public guild: DjsGuild;
        public resolver: DjsResolver;
        public client: DjsClient;
        public type: 1;
        /**
         * Creats an instance of DjsInterface
         * @memberof DjsInterface
         */
        constructor(botClient: djs.Client, token: string);
        public enums: DjsEnums;
        public HANDLERS: object; // Not going to list them all
        public onMessageCreate(func: (message: djs.Message) => void): void;
    }

    // Eris
    enum ERIS_ENUMS_EVENTS {
        GUILD_CREATE = 'guildCreate',
        GUILD_DELETE = 'guildDelete',
        GUILD_UPDATE = 'guildUpdate',
        GUILD_UNAVAILABLE = 'guildUnavailable',
        GUILD_AVAILABLE = 'guildAvailable',
        GUILD_MEMBER_ADD = 'guildMemberAdd',
        GUILD_MEMBER_REMOVE = 'guildMemberRemove',
        GUILD_MEMBER_UPDATE = 'guildMemberUpdate',
        GUILD_MEMBER_AVAILABLE = 'guildMemberAvailable',
        GUILD_MEMBER_SPEAKING = 'guildMemberSpeaking',
        GUILD_MEMBERS_CHUNK = 'guildMembersChunk',
        GUILD_ROLE_CREATE = 'roleCreate',
        GUILD_ROLE_DELETE = 'roleDelete',
        GUILD_ROLE_UPDATE = 'roleUpdate',
        GUILD_EMOJIS_UPDATE = 'guildEmojisUpdate',
        GUILD_BAN_ADD = 'guildBanAdd',
        GUILD_BAN_REMOVE = 'guildBanRemove',
        UNAVAILABLE_GUILD_CREATE = 'unavailableGuildCreate',
        CHANNEL_CREATE = 'channelCreate',
        CHANNEL_DELETE = 'channelDelete',
        CHANNEL_UPDATE = 'channelUpdate',
        CHANNEL_PIN_UPDATE = 'channelPinUpdate',
        MESSAGE_CREATE = 'messageCreate',
        MESSAGE_DELETE = 'messageDelete',
        MESSAGE_UPDATE = 'messageUpdate',
        MESSAGE_DELETE_BULK = 'messageDeleteBulk',
        MESSAGE_REACTION_ADD = 'messageReactionAdd',
        MESSAGE_REACTION_REMOVE = 'messageReactionRemove',
        MESSAGE_REACTION_REMOVE_ALL = 'messageReactionRemoveAll',
        TYPING_START = 'typingStart',
        USER_UPDATE = 'userUpdate',
        PRESENCE_UPDATE = 'presenceUpdate',
        VOICE_CHANNEL_JOIN = 'voicecChannelJoin',
        VOICE_CHANNEL_LEAVE = 'voiceChannelLeave',
        VOICE_CHANNEL_SWITCH = 'voiceChannelSwitch',
        VOICE_STATE_UPDATE = 'voiceStateUpdate',
        WEBHOOKS_UPDATE = 'webhookUpdate',
        SHARD_DISCONNECT = 'shardDisconnect',
        SHARD_PRE_READY = 'shardPreReady',
        SHARD_READY = 'shardReady',
        SHARD_RESUME = 'shardResume',
        UNKNOWN = 'unknown',
        CONNECT = 'connect',
        DISCONNECT = 'disconnect',
        ERROR = 'error',
        WARN = 'warn',
        DEBUG = 'debug',
        READY = 'ready',
        HELLO = 'hello',
        RATE_LIMIT = 'rateLimit',
        RAW_WS = 'rawWS',
    }

    enum ERIS_ENUMS_DISCORD_LIB_PERMISSIONS {
        CREATE_INSTANT_INVITE = 'createInstantInvite',
        KICK_MEMBERS = 'kickMembers',
        BAN_MEMBERS = 'banMembers',
        ADMINISTRATOR = 'administrator',
        MANAGE_CHANNELS = 'manageChannels',
        MANAGE_GUILD = 'manageGuild',
        ADD_REACTIONS = 'addReactions',
        VIEW_AUDIT_LOG = 'viewAuditLog',
        PRIORITY_SPEAKER = 'voicePrioritySpeaker',
        STREAM = 'stream',
        VIEW_CHANNEL = 'readMessages',
        SEND_MESSAGES = 'sendMessages',
        SEND_TTS_MESSAGES = 'sendTTSMessages',
        MANAGE_MESSAGES = 'manageMessages',
        EMBED_LINKS = 'embedLinks',
        ATTACH_FILES = 'attachFiles',
        READ_MESSAGE_HISTORY = 'readMessageHistory',
        MENTION_EVERYONE = 'mentionEveryone',
        USE_EXTERNAL_EMOJIS = 'externalEmojis',
        VIEW_GUILD_ANALYTICS = 'viewGuildAnalytics',
        CONNECT = 'voiceConnect',
        SPEAK = 'voiceSpeak',
        MUTE_MEMBERS = 'voiceMuteMembers',
        DEAFEN_MEMBERS = 'voiceDeafenMembers',
        MOVE_MEMBERS = 'voiceMoveMembers',
        USE_VAD = 'voiceUseVAD',
        CHANGE_NICKNAME = 'changeNickname',
        MANAGE_NICKNAMES = 'manageNicknames',
        MANAGE_ROLES = 'manageRoles',
        MANAGE_WEBHOOKS = 'manageWebhooks',
        MANAGE_EMOJIS = 'manageEmojis',
    }

    enum ERIS_ENUMS_PERMISSIONS {
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
    }

    enum ERIS_ENUMS_PERMISSIONS_NAMES {
        createInstantInvite = 'Create Instant Invite',
        kickMembers = 'Kick Members',
        banMembers = 'Ban Members',
        administrator = 'Administrator',
        manageChannels = 'Manage Channels',
        manageGuild = 'Manage Guild',
        addReactions = 'Add Reactions',
        viewAuditLog = 'View Audit Log',
        voicePrioritySpeaker = 'Priority Speaker',
        stream = 'Stream',
        readMessages = 'Read Messages',
        sendMessages = 'Send Messages',
        sendTTSMessages = 'Send TTS Messages',
        manageMessages = 'Manage Messages',
        embedLinks = 'Embed Links',
        attachFiles = 'Attach Files',
        readMessageHistory = 'Read Message History',
        mentionEveryone = 'Mention Everyone',
        externalEmojis = 'External Emojis',
        viewGuildAnalytics = 'View Guild Analytics',
        voiceConnect = 'Voice Connect',
        voiceSpeak = 'Voice Speak',
        voiceMuteMembers = 'Voice Mute Members',
        voiceDeafenMembers = 'Voice Deafen Members',
        voiceMoveMembers = 'Voice Move Members',
        voiceUseVAD = 'Voice Use VAD',
        changeNickname = 'Change Nickname',
        manageNicknames = 'Manage Nicknames',
        manageRoles = 'Manage Roles',
        manageWebhooks = 'Manage Webhooks',
        manageEmojis = 'Manage Emojis',
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

    class ErisChannel extends Channel {
        /**
         * @memberof ErisChannel
         */
        public hasPermission(channel: Eris.Channel, user: Eris.User, perm: ERIS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
        /**
         * @memberof ErisChannel
         */
        public sendMessage(channel: Eris.Channel, content: ErisContent): Promise<Eris.Message>;
    }

    interface ErisEnums {
        EVENTS: ERIS_ENUMS_EVENTS;
        DISCORD_LIB_PERMISSIONS: ERIS_ENUMS_DISCORD_LIB_PERMISSIONS;
        PERMISSIONS: ERIS_ENUMS_PERMISSIONS;
        PERMISSIONS_NAMES: ERIS_ENUMS_PERMISSIONS_NAMES;
    }

    class ErisGuild extends Guild {
        /**
         * @memberof ErisGuild
         */
        public getMember(guild: Eris.Guild, userID: string): Eris.Member;
    }

    class ErisMember extends Member {
        /**
         * @memberof ErisMember
         */
        public getRoles(member: Eris.Member): string[];
        /**
         * @memberof ErisMember
         */
        public getRolesObject(member: Eris.Member): Eris.Role[];
        /**
         * @memberof ErisMember
         */
        public hasPermission(member: Eris.Member, permission: ERIS_ENUMS_DISCORD_LIB_PERMISSIONS): boolean;
    }

    class ErisMessage extends Message {
        /**
         * @memberof ErisMessage
         */
        public delete(message: Eris.Message): Promise<void>;
        /**
         * @memberof ErisMessage
         */
        public edit(message: Eris.Message, content: ErisContent): Promise<Eris.Message>;
    }

    /**
     * Static Resolver class for Eris.AxonCore
     *
     * @author KhaaZ
     *
     * @static
     * @class ErisResolver
     */
    class ErisResolver extends Resolver {
        /**
         * Resolve a user within all the users the bot has.
         *
         * @param client - The bot client
         * @param args - Array of arguments resolved by the command.
         * @returns The user object / Null if not found / Error
         * @memberof ErisResolver
         */
        static user(client: Eris.Client, args: string | string[] ): Eris.User | null;
        /**
         * Resolve a member within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The member object / Null if not found / Error
         * @memberof ErisResolver
         */
        static member(guild: Eris.Guild, args: string | string[] ): Eris.Member | null;
        /**
         * Resolve a role within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The role object / Null if not found / Error
         * @memberof ErisResolver
         */
        static role(guild: Eris.Guild, args: string | string[] ): Eris.Role | null;
        /**
         * Resolve a channel within a guild.
         *
         * @param guild - Object Guild resolved by the command.
         * @param args - Array of arguments resolved by the command.
         * @returns The channel object / Null if not found / Error
         * @memberof ErisResolver
         */
        static channel(guild: Eris.Guild, args: string | string[] ): Eris.GuildChannel;
        /**
         * Resolve a guild within all guilds the bot is in.
         *
         * @param client - The bot client
         * @param args - Array with guild name/ID
         * @returns The guild object / Null if not found / Error
         * @memberof ErisResolver
         */
        static guild(client: Eris.Client, args: string[] ): Eris.Guild;
    }

    class ErisUser extends User {
        /**
         * @memberof ErisUser
         */
        public getDM(user: Eris.User): Promise<Eris.PrivateChannel>;
    }

    class ErisClient extends Client {
        /**
         * @readonly
         * @memberof ErisClient
         */
        readonly client: Eris.Client;
        /**
         * @memberof ErisClient
         */
        public getMember(guild: Eris.Guild): Eris.Member;
        /**
         * @memberof ErisClient
         */
        public connect(): Promise<void>;
        /**
         * @memberof ErisClient
         */
        public setPresence(status: 'online' | 'idle' | 'dnd' | 'invisible', game: ErisPresenceGame): Promise<void>;
        /**
         * @memberof ErisClient
         */
        public triggerWebhook(id: string, token: string, data: ErisWebhookContent): Promise<WebhookResponse>;
    }

    class ErisInterface extends LibraryInterface {
        public user: ErisUser;
        public member: ErisMember;
        public guild: ErisGuild;
        public channel: ErisChannel;
        public message: ErisMessage;
        public resolver: ErisResolver
        public client: ErisClient;
        public type: 0;
        /**
         * Creates an instance of ErisInterface
         * @memberof ErisInterface
         */
        constructor(botClient: Eris.Client);
        /**
         * @memberof ErisInterface
         */
        public enums: ErisEnums;
        /**
         * @memberof ErisInterface
         */
        public HANDLERS: object;
        /**
         * @memberof ErisInterface
         */
        public onMessageCreate(func: (message: Eris.Message) => void): void;
        /**
         * @memberof ErisInterface
         */
        public onceReady(func: () => void): void;
    }
}
