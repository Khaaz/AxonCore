import { AxonJSON, GuildJSON, AsyncQueue, updateDBVal } from '../../';

/**
 * Manager class for handling Json database
 *
 * @author KhaaZ, Olybear
 *
 * @class JsonManager
 */
export declare class JsonManager {
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
    public toJSON(): null;
    /**
     * Parse object/array as JSON string
     * @param json Object/array to be parsed into JSON string
     * @returns JSON string or parsed array/object if failed
     */
    public toString(json: object): string | object | any[];
    public toString(): null;

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
    public readFile(path: string): Promise<Buffer>;
    /**
     * Write a file
     *
     * @returns Whether or not the task completed successfully
     *
     * @memberof JsonManager
     */
    public writeFile(path: string, content?: string): Promise<boolean>;

    /**
     * Create a file and schema for Axon global file.
     * @param defaultPrefix Default prefix
     * @returns The newly created Schema || null
     *
     * @memberof JsonManager
     */
    public createAxonSchema(defaultPrefix: string): Promise<AxonJSON | null>;
    /**
     * Create a file and schema for the given guild.
     *
     * @param prefixes Array of prefixes
     * @param gID Guild ID
     * @returns The newly created Schema || null
     *
     * @memberof JsonManager
     */
    public createGuildSchema(prefixes: string[], gID: string): Promise<GuildJSON | null>;

    /**
     * Fetch the axon schema
     *
     * @returns AxonSchema || null
     *
     * @memberof JsonManager
     */
    public fetchAxonSchema(): Promise<AxonJSON | null>;
    /**
     * Fetch the guild schema for the given guild
     *
     * @param gID Guild ID
     * @returns GuildSchema || null
     *
     * @memberof JsonManager
     */
    public fetchGuildSchema(gID: string): Promise<GuildJSON | null>;

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
    public updateGuildKey(gID: string, key: string, value: updateDBVal): Promise<GuildJSON | null>;
    /**
     * Update the schema with the given value
     *
     * @param key Value to update
     * @param value - The value to update for the given key (can be anything)
     * @returns AxonSchema || null
     *
     * @memberof JsonManager
     */
    public updateAxonKey(key: string, value: updateDBVal): Promise<AxonJSON | null>;

    /**
     * Write the updated schema in the file.
     *
     * @param schema AxonSchema
     * @returns AxonSchema || null
     *
     * @memberof JsonManager
     */
    public writeAxonSchema(schema: object): Promise<AxonJSON | null>;
    /**
     * Write the updated schema in the file (for the given guild).
     *
     * @param gID Guild ID
     * @param schema GuildSchema
     * @returns GuildSchema || null
     *
     * @memberof JsonManager
     */
    public writeGuildSchema(gID: string, schema: object): Promise<GuildJSON | null>;
}
