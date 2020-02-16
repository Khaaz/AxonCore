import Command from './Command';
import Module from '../Module';

import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../../Langs/MessageManager').default} MessageManager
 * @typedef {import('../DataStructure/GuildConfig').default} GuildConfig
 */

/**
 * CommandOptions.
 * Holds options for a command and all necessary checkers.
 *
 * @author KhaaZ
 *
 * @class CommandOptions
 *
 * @prop {(channel: Channel, member: Member) => String | String} [invalidPermissionMessage=null] - What the invalid permission message should be
 * @prop {Boolean} [sendPermissionMessage=false] - Whether to trigger an error message on invalid permission (bot / user / custom etc)
 * @prop {Number} [invalidPermissionMessageTimeout=9000] - What the invalid permission message deletion timeout should be
 * @prop {Number} [argsMin=0] - Minimum arguments required to execute the command
 * @prop {String} [invalidUsageMessage=null] - What the invalid usage message should be
 * @prop {Boolean} [sendUsageMessage=true] - Whether to trigger the help command on invalid usage (not enough arguments)
 * @prop {Boolean} [deleteCommand=false] - Whether to delete the command input after trigger
 * @prop {Boolean} [guildOnly=true] - Whether to allow executing this command outside of guilds
 * @prop {Boolean} [hidden=false] - Whether to hide this command from help command (general / subcommands)
 * @prop {Number} [cooldown=3000] - Cooldown between each usage of this command for a specific user (in ms)
 */
class CommandOptions {
    /**
     * Creates an instance of CommandOptions.
     *
     * @param {Command} command - The base command
     * @param {Object} [override={}] - - The specific options for this command (format - CommandOptions)
     * @param {(channel: Channel, member: Member) => String | String} override.invalidPermissionMessage - What the invalid permission message should be
     * @param {Boolean} override.sendPermissionMessage - Whether to trigger an error message on invalid permission (bot / user / custom etc)
     * @param {Number} override.invalidPermissionMessageTimeout - What the invalid permission message deletion timeout should be
     * @param {Number} override.argsMin - Minimum arguments required to execute the command
     * @param {String} override.invalidUsageMessage - What the invalid usage message should be
     * @param {Boolean} override.sendUsageMessage - Whether to trigger the help command on invalid usage (not enough arguments)
     * @param {Boolean} override.deleteCommand - Whether to delete the command input after trigger
     * @param {Boolean} override.guildOnly - Whether to allow executing this command outside of guilds
     * @param {Boolean} override.hidden - Whether to hide this command from help command (general / subcommands)
     * @param {Number} override.cooldown - Cooldown between each usage of this command for a specific user (in ms)
     * @param {Boolean} [useModuleDefault=false] - Whether to use or not the module's base options before applying override permissions
     * @memberof CommandOptions
     */
    constructor(command, override = {}, useModuleDefault = false) {
        let isModule = false;
        if (!(command instanceof Command) ) {
            if (!(command instanceof Module) ) {
                throw new AxonError('First argument needs to be the Command.', 'CommandOptions');
            } else {
                isModule = true;
            }
        }
        this._command = command;

        /**
         * @type {CommandOptions}
         */
        let base;
        if (useModuleDefault && !isModule && command.module.options) {
            base = Object.assign( {}, command.module.options);
            for (const key in override) {
                base[key] = override[key];
            }
        } else {
            base = override;
        }

        // invalid permissions
        if (typeof base.invalidPermissionMessage === 'string') {
            /**
             * @type {() => String}
             */
            this.invalidPermissionMessage = () => base.invalidPermissionMessage;
        } else if (typeof base.invalidPermissionMessage === 'function') {
            this.invalidPermissionMessage = base.invalidPermissionMessage;
        } else {
            this.invalidPermissionMessage = null;
        }
        /**
         * @type {Boolean}
         */
        this.sendPermissionMessage = !!base.sendPermissionMessage;
        /**
         * @type {Number}
         */
        this.invalidPermissionMessageTimeout = base.invalidPermissionMessageTimeout !== undefined ? base.invalidPermissionMessageTimeout : 9000; // eslint-disable-line no-magic-numbers
 
        /**
         * @type {Number}
         */
        this.argsMin = base.argsMin || 0;
        /**
         * @type {String}
         */
        this.invalidUsageMessage = base.invalidUsageMessage !== undefined ? base.invalidUsageMessage : null;
        /**
         * @type {Boolean}
         */
        this.sendUsageMessage = base.sendUsageMessage !== false;
  
        /**
         * @type {Boolean}
         */
        this.deleteCommand = !!base.deleteCommand;
        /**
         * @type {Boolean}
         */
        this.guildOnly = base.guildOnly !== false;
        /**
         * @type {Boolean}
         */
        this.hidden = !!base.hidden;
        /**
         * @type {Number}
         */
        this.cooldown = (base.cooldown === 0 || base.cooldown === null) ? 0 : (base.cooldown || 3000); // eslint-disable-line no-magic-numbers
    }

    /**
     * Returns the MessageManager instance
     *
     * @readonly
     * @type {MessageManager}
     * @memberof CommandOptions
     */
    get l() {
        return this._command.l;
    }

    /**
     * Whether the command is guild only or not
     *
     * @returns {Boolean}
     * @memberof CommandOptions
     */
    isGuildOnly() {
        return this.guildOnly;
    }

    /**
     * Whether the command is hidden or not
     *
     * @returns {Boolean}
     * @memberof CommandOptions
     */
    isHidden() {
        return this.hidden;
    }
    
    /**
     * Whether args for this command are correct or not (enough args).
     *
     * @param {Array<String>} args
     * @returns {Boolean}
     * @memberof CommandOptions
     */
    hasCorrectArgs(args) {
        return (args.length >= this.argsMin);
    }

    /**
     * Whether we should send an invalid usage message or not (help command)
     *
     * @param {Array<String>} args
     * @returns {Boolean}
     * @memberof CommandOptions
     */
    shouldSendInvalidUsageMessage(args) {
        return (args.length < this.argsMin && this.sendUsageMessage && !this.hidden);
    }

    /**
     * Whether we should send the invalid permission message or not
     *
     * @param {GuildConfig} guildConfig
     * @returns {Boolean}
     * @memberof CommandOptions
     */
    shouldSendInvalidPermissionMessage(guildConfig) {
        return (!guildConfig.isModOnly() && this.sendPermissionMessage);
    }

    /**
     * Whether we should delete the command or not
     *
     * @returns {Boolean}
     * @memberof CommandOptions
     */
    shouldDeleteCommand() {
        return this.deleteCommand;
    }

    /**
     * Get the invalid permission message
     *
     * @param {Channel} channel - The guild channel
     * @param {Member} member - The guild member
     * @param {String} permission - The missing permission
     * @returns {String}
     */
    getInvalidPermissionMessage(channel, member, permission) {
        const message = this.invalidPermissionMessage
            ? this.invalidPermissionMessage(channel, member)
            : this.l.getMessage('ERR_CALLER_PERM');

        return this.l.parser.parse(message, { permissions: permission || 'Custom' } );
    }

    /**
     * Get the invalid usage message
     *
     * @returns {String}
     */
    getInvalidUsageMessage() {
        return this.invalidUsageMessage;
    }
}

export default CommandOptions;
