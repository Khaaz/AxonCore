'use strict';

// Core
import Base from './Base';

import Command from './Command';
import EventF from './EventF';

// Error
import AxonError from '../Errors/AxonError';

// Utility
import Collection from '../Utility/Collection';
import Enum from '../Utility/Enums';

/**
 * AxonCore - Module constructor
 * Register a Module with an Object of Commands, an Object of Events, an Object of Schemas
 * Register/unregister
 *
 * @author KhaaZ
 *
 * @class Module
 * @extends Base
 */
class Module extends Base {
    /**
     * Creates an instance of Module.
     *
     * @param {Object<AxonClient>} client
     *
     * @prop {Object<AxonClient>} axon - Axon Client [GETTER: _axon]
     * @prop {Object<Eris.Client>} bot - Eris bot Client [GETTER: _axon.client]
     * @prop {Object} Logger - Logger Object/Methods [GETTER: axon.Logger]
     * @prop {Object} Resolver - Resolver Object/Methods [GETTER: axon.Resolver]
     * @prop {Object} AxonUtils - AxonUtils Object/Methods [GETTER: axon.AxonUtils]
     * @prop {Object} Utils - Utils Object/Methods [GETTER: axon.Utils]
     *
     * @prop {String} label - Module label (name/id)
     * @prop {Collection<Command>} commands - Collection of Commands in the modules [key: label, value: command Obj]
     * @prop {Collection<EventF>} events - Collection of Events in the modules [key: label, value: event Obj]
     * @prop {Collection<Object>} events - Collection of SChemas in the modules [key: label, value: schema Obj]
     * @prop {Boolean} [enabled=true] - Module enabled
     * @prop {Boolean} [serverBypass=false] - Module can't be server disabled
     * @prop {Object} info - Default infos about the module
     * - name(String)
     * - category(String)
     * - description(String)
     *
     * @memberof Module
     */
    constructor(client) {
        super(client);

        this.label = 'moduleLabel';

        /**
         * Containments - all commands and events within this module
         */
        this.commands = new Collection(Command);
        this.events = new Collection(EventF);
        this.schemas = new Collection();

        /**
         * Default option and params
         */
        this.enabled = true; // global enable/disable
        this.serverBypass = false; // Bypass all perms - true = prevent the command to be server disabled

        /**
         * Infos - help command
         * All fields are required
         */
        this.infos = {
            name: 'moduleName',
            category: 'category',
            description: 'moduleDesc',
        };
    }

    //
    // ****** GETTER ******
    //


    //
    // ****** CORE ******
    //

    /**
     * Init a module with all commands and events.
     * (called at the end of every Module contructor with correct parameters)
     *
     * @param {Object<Commands>} commands - Object containing all events object
     * @param {Object<EventFs>} events - Object containing all events object
     * @param {Object<Schemas>} events - Object containing all schema object
     */
    init(commands, events, schemas) {
        commands && this.initAllCommands(commands);
        events && this.initAllEvents(events);
        schemas && this.initAllSchemas(schemas);
    }

    /**
     * Init and construct all commands for the list of commands given in param
     * (imported as a global object from index.js file)
     *
     * @param {Object<Commands>} commands - Object of commands imported from index.js (list all parents commands)
     * @memberof Module
     */
    initAllCommands(commands) {
        for (const [, Value] of Object.entries(commands)) {
            const newCmd = new Value(this);
            if (newCmd.hasSubcmd) {
                newCmd.subCommands = new Collection(Command);
                newCmd.subCommandsAliases = new Map();
                this.initSubCommands(newCmd);
            }
            delete newCmd.subcmds;
            this.registerCommand(newCmd);
        }
    }

    /**
     * Init and construct/instance all subcommand for the parent comand
     *
     * @param {Object<Command>} command - The command Object
     * @memberof Command
     */
    initSubCommands(command) {
        if (!command.subCommands || !command.subcmds.length) {
            throw new AxonError(`Command   : ${command.label} - Couldn't init subcommands.`, 'INIT', `Module(${this.label})`);
        }

        for (const [, Value] of Object.entries(command.subcmds)) {
            const newSubcmd = new Value(this);
            if (!newSubcmd.isSubcmd) {
                throw new AxonError(`Command   : ${command.label} ${newSubcmd.label} - Couldn't init subcommand: Not a subcommand.`, 'INIT', `Module(${this.label})`);
            }

            if (newSubcmd.hasSubcmd) {
                newSubcmd.subCommands = new Collection(Command);
                newSubcmd.subCommandsAliases = new Map();
                this.initSubCommands(newSubcmd);
            }
            delete newSubcmd.subcmds;

            this.registerSubCommand(command, newSubcmd);
        }
    }

    /**
     * Check that the command respect default check
     * Add it to the Module.
     *
     * @param {Object<Command>} command - Command object
     * @memberof Module
     */
    registerCommand(command) {
        if (command.label.includes(' ')) {
            throw new AxonError(`Command: ${command.label} - Command label may not have spaces.`, 'INIT', `Module(${this.label})`);
        }
        if (this.commands.has(command.label)) {
            throw new AxonError(`Command: ${command.label} - You have already registered a command in this module.`, 'INIT', `Module(${this.label})`);
        }

        if (!this.checkAttributes(command)) {
            throw new AxonError(`Command: ${command.label} - Invalid attributes format (permissions).`, 'INIT', `Module(${this.label})`);
        }

        this.commands.set(command.label, command); // add the command to the Map of commands.
        this.axon.Logger.initCommand(command);
    }

    /**
     * Remove a command from a module
     *
     * @param {String} label - Full command label
     * @memberof Module
     */
    unregisterCommand(fullLabel) {
        const command = this.getCommand(fullLabel);

        if (!command) {
            throw new AxonError(`${this.label} - Command: ${fullLabel} not registered!`, 'INIT');
        }

        /** Unregister command */
        if (command.isSubcmd) {
            this.unregisterSubCommand(command.parentCommand, command);
        } else {
            for (const alias of command.aliases) {
                this.axon.commandAliases.delete(alias);
            }
            this.commands.delete(command.label);
            this.axon.commands.delete(command.label);
        }

        this.axon.Logger.info(`Command: ${fullLabel} unregistered!`);
    }

    /**
     * Check that the subcmd respect default check
     * Add it to the command parent.
     *
     * @param {Object<Command>} command - Command object
     * @param {Object<Command>} subCommand - Subcommand object
     * @memberof Module
     */
    registerSubCommand(command, subCommand) {
        if (subCommand.label.includes(' ')) {
            throw new AxonError(`Command: ${command.label} ${subCommand.label} - Command label may not have spaces.`, 'INIT', `Module(${this.label})`);
        }
        if (command.subCommands.has(subCommand.label)) {
            throw new AxonError(`Command: ${command.label} ${subCommand.label} - You have already registered a subCommand for this command.`, 'INIT', `Module(${this.label})`);
        }

        if (!this.checkAttributes(subCommand)) {
            throw new AxonError(`Command: ${command.label} ${subCommand.label} - Invalid attributes format (permissions).`, 'INIT', `Module(${this.label})`);
        }

        for (const alias of subCommand.aliases) {
            if (command.subCommandsAliases.has(alias)) {
                throw new AxonError(`Command: ${command.label} ${subCommand.label} - Alias: ${alias} already registered!.`, 'INIT', `Module(${this.label})`);
            }
            command.subCommandsAliases.set(alias, subCommand.label); // add the commands aliases in aliases Map (references to the command label)
        }
        subCommand.parentCommand = command;
        command.subCommands.set(subCommand.label, subCommand); // add the command to the Map of commands.
        this.axon.Logger.initSubCmd(subCommand);
    }

    /**
     * Remove a subcommand from a command
     *
     * @param {Object<Command>} command - Parent command Object
     * @param {Object<Command>} command - Subcommand Object
     * @memberof Module
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

    initAllSchemas(schemas) {
        for (const [key, value] of Object.entries(schemas)) {
            if (this.schemas.has(key)) {
                throw new Error(`[INIT](${this.label}) - Schemas: ${key} - You have already registered a schema in this module.`);
            }
            this.schemas(key, value);
        }
    }

    /**
     * Check that the Event respect default check
     * Add it to the Module.
     *
     * @param {Object<EventF>} event - Event object
     * @memberof Module
     */
    registerEvent(event) {
        if (event.label.includes(' ')) {
            throw new Error(`[INIT](${this.label}) - Event: ${event.label} - Event label may not have spaces`);
        }
        if (this.events.has(event.label)) {
            throw new Error(`[INIT](${this.label}) - Event: ${event.label} - You have already registered an event in this module.`);
        }

        // if ( !this.checkAttributes(event) ) {
        //    throw new Error(`[INIT](${this.label}) - Event ${event.label} Invalid attributes format.`);
        // }

        this.events.set(event.label, event); // add the command to the Map of commands.

        this.axon.Logger.initEvent(`-Event-   : ${event.label} - Event ready. [Module: ${this.label}]`);
    }

    /**
     * Init and construct all events for the list of events given in param
     * (imported as a global object from index.js file)
     *
     * @param {Object<EventFs>} events - Object of events imported from index.js (list all events)
     * @memberof Module
     */
    initAllEvents(events) {
        for (const [, Value] of Object.entries(events)) {
            const newEvent = new Value(this);
            this.registerEvent(newEvent);
        }
    }

    /**
     * Check if the attribute of the command are valid
     * (valid names/ no missing etc)
     *
     * @param {Object<Command>} command - The Command Object
     * @returns {Boolean} True if no problem / False if one invalid
     * @memberof Module
     */
    checkAttributes(command) {
        for (const perm of command.permissions.bot) {
            if (!this.checkValidPermNames(perm)) {
                return false;
            }
        }

        for (const perm of command.permissions.user.needed) {
            if (!this.checkValidPermNames(perm)) {
                return false;
            }
        }

        for (const perm of command.permissions.user.bypass) {
            if (!this.checkValidPermNames(perm)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if the permissions names are valid
     *
     * @param {String} perm - Name of a permission
     * @returns {Boolean} True if yes / False if the name doesn't exist
     * @memberof Module
     */
    checkValidPermNames(perm) {
        if (Enum.permissions.find(p => p === perm)) {
            return true;
        }
        return false;
    }
}

export default Module;
