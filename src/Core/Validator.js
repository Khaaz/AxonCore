import { EMBED_LIMITS } from '../Utility/Constants/DiscordEnums';
import { DEBUG_FLAGS } from '../Utility/Constants/AxonEnums';

import CommandPermissions from './Command/CommandPermissions';
import CommandOptions from './Command/CommandOptions';
import CommandCooldown from './Command/CommandCooldown';
import AxonError from '../Errors/AxonError';

/**
 * @typedef {import('./Module').default} Module
 * @typedef {import('./Command/Command').default} Command
 * @typedef {{
 * title?: String, description?: String, url?: String, timestamp?: Date|String, color?: Number, footer?: { text: String, icon_url?: String },
 * image?: { url: String, height?: Number, width?: Number }, thumbnail?: { url: String, height?: Number, width?: Number },
 * fields?: Array<{ name: String, value: String, inline?: Boolean }>, author?: { name: String, url?: String, icon_url?: String }
 * }} EmbedBase
 * @typedef {import('../Utility/Discord/Embed').default} Embed
 * @typedef {{ content?: String, embed?: Embed|EmbedBase }} MessageObject
 */

function debug(client, flag, content) {
    client.emit('debug', DEBUG_FLAGS.INIT | flag, content);
}

/**
 * Static Class that makes sure objects are formatted correctly.
 *
 * @author KhaaZ
 *
 * @class Validator
 */
class Validator {
    /**
     * @param {Module} module
     * @returns {Boolean} Whether the module is considered valid or not
     */
    static validModule(module) {
        const PERMS = module.axon.library.enums.PERMISSIONS;

        if (!(module.options instanceof CommandOptions) ) {
            module.options = new CommandOptions(module);
            debug(module.axon, DEBUG_FLAGS.BAD, `[${module.label}] - Invalid command options... using default.`);
        } else {
            debug(module.axon, DEBUG_FLAGS.GOOD, `[${module.label}] - Valid command options.`);
        }

        if (!(module.permissions instanceof CommandPermissions) ) {
            module.permissions = new CommandPermissions(module);
            debug(module.axon, DEBUG_FLAGS.BAD, `[${module.label}] - Invalid command permissions... using default.`);
        } else {
            debug(module.axon, DEBUG_FLAGS.GOOD, `[${module.label}] - Valid command permissions.`);
        }

        /* Validate Eris permissions */
        for (const perm of module.permissions.bot) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug(module.axon, DEBUG_FLAGS.BAD, `[${module.label}] - Invalid permissions name (${perm}) in Module.permissions.bot.`);
                return false;
            }
        }
        debug(module.axon, DEBUG_FLAGS.GOOD, `[${module.label}] - Correct permissions name in Module.permissions.bot.`);

        for (const perm of module.permissions.author.needed) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug(module.axon, DEBUG_FLAGS.BAD, `[${module.label}] - Invalid permissions name (${perm}) in Module.permissions.author.needed.`);
                return false;
            }
        }
        debug(module.axon, DEBUG_FLAGS.GOOD, `[${module.label}] - Correct permissions name in Module.permissions.author.needed.`);

        for (const perm of module.permissions.author.bypass) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug(module.axon, DEBUG_FLAGS.BAD, `[${module.label}] - Invalid permissions name (${perm}) in Module.permissions.author.bypass.`);
                return false;
            }
        }
        debug(module.axon, DEBUG_FLAGS.GOOD, `[${module.label}] - Correct permissions name in Module.permissions.author.bypass.`);

        return true;
    }

    /**
     * Valid that a command uses the correct format.
     * Will automatically correct the command by using default for some part
     *
     * @static
     * @param {Command} command
     * @returns {Boolean} Whether the command is considered valid or not
     * @memberof Validator
     */
    static validCommand(command) {
        const PERMS = command.axon.library.enums.PERMISSIONS;

        /* Correct: No aliases, or aliases does not include the label. */
        if (!command.aliases || command.aliases.length === 0) {
            command.aliases = [command.label];
            debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - No aliases... adding default.`);
        } else if (Array.isArray(command.aliases) && !command.aliases.includes(command.fullLabel) ) {
            command.aliases.push(command.label);
            debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Missing default alias... adding.`);
        } else if (!Array.isArray(command.aliases) && command.aliases !== command.label) {
            command.aliases = [command.aliases, command.label];
            debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Aliases not an array... fixing.`);
        }

        /* Correct commands properties */
        if (!(command._cooldown instanceof CommandCooldown) ) {
            command._cooldown = new CommandCooldown(command);
            debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Invalid command cooldown... recreating.`);
        } else {
            debug(command.axon, DEBUG_FLAGS.GOOD, `[${command.module.label}(${command.fullLabel})] - Valid command cooldown.`);
        }
    
        if (!(command.options instanceof CommandOptions) ) {
            command.options = new CommandOptions(command);
            debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Invalid command options... using default.`);
        } else {
            debug(command.axon, DEBUG_FLAGS.GOOD, `[${command.module.label}(${command.fullLabel})] - Valid command options.`);
        }

        if (!(command.permissions instanceof CommandPermissions) ) {
            command.permissions = new CommandPermissions(command);
            debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Invalid command permissions... using default.`);
        } else {
            debug(command.axon, DEBUG_FLAGS.GOOD, `[${command.module.label}(${command.fullLabel})] - Valid command permissions.`);
        }

        /* Validate Library permissions */
        for (const perm of command.permissions.bot) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Invalid permissions name (${perm}) in Command.permissions.bot.`);
                return false;
            }
        }
        debug(command.axon, DEBUG_FLAGS.GOOD, `[${command.module.label}(${command.fullLabel})] - Correct permissions name in Command.permissions.bot.`);

        for (const perm of command.permissions.author.needed) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Invalid permissions name (${perm}) in Command.permissions.author.needed.`);
                return false;
            }
        }
        debug(command.axon, DEBUG_FLAGS.GOOD, `[${command.module.label}(${command.fullLabel})] - Correct permissions name in Command.permissions.author.needed.`);

        for (const perm of command.permissions.author.bypass) {
            if (!this.checkValidPermissionName(PERMS, perm) ) {
                debug(command.axon, DEBUG_FLAGS.BAD, `[${command.module.label}(${command.fullLabel})] - Invalid permissions name (${perm}) in Command.permissions.author.bypass.`);
                return false;
            }
        }
        debug(command.axon, DEBUG_FLAGS.GOOD, `[${command.module.label}(${command.fullLabel})] - Correct permissions name in Command.permissions.author.bypass.`);
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
     * @param {String|MessageObject} content
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
