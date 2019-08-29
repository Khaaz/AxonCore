// Lib - Modules
import EventEmitter from 'eventemitter3';
import util from 'util';

// Core - Structures
import Module from './Structures/Module';
import Command from './Structures/Command/Command';
import EventManager from './Structures/EventManager';
import CommandDispatcher from './Structures/Dispatchers/CommandDispatcher';
import GuildConfigCache from './Structures/GuildConfigCache';

import ModuleLoader from './Structures/Loaders/ModuleLoader';
import ClientInitialiser from './Structures/Loaders/ClientInitialiser';

// Utility
import Collection from './Utility/Collection';
import AxonUtils from './Utility/AxonUtils';
import Utils from './Utility/Utils';

import LibraryHandler from './Libraries/index';

import LoggerHandler from './Loggers/index';
import DBHandler from './Database/index';
import DBProvider from './Database/DBProvider'; // default DBProvider

// Misc
import logo from './Configs/logo';
import packageJSON from '../package.json';
import { EMBED_LIMITS } from './Utility/Constants/DiscordEnums';
import MessageManager from './Structures/Langs/MessageManager';


/**
 * AxonCore - Client constructor
 *
 * @author KhaaZ
 *
 * @class AxonClient
 * @extends EventEmitter
 *
 * @prop {Object<BotClient>} _botClient - Eris or Discordjs Client
 * @prop {Collection<Module>} modules - All modules in the client [key: label, value: module]
 * @prop {Collection<Command>} commands - All commands in the client [key: label, value: command]
 * @prop {Map<String>} commandAliases - All aliases in the client [key: alias, value: commandLabel]
 * @prop {Object<EventManager>} EventManager - The EventManager instance that handle all AxonCore events
 * @prop {Object<GuildConfigCache>} guildConfigs - The Manager that handles GuildConfigs (cache / DB etc)
 * @prop {Object<AxonConfig>} axonConfig - The AxonConfigobject that handles globally blacklisted users and guilds
 * @prop {Object<CommandDispatcher>} dispatcher - Dispatch commands onMessageCreate.
 * @prop {Object<ModuleLoader>} moduleLoader - Load, register, unregister modules.
 * @prop {Object<MessageManager>} messageManager - Message manager object accessible with `<AxonClient>.l`
 * @prop {Object} logger - Default Logger / Chalk Logger / Signale Logge
 * @prop {Object} axonUtils - Util methods (Axon)
 * @prop {Object} utils - Utils methods (general)
 * @prop {Object<DBProvider>} DBProvider - JSON(default) / Mongoose
 * @prop {Object} configs - configs (axon, _tokens)
 * @prop {Object} [configs.bot] - bot general config
 * @prop {Object} [configs._tokens] - token secret config
 * @prop {Object} staff - BotStaff (owners, admins, +...)
 * @prop {Array<String>} [staff.owners] - Array of user IDs with BotOwner permissions
 * @prop {Array<String>} [staff.admins] - Array of user IDs with BotAdmin permisions
 * @prop {Object} settings - Bot settings
 * @prop {Boolean} [settings.debugMode] - Enable to show commands latency and debug informations
 * @prop {Array<String>} [settings.prefixes] - Default bot prefixes
 * @prop {String} [settings.adminPrefix] - Admins prefix : override perms/cd except Owner
 * @prop {String} [settings.ownerPrefix] - Owner prefix : override perms/cd
 * @prop {Object} infos - General infos { name, description, version, library, owners }
 * @prop {Object} axoncore - AxonCore infos { name, version, author, github }s]
 */
class AxonClient extends EventEmitter {
    /**
     * Creates an AxonClient instance.
     *
     * @param {Object<BotClient>} botClient - Eris or Discordjs Client instance
     * @param {Object<AxonOptions>} [axonOptions={}] - Axon options
     * @param {Object} [axonOptions.botConfig=null] - General Axon config
     * @param {Object} [axonOptions.lang=null] - Message templates / translations
     * @param {Object} [axonOptions.tokenConfig=null] - Token config
     * @param {Function} [axonOptions.logo=null] - Custom function that will log a logo
     * @param {Object<Utils>} [axonOptions.utils] - Utils class, needs to be an instance of AxonCore.Utils
     * @param {Object} [axonOptions.logger] - Custom logger
     * @param {Object<DBProvider>} [axonOptions.DBProvider] - DBProvider. Needs to be an instance of DBProvider
     * @param {String} [data.DBLocation=null] - Path to use as default location for usage of the JSONProvider
     * @param {Object<AxonConfig>} [axonOptions.axonConfig=null] - Custom AxonConfig object to use instead of default AxonConfig
     * @param {Object<GuildConfig>} [axonOptions.guildConfig=null] - Custom GuildConfig object to use instead of default GuildConfig
     *
     * @param {Object} [modules={}] - Object with all modules to add in the bot
     *
     * @memberof AxonClient
     */
    constructor(botClient, axonOptions = {}, modules = {} ) {
        super();
        axonOptions.logo ? axonOptions.logo() : logo();

        /* configs */
        this.configs = ClientInitialiser.initConfigs(axonOptions) || {};

        /* Logger */
        this.logger = axonOptions.logger || LoggerHandler.pickLogger(this.configs.bot);

        /* AxonUtils */
        this.axonUtils = new AxonUtils(this);
        /* Utils */
        if (axonOptions.utils && axonOptions.utils.prototype instanceof Utils) {
            this.utils = new axonOptions.utils(this); // eslint-disable-line
        } else {
            this.utils = new Utils(this);
        }
        /* DBProvider */
        if (axonOptions.DBProvider && axonOptions.DBProvider.prototype instanceof DBProvider) {
            this.DBProvider = axonOptions.DBProvider;
        } else {
            this.DBProvider = DBHandler.pickDBProvider(axonOptions, this);
        }

        /*
         * Initialise Bot Client and LibraryInterface
         */
        this._botClient = botClient;
        this.library = LibraryHandler.pickLibrary(this, axonOptions);

        /* Structures */
        this.modules = new Collection( { base: Module } ); // Module Label => Module Object
        this.commands = new Collection( { base: Command } ); // Command Label => Command Object
        this.commandAliases = new Map(); // Command Alias => Command label
        this.eventManager = new EventManager(this); // Event Label => Event function
        /* GuildConfigs */
        this.guildConfigs = new GuildConfigCache(this); // Guild ID => guildConfig

        /* Core Logic */
        this.moduleLoader = new ModuleLoader(this);
        this.dispatcher = new CommandDispatcher(this);

        this.messageManager = new MessageManager(this, axonOptions.lang);
        
        /* General */
        this.staff = ClientInitialiser.initStaff(axonOptions.botConfig, this.logger);
        
        /* Bot settings */
        this.settings = {
            debugMode: this.configs.bot.debugMode || false,
            prefixes: [this.configs.bot.prefix.general],
            adminPrefix: this.configs.bot.prefix.admin, // meant to be different prefix on all AxonClient instance (global override)
            ownerPrefix: this.configs.bot.prefix.owner, // meant to be same prefix on all AxonClient instance (global override)
        };

        /* Bot informations */
        this.infos = {
            name: this.configs.bot.general.name,
            description: this.configs.bot.general.description,
            version: this.configs.bot.general.version,
            library: this.configs.bot.general.library,
            owners: Object.values(this.configs.bot.staff.owners).map(o => o.name),
        };

        /* Client specification */
        this.axoncore = {
            name: packageJSON.name,
            version: packageJSON.version,
            author: packageJSON.author,
            github: packageJSON.link,
        };

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
     * @type {Object<BotClient>}
     * @memberof AxonClient
     */
    get botClient() {
        return this._botClient;
    }

    /**
     * Returns all discord events in eventManager
     *
     * @readonly
     * @type {Collection<Object>}
     * @memberof AxonClient
     */
    get events() {
        return this.eventManager.events;
    }

    /**
     * Returns all listeners for the discord event name
     *
     * @param {String} eventName
     * @returns {Array}
     * @memberof AxonClient
     */
    getListeners(eventName) {
        return this.eventManager.getListeners(eventName);
    }

    /**
     * Return the webhooks object
     *
     * @readonly
     * @type {Object}
     * @memberof AxonClient
     */
    get webhooks() {
        return this.configs._tokens.webhooks;
    }

    /**
     *
     *
     * @readonly
     * @type {Object}
     * @memberof AxonClient
     */
    get template() {
        return this.configs.bot.template;
    }

    /**
     * Return the MessageManager instance
     *
     * @readonly
     * @type {Object<MessageManager>}
     * @memberof AxonClient
     */
    get l() {
        return this.messageManager;
    }

    /**
     * Get a module from AxonClient with the given label.
     *
     * @param {String} module - Module label
     * @returns {Object<Module>|null}
     *
     * @memberof AxonClient
     */
    getModule(module) {
        return this.modules.find(m => m.toLowerCase() === module.toLowerCase() ) || null;
    }

    /**
     * Get a command/subcommand from AxonClient with the given full label.
     *
     * @param {String} fullLabel - Full command (or subcommand) label
     * @returns {Object<Command>|null}
     *
     * @memberof AxonClient
     */
    getCommand(fullLabel) {
        const splitLabel = fullLabel.split(' ');

        const label = this.commandAliases.get(splitLabel[0].toLowerCase() );
        let command = this.commands.get(label);
        if (!command) {
            return null;
        }

        splitLabel.shift();
        for (const sub of splitLabel) {
            if (command.hasSubcmd) {
                const subLabel = command.subCommandsAliases.get(sub.toLowerCase() );
                command = command.subCommands.get(subLabel);
            }
        }
        return command || null;
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
     * @memberof AxonClient
     */
    async start() {
        await this.onStart();
        
        this.library.client.connect()
            .then( () => {
                this.logger.notice('=== BotClient Connected! ===');
            } )
            .catch(err => {
                this.logger.error(err.stack);
            } );

        try {
            /* Init Error listeners */
            this.initErrorListeners();
            /* Bind Listeners to Handlers */
            this.eventManager.bindListeners();
            this.logger.axon('=== AxonClient Ready! ===');
            /* Custom onReady method */
            this.onReady();
        } catch (err) {
            this.logger.error(err.stack);
        }

        this.botClient.once(this.library.enums.EVENTS.READY, this._onReady.bind(this) );
        // this.botClient.on('debug', console.log);
        this.botClient.on(this.library.enums.EVENTS.MESSAGE_CREATE, this._onMessageCreate.bind(this) );
    }
    
    // **** LifeCycle methods **** //

    /**
     * Override this method.
     * Method executed after the object is finished to be constructed (in the constructor)
     *
     * @returns {*}
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
     * @memberof AxonClient
     */
    onReady() {
        return Promise.resolve(true);
    }

    /**
     * Function executed on the global messageCreate event and dispatch to the correct command and execution
     *
     * @param {Object<Message>} msg
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
        this.logger.axon('=== BotClient Ready! ===');
        this.botClient.ready = true;

        /* Bind handlers to events */
        this.eventManager.bindHandlers();
        
        /* Initialise status. Default AxonCore status or use custom one */
        this.initStatus();
        this.logger.axon('Status setup!');

        this.axonUtils.triggerWebhook('status', {
            color: 2067276,
            timestamp: new Date(),
            description: '**Instance Ready!**',
        } );
    }

    /**
     * Initialize error listeners and webhooks.
     * Override this method to setup your own error listeners.
     *
     * @memberof AxonClient
     */
    initErrorListeners() {
        process.on('uncaughtException', (err) => {
            this.logger.emerg(err.stack);

            this.axonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? err.stack : err.message,
            }, `Exception${this.library.client.getUser() ? ` - ${this.library.client.getUsername()}` : ''}`);
        } );

        process.on('unhandledRejection', (err) => {
            this.logger.emerg(err.stack);

            this.axonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? err.stack : err.message,
            }, `Rejection${this.library.client.getUser() ? ` - ${this.library.client.getUsername()}` : ''}`);
        } );

        this.botClient.on('error', (err) => {
            this.logger.error(err.stack);

            this.axonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? err.stack : err.message,
            } );
        } );

        this.botClient.on('warn', (msg) => {
            this.logger.warn(msg);

            this.axonUtils.triggerWebhook('error', {
                color: 15105570,
                timestamp: new Date(),
                description: msg,
            }, `Warn${this.library.client.getUser() ? ` - ${this.library.client.getUsername()}` : ''}`);
        } );

        this.logger.axon('Error listeners bound!');
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

    _execCommand(msg, args, command, guildConfig, { isAdmin, isOwner } ) {
        if (this.settings.debugMode) {
            this.logger.verbose(`${guildConfig ? '[GUILD]' : '[DM]'} ${isAdmin ? 'Admin' : 'Regular'} execution of ${command.fullLabel}`);
            console.time('- Net');
            console.time('- Node');
        }

        command._process( {
            msg, args, guildConfig, isAdmin, isOwner,
        } )
            .then( (context) => {
                this.emit('commandSuccess', { msg, guildConfig, context } );
                this.settings.debugMode && console.timeEnd('- Net');
            } )
            .catch(err => {
                this.emit('commandFailure', { msg, guildConfig, err } );
                this.settings.debugMode && console.timeEnd('- Net');

                this.logger.emerg(err.stack);
                this.axonUtils.triggerWebhook('AxonCommandError', {
                    color: 15158332,
                    timestamp: new Date(),
                    description: (err.stack && err.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? err.stack : err.message,
                } );
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
            this.logger.verbose(`${guildConfig ? '[GUILD]' : '[DM]'} ${isAdmin ? 'Admin' : 'Regular'} -HELP- execution of ${command.fullLabel}`);
            console.time('- Net');
            console.time('- Node');
        }

        command.sendHelp( {
            msg, args, guildConfig, isAdmin, isOwner,
        } )
            .then( (context) => {
                this.emit('commandSuccess', { msg, guildConfig, context } );
                this.settings.debugMode && console.timeEnd('- Net');
            } )
            .catch(err => {
                this.emit('commandFailure', { msg, guildConfig, err } );
                this.settings.debugMode && console.timeEnd('- Net');

                this.logger.emerg(err.stack);
                this.axonUtils.triggerWebhook('AxonCommandError', {
                    color: 15158332,
                    timestamp: new Date(),
                    description: (err.stack && err.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? err.stack : err.message,
                } );
            } );

        if (this.settings.debugMode) {
            console.timeEnd('- Node');
        }
    }

    _execListener(listener, guildConfig, ...args) {
        listener._execute(guildConfig, ...args)
            .then( () => {
                if (this.settings.debugMode) {
                    this.logger.verbose(`[EVENT](${listener.eventName}) - ${listener.label}`);
                }
                this.emit('eventSuccess', { event: listener.eventName, listener, guildConfig } );
            } )
            .catch(err => {
                this.emit('eventFailure', { event: listener.eventName, listener, guildConfig, err } );

                this.logger.error(`[EVENT](${listener.eventName}) - ${listener.label}\n${err}`);
                this.axonUtils.triggerWebhook('AxonEventError', {
                    color: 15158332,
                    timestamp: new Date(),
                    description: (err.stack && err.stack.length < EMBED_LIMITS.LIMIT_DESCRIPTION) ? err.stack : err.message,
                } );
            } );
    }

    // **** HELPERS **** //

    /**
     * Send full help in DM.
     * Doesn't show commands that the user can't execute.
     * This method can be overridden in child.
     *
     * @param {Object<Message>} msg - The message object
     * @returns {Promise<Message>} Message Object
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
            for (const module of this.modules.values() ) {
                const commands = module.commands.filter(c => c.permissions.canExecute(msg, guildConfig)[0] );
                if (commands.length > 0) {
                    commandList += `**${module.label}**\n${commands.map(c => `\`${prefix}${c.label}\` - ${c.infos.description}`).join('\n')}\n`;
                }
            }
        } else {
            for (const module of this.modules.values() ) {
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
        const base = {};
        for (const key in this) {
            if (!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_') ) {
                if (!this[key] ) {
                    base[key] = this[key];
                } else if (this[key] instanceof Set) {
                    base[key] = Array.from(this[key] );
                } else if (this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values() );
                } else if (typeof this[key].toJSON === 'function') {
                    base[key] = this[key].toJSON();
                } else {
                    base[key] = this[key];
                }
            }
        }
        return base;
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
        // http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new { [this.constructor.name]: class {} }[this.constructor.name]();
        for (const key in this) {
            if (this.hasOwnProperty(key) && !key.startsWith('_') && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
}

export default AxonClient;
