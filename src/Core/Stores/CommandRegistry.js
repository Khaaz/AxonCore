import ARegistry from './ARegistry';

import Command from '../Command/Command';
import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('../Models/GuildConfig').default} GuildConfig
 */

/**
 * Registry that holds all Commands.
 *
 * @author KhaaZ
 *
 * @prop {Map} aliases - All commands aliases.
 *
 * @class CommandRegistry
 * @extends ARegistry<Command>
 */
class CommandRegistry extends ARegistry {
    /**
     * Creates an instance of CommandRegistry
     * @param {AxonClient} axon
     */
    constructor(axon) {
        super(axon, Command);

        /**
         * @type {Map<String|Number, String>}
         */
        this.aliases = new Map();
    }

    /**
     * Get a command with its label
     *
     * @param {String} cmd - The command label
     * @returns {Command} The found command
     * @memberof CommandRegistry
     */
    get(cmd) {
        const label = this.aliases.get(cmd);
        if (!label) {
            return null;
        }
        return this.registry.get(label) || null;
    }

    /**
     * Get a command/subcommand with the given full label.
     *
     * @param {Array<String>} splitLabel - Full command (or subcommand) label
     * @returns {Command|null}
     * @memberof CommandRegistry
     */
    getFull(splitLabel) {
        const command = this.get(splitLabel[0].toLowerCase() );
        if (!command) {
            return null;
        }

        splitLabel.shift();
        if (splitLabel.length !== 0) {
            return command.subCommands.getFull(splitLabel) || null;
        }
        return command;
    }

    /**
     * Register a Command inside the CommandRegistry
     *
     * @param {String} label - The command label
     * @param {Command} command - The command object
     * @memberof CommandRegistry
     */
    register(label, command) {
        if (this.registry.has(label) ) {
            throw new AxonError(`Register [${label}]: Already registered!`, 'COMMAND-REGISTRY', command.module.label);
        }
        this.add(label, command);

        for (const alias of command.aliases) {
            if (this.aliases.has(alias) ) {
                this.axon.logger.error(new AxonError(`Register [${label}] (Alias - ${alias}): Already registered!`, 'COMMAND-REGISTRY', command.module.label) );
            } else {
                this.aliases.set(alias, label);
            }
        }
        this.axon.logger.info(command.hasSubcmd
            ? `[CMD] => Registered: [${command.module.label}(${command.label})] | SubCommands loaded -${command.subCommands.size}-`
            : `[CMD] => Registered: [${command.module.label}(${command.label})]`);
    }

    /**
     * Unregister a Command from the CommandRegistry
     *
     * @param {String} label - The command label
     * @param {Command} [command=null] - The command object
     * @memberof CommandRegistry
     */
    unregister(label, command = null) {
        if (!command) {
            command = this.getFull(label.split(' ') );
        }

        if (!command) {
            throw new AxonError(`Unregister [${label}]: Not registered!`, 'COMMAND-REGISTRY', command.module.label);
        }

        for (const alias of command.aliases) {
            this.aliases.delete(alias);
        }
        this.remove(label);

        this.axon.logger.info(`[CMD] => Unregistered: [${command.module.label}(${label})]!`);
    }

    /**
     * Resolves the command Object. Only resolves the command if it's not globally disabled.
     * Doesn't resolve the command if the command is guild disabled.
     *
     * @param {String} label - The command label/ command alias
     * @param {Array<String>} args - Array of arguments
     * @param {GuildConfig} [guildConfig=null] - GuildConfig
     * @returns {Command|null} The command object or null if the command doesn't exist or is not enabled
     * @memberof CommandRegistry
     */
    resolve(label, args, guildConfig = null) {
        label = this.aliases.get(label);
        if (!label) {
            return null;
        }
        const command = this.registry.get(label);
        // not existing / global disable
        if (!command || !command.module.enabled || !command.enabled) {
            return null;
        }

        // server disable
        if (guildConfig
            && (
                (guildConfig.isModuleDisabled(command.module) && !command.module.serverBypass) // module server-disabled
                || (guildConfig.isCommandDisabled(command) && !command.serverBypass) // command server-disabled
            )
        ) {
            return null;
        }

        if (command.hasSubcmd) {
            const sub = command.subCommands.resolve(args[0], args.slice(1) );
            if (sub) {
                args.shift();
            }
            return sub || command;
        }
        return command;
    }
}

export default CommandRegistry;
