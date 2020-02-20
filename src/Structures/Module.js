// Core
import Base from './Base';

import CommandLoader from './Loaders/CommandLoader';
import ListenerLoader from './Loaders/ListenerLoader';

import CommandPermissions from './Command/CommandPermissions';
import CommandOptions from './Command/CommandOptions';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * @typedef {import('../AxonClient').default} AxonClient
 * @typedef {import('./Command/CommandOptions').default} CommandOptions
 * @typedef {import('./Command/CommandPermissions').default} CommandPermissions
 * @typedef {import('./Command/Command').default} Command
 * @typedef {import('./Event/Listener').default} Listener
 */

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
 * @prop {Boolean} [enabled=true] - Whether the module is enabled or not
 * @prop {Boolean} [serverBypass=false] - Whether the module can be disabled or not (will bypass guild disabled)
 * @prop {Object} info - Default info about the module
 * @prop {String} [info.name]
 * @prop {String} [info.category]
 * @prop {String} [info.description]
 * @prop {CommandPermissions} permissions - Default values potentially used for CommandPermissions
 * @prop {CommandOptions} options - Default values potentially used for CommandOptions
 *
 * @prop {CommandLoader} commandLoader - Load all commands in the module / register / unregister
 * @prop {ListenerLoader} listenerLoader - Load all events in the module / register / unregister
 */
class Module extends Base {
    /**
     * Creates a Module instance.
     *
     * @param {AxonClient} client
     * @param {Object} [data={}] - All module parameters
     * @param {String} [data.label] - The module label
     * @param {Boolean} [data.enabled] - Whether the module is enabled or not
     * @param {Boolean} [data.serverBypass] - Whether the module can be disabled in a server or not
     * @param {Object} [data.info]
     * @param {String} data.info.name - The module name
     * @param {String} data.info.description - The module description
     * @param {String} data.info.category - The module category
     * @param {CommandOptions} [data.options] - The default options for all commands in this module
     * @param {CommandPermissions} [data.permissions] - The default permissions for all commands in this module
     * @memberof Module
     */
    constructor(client, data = {} ) {
        super(client);

        this.label = data.label || null;

        /*
         * Default options and params
         */
        this.enabled = data.enabled !== undefined ? data.enabled : true; // global enable/disable
        this.serverBypass = data.serverBypass !== undefined ? data.serverBypass : true; // Bypass all perms - true = prevent the command to be server disabled

        /*
         * Info for the help command
         * All fields are required
         */
        this.info = data.info || {
            name: this.label,
            category: null,
            description: null,
        };

        /* Default CommandPermissions at the module level */
        if (data.options) {
            if (data.options instanceof CommandOptions) {
                this.options = data.options;
            } else {
                this.options = new CommandOptions(this, data.options);
            }
        } else {
            this.options = new CommandOptions(this);
        }

        /* Default CommandOptions at the module level */
        if (data.permissions) {
            if (data.permissions instanceof CommandPermissions) {
                this.permissions = data.permissions;
            } else {
                this.permissions = new CommandPermissions(this, data.permissions);
            }
        } else {
            this.permissions = new CommandPermissions(this);
        }

        /* Loaders */
        this.commandLoader = new CommandLoader(this);
        this.listenerLoader = new ListenerLoader(this);
    }

    /**
     * A Collection of all commands the module holds
     *
     * @readonly
     * @memberof Module
     */
    get commands() {
        return this.axon.commandRegistry.getAll().apply('label', 'filter', (c) => c.module === this);
    }

    /**
     * A Collection of all listeners the module holds
     *
     * @readonly
     * @memberof Module
     */
    get listeners() {
        return this.axon.listenerRegistry.getAll().apply('label', 'filter', (l) => l.module === this);
    }

    /**
     * Init a module with all commands and listeners.
     * @memberof Module
     */
    _init() {
        const { commands, listeners } = this.init();
        commands && this.commandLoader.loadAll(commands);
        listeners && this.listenerLoader.loadAll(listeners);
    }

    /**
     * Override this method to returns { commands, listeners }
     *
     * @returns {Object.<string, Command|Listener>} An object containing commands and listeners to initialise. { commands, listeners}
     * @memberof Module
     */
    init() {
        throw new NotImplementedException();
    }
}

export default Module;
