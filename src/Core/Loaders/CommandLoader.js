import ALoader from './ALoader';
import Command from '../Command/Command';

import Validator from '../Validator';

import AxonError from '../../Errors/AxonError';

/**
 * @typedef {import('../Module').default} Module
 * @typedef {import('../../AxonClient').default} AxonClient
 * @typedef {import('../Stores/CommandRegistry').default} CommandRegistry
 */

/**
 * Load commands in a Module.
 * Validate the command validity entirely.
 *
 * @author KhaaZ
 *
 * @class CommandLoader
 * @extends ALoader<Command>
 */
class CommandLoader extends ALoader {
    /**
     * Creates an instance of CommandLoader
     * @param {Module} module
     */
    constructor(module) {
        super(module.axon);
        this._module = module;
    }

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     * @memberof CommandLoader
     */
    get axon() {
        return this.loadIn;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Logger}
     * @memberof CommandLoader
     */
    get logger() {
        return this._module.logger;
    }

    /**
     * Load one command instance in the module.
     * Validate and correct the command before registering it.
     *
     * @param {Command} command - The command to load
     * @param {CommandRegistry} parent - The registry to load the command into
     * @returns {Boolean}
     * @memberof CommandLoader
     */
    load(command, registry) {
        if (!(command instanceof Command) ) {
            throw new AxonError(`[${command.toString()}] Not a Command!`, 'COMMAND-LOADER', this._module.label);
        }

        if (command.label.includes(' ') ) {
            throw new AxonError(`[${command.label}] Command label may not have spaces!`, 'COMMAND-LOADER', this._module.label);
        }

        if (!Validator.validCommand(command) ) {
            throw new AxonError(`[${command.label}] Invalid Command (enable debugMode)!`, 'COMMAND-LOADER', this._module.label);
        }

        this.registerCommand(command, registry);
        
        return true;
    }

    /**
     * Load all commands in the module.
     * Instantiate all commands.
     *
     * @param {Object.<string, Command>} commands
     * @returns {Boolean}
     * @memberof CommandLoader
     */
    loadAll(commands) {
        if (commands.default) {
            this.logger.error(`[${this._module.label}] Commands: No commands found.`);
            return false;
        }
        for (const Value of Object.values(commands) ) {
            const command = new Value(this._module);
            try {
                this.load(command, this.axon.commandRegistry);
            } catch (err) {
                this.logger.error(err);
            }
        }

        return true;
    }
    
    /**
     * Init and construct/instance all subcommands of the given parent command
     *
     * @param {Command} parentCommand - The command Object
     * @param {Array<Command>} subCommands - Array of Command class to load
     * @returns {Boolean} - Wether it loaded the subcommands or not
     * @memberof Command
     */
    loadSubCommands(parentCommand, subCommands) {
        /* No subCommands */
        if (!parentCommand.subCommands || !subCommands.length) {
            this.logger.error(`[Module(${this._module.label})] Command: ${parentCommand.fullLabel} - Couldn't init subcommands.`);
            return false;
        }

        for (const Value of Object.values(subCommands) ) {
            const subCommand = new Value(this._module);
            try {
                this.load(subCommand, parentCommand.subCommands);
                subCommand.parentCommand = parentCommand;
            } catch (err) {
                this.logger.error(err);
            }
        }
        return true;
    }

    /**
     * Unload a Command from the client
     *
     * @param {String} label - The Command label to unload
     * @returns {Boolean} Whether it worked
     * @memberof CommandLoader
     */
    unload(label) {
        this.axon.commandRegistry.unregister(label);
        return true;
    }

    // **** REGISTERING **** //

    /**
     * Register a Command. Register its subcommands if it has any.
     *
     * @param {Command} command - Command object
     * @param {CommandRegistry} registry - The registry to register the command into
     * @memberof CommandLoader
     */
    registerCommand(command, registry) {
        command._init();

        registry.register(command.label, command); // add the command to the Map of commands.
    }

    /**
     * Remove a command from the module and the global cache.
     *
     * @param {String} fullLabel - Full command label
     * @returns {Boolean} True if successful / Error otherwise
     * @memberof CommandLoader
     */
    unregisterCommand(fullLabel) {
        const command = this._module.getCommand(fullLabel);

        if (!command) {
            throw new AxonError(`Command: ${fullLabel} not registered!`, 'COMMAND-LOADER', this._module.label);
        }

        /* Unregister command */
        if (command.parentCommand) {
            this.unregisterSubCommand(command.parentCommand, command);
        } else {
            this.axon.commandRegistry.unregister(command.label, command);
        }
        return true;
    }

    /**
     * Remove a subcommand from a command
     *
     * @param {Command} command - The parent Command
     * @param {Command} subCommand - The Subcommand to unregister
     * @memberof CommandLoader
     */
    unregisterSubCommand(command, subCommand) {
        command.subCommands.unregister(subCommand.label, subCommand);
        if (command.subCommands.size === 0) {
            command.hasSubcmd = false;
        }
    }
}

export default CommandLoader;
