// Core
import Base from './Base';

import CommandLoader from './Loaders/CommandLoader';
import ListenerLoader from './Loaders/ListenerLoader';

import Collection from '../Utility/Collection';

import Command from './Command/Command';
import Listener from './Listener';
import CommandPermissions from './Command/CommandPermissions';
import CommandOptions from './Command/CommandOptions';

/**
 * AxonCore Module.
 * A Module holds commands and listeners.
 * It also has default CommandOptions and CommandPermissions that can potentially be used as base when creating a Command.
 *
 * @author KhaaZ
 *
 * @class Module
 * @extends Base
 *
 * @prop {String} label - Module label (name/id)
 * @prop {Collection<Command>} commands - Collection of commands in the module [key: label, value: command Obj]
 * @prop {Collection<Listener>} listeners - Collection of events in the module [key: label, value: listener Obj]
 * @prop {Boolean} [enabled=true] - Whether the module is enabled or not
 * @prop {Boolean} [serverBypass=false] - Whether the module can be disabled or not (will bypass guild disabled)
 * @prop {Object} info - Default info about the module
 * @prop {String} [info.name]
 * @prop {String} [info.category]
 * @prop {String} [info.description]
 * @prop {Object<CommandPermissions>} permissions - Default values potentially used for CommandPermissions
 * @prop {Object<CommandOptions>} options - Default values potentially used  for CommandOptions
 *
 * @prop {Object<CommandLoader>} commandLoader - Load all commands in the module / register / unregister
 * @prop {Object<ListenerLoader>} listenerLoader - Load all events in the module / register / unregister
 */
class Module extends Base {
    /**
     * Creates a Module instance.
     *
     * @param {Object<AxonClient>} client
     *
     * @memberof Module
     */
    constructor(client) {
        super(client);

        this.label = 'moduleLabel';

        /*
         * Containments - all commands and events within this module
         */
        this.commands = new Collection( { base: Command } );
        this.listeners = new Collection( { base: Listener } );

        /*
         * Default options and params
         */
        this.enabled = true; // global enable/disable
        this.serverBypass = false; // Bypass all perms - true = prevent the command to be server disabled

        /*
         * Info for the help command
         * All fields are required
         */
        this.infos = {
            name: 'moduleName',
            category: 'category',
            description: 'moduleDesc',
        };

        /* Default CommandPermissions at the module level */
        this.permissions = new CommandPermissions(this);
        this.options = new CommandOptions(this);

        /* Loaders */
        this.commandLoader = new CommandLoader(this);
        this.listenerLoader = new ListenerLoader(this);
    }

    /**
     * Init a module with all commands and events.
     * Called at the end of every module contructor with correct parameters.
     *
     * @param {Object<Commands>} [commands=null] - Object containing all commands
     * @param {Object<Listener>} [listeners=null] - Object containing all listeners
     */
    init(commands = null, listeners = null) {
        commands && this.commandLoader.loadAll(commands);
        listeners && this.listenerLoader.loadAll(listeners);
    }
}

export default Module;
