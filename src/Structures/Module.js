'use strict';

// Core
import Base from './Base';

import Command from './Command';
import Event from './Event';

// Error
import AxonError from '../Errors/AxonError';

// Utility
import Collection from '../Utility/Collection';
import EnsureInterface from './EnsureInterface';

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
     * @prop {Collection<Event>} events - Collection of Events in the modules [key: label, value: event Obj]
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
        this.events = new Collection(Event);
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
     * @param {Object<Events>} events - Object containing all events object
     * @param {Object<Schemas>} events - Object containing all schema object
     */
    init(commands, events, schemas) {
        commands && this.initAllCommands(commands);
        events && this.initAllEvents(events);
        schemas && this.initAllSchemas(schemas);
    }

    /**
     * Init and construct all commands from the list of commands given in param
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
     * Init and construct all events from the list of events given in param
     * (imported as a global object from index.js file)
     *
     * @param {Object<Events>} events - Object of events imported from index.js (list all events)
     * @memberof Module
     */
    initAllEvents(events) {
        for (const [, Value] of Object.entries(events)) {
            const newEvent = new Value(this);
            this.registerEvent(newEvent);
        }
    }

    /**
     * Init all schemas from the list of schemas given in param into a Collection
     * (imported as a global object from index.js file)
     *
     * @param {Object<Schemas>} schemas - Object of schemas imported from index.js (list all schemas)
     * @memberof Module
     */
    initAllSchemas(schemas) {
        for (const [key, value] of Object.entries(schemas)) {
            this.registerSchema(key, value);
        }
    }

    /**
     * Init and construct/instance all subcommand from the parent comand
     *
     * @param {Object<Command>} command - The command Object
     * @memberof Command
     */
    initSubCommands(command) {
        if (!command.subCommands || !command.subcmds.length) {
            this.Logger.error(`[Module(${this.label})] Command: ${command.label} - Couldn't init subcommands.`);
            return;
        }

        for (const [, Value] of Object.entries(command.subcmds)) {
            const newSubcmd = new Value(this);
            if (!newSubcmd.isSubcmd) {
                this.Logger.error(`[Module(${this.label})] Command: ${command.label} ${newSubcmd.label} - Couldn't init subcommand: Not a subcommand.`);
                break;
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
     * Register a Command (ensure validity)
     * Add it to the Module.
     *
     * @param {Object<Command>} command - Command object
     * @returns {Boolean} True if worked / False if not
     * @memberof Module
     */
    registerCommand(command) {
        if (command.label.includes(' ')) {
            this.Logger.error(`[Module(${this.label})]Command: ${command.label} - Command label may not have spaces.`);
            return false;
        }
        if (this.commands.has(command.label)) {
            this.Logger.error(`[Module(${this.label})] Command: ${command.label} - You have already registered a command in this module.`);
            return false;
        }

        if (!EnsureInterface.checkCommandAttributes(this, command)) {
            this.Logger.error(`[Module(${this.label})] Command: ${command.label} - Invalid attributes format (permissions).`);
            return false;
        }

        this.commands.set(command.label, command); // add the command to the Map of commands.
        this.Logger.initCommand(command);
        return true;
    }

    /**
     * Register a SubCommand (ensure valitidy)
     * Add it to the command parent.
     *
     * @param {Object<Command>} command - Command object
     * @param {Object<Command>} subCommand - Subcommand object
     * @returns {Boolean} True if worked / False if not
     * @memberof Module
     */
    registerSubCommand(command, subCommand) {
        if (subCommand.label.includes(' ')) {
            this.Logger.error(`[Module(${this.label})] Command: ${command.label} ${subCommand.label} - Command label may not have spaces.`);
            return false;
        }
        if (command.subCommands.has(subCommand.label)) {
            this.Logger.error(`[Module(${this.label})] Command: ${command.label} ${subCommand.label} - You have already registered a subCommand for this command.`);
            return false;
        }

        // assign parentCommand
        subCommand.parentCommand = command;

        if (!EnsureInterface.checkCommandAttributes(this, subCommand)) {
            this.Logger.error(`[Module(${this.label})] Command: ${command.label} ${subCommand.label} - Invalid attributes format (permissions).`);
            return false;
        }

        for (const alias of subCommand.aliases) {
            if (command.subCommandsAliases.has(alias)) {
                this.Logger.warn(`[Module(${this.label})] Command: ${command.label} ${subCommand.label} - Alias: ${alias} already registered!.`);
                break;
            }
            command.subCommandsAliases.set(alias, subCommand.label); // add the commands aliases in aliases Map (references to the command label)
        }

        command.subCommands.set(subCommand.label, subCommand); // add the command to the Map of commands.
        this.Logger.initSubCmd(subCommand);
        return true;
    }

    /**
     * Register an Event (ensure valitidy)
     * Add it to the Module.
     *
     * @param {Object<Event>} event - Event object
     * @returns {Boolean} True if worked / False if not
     * @memberof Module
     */
    registerEvent(event) {
        if (event.label.includes(' ')) {
            this.Logger.error(`[Module(${this.label})] Event: ${event.label} - Event label may not have spaces`);
            return false;
        }
        if (this.events.has(event.label)) {
            this.Logger.error(`[Module(${this.label})] Event: ${event.label} - You have already registered an event in this module.`);
            return false;
        }

        this.events.set(event.label, event); // add the event to the Collection of events.
        return true;
    }

    /**
     * Register a Schema into a module
     *
     * @param {String} key - The Schema name
     * @param {Object} schema - The Schema object
     * @returns {Boolean} True if worked / Error if not
     * @memberof Module
     */
    registerSchema(key, schema) {
        if (this.schemas.has(key)) {
            throw new AxonError(`[Module](${this.label}) - Schemas: ${key} - You have already registered a schema in this module.`, 'INIT');
        }
        this.schemas(key, schema);
        return true;
    }

    /**
     * Remove a command from a Module and from the global cache
     *
     * @param {String} label - Full command label
     * @returns {Boolean} True if worked / Error if not
     * @memberof Module
     */
    unregisterCommand(fullLabel) {
        const command = this.getCommand(fullLabel);

        if (!command) {
            throw new AxonError(`[Module(${this.label})] Command: ${fullLabel} not registered!`, 'UNREGISTER');
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

        this.Logger.info(`[Module(${this.label})] Command: ${fullLabel} unregistered!`);
        return true;
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

    /**
     * Remove a schema from Module and global cache
     *
     * @param {String} label - The SChema label
     * @returns {Boolean} True if worked / Error if not
     * @memberof Module
     */
    unregisterSchema(label) {
        if (!this.schemas.has(label)) {
            throw new AxonError(`[Module(${this.label})] Schema: ${label} not registered!`, 'UNREGISTER');
        }
        this.schemas.delete(label);
        this.axon.schemas.delete(label);
        this.Logger.info(`[Module(${this.label})] Schema: ${label} unregistered!`);
        return true;
    }

    /**
     * Remove an Event from Module and Event Manager
     *
     * @param {String} label - The Event label
     * @returns {Boolean} True if worked / Error if not
     * @memberof Module
     */
    unregisterEvent(label) {
        const event = this.events.get(label);
        if (!event) {
            throw new AxonError(`[Module(${this.label})] Event: ${label} not registered!`, 'UNREGISTER');
        }
        this.events.delete(event.label);
        this.axon.EventManager.unregisterListener(event.eventName, event.label);
        this.Logger.info(`[Module(${this.label})] Event: ${label} unregistered!`);
        return true;
    }
}

export default Module;
