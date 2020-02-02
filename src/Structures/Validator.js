import { EMBED_LIMITS } from '../Utility/Constants/DiscordEnums';

import CommandPermissions from './Command/CommandPermissions';
import CommandOptions from './Command/CommandOptions';
import CommandCooldown from './Command/CommandCooldown';
import AxonError from '../Errors/AxonError';

/**
 * Static Class that makes sure objects are formatted correctly.
 *
 * @author KhaaZ
 *
 * @class Validator
 */
class Validator {
    static validModule(module) {
        const PERMS = module.axon.library.enums.PERMISSIONS;
        const debug = module.axon.settings.debugMode;

        if (!(module.options instanceof CommandOptions) ) {
            module.options = new CommandOptions(module);
            debug && module.logger.verbose(`Invalid command options... using default [${module.label}]`);
        } else {
            debug && module.logger.verbose(`Valid command options [${module.label}]`);
        }

        if (!(module.permissions instanceof CommandPermissions) ) {
            module.permissions = new CommandPermissions(module);
            debug && module.logger.verbose(`Invalid command permissions... using default [${module.label}]`);
        } else {
            debug && module.logger.verbose(`Valid command permissions [${module.label}]`);
        }

        /* Validate Eris permissions */
        for (const perm of module.permissions.bot) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug && module.logger.warn(`Invalid permissions name (${perm}) in Module.permissions.bot [${module.label}]`);
                return false;
            }
        }
        debug && module.logger.verbose(`Correct permissions name in Module.permissions [${module.label}]`);

        for (const perm of module.permissions.user.needed) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug && module.logger.warn(`Invalid permissions name (${perm}) in Module.permissions.user.needed [${module.label}]`);
                return false;
            }
        }
        debug && module.logger.verbose(`Correct permissions name in Module.permissions.user.needed [${module.label}]`);

        for (const perm of module.permissions.user.bypass) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug && module.logger.warn(`Invalid permissions name (${perm}) in Module.permissions.user.bypass [${module.label}]`);
                return false;
            }
        }
        debug && module.logger.verbose(`Correct permissions name in Module.permissions.user.bypass [${module.label}]`);

        return true;
    }

    /**
     * Valid that a command uses the correct format.
     * Will automatically correct the command by using default fors ome part
     *
     * @static
     * @param {Command} command
     * @returns {Boolean} Whether the command is considered valid or not
     * @memberof Validator
     */
    static validCommand(command) {
        const PERMS = command.axon.library.enums.PERMISSIONS;
        const debug = command.axon.settings.debugMode;

        /* Correct: No aliases, or aliases does not include the label. */
        if (!command.aliases || command.aliases.length === 0) {
            command.aliases = [command.label];
            debug && command.logger.verbose(`No aliases... adding default [${command.fullLabel}]`);
        } else if (Array.isArray(command.aliases) && !command.aliases.includes(command.fullLabel) ) {
            command.aliases.push(command.label);
            debug && command.logger.verbose(`Missing default alias... adding [${command.fullLabel}]`);
        } else if (!Array.isArray(command.aliases) && command.aliases !== command.label) {
            command.aliases = [command.aliases, command.label];
            debug && command.logger.verbose(`Aliases not an array... fixing [${command.fullLabel}]`);
        }

        /* Correct commands properties */
        if (!(command._cooldown instanceof CommandCooldown) ) {
            command._cooldown = new CommandCooldown(command);
            debug && command.logger.verbose(`Invalid command cooldown... recreating [${command.fullLabel}]`);
        } else {
            debug && command.logger.verbose(`Valid command cooldown [${command.fullLabel}]`);
        }
    
        if (!(command.options instanceof CommandOptions) ) {
            command.options = new CommandOptions(command);
            debug && command.logger.verbose(`Invalid command options... using default [${command.fullLabel}]`);
        } else {
            debug && command.logger.verbose(`Valid command options [${command.fullLabel}]`);
        }

        if (!(command.permissions instanceof CommandPermissions) ) {
            command.permissions = new CommandPermissions(command);
            debug && command.logger.verbose(`Invalid command permissions... using default [${command.fullLabel}]`);
        } else {
            debug && command.logger.verbose(`Valid command permissions [${command.fullLabel}]`);
        }

        /* Validate Library permissions */
        for (const perm of command.permissions.bot) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                command.logger.warn(`Invalid permissions name (${perm}) in Command.permissions.bot [${command.fullLabel}]`);
                return false;
            }
        }
        debug && command.logger.verbose(`Correct permissions name in Command.permissions [${command.fullLabel}]`);

        for (const perm of command.permissions.user.needed) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                command.logger.warn(`Invalid permissions name (${perm}) in Command.permissions.user.needed [${command.fullLabel}]`);
                return false;
            }
        }
        debug && command.logger.verbose(`Correct permissions name in Command.permissions.user.needed [${command.fullLabel}]`);

        for (const perm of command.permissions.user.bypass) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                command.logger.warn(`Invalid permissions name (${perm}) in Command.permissions.user.bypass [${command.fullLabel}]`);
                return false;
            }
        }
        debug && command.logger.verbose(`Correct permissions name in Command.permissions.user.bypass [${command.fullLabel}]`);
        return true;
    }

    /**
     * Check if the permissions names are valid
     *
     * @param {Array<String>} PERMISSIONS - Array of library permissions
     * @param {String} perm - Name of a permission
     * @returns {Boolean} True if yes / False if the name doesn't exist
     * @memberof Module
     */
    static checkValidPermissionName(PERMISSIONS, perm) {
        if (PERMISSIONS.includes(perm) ) {
            return true;
        }
        return false;
    }

    /**
     * Check whether a message content / embed comply with discord limits.
     *
     * @static
     * @param {Object|String} content
     * @returns {Boolean} Returns true if the message is valid, otherwise throw an AxonError
     * @memberof Validator
     */
    static checkMessageValidity(content) {
        if (content instanceof Object && content.embed) {
            if (content.content && content.content.length > EMBED_LIMITS.LIMIT_CONTENT) {
                throw new AxonError('Content > 2000', 'MESSAGE');
            }

            if (content.embed.length > EMBED_LIMITS.LIMIT_TOTAL_EMBED) {
                throw new AxonError('Global embed > 6000', 'MESSAGE-EMBED');
            }
            if (content.embed.description && content.embed.description.length > EMBED_LIMITS.LIMIT_DESCRIPTION) {
                throw new AxonError('Description > 2048', 'MESSAGE-EMBED');
            }
            if (content.embed.title && content.embed.title.length > EMBED_LIMITS.LIMIT_TITLE) {
                throw new AxonError('Title > 256', 'MESSAGE-EMBED');
            }
            if (content.embed.author && content.embed.author.name && content.embed.author.name.length > EMBED_LIMITS.LIMIT_AUTHOR_NAME) {
                throw new AxonError('Author > 256', 'MESSAGE-EMBED');
            }
            if (content.embed.footer && content.embed.footer.text && content.embed.footer.text.length > EMBED_LIMITS.LIMIT_FOOTER_TEXT) {
                throw new AxonError('Footer > 2048', 'MESSAGE-EMBED');
            }
            if (content.embed.fields) {
                if (content.embed.fields.length > EMBED_LIMITS.NUMBER_FIELDS) {
                    throw new AxonError('Fields > 25', 'MESSAGE-EMBED');
                }
                for (const field in content.embed.fields) {
                    if (field.name > EMBED_LIMITS.LIMIT_FIELD_NAME || field.value > EMBED_LIMITS.LIMIT_FIELD_VALUE) {
                        throw new AxonError('Field: name > 256 ; value > 1024', 'MESSAGE-EMBED');
                    }
                }
            }
        } else if (typeof content === 'string' && content.length > EMBED_LIMITS.LIMIT_CONTENT) {
            throw new AxonError('Content > 2000', 'MESSAGE');
        }
        return true;
    }
}

export default Validator;
