// Lib - Modules
import EventEmitter from 'eventemitter3';
import util from 'util';

// Core - Structures
import Base from './Structures/Base';

import EventManager from './Structures/Event/EventManager';
import CommandDispatcher from './Structures/Dispatchers/CommandDispatcher';
// Registries
import ModuleRegistry from './Structures/Stores/ModuleRegistry';
import CommandRegistry from './Structures/Stores/CommandRegistry';
import ListenerRegistry from './Structures/Stores/ListenerRegistry';

import GuildConfigCache from './Structures/Stores/GuildConfigCache';

import MessageManager from './Langs/MessageManager';

import ModuleLoader from './Structures/Loaders/ModuleLoader';
import ClientInitialiser from './Structures/Loaders/ClientInitialiser';

import ADBProvider from './Database/ADBProvider'; // default DBProvider

// Utility
import AxonUtils from './Utility/AxonUtils';
import Utils from './Utility/Utils';

// Selector
import LibrarySelector from './Libraries/index';
import LoggerSelector from './Loggers/index';
import DBSelector from './Database/index';

// Misc
import logo from './Configs/logo';
import packageJSON from '../package.json';
import { EMBED_LIMITS } from './Utility/Constants/DiscordEnums';
import { WEBHOOK_TYPES, LOG_LEVELS, WEBHOOK_TO_COLOR } from './Utility/Constants/AxonEnums';
import ALogger from './Loggers/ALogger';

/**
 * AxonCore - Client constructor
 *
 * @author KhaaZ
 *
 * @class AxonClient
 * @extends EventEmitter
 *
 * @prop {BotClient} _botClient - Eris or Discordjs Client
 * @prop {Collection<Module>} modules - All modules in the client [key: label, value: module]
 * @prop {Collection<Command>} commands - All commands in the client [key: label, value: command]
 * @prop {Map<String>} commandAliases - All aliases in the client [key: alias, value: commandLabel]
 * @prop {EventManager} EventManager - The EventManager instance that handle all AxonCore events
 * @prop {GuildConfigCache} guildConfigs - The Manager that handles GuildConfigs (cache / DB etc)
 * @prop {AxonConfig} axonConfig - The AxonConfigobject that handles globally blacklisted users and guilds
 * @prop {CommandDispatcher} dispatcher - Dispatch commands onMessageCreate.
 * @prop {ModuleLoader} moduleLoader - Load, register, unregister modules.
 * @prop {MessageManager} messageManager - Message manager object accessible with `<AxonClient>.l`
 * @prop {Object} logger - The Logger instance
 * @prop {Object} axonUtils - Util methods (AxonCore)
 * @prop {Object} utils - Utils methods (general)
 * @prop {DBProvider} DBProvider - The DBProvider instance
 * @prop {Object} configs - configs (webhooks, template, custom)
 * @prop {Object} staff - Bot Staff (owners, admins, +...)
 * @prop {Array<String>} staff.owners - Array of user IDs with BotOwner permissions
 * @prop {Array<String>} staff.admins - Array of user IDs with BotAdmin permisions
 * @prop {Object} settings - Bot settings
 * @prop {Boolean} settings.debugMode - Enable to show commands latency and debug informations
 * @prop {Array<String>} settings.prefixes - Default bot prefixes
 * @prop {String} settings.adminPrefix- Admins prefix : override perms/cd except Owner
 * @prop {String} settings.ownerPrefix - Owner prefix : override perms/cd
 * @prop {Object} infos - General infos { name, description, version, library, owners }
 * @prop {Object} axoncore - AxonCore infos { name, version, author, github }s]
 */
class AxonClient extends EventEmitter {
    /**
     * Creates an AxonClient instance.
     *
     * @param {BotClient} botClient - Eris or Discordjs Client instance
     * @param {AxonOptions} [axonOptions={}] - Axon options
     * @param {Object} [modules={}] - Object with all modules to add in the bot
     *
     * @memberof AxonClient
     */
    constructor(botClient, axonOptions = {}, modules = {} ) {
        super();
        axonOptions.logo ? axonOptions.logo() : logo();

        this.configs = {
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
        this.infos = {
            name: axonOptions.info.name,
            description: axonOptions.info.description,
            version: axonOptions.info.version,
            owners: Object.values(axonOptions.staff.owners).map(o => o.name),
        };

        /* Client specification */
        this.axoncore = {
            name: packageJSON.name,
            version: packageJSON.version,
            author: packageJSON.author,
            github: packageJSON.link,
        };

        /* Logger */
        if (axonOptions.extensions.logger && axonOptions.extensions.logger.prototype instanceof ALogger) {
            this.logger = axonOptions.extensions.logger; // eslint-disable-line new-cap
        } else {
            this.logger = LoggerSelector.select(axonOptions.settings);
        }

        /* AxonUtils */
        this.axonUtils = new AxonUtils(this);
        /*
         * Initialise Bot Client and LibraryInterface
         */
        this._botClient = botClient;
        this.library = LibrarySelector.select(this, axonOptions);
        this.log('NOTICE', `Library Interface ready. [TYPE: ${this.library.type}]`);

        /* Utils */
        if (axonOptions.extensions.utils && axonOptions.extensions.utils.prototype instanceof Utils) {
            this.utils = new axonOptions.extensions.utils(this); // eslint-disable-line new-cap
        } else {
            this.utils = new Utils(this);
        }
        /* DBProvider */
        if (axonOptions.extensions.DBProvider && axonOptions.extensions.DBProvider.prototype instanceof ADBProvider) {
            this.DBProvider = new axonOptions.extensions.DBProvider(this);
        } else {
            this.DBProvider = DBSelector.select(axonOptions, this);
        }

        /* Structures */
        this.modules = new ModuleRegistry(this);
        this.commands = new CommandRegistry(this);
        this.listeners = new ListenerRegistry(this);
        this.eventManager = new EventManager(this);

        /* GuildConfigs */
        this.guildConfigs = new GuildConfigCache(this, axonOptions.settings.guildConfigCache); // Guild ID => guildConfig

        /* Core Logic */
        this.moduleLoader = new ModuleLoader(this);
        this.dispatcher = new CommandDispatcher(this);

        this.messageManager = new MessageManager(this, axonOptions.lang, axonOptions.settings.lang);

        /* General */
        this.staff = ClientInitialiser.initStaff(axonOptions.staff, this.logger);

        /* AxonConfig */
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
     *
     * @memberof AxonClient
     */
    get botClient() {
        return this._botClient;
    }

    /**
     * Returns all event handlers in eventManager
     *
     * @readonly
     * @type {Collection<Object>}
     *
     * @memberof AxonClient
     */
    get handlers() {
        return this.eventManager.handlers;
    }

    /**
     * Returns all registrered listeners for the discord event name
     *
     * @param {String} eventName
     * @returns {Array}
     *
     * @memberof AxonClient
     */
    getListeners(eventName) {
        return this.eventManager.getListeners(eventName);
    }

    /**
     * Returns all the resolver for the default current library used.
     * Can be easily overriden with a custom Resolver by overriding this getter.
     *
     * @readonly
     * @type {Resolver}
     *
     * @memberof AxonClient
     */
    get Resolver() {
        return this.library.resolver;
    }

    /**
     * Return the webhooks object
     *
     * @readonly
     * @type {Object}
     *
     * @memberof AxonClient
     */
    get webhooks() {
        return this.configs.webhooks;
    }

    /**
     *
     *
     * @readonly
     * @type {Object}
     *
     * @memberof AxonClient
     */
    get template() {
        return this.configs.template;
    }

    /**
     *
     *
     * @readonly
     * @type {Object}
     *
     * @memberof AxonClient
     */
    get custom() {
        return this.configs.custom;
    }

    /**
     * Return the MessageManager instance
     *
     * @readonly
     * @type {MessageManager}
     *
     * @memberof AxonClient
     */
    get l() {
        return this.messageManager;
    }

    /**
     * Get a module from AxonClient with the given label.
     *
     * @param {String} module - Module label
     * @returns {Module|null}
     *
     * @memberof AxonClient
     */
    getModule(module) {
        return this.modules.get(module);
    }

    /**
     * Get a command/subcommand from AxonClient with the given full label.
     *
     * @param {String} fullLabel - Full command (or subcommand) label
     * @returns {Command|null}
     *
     * @memberof AxonClient
     */
    getCommand(fullLabel) {
        return this.commands.getFull(fullLabel.split(' ') );
    }

    // **** MAIN **** //

    /**
     * Start AxonClient.
     * Start bot client.
     * Bind error listeners and event listeners.
     *
     * Calls custom onStart() method atthe beginning.
     * Calls custom onReady() methodwhen AxonClient is ready.
     *
     * @async
     *
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
     * @returns {*}
     *
     * @memberof AxonClient
     */
    onInit() {
        return true;
    }

    /**
     * Override this method.
     * Method executed at the beginning of the start method.
     *
     * @returns {Promise}
     *
     * @memberof AxonClient
     */
    onStart() {
        return Promise.resolve(true);
    }

    /**
     * Override this method.
     * Method executed at the end of the start method (when the AxonClient is ready).
     *
     * @returns {Promise}
     *
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
     * @param {Object} [ctx=null] - Additional context to be passed to logger
     * @param {Object|String} ctx.guild
     * @param {String} ctx.cmd
     * @param {Object|String} ctx.user
     * @param {Boolean} [execWebhook=true] - Whether to execute the webhook
     *
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
                : this.infos.name ? ` - ${this.infos.name}` : ''}`);
        }
    }

    /**
     * Function executed on the global messageCreate event and dispatch to the correct command and execution
     *
     * @param {Message} msg
     *
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
     *
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
     * Initialize error listeners and webhooks.
     * Override this method to setup your own error listeners.
     *
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
     *
     * @memberof AxonClient
     */
    initStatus() {
        this.library.client.setPresence('online', {
            name: `AxonCore | ${this.settings.prefixes[0]}help`,
            type: 0,
        } );
    }

    // **** EXECUTOR **** //
    /**
     * Fired when a command is successfully ran
     * @event AxonClient#commandExecution
     * @prop {Boolean} status - Whereas the command was successfully executed or not
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

    _execCommand(msg, args, command, guildConfig, { isAdmin, isOwner } ) {
        if (this.settings.debugMode) {
            this.log('VERBOSE', `${guildConfig ? '[GUILD]' : '[DM]'} ${isAdmin ? 'Admin' : 'Regular'} execution of ${command.fullLabel}`);
            console.time('- Net');
            console.time('- Node');
        }

        command._process( {
            msg, args, guildConfig, isAdmin, isOwner,
        } )
            .then( (context) => {
                this.emit('commandExecution', context.executed, command.fullLabel, { msg, command, guildConfig, context } );

                this.settings.debugMode && console.timeEnd('- Net');
            } )
            .catch(err => {
                this.emit('commandError', command.fullLabel, { msg, command, guildConfig, error: err } );
                this.settings.debugMode && console.timeEnd('- Net');
                
                this.log('ERROR', err);
            } );

        if (this.settings.debugMode) {
            console.timeEnd('- Node');
        }
    }

    _execHelp(msg, args, command, guildConfig, { isAdmin, isOwner } ) {
        if (!command) {
            this.sendFullHelp(msg, guildConfig);
            return;
        }

        if (this.settings.debugMode) {
            this.log('VERBOSE', `${guildConfig ? '[GUILD]' : '[DM]'} ${isAdmin ? 'Admin' : 'Regular'} -HELP- execution of ${command.fullLabel}`);
            console.time('- Net');
            console.time('- Node');
        }

        command.sendHelp( {
            msg, args, guildConfig, isAdmin, isOwner,
        } )
            .then( (context) => {
                this.emit('commandExecution', true, command.label, { msg, command, guildConfig, context } );
                this.settings.debugMode && console.timeEnd('- Net');
            } )
            .catch(err => {
                this.emit('commandError', command.label, { msg, command, guildConfig, err } );
                this.settings.debugMode && console.timeEnd('- Net');

                this.log('ERROR', err);
            } );

        if (this.settings.debugMode) {
            console.timeEnd('- Node');
        }
    }

    /**
     * Fired when a command fails
     * @event AxonClient#eventExecution
     * @prop {Boolean} status - Whereas the listener was successfully executed or not
     * @prop {String} eventName - The discord event name
     * @prop {String} listenerName - The listener label
     * @prop {Object} data - Additional information
     * @prop {Listener} data.listener - The Listener that was executed
     * @prop {GuildConfig} data.guildConfig - The GuildConfig object
     * @memberof AxonClient
     */

    /**
     * Fired when a command fails
     * @event AxonClient#eventError
     * @prop {String} eventName - The discord event name
     * @prop {String} listenerName - The Listener label
     * @prop {Object} data - Additional information
     * @prop {Listener} data.listener - The Listener that was executed
     * @prop {GuildConfig} data.guildConfig - The GuildConfig object
     * @prop {Error} data.error - The error
     * @memberof AxonClient
     */

    _execListener(listener, guildConfig, ...args) {
        listener._execute(guildConfig, ...args)
            .then( () => {
                if (this.settings.debugMode) {
                    this.log('VERBOSE', `[EVENT](${listener.eventName}) - ${listener.label}`);
                }
                this.emit('eventExecution', true, listener.eventName, listener.label, { listener, guildConfig } );
            } )
            .catch(err => {
                this.emit('eventError', listener.eventName, listener.label, { listener, guildConfig, error: err } );

                this.log('ERROR', `[EVENT](${listener.eventName}) - ${listener.label}\n${err}`);
            } );
    }

    // **** HELPERS **** //

    /**
     * Send full help in DM.
     * Doesn't show commands that the user can't execute.
     * This method can be overridden in child.
     *
     * @param {Message} msg - The message object
     * @returns {Promise<Message>} Message Object
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
        embed.description = this.infos.description;
        embed.footer = {
            text: 'Runs with AxonCore',
        };

        embed.color = typeof this.template.embeds.help === 'string'
            ? parseInt(this.template.embeds.help, 16) || null
            : this.template.embeds.help;

        let commandList = '';
        if (guildConfig) {
            for (const module of this.modules.registry.values() ) {
                const commands = module.commands.filter(c => c.permissions.canExecute(msg, guildConfig)[0] );
                if (commands.length > 0) {
                    commandList += `**${module.label}**\n${commands.map(c => `\`${prefix}${c.label}\` - ${c.infos.description}`).join('\n')}\n`;
                }
            }
        } else {
            for (const module of this.modules.registry.values() ) {
                commandList += `**${module.label}**\n${module.commands.map(c => `\`${prefix}${c.label}\` - ${c.infos.description}`).join('\n')}\n`;
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
     * @returns {Promise<Object>} The guild Schema from the DB / Error if error
     *
     * @memberof AxonClient
     */
    async registerGuildPrefixes(gID, prefixArr) {
        const guildConfig = await this.guildConfigs.getOrFetch(gID);
        return guildConfig.updatePrefixes(prefixArr);
    }

    // ***** GENERAL **** //
    /* eslint max-classes-per-file: ["warn", 2]*/
    /* eslint-disable no-prototype-builtins */

    /**
     * Custom toString method.
     *
     * @returns {String}
     *
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
     *
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
     *
     * @memberof AxonClient
     */
    [util.inspect.custom]() {
        return Base.prototype[util.inspect.custom].call(this);
    }
}

export default AxonClient;
