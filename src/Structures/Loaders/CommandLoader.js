import Loader from './Loader';

import Collection from '../../Utility/Collection';
import Validater from '../Validater';
import Command from '../Command/Command';

import AxonError from '../../Errors/AxonError';

/**
 * Load commands in a Module.
 * Validate the command validity entirely.
 *
 * @class CommandLoader
 * @extends {Loader}
 */
class CommandLoader extends Loader {
    // eslint-disable-next-line no-useless-constructor
    constructor(module) {
        super(module);
    }

    /**
     * Returns the Module instance
     *
     * @readonly
     * @type {Object<Module>}
     * @memberof CommandLoader
     */
    get module() {
        return this.loadIn;
    }

    /**
     * Returns the Logger instance
     *
     * @readonly
     * @type {Object<Logger>}
     * @memberof CommandLoader
     */
    get logger() {
        return this.module.logger;
    }

    /**
     * Load one command instance in the module.
     * Validate and correct the command before registering it.
     *
     * @param {Object<Command>} command - The command to load
     * @param {Object<Command>} [parent=null] - The optional parent command
     * @returns {Boolean}
     *
     * @memberof CommandLoader
     */
    load(command, parent = null) {
        if (!(command instanceof Command) ) {
            this.logger.error(`[Module(${this.label})] Command: ${command.toString()} - Not a Command.`);
            return false;
        }

        if (command.label.includes(' ') ) {
            this.logger.error(`[Module(${this.label})] Command: ${command.fullLabel} - Command label may not have spaces.`);
            return false;
        }

        if (!parent && this.module.commands.has(command.label) ) {
            this.logger.error(`[Module(${this.label})] Command: ${command.fullLabel} - You have already registered a command in this module.`);
            return false;
        }

        if (parent && parent.subCommands.has(command.label) ) {
            this.logger.error(`[Module(${this.module.label})] Command: ${command.fullLabel} - You have already registered a subCommand for this command.`);
            return false;
        }

        if (!Validater.validCommand(command) ) {
            this.logger.error(`[Module(${this.module.label})] Command: ${command.fullLabel} - Invalid command (active debugMode for details).`);
            return false;
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
     * @param {Object<Command>} commands
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
            this.load(command);
        }

        return true;
    }
    
    /**
     * Init and construct/instance all subcommands of the given parent comand
     *
     * @param {Object<Command>} command - The command Object
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

    // **** REGISTERING **** //

    /**
     * Register a Command. Register its subcommands if it has any.
     *
     * @param {Object<Command>} command - Command object
     *
     * @memberof CommandLoader
     */
    registerCommand(command) {
        if (command.hasSubcmd) {
            command.subCommands = new Collection( { base: Command } );
            command.subCommandsAliases = new Map();
            this.loadSubCommands(command);
        }
        delete command.subcmds;
       
        this.module.commands.set(command.label, command); // add the command to the Map of commands.
        this.logger._initCommand(command);
    }

    /**
     * Register a SubCommand.Register its subcommands if it has any
     *
     * @param {Object<Commands>} command - The subcommand to register
     * @param {Object<Commands>} parent - The parent command
     *
     * @memberof CommandLoader
     */
    registerSubCommand(command, parent) {
        if (command.hasSubcmd) {
            command.subCommands = new Collection( { base: Command } );
            command.subCommandsAliases = new Map();
            this.loadSubCommands(command);
        }
        delete command.subcmds;
        
        // assign parentCommand
        command.parentCommand = parent;

        for (const alias of command.aliases) {
            if (parent.subCommandsAliases.has(alias) ) {
                this.logger.warn(`[Module(${this.module.label})] Command: ${command.fullLabel} - Alias: ${alias} already registered!.`);
                break;
            }
            parent.subCommandsAliases.set(alias, command.label); // add the commands aliases in aliases Map (references to the command label)
        }
        
        parent.subCommands.set(command.label, command); // add the command to the Map of commands.
        this.logger._initSubCmd(command);
    }

    /**
     * Remove a command from the module and the global cache.
     *
     * @param {String} fullLabel - Full command label**
     * @returns {Boolean} True if successful / Error otherwise
     *
     * @memberof CommandLoader
     */
    unregisterCommand(fullLabel) {
        const command = this.module.getCommand(fullLabel);

        if (!command) {
            throw new AxonError(`Command: ${fullLabel} not registered!`, 'UNREGISTER-Command', this.module.label);
        }

        /* Unregister command */
        if (command.isSubcmd) {
            this.unregisterSubCommand(command.parentCommand, command);
        } else {
            for (const alias of command.aliases) {
                this.module.axon.commandAliases.delete(alias);
            }
            this.module.commands.delete(command.label);
            this.module.axon.commands.delete(command.label);
        }

        this.logger.info(`[Module(${this.module.label})] Command: ${fullLabel} unregistered!`);
        return true;
    }

    /**
     * Remove a subcommand from a command
     *
     * @param {Object<Command>} command - The parent Command
     * @param {Object<Command>} subCommand - The Subcommand to unregister
     *
     * @memberof CommandLoader
     */
    unregisterSubCommand(command, subCommand) {
        for (const alias of subCommand.aliases) {
            command.subCommandsAliases.delete(alias);
        }
        command.subCommands.delete(subCommand.label);
        if (command.subCommands.size === 0) {
            command.hasSubcmd = false;
        }
    }
}

export default CommandLoader;
