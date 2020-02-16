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
        
        saveAxon(axonSchema: AxonConfig): Promise<AxonConfig>;
        saveGuild(gID: string, guildSchema: GuildConfig): Promise<GuildConfig>;

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

    /**
     * Default AxonConfig data structure used in AxonCore.
     * This class can be extended and changed as you want.
     * All methods flagged with "is used internally" can be overridden but need to keep the same name.
     *
     * @author KhaaZ
     *
     * @class AxonConfig
     */
    class AxonConfig implements AConfig {
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

    /**
     * Default GuildConfig data structure used in AxonCore.
     * This class can be extended and changed as you want.
     * All methods flagged with "is used internally" can be overridden but need to keep the same name.
     *
     * @author KhaaZ
     *
     * @class GuildConfig
     */
    class GuildConfig implements GConfig {
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
         * @param module - The command object
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
        public succes: boolean;
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

    class AxonUtils {
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

    class Utils {
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

    type LOG_LEVEL_TYPES = 'FATAL' | 'ERROR' | 'WARN' | 'DEBUG' | 'NOTICE' | 'INFO' | 'VERBOSE';

    interface Ctx { guild: LibGuild; cmd: Command; user: LibUser; }

    class Base {
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

    interface FieldComp {
        name: string;
        value: string;
        inline?: boolean;
    }

    class Embed {
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

    class AxonClient extends EventEmitter {
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

    abstract class ASelector {
        constructor();
        static select(...args: any[] ): any; // Not Implemented
    }

    export class DBSelector extends ASelector {
        select(axonClient: AxonClient, axonOptions: AxonOptions): InMemoryProvider | JsonProvider | MongoProvider;
    }

    class MessageManager {
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

    class MessageParser {
        public match: RegExp;
        constructor();
        public matchAll(message: string): Generator<RegExpExecArray, void, unknown>;
        public parse(message: string, args: AxonLanguageResponse): string;
        public parse2(message: string, args: string[] ): string;
    }

    class TranslationManager {
        private _manager: MessageManager;
        public lang: string;
        constructor(manager: MessageManager, lang: string);

        readonly messages: Languages;
        public getMessages(lang: string): AxonLanguageResponse;
        public getMessage(message: string, lang: string): string;
    }

    class ALogger {
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

    class Context {
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

    class CommandDispatcher {
        mentionFormatter: RegExp;
        constructor(axon: AxonClient);
        readonly library: LibraryInterface;
        public dispatch(msg: LibMessage): Promise<void>;
    }

    class AHandler {
        private _axon: AxonClient;
        public name: string;
        private _listeners: Listener[];
        constructor(axon: AxonClient, name: string, listeners: Listener[] );
        public size: number;
        private _handle(...args: any[] ): Promise<void>;
        public handle(...args: any[] ): string | null;
    }

    class ALoader<T> {
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

    class CommandLoader extends ALoader<Module> {
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

    class ListenerLoader extends ALoader<AxonClient> {
        private _module: Module;
        constructor(module: Module);
        readonly axon: AxonClient;
        readonly module: Module;
        readonly logger: ALogger;
        load(listener: Listener): boolean;
        loadAll(listeners: { [key: string]: Listener; } ): boolean;
        unload(label: string): true;
    }

    class ModuleLoader extends ALoader<AxonClient> {
        constructor(axonClient: AxonClient);
        readonly axon: AxonClient;
        readonly logger: ALogger;
        load(module: Module): boolean;
        loadAll(modules: { [key: string]: Module; } ): boolean;
        unload(label: string): true;
    }

    class ARegistry<T> {
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

    class CommandRegistry extends ARegistry<Command> {
        public aliases: Map<string | number, string>;
        constructor(axon: AxonClient);
        get(cmd: string): Command | null;
        getFull(splitLabel: string[] ): Command | null;
        register(label: string, command: Command): void;
        unregister(label: string, command?: Command): void;
        resolve(label: string, args: string[], guildConfig?: GuildConfig): Command | null;
    }

    class GuildConfigCache {
        private _axon: AxonClient;
        public guildConfigs: LRUCache<GuildConfig>;
        get(key: string): GuildConfig;
        set(key: string, value: GuildConfig): void;
        public [Symbol.iterator](): [string|number, GuildConfig];
        public getOrFetch(key: string): Promise<GuildConfig|null>;
        public fetchGuildConf(gID: string): Promise<GuildConfig|null>;
    }

    class ListenerRegistry extends ARegistry<Listener> {
        constructor(axon: AxonClient);
        register(label: string, listener: Listener): void;
        unregister(label: string, listener?: Listener): void;
    }

    class ModuleRegistry extends ARegistry<Module> {
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

    const DiscordEnums: {
        DISCORD_GATEWAY_EVENTS: DISCORD_GATEWAY_EVENTS;
        DISCORD_PERMISSIONS: DISCORD_PERMISSIONS;
        PERMISSION_NUMBERS: PERMISSIONS_NUMBERS;
        EMBED_LIMITS: EMBED_LIMITS;
        CHANNEL_TYPES: CHANNEL_TYPES;
        MESSAGE_TYPES: MESSAGE_TYPES;
        CLIENT_STATUS_TYPES: CLIENT_STATUS_TYPES;
    };

    class Queue {
        private _functions: Function[];
        private _running: boolean;
        public stopOnError: boolean;
        constructor(stopOnError?: boolean);
        public exec(): void;
        public add(func: Function, toExec?: boolean, ...args: any[] ): void;
        public createClosure(fn: Function, ...args: any[] ): unknown;
    }

    class AsyncQueue extends Queue {
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

    class LRUCache<T> {
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

    class Channel {
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

    class Client {
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

    class Guild {
        public lib: LibraryInterface
        constructor(lib: LibraryInterface);
        getID(guild: LibGuild): string;
        getName(guild: LibGuild): string;
        getOwnerID(guild: LibGuild): string;
        getMember(guild: LibGuild, userID: string): LibMember;
    }

    class Member {
        public lib: LibraryInterface;
        constructor(lib: LibraryInterface);
        getID(member: LibMember): string;
        getRoles(member: LibMember): string[]; // Not Implemented
        getRolesObject(member: LibMember): LibRole[]; // Not Implemented
        hasPermission(member: LibMember, permission: string): boolean; // Not Implemented
    }

    class Message {
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

    class Resolver {
        public static user(client: LibClient, args: string[]|string): LibUser|null; // Not implemented
        public static member(guild: LibGuild, args: string[]|string): LibMember|null; // Not implemented
        public static role(guild: LibGuild, args: string[]|string): LibRole|null; // Not implemented
        public static channel(guild: LibGuild, args: string[]|string): LibChannel|null; // Not implemented
        public static guild(client: LibClient, args: string[] ): LibGuild|null; // Not implemented
    }

    class User {
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

    class LibraryInterface {
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
    
    class DjsChannel extends Channel {
        hasPermission(channel: djs.Channel, user: djs.User, perm: string): boolean;
        sendMessage(channel: djs.Channel, content: string | DjsContent): Promise<djs.Message | djs.Message[]>
    }

    interface DjsEnums {
        EVENTS: DjsEnumsEvents;
        DISCORD_LIB_PERMISSIONS: DjsEnumsDiscordLibPermissions;
        PERMISSIONS: DjsEnumsPermissions;
        PERMISSION_NAMES: DjsEnumsPermissionNames;
    }

    class DjsGuild extends Guild {
        getMember(guild: djs.Guild, userID: string): djs.GuildMember;
    }

    class DjsMember extends Member {
        getRoles(member: djs.GuildMember): string[];
        getRolesObject(member: djs.GuildMember): djs.Role[];
        hasPermission(member: djs.GuildMember, permission: DjsEnumsPermissionList): boolean;
    }

    class DjsMessage extends Message {
        delete(message: djs.Message): Promise<djs.Message>;
        edit(message: djs.Message, content: string | DjsContent): Promise<djs.Message>
    }

    class DjsResolver extends Resolver {
        static user(client: djs.Client, args: string | string[] ): djs.User;
        static member(guild: djs.Guild, args: string | string[] ): djs.GuildMember;
        static role(guild: djs.Guild, args: string | string[] ): djs.Role;
        static channel(guild: djs.Guild, args: string | string[] ): djs.GuildChannel;
        static guild(client: djs.Client, args: string[] ): djs.Guild;
    }

    class DjsUser extends User {
        getDM(user: djs.User): Promise<djs.DMChannel>;
    }

    class DjsClient extends Client {
        private _token: string;
        constructor(lib: DjsInterface, token: string);
        public client: djs.Client;
        getMember(guild: djs.Guild): djs.GuildMember;
        connect(): Promise<string>;
        setPresence(status: djs.PresenceStatus, game: DjsPresenceGame): Promise<djs.ClientUser>;
        triggerWebhook(id: string, token: string, data: DjsWebhookContent): Promise<WebhookResponse>;
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

    class ErisChannel extends Channel {
        public hasPermission(channel: Eris.Channel, user: Eris.User, perm: ErisEnumsPermissionList): boolean;
        public sendMessage(channel: Eris.Channel, content: ErisContent): Promise<Eris.Message>;
    }

    interface ErisEnums {
        EVENTS: ErisEnumsEvents;
        DISCORD_LIB_PERMISSIONS: ErisEnumsDiscordLibPermissions;
        PERMISSIONS: ErisEnumsPermissions;
        PERMISSIONS_NAMES: ErisEnumsPermissionsNames;
    }

    class ErisGuild extends Guild {
        public getMember(guild: Eris.Guild, userID: string): Eris.Member;
    }

    class ErisMember extends Member {
        getRoles(member: Eris.Member): string[];
        getRolesObject(member: Eris.Member): Eris.Role[];
        hasPermission(member: Eris.Member, permission: ErisEnumsPermissionList): boolean;
    }

    class ErisMessage extends Message {
        delete(message: Eris.Message): Promise<void>;
        edit(message: Eris.Message, content: ErisContent): Promise<Eris.Message>;
    }

    class ErisResolver extends Resolver {
        static user(client: Eris.Client, args: string | string[] ): Eris.User | null;
        static member(guild: Eris.Guild, args: string | string[] ): Eris.Member | null;
        static role(guild: Eris.Guild, args: string | string[] ): Eris.Role | null;
        static channel(guild: Eris.Guild, args: string | string[] ): Eris.GuildChannel;
        static guild(client: Eris.Client, args: string[] ): Eris.Guild;
    }

    class ErisUser extends User {
        getDM(user: Eris.User): Promise<Eris.PrivateChannel>;
    }

    class ErisClient extends Client {
        public client: Eris.Client;
        public getMember(guild: Eris.Guild): Eris.Member;
        public connect(): Promise<void>;
        public setPresence(status: 'online' | 'idle' | 'dnd' | 'invisible', game: ErisPresenceGame): Promise<void>;
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
        constructor(botClient: Eris.Client);
        public enums: ErisEnums;
        public HANDLERS: object;
        public onMessageCreate(func: (message: Eris.Message) => void): void;
        public onceReady(func: () => void): void;
    }
}
