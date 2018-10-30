'use strict';

import Enum from '../Utility/Enums';

/**
 * EnsureInterface
 * Static Class to check that Object are formated correctly
 *
 * @author KhaaZ
 *
 * @class EnsureInterface
 */
class EnsureInterface {
    /**
     * Check if the attribute of the command are valid
     * (valid names/ no missing etc)
     *
     * @param {Object<Command>} command - The Command Object
     * @returns {Boolean} True if no problem / False if one invalid
     * @memberof Module
     */
    static checkCommandAttributes(module, command) {
        const debug = module.axon.params.debugMode;
        if (debug) {
            if ((command.isSubcmd && !command.parentCommand) || (command.parentCommand && !command.isSubcmd)) {
                module.Logger.warn(`Invalid SubCommand (Command.isSubcmd) [${command.label}]`);
                return false;
            }
            module.Logger.verbose(`Valid Subcommand [${command.label}]`);

            if (command.hasSubcmd && (!command.subCommands || !command.subCommandsAliases)) {
                module.Logger.warn(`Invalid Parent Command (Command.subCommands) [${command.label}]`);
                return false;
            }
            module.Logger.verbose(`Valid Parent Command [${command.label}]`);

            // ensure command.options is valid
            if (!command.options
                || command.options.argsMin === undefined
                || command.options.invalidUsage === undefined
                || command.options.invalidPermissionMessage === undefined
                || command.options.deleteCommand === undefined
                || command.options.guildOnly === undefined
                || command.options.hidden === undefined
                || command.options.cooldown === undefined) {
                module.Logger.warn(`Missing property(ies) in Command.options [${command.label}]`);
                return false;
            }
            module.Logger.verbose(`Command.options valid [${command.label}]`);

            // Ensure command.permissions is valid
            if (!command.permissions.bot
                || !Array.isArray(command.permissions.bot)
                //
                || command.permissions.serverMod === undefined
                || command.permissions.serverAdmin === undefined
                // user
                || !command.permissions.user
                || !command.permissions.user.needed
                || !Array.isArray(command.permissions.user.needed)
                || !command.permissions.user.bypass
                || !Array.isArray(command.permissions.user.bypass)
                // usersID
                || !command.permissions.usersID
                || !command.permissions.usersID.needed
                || !Array.isArray(command.permissions.usersID.needed)
                || !command.permissions.usersID.bypass
                || !Array.isArray(command.permissions.usersID.bypass)
                // rolesID
                || !command.permissions.rolesID
                || !command.permissions.rolesID.needed
                || !Array.isArray(command.permissions.rolesID.needed)
                || !command.permissions.rolesID.bypass
                || !Array.isArray(command.permissions.rolesID.bypass)
                // channelsID
                || !command.permissions.channelsID
                || !command.permissions.channelsID.needed
                || !Array.isArray(command.permissions.channelsID.needed)
                || !command.permissions.channelsID.bypass
                || !Array.isArray(command.permissions.channelsID.bypass)
                // staff
                || !command.permissions.staff
                || !command.permissions.staff.needed
                || !Array.isArray(command.permissions.staff.needed)
                || !command.permissions.staff.bypass
                || !Array.isArray(command.permissions.staff.bypass)) {
                module.Logger.warn(`Missing property(ies) in Command.permissions [${command.label}]`);
                return false;
            }
            module.Logger.verbose(`Command.permissions is valid [${command.label}]`);
        }

        for (const perm of command.permissions.bot) {
            if (!this.checkValidPermNames(perm)) {
                debug && module.Logger.warn(`Invalid permissions name (${perm}) in Command.permissions.bot [${command.label}]`);
                return false;
            }
        }
        debug && module.Logger.verbose(`Correct permissions name in Command.permissions [${command.label}]`);

        for (const perm of command.permissions.user.needed) {
            if (!this.checkValidPermNames(perm)) {
                debug && module.Logger.warn(`Invalid permissions name (${perm}) in Command.permissions.user.needed [${command.label}]`);
                return false;
            }
        }
        debug && module.Logger.verbose(`Correct permissions name in Command.permissions.user.needed [${command.label}]`);

        for (const perm of command.permissions.user.bypass) {
            if (!this.checkValidPermNames(perm)) {
                debug && module.Logger.warn(`Invalid permissions name (${perm}) in Command.permissions.user.bypass [${command.label}]`);
                return false;
            }
        }
        debug && module.Logger.verbose(`Correct permissions name in Command.permissions.user.bypass [${command.label}]`);

        return true;
    }

    /**
     * Check if the permissions names are valid
     *
     * @param {String} perm - Name of a permission
     * @returns {Boolean} True if yes / False if the name doesn't exist
     * @memberof Module
     */
    static checkValidPermNames(perm) {
        if (Enum.permissions.find(p => p === perm)) {
            return true;
        }
        return false;
    }
}

export default EnsureInterface;
