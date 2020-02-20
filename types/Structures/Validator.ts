
/**
 * Static Class that makes sure objects are formatted correctly.
 *
 * @author KhaaZ
 *
 * @class Validator
 */
export declare class Validator {
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
