import Loader from './Loader';

import Validater from '../Validater';
import Command from '../Command/Command';

import AxonError from '../../Errors/AxonError';
import CommandRegistry from './../Stores/CommandRegistry';

/**
 * Load commands in a Module.
 * Validate the command validity entirely.
 *
 * @author KhaaZ
 *
 * @class CommandLoader
 * @extends Loader
 */
class CommandLoader extends Loader {
    constructor(module) {
        super(module.axon);
        this._module = module;
    }

    /**
     * Returns the AxonClient instance
     *
     * @readonly
     * @type {AxonClient}
     *
     * @memberof CommandLoader
     */
    get axon() {
        return this.loadIn;
    }

    /**
     * Returns the Module instance
     *
     * @readonly
     * @type {Module}
     *
     * @memberof CommandLoader
     */
    get module() {
        return this._module;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Logger}
     *
     * @memberof CommandLoader
     */
    get logger() {
        return this.module.logger;
    }

    /**
     * Load one command instance in the module.
     * Validate and correct the command before registering it.
     *
     * @param {Command} command - The command to load
     * @param {Command} [parent=null] - The optional parent command
     * @returns {Boolean}
     *
     * @memberof CommandLoader
     */
    load(command, parent = null) {
        if (!(command instanceof Command) ) {
            throw new AxonError(`[${command.toString()}] Not a Command!`, 'COMMAND-LOADER', this.module.label);
        }

        if (command.label.includes(' ') ) {
            throw new AxonError(`[${command.label}] Command label may not have spaces!`, 'COMMAND-LOADER', this.module.label);
        }

        if (!Validater.validCommand(command) ) {
            throw new AxonError(`[${command.label}] Invalid Command (enable debugMode)!`, 'COMMAND-LOADER', this.module.label);
        }

        if (parent) {
            this.registerSubCommand(command, parent);
        } else {
            this.registerCommand(command);
        }
        return true;
    }

    /**
     * Load all commands in the module.
     * Instantiate all commands.
     *
     * @param {Command} commands
     * @returns {Boolean}
     *
     * @memberof CommandLoader
     */
    loadAll(commands) {
        if (commands.default) {
            this.logger.error(`[Module(${this.module.label})] Commands: No commands found.`);
            return false;
        }
        for (const Value of Object.values(commands) ) {
            const command = new Value(this.module);
            try {
                this.load(command);
            } catch (err) {
                this.logger(err);
            }
        }

        return true;
    }
    
    /**
     * Init and construct/instance all subcommands of the given parent comand
     *
     * @param {Command} command - The command Object
     * @memberof Command
     */
    loadSubCommands(parentCommand) {
        /* No subCommands */
        if (!parentCommand.subCommands || !parentCommand.subcmds.length) {
            this.logger.error(`[Module(${this.module.label})] Command: ${parentCommand.fullLabel} - Couldn't init subcommands.`);
            return;
        }

        for (const Value of Object.values(parentCommand.subcmds) ) {
            const subCommand = new Value(this.module);
            if (!subCommand.isSubcmd) {
                this.logger.error(`[Module(${this.module.label})] Command: ${subCommand.fullLabel} - Couldn't load subcommand: Not a subcommand.`);
                break;
            }
            this.load(subCommand, parentCommand);
        }
    }

    /**
     * Unload a Command from the client
     *
     * @param {String} label - The Command label to unload
     * @returns {Boolean} Whether it worked
     *
     * @memberof CommandLoader
     */
    unload(label) {
        this.axon.commands.unregister(label);
        this.logger.info(`Module: ${module.label} unregistered!`);
        return true;
    }

    // **** REGISTERING **** //

    /**
     * Register a Command. Register its subcommands if it has any.
     *
     * @param {Command} command - Command object
     *
     * @memberof CommandLoader
     */
    registerCommand(command) {
        if (command.hasSubcmd) {
            command.subCommands = new CommandRegistry(command.axon);
            this.loadSubCommands(command);
        }
        delete command.subcmds;
       
        this.axon.commands.register(command.label, command); // add the command to the Map of commands.
        this.logger.info(command.hasSubcmd
            ? `[CMD] => Initialised! | SubCommands loaded -${command.subCommands.size}- | *${command.label}*`
            : `[CMD] => Initialised! | *${command.label}*`);
    }

    /**
     * Register a SubCommand.Register its subcommands if it has any
     *
     * @param {Commands} command - The subcommand to register
     * @param {Commands} parent - The parent command
     *
     * @memberof CommandLoader
     */
    registerSubCommand(command, parent) {
        if (command.hasSubcmd) {
            command.subCommands = new CommandRegistry(command.axon);
            this.loadSubCommands(command);
        }
        delete command.subcmds;
        
        // assign parentCommand
        command.parentCommand = parent;

        parent.subCommands.register(command.label, command);
        this.logger.info(command.hasSubcmd
            ? `[SUB] => Initialised! | SubCommands loaded -${command.subCommands.size}- | ${command.label}`
            : `[SUB] => Initialised! | ${command.label}`);
    }

    /**
     * Remove a command from the module and the global cache.
     *
     * @param {String} fullLabel - Full command label
     * @returns {Boolean} True if successful / Error otherwise
     *
     * @memberof CommandLoader
     */
    unregisterCommand(fullLabel) {
        const command = this.module.getCommand(fullLabel);

        if (!command) {
            throw new AxonError(`Command: ${fullLabel} not registered!`, 'COMMAND-LOADER', this.module.label);
        }

        /* Unregister command */
        if (command.isSubcmd) {
            this.unregisterSubCommand(command.parentCommand, command);
        } else {
            this.axon.commands.unregister(command.label, command);
        }

        this.logger.info(`[Module(${this.module.label})] Command: ${fullLabel} unregistered!`);
        return true;
    }

    /**
     * Remove a subcommand from a command
     *
     * @param {Command} command - The parent Command
     * @param {Command} subCommand - The Subcommand to unregister
     *
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
