// Lib - Modules
import { EventEmitter } from 'events';
import util from 'util';

// Core - Core
import Base from './Core/Base';

import EventManager from './Core/Event/EventManager';
import CommandDispatcher from './Core/CommandDispatcher';
// Registries
import ModuleRegistry from './Core/Stores/ModuleRegistry';
import CommandRegistry from './Core/Stores/CommandRegistry';
import ListenerRegistry from './Core/Stores/ListenerRegistry';

import GuildConfigCache from './Core/Stores/GuildConfigCache';

import MessageManager from './Langs/MessageManager';

import ModuleLoader from './Core/Loaders/ModuleLoader';
import ClientInitialiser from './Core/Loaders/ClientInitialiser';
import Executor from './Core/Executor';

// Utility
import AxonUtils from './Utility/AxonUtils';

import ALogger from './Loggers/ALogger';

// Selector
import LibrarySelector from './Libraries/index';
import LoggerSelector from './Loggers/index';

// Misc
import logo from './Configs/logo';
import packageJSON from '../package.json';
import { EMBED_LIMITS } from './Utility/Constants/DiscordEnums';
import { WEBHOOK_TYPES, LOG_LEVELS, WEBHOOK_TO_COLOR, DEBUG_FLAGS } from './Utility/Constants/AxonEnums';

/**
 * @typedef {import('./AxonOptions').default} AxonOptions
 * @typedef {import('./Core/Module').default} Module
 * @typedef {import('./Core/Event/AHandler').default} AHandler
 * @typedef {import('./Utility/Collection').default<AHandler>} HandlerCollection
 * @typedef {import('./Core/Event/Listener').default} Listener
 * @typedef {import('./Libraries/definitions/Resolver').default} Resolver
 * @typedef {import('./Core/Command/Command').default} Command
 * @typedef {import('./Loggers/Context').default} Context
 * @typedef {import('./Core/Models/GuildConfig').default} GuildConfig
 * @typedef {import('./Core/Command/CommandEnvironment').default} CommandEnvironment
 * @typedef {import(./Libraries/definitions/LibraryInterface).default} LibraryInterface
 * @typedef {import('./Core/Models/AxonConfig').default} AxonConfig
 * @typedef {{
 * Utils: Utils, DBProvider: ADBProvider, AxonConfig: AxonConfig, GuildConfig: GuildConfig, DBLocation: String
 * }} Extensions
 */

/**
 * AxonCore - Client constructor
 *
 * @author KhaaZ
 *
 * @class AxonClient
 * @extends EventEmitter
 *
 * @prop {BotClient} _botClient - Discord library Client
 * @prop {ModuleRegistry} moduleRegistry - Registry holding all modules
 * @prop {CommandRegistry} commandRegistry - Registry holding all commands
 * @prop {ListenerRegistry} listenerRegistry - Registry holding all listeners
 * @prop {EventManager} eventManager - The EventManager instance that handle all AxonCore listeners
 * @prop {GuildConfigCache} guildConfigs - The Manager that handles GuildConfigs (cache / DB etc)
 * @prop {AxonConfig} [axonConfig] - The AxonConfig object that handles globally blacklisted users and guilds
 * @prop {CommandDispatcher} dispatcher - Dispatch commands onMessageCreate.
 * @prop {Executor} executor - Executor class that handles executing commands and listeners
 * @prop {ModuleLoader} moduleLoader - Load, unload modules.
 * @prop {MessageManager} _messageManager - Message manager object accessible with `<AxonClient>.l`
 * @prop {LibraryInterface} library - LibraryInterface object depending the lib used
 * @prop {ALogger} logger - The Logger instance
 * @prop {AxonUtils} axonUtils - Util methods (AxonCore)
 * @prop {Utils} utils - Utils methods (general)
 * @prop {ADBProvider} DBProvider - The DBProvider instance
 * @prop {Extensions} extensions - AxonCore extensions
 * @prop {Object} _configs - configs (webhooks, template, custom)
 * @prop {Object.<string, {id: String, token: String}>} _configs.webhooks - Webhooks configs with all webhooks id and tokens
 * @prop {{ embeds: Object.<string, Number>, emotes: Object.<string, String> }} _configs.template - Template config
 * @prop {AxonOptions} _configs.custom - Custom config object optionally passed via AxonOptions
 * @prop {Object} staff - Bot Staff (owners, admins, +...)
 * @prop {Array<String>} staff.owners - Array of user IDs with BotOwner permissions
 * @prop {Array<String>} staff.admins - Array of user IDs with BotAdmin permissions
 * @prop {Object} settings - Bot settings
 * @prop {Boolean} settings.debugMode - Enable to show commands latency and debug informations
 * @prop {Array<String>} settings.prefixes - Default bot prefixes
 * @prop {String} settings.adminPrefix - Admins prefix : override perms/cd except Owner
 * @prop {String} settings.ownerPrefix - Owner prefix : override perms/cd
 * @prop {String} settings.lang - Default lang for the bot
 * @prop {Number} settings.guildConfigCache - Max amount of guildConfigs cached at the same time (LRUCache)
 * @prop {Object} info - General info about the current application
 * @prop {String} info.name - Bot name
 * @prop {String} info.description - Bot description
 * @prop {String} info.version - Bot version
 * @prop {Array<String>} info.owners - Bot owners (array of names)
 * @prop {Object} axoncore - AxonCore info
 * @prop {String} axoncore.version - AxonCore version
 * @prop {String} axoncore.author - AxonCore author
 * @prop {String} axoncore.github - AxonCore github link
 */
class AxonClient extends EventEmitter {
    /**
     * Creates an AxonClient instance.
     *
     * @param {BotClient} botClient - Eris or Discordjs Client instance
     * @param {AxonOptions} [axonOptions={}] - Axon options
     * @param {Object.<string, Module>} [modules={}] - Object with all modules to add in the bot
     * @memberof AxonClient
     */
    constructor(botClient, axonOptions = {}, modules = {} ) {
        super();
        axonOptions.logo ? axonOptions.logo(packageJSON.version) : logo(packageJSON.version);

        this._configs = {
            webhooks: axonOptions.webhooks,
            template: axonOptions.template,
            custom: axonOptions.custom,
        };

        /* Bot settings */
        this.settings = {
            debugMode: axonOptions.settings.debugMode || false,
            prefixes: [axonOptions.prefixes.general],
            adminPrefix: axonOptions.prefixes.admin, // meant to be different prefix on all AxonClient instance (global override)
            ownerPrefix: axonOptions.prefixes.owner, // meant to be same prefix on all AxonClient instance (global override)
            lang: axonOptions.settings.lang,
            guildConfigCache: axonOptions.settings.guildConfigCache,
        };

        /* Bot informations */
        this.info = {
            name: axonOptions.info.name,
            description: axonOptions.info.description,
            version: axonOptions.info.version,
            owners: Object.values(axonOptions.staff.owners).map(o => o.name),
        };

        /* Client specification */
        /**
         * @type {{version: String, author: String, github: String}}
         */
        this.axoncore = {
            version: packageJSON.version,
            author: packageJSON.author,
            github: packageJSON.link,
        };
        
        /* Logger */
        if (axonOptions.extensions.logger && axonOptions.extensions.logger instanceof ALogger) {
            this.logger = axonOptions.extensions.logger;
        } else {
            this.logger = LoggerSelector.select(axonOptions.settings);
        }
        
        this.extensions = ClientInitialiser.initExtensions(this, axonOptions);

        /* AxonUtils */
        this.axonUtils = new AxonUtils(this);
        /*
         * Initialise Bot Client and LibraryInterface
         */
        /**
         * @type {BotClient}
         */
        this._botClient = botClient;
        this.library = LibrarySelector.select(this, axonOptions);

        /* Utils */
        this.utils = new this.extensions.Utils(this); // eslint-disable-line new-cap
        /* ADBProvider */
        this.DBProvider = new this.extensions.DBProvider(this);
        this.DBProvider.init();
        this.log('NOTICE', `DB ready. [TYPE: ${this.DBProvider.type}]`);

        if (this.settings.debugMode) {
            this.on('debug', this.onDebug);
        }

        /* Core */
        this.moduleRegistry = new ModuleRegistry(this);
        this.commandRegistry = new CommandRegistry(this);
        this.listenerRegistry = new ListenerRegistry(this);
        this.eventManager = new EventManager(this);

        /* GuildConfigs */
        this.guildConfigs = new GuildConfigCache(this, axonOptions.settings.guildConfigCache); // Guild ID => guildConfig

        /* Core Logic */
        this.moduleLoader = new ModuleLoader(this);
        this.dispatcher = new CommandDispatcher(this);
        this.executor = new Executor(this);

        this._messageManager = new MessageManager(this, axonOptions.lang, axonOptions.settings.lang);

        /* General */
        this.staff = ClientInitialiser.initStaff(axonOptions.staff, this.logger);

        /* AxonConfig */
        /**
         * @type {AxonConfig}
         */
        this.axonConfig = null;
        ClientInitialiser.initAxon(this);

        /* Additional loading / properties */
        this.onInit();

        /* Load modules */
        console.log(' ');
        this.moduleLoader.loadAll(modules || {} ); // load modules
        console.log(' ');
    }

    // **** GETTERS **** //

    /**
     * Returns the bot client instance
     *
     * @readonly
     * @type {BotClient}
     * @memberof AxonClient
     */
    get botClient() {
        return this._botClient;
    }

    /**
     * Returns all event handlers in eventManager
     *
     * @readonly
     * @type {HandlerCollection}
     * @memberof AxonClient
     */
    get handlers() {
        return this.eventManager.handlers;
    }

    /**
     * Returns all registered listeners for the discord event name
     *
     * @param {String} eventName
     * @returns {Array<Listener>}
     * @memberof AxonClient
     */
    getListeners(eventName) {
        return this.eventManager.getListeners(eventName);
    }

    /**
     * Returns all the resolver for the default current library used.
     * Can be easily overridden with a custom Resolver by overriding this getter.
     *
     * @readonly
     * @type {Resolver}
     * @memberof AxonClient
     */
    get Resolver() {
        return this.library.resolver;
    }

    /**
     * Return the MessageManager instance
     *
     * @readonly
     * @type {MessageManager}
     * @memberof AxonClient
     */
    get l() {
        return this._messageManager;
    }

    /**
     * Return the webhooks config
     *
     * @readonly
     * @type {{
     * FATAL: {id: String, token: String}, ERROR: {id: String, token: String}, WARN: {id: String, token: String}, DEBUG: {id: String, token: String},
     * NOTICE: {id: String, token: String}, INFO: {id: String, token: String}, VERBOSE: {id: String, token: String}
     * }}
     * @memberof AxonClient
     */
    get webhooks() {
        return this._configs.webhooks;
    }

    /**
     * Returns the template config
     *
     * @readonly
     * @type {{embeds: Object.<string, Number>, emotes: Object.<string, String>}}
     * @memberof AxonClient
     */
    get template() {
        return this._configs.template;
    }

    /**
     * Returns the custom config
     *
     * @readonly
     * @type {Object.<string, any>}
     * @memberof AxonClient
     */
    get custom() {
        return this._configs.custom;
    }

    /**
     * Get a module from AxonClient with the given label.
     *
     * @param {String} module - Module label
     * @returns {Module|null}
     * @memberof AxonClient
     */
    getModule(module) {
        return this.moduleRegistry.get(module);
    }

    /**
     * Get a command/subcommand from AxonClient with the given full label.
     *
     * @param {String} fullLabel - Full command (or subcommand) label
     * @returns {Command|null}
     * @memberof AxonClient
     */
    getCommand(fullLabel) {
        return this.commandRegistry.getFull(fullLabel.split(' ') );
    }

    // **** MAIN **** //

    /**
     * Start AxonClient.
     * Start bot client.
     * Bind error listeners and event listeners.
     *
     * Calls custom onStart() method at the beginning.
     * Calls custom onReady() method when AxonClient is ready.
     *
     * @async
     * @memberof AxonClient
     */
    async start() {
        await this.onStart();

        this.library.client.connect()
            .then( () => {
                this.log('NOTICE', '=== BotClient Connected! ===');
            } )
            .catch(err => {
                this.logger.error(err.stack);
            } );

        try {
            /* Init Error listeners */
            this.initErrorListeners();
            /* Bind Listeners to Handlers */
            this.eventManager.bindListeners();
            this.log('NOTICE', '=== AxonClient Ready! ===');
            /* Custom onReady method */
            this.onReady();
        } catch (err) {
            this.log('FATAL', err);
        }

        this.library.onMessageCreate(this._onMessageCreate.bind(this) );
        this.library.onceReady(this._onReady.bind(this) );
    }

    // **** LifeCycle methods **** //

    /**
     * Override this method.
     * Method executed after the object is finished to be constructed (in the constructor)
     *
     * @returns {Boolean}
     * @memberof AxonClient
     */
    onInit() {
        return true;
    }

    /**
     * Override this method.
     * Method executed at the beginning of the start method.
     *
     * @returns {Promise<Boolean>}
     * @memberof AxonClient
     */
    onStart() {
        return Promise.resolve(true);
    }

    /**
     * Override this method.
     * Method executed at the end of the start method (when the AxonClient is ready).
     *
     * @returns {Promise<Boolean>}
     * @memberof AxonClient
     */
    onReady() {
        return Promise.resolve(true);
    }

    /**
     * Log both to console and to the correct webhook
     *
     * @param {LOG_LEVELS} level - The LOG-LEVEL
     * @param {String|Error} content - The content or the error to log
     * @param {Context} [ctx=null] - Additional context to be passed to logger
     * @param {Boolean} [execWebhook=true] - Whether to execute the webhook
     * @memberof AxonClient
     */
    log(level, content, ctx = null, execWebhook = true) {
        if (!LOG_LEVELS[level] ) {
            this.logger.warn(`Incorrect log level: ${level}`);
        }

        let err = null;
        if (content instanceof Error) {
            err = (content.stack && content.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? content.stack : content.message;
            content = content.stack || content.message;
        }

        this.logger[LOG_LEVELS[level]](content, ctx);
        
        if (content.length > EMBED_LIMITS.LIMIT_DESCRIPTION) {
            content = content.slice(0, EMBED_LIMITS.LIMIT_DESCRIPTION);
        }
        if (execWebhook && this.library) {
            const whType = WEBHOOK_TYPES[level];
            this.axonUtils.triggerWebhook(whType, {
                color: WEBHOOK_TO_COLOR[whType],
                timestamp: new Date(),
                description: err || content,
            // eslint-disable-next-line no-nested-ternary
            }, `${whType}${this.library.client.getUser()
                ? ` - ${this.library.client.getUsername()}`
                : this.info.name ? ` - ${this.info.name}` : ''}`);
        }
    }

    /**
     * Function executed on the global messageCreate event and dispatch to the correct command and execution
     *
     * @param {Message} msg
     * @memberof AxonClient
     */
    _onMessageCreate(msg) {
        if (!this.botClient.ready) {
            return;
        }
        /* msg.author error + ignore self + ignore bots */
        if (!this.library.message.getAuthor(msg) || this.library.user.isBot(msg.author) ) {
            return;
        }

        this.dispatcher.dispatch(msg);
    }

    /**
     * Function executed when the bot client is ready.
     * Bind events and initialise client status/game.
     * @memberof AxonClient
     */
    _onReady() {
        this.log('NOTICE', '=== BotClient Ready! ===');
        this.botClient.ready = true;

        /* Bind handlers to events */
        this.eventManager.bindHandlers();

        /* Initialise status. Default AxonCore status or use custom one */
        this.initStatus();
        this.log('NOTICE', '=== **Ready!** ===');
    }

    /**
     * Function ran on debug event.
     * Logs the debug event.
     *
     * @param {DEBUG_FLAGS} flag
     * @param {String} d
     * @memberof AxonClient
     */
    onDebug(flag, d) {
        let m = '';
        if (flag & DEBUG_FLAGS.GOOD) {
            m += 'V: ';
        } else if (flag & DEBUG_FLAGS.BAD) {
            m += 'X: ';
        }

        if (flag & DEBUG_FLAGS.INIT) {
            m += '[INIT] ';
        } else if (flag & DEBUG_FLAGS.COMMAND) {
            m += '[CMD] ';
        }
        this.logger.verbose(`${m}${d}`);
    }

    /**
     * Initialize error listeners and webhooks.
     * Override this method to setup your own error listeners.
     * @memberof AxonClient
     */
    initErrorListeners() {
        process.on('uncaughtException', (err) => {
            this.log('FATAL', err);
        } );

        process.on('unhandledRejection', (err) => {
            this.log('FATAL', err);
        } );

        this.botClient.on('error', (err) => {
            this.log('ERROR', err);
        } );

        this.botClient.on('warn', (msg) => {
            this.log('ERROR', msg);
        } );

        this.log('INFO', 'Error listeners bound!');
    }

    /**
     * Set the bot status. Override to setup your own status.
     * Called after the client ready event.
     * @memberof AxonClient
     */
    initStatus() {
        this.library.client.setPresence('online', {
            name: `AxonCore | ${this.settings.prefixes[0]}help`,
            type: 0,
        } );
    }

    // **** HELPERS **** //

    /**
     * Send full help in DM.
     * Doesn't show commands that the user can't execute.
     * This method can be overridden in child.
     *
     * @param {Message} msg - The message object
     * @param {GuildConfig} guildConfig
     *
     * @memberof AxonClient
     */
    async sendFullHelp(msg, guildConfig) {
        const prefix = (guildConfig && guildConfig.getPrefixes().length > 0)
            ? guildConfig.getPrefixes()[0]
            : this.settings.prefixes[0];

        const embed = {};

        embed.author = {
            name: `Help for ${this.library.client.getUsername()}`,
            icon_url: this.library.client.getAvatar(),
        };
        embed.description = this.info.description;
        embed.footer = {
            text: 'Runs with AxonCore',
        };

        embed.color = typeof this.template.embeds.help === 'string'
            ? parseInt(this.template.embeds.help, 16) || null
            : this.template.embeds.help;

        let commandList = '';
        let params = '';
        if (guildConfig) {
            params = (msg, guildConfig);
        } else {
            params = msg;
        }
        for (const module of this.axon.moduleRegistry.registry.values() ) {
            const commands = module.commands.filter(c => c.permissions.canExecute(params)[0] );
            if (commands.length > 0) {
                commandList += `\n**${module.label}**\n${commands.map(c => `• \`${prefix}${c.label}\` → ${c.info.description}`).join('\n ')}\n`;
            }
        }

        try {
            const chan = await this.library.user.getDM(this.library.message.getAuthor(msg) );

            /* Split commandList */
            // eslint-disable-next-line no-magic-numbers
            if (commandList.length > 1800) {
                commandList = commandList.match(/[\s\S]{1,1800}[\n\r]/g) || [];
                for (const match of commandList) {
                    embed.description = match;
                    await this.library.channel.sendMessage(chan, { embed } );
                }
            } else {
                embed.description = commandList;
                await this.library.channel.sendMessage(chan, { embed } );
            }
        } catch (err) {
            this.logger.verbose(err);
        }
    }

    /**
     * Register a guild prefix.
     * Shortcut to guildConfig.registerPrefix()
     *
     * @param {String} gID - The guild ID
     * @param {Array<String>} prefixArr - The array of prefixes
     * @returns {Promise<GuildConfig>} The guild Schema from the DB / Error if error
     *
     * @memberof AxonClient
     */
    async registerGuildPrefixes(gID, prefixArr) {
        const guildConfig = await this.guildConfigs.getOrFetch(gID);
        return guildConfig.updatePrefixes(prefixArr);
    }

    // ***** GENERAL **** //

    /**
     * Custom toString method.
     *
     * @returns {String}
     * @memberof AxonClient
     */
    toString() {
        return this.constructor.name;
    }

    /**
     * Custom ToJSON method.
     * (Based of Eris')
     *
     * @returns {Object} JSON-like Object
     * @memberof AxonClient
     */
    toJSON() {
        return Base.prototype.toJSON.call(this);
    }

    /**
     * Custom inspect method
     * Doesn't list prefixed property and undefined property.
     * (Based of Eris')
     *
     * @returns {Object} Object to inspect
     * @memberof AxonClient
     */
    [util.inspect.custom]() {
        return Base.prototype[util.inspect.custom].call(this);
    }
}

/**
 * Fired when a debug message needs to be sent
 * @event AxonClient#debug
 * @prop {DEBUG_FLAGS} flags - Debug flags used to have more information about the event
 * @prop {String} debugMessage - Debug message with information about the situation
 * @memberof AxonClient
 */

/**
 * Fired when a command is successfully ran
 * @event AxonClient#commandExecution
 * @prop {Boolean} status - If the command was successfully executed or not
 * @prop {String} commandFullLabel - The command fullLabel
 * @prop {Object} data
 * @prop {Message} data.msg - The message that triggered the command
 * @prop {Command} data.command - The Command that was executed
 * @prop {GuildConfig} data.guildConfig - The GuildConfig
 * @prop {CommandContext} data.context - The execution context
 * @memberof AxonClient
 */

/**
 * Fired when a command fails
 * @event AxonClient#commandError
 * @prop {String} commandFullLabel - The command fullLabel
 * @prop {Object} data
 * @prop {Message} data.msg - The message that triggered the command
 * @prop {Command} data.command - The Command that was executed
 * @prop {GuildConfig} data.guildConfig - The GuildConfig
 * @prop {AxonCommandError} data.error - The error
 * @memberof AxonClient
 */

/**
 * Fired when a listener is executed
 * @event AxonClient#listenerExecution
 * @prop {Boolean} status - Whether the listener was successfully executed or not
 * @prop {String} eventName - The discord event name
 * @prop {String} listenerName - The listener label
 * @prop {Object} data - Additional information
 * @prop {Listener} data.listener - The Listener that was executed
 * @prop {GuildConfig} data.guildConfig - The GuildConfig object
 * @memberof AxonClient
 */

/**
 * Fired when a listener errors
 * @event AxonClient#listenerError
 * @prop {String} eventName - The discord event name
 * @prop {String} listenerName - The Listener label
 * @prop {Object} data - Additional information
 * @prop {Listener} data.listener - The Listener that was executed
 * @prop {GuildConfig} data.guildConfig - The GuildConfig object
 * @prop {Error} data.error - The error
 * @memberof AxonClient
 */
    
export default AxonClient;
