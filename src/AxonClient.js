'use strict';

// Lib - Modules
import Eris from 'eris';
import EventEmitter from 'eventemitter3';

// misc
import logo from './Conf/logo';

import packageJSON from '../package.json';

// Configs
import defAxonConf from './Conf/axonConf.json';
import defTemplateConf from './Conf/templateConf.json';
import defTokenConf from './Conf/tokenConf.json';

// Core
import Module from './Structures/Module';
import Command from './Structures/Command';
import EventManager from './Structures/EventManager';

// Utility
import Collection from './Utility/Collection';
import AxonUtils from './Utility/AxonUtils';
import Resolver from './Utility/Resolver';
import Utils from './Utility/Utils';

import util from 'util';

// Database
import DBHandler from './Database/index';

// Loggers
import LoggerHandler from './Loggers/index';

// Errors
import AxonError from './Errors/AxonError';
import AxonCommandError from './Errors/AxonCommandError';

/**
 * AxonCore - Client constructor
 *
 * @author KhaaZ
 *
 * @class AxonClient
 * @extends EventEmitter
 */
class AxonClient extends EventEmitter {
    /**
     * Creates an AxonClient instance.
     *
     * @param {String} token
     * @param {Object} options - Eris options
     * @param {Object} axonOptions - Axon options
     * @param {Object} modules - Object with all modules to add in the bot
     *
     *
     * @prop {Object<Eris.Client>} client - Eris Client [GETER: _client]
     *
     * @prop {Collection<Module>} modules - All modules in the client [key: label, value: module]
     * @prop {Collection<Command>} commands - All commands in the client [key: label, value: command]
     * @prop {Map<String>} commandAliases - All aliases in the client [key: alias, value: commandLabel]
     * @prop {Collection<Event>} events - All events in the client [key: label, value: event]
     * @prop {Collection<Object>} schemas - All schemas in client (global models) [key: schemaLabel, value: schema]
     * @prop {Collection<Object>} guildConfigs - Guild configs [key: guildID, value: { guildConfig }]
     *
     * @prop {Object} Logger - Default Logger / Chalk Logger / Signale Logger
     * @prop {Object} DBprovider - JSON(default) / Mongoose
     * @prop {Object} AxonUtil - Util methods (Axon)
     * @prop {Object} Resolver - Resolver
     * @prop {Object} Utils - Utils methods (general)
     *
     * @prop {Object} configs - configs (axon, template, _tokens) [GETTER: _configs]
     *
     * @prop {Set<String>} blacklistedUsers - Cached blacklisted users
     * @prop {Set<String>} blacklistedGuilds - Cached blacklisted guilds

     * @prop {Object} staff - Object of bot staff (user IDs) (owners, admins, ..+)
     *
     * @prop {Object} params - Bot params
     * @prop {Boolean} params.debugMode - Enable to show commands latency
     * @prop {Array} params.prefix - Default bot prefix
     * @prop {String} params.ownerPrefix - Owner prefix : override perms/cd
     * @prop {String} params.adminPrefix - Admins prefix : override perms/cd except Owner
     *
     * @prop {Object} infos - General infos { name, description, version, library, owners }
     * @prop {Object} axonInfos - AxonClient infos { name, version, author, github }
     *
     * @prop {Object} webhooks - All Client webhooks [GETTER: _configs._tokens.webhooks]
     * @prop {Object} template - Template options [GETTER: _configs.template]
     *
     * @memberof AxonClient
     */
    constructor(token, erisOptions, axonOptions, modules) {
        super();
        /** Cool logging */
        axonOptions.logo ? axonOptions.logo() : logo();

        /**
         * Initialise Handler,
         * Internal cache, Major compenents
         */
        /** Logger */
        this.Logger = axonOptions.logger || LoggerHandler.pickLogger((axonOptions.axonConf.debugMode || defAxonConf.debugMode || false), axonOptions.axonConf);
        /** DataModels */
        this.schemas = new Collection(); // Schema label => Schema Object
        /** DB */
        this.DBprovider = axonOptions.db || DBHandler.pickDBService(axonOptions, this);
        /** Utility */
        this.AxonUtils = new AxonUtils(this);
        this.Utils = axonOptions.utils ? new axonOptions.utils(this) : new Utils(this); // eslint-disable-line
        this.Resolver = axonOptions.resolver || Resolver;

        /**
         * Initialise Configs
         * - axon
         * - template
         * - _tokens
         */
        this._initConfigs(axonOptions); // this._configs [GETTER - this.configs]

        /**
         * Initialise CORE
         * Collections/Containers/Structures
         */

        /** Modules */
        this._tempModules = modules; // deleted after modules are initialised
        this.modules = new Collection(Module); // Module Label => Module Object
        /** Commands, Events */
        this.commands = new Collection(Command); // Command Label => ref Command Object
        this.commandAliases = new Map(); // Command Alias => Command label
        this.EventManager = new EventManager(this); // Event Label => ref Event function
        /** GuildConfigs */
        this.guildConfigs = new Collection(); // Guild ID => guildConfig

        /**
         * Initialise Blacklisted users and guilds
         */
        this.blacklistedUsers = new Set();
        this.blacklistedGuilds = new Set();

        /**
         * Initialise Eris Client
         */
        this._client = new Eris.Client(token, erisOptions); // [GETTER - this.client]

        /**
         * Initialise Bot Staff
         * - owners
         * - admins
         */
        this._initStaff(axonOptions); // this.staff

        /**
         * Bot settings
         * Prefixes - debug - misc
         */
        this.params = {
            debugMode: axonOptions.axonConf.debugMode || defAxonConf.debugMode || false,
            prefix: [
                axonOptions.axonConf.prefix.general || defAxonConf.prefix.general,
            ],
            ownerPrefix: axonOptions.axonConf.prefix.owner || defAxonConf.prefix.owner, // meant to be same prefix on all AxonClient instance (global override)
            adminPrefix: axonOptions.axonConf.prefix.admin || defAxonConf.prefix.admin, // meant to be different prefix on all AxonClient instance (global override)
        };

        /**
         * General infos
         */

        /** Bot informations */
        this.infos = {
            name: axonOptions.axonConf.general.name || defAxonConf.general.name,
            description: axonOptions.axonConf.general.description || defAxonConf.general.description,
            version: axonOptions.axonConf.general.version || defAxonConf.general.version,
            library: axonOptions.axonConf.general.library || defAxonConf.general.library,
            owners: Object.values(this._configs.axon.staff.owners).map(o => o.name),
        };
        /** Init infos */
        this.configs.axon.links && (this.infos.links = this.configs.axon.links);

        /** Client specification */
        this.axonInfos = {
            name: packageJSON.name,
            version: packageJSON.version,
            author: packageJSON.author,
            github: packageJSON.link,
        };
    }

    //
    // ****** GETTER ******
    //

    get configs() {
        return this._configs;
    }

    get client() {
        return this._client;
    }

    get webhooks() {
        return this._configs._tokens.webhooks;
    }

    get template() {
        return this._configs.template;
    }

    //
    // ****** INSTANCE INIT METHOD (AXONCLIENT CREATION) ******
    //

    _initConfigs({ axonConf, templateConf, tokenConf }) {
        this._configs = {};

        /** Axon Config */
        if (axonConf && this.Utils.compareObject(defAxonConf, axonConf)) {
            this._configs.axon = axonConf;
        } else {
            this._configs.axon = defAxonConf;
            this.Logger.warn(new AxonError('Couldn\'t init custom axon config (used default values)', 'INIT', 'Configs').stack);
        }

        /** Template Config */
        if (templateConf && this.Utils.compareObject(defTemplateConf, templateConf)) {
            this._configs.template = templateConf;
        } else {
            this._configs.template = defTemplateConf;
            this.Logger.warn(new AxonError('Couldn\'t init custom template config (used default values)', 'INIT', 'Configs').stack);
        }

        /** Token Config */
        if (tokenConf && this.Utils.compareObject(defTokenConf, tokenConf)) {
            this._configs._tokens = tokenConf;
        } else {
            this._configs._tokens = defTokenConf;
            this.Logger.warn(new AxonError('Couldn\'t init custom token config (used default values)', 'INIT', 'Configs').stack);
        }

        this.Logger.init('Configs initialised!');
    }

    _initStaff({ axonConf }) {
        this.staff = {};

        for (const staff of Object.keys(axonConf.staff)) {
            this.staff[staff] = axonConf.staff[staff].map(o => o.id);
        }
        this.Logger.init('Bot-Staff engaged!');

        /** Init Bot Staff (custom) */
        this.initStaff();
    }

    /**
     * Initialise Custom Bot Staff.
     * This method need to be overridden in child.
     *
     * @memberof AxonClient
     */
    initStaff() {
        // Not implemented
    }

    //
    // ****** INIT ******
    //

    /**
     * START METHOD
     * AxonClient class is already created at this point.
     *
     * @memberof AxonClient
     */
    start() {
        this.client.connect()
            .then(() => {
                this.Logger.notice('=== BotClient Connected! ===');
            })
            .catch(err => {
                this.Logger.error(err);
            });

        this._init()
            .then(() => {
                this.Logger.axon('=== AxonClient Ready! ===');
            })
            .catch(err => {
                this.Logger.error(err);
            });

        /**
         * - Global events -
         */
        this.client.once('ready', this._onReady.bind(this));
        // this.client.on('debug', console.log);

        this.client.on('messageCreate', this._onMessageCreate.bind(this));
    }

    _init() {
        return new Promise(async(resolve, reject) => {
            try {
                /** Init Error listeners */
                this.initErrorListeners();

                /** Init modules, commands */
                console.log(' ');
                this._initAllModules(this._tempModules); // load modules
                delete this._tempModules;
                console.log(' ');

                // Bind Listeners to Handlers
                this.EventManager.bindListeners();

                /** Axon init (blacklist/global cache) */
                await this.initAxon(); // load blacklisted users - guild

                /** Additional */
                await this.init();

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Custom init method.
     * This method need to be overridden in child.
     *
     * @returns {Promise}
     * @memberof AxonClient
     */
    init() {
        return Promise.resolve;
    }

    /**
     * Call Init Method on Ready event.
     * Bind All Handlers to the event emitter.
     *
     * @memberof AxonClient
     */
    _onReady() {
        this.Logger.axon('=== BotClient Ready! ===');
        this.client.ready = true;
        // Bind Handlers to Events
        this.EventManager.bindHandlers();
        /** Status */
        this.initStatus(); // execute default status function in Axon or override
        this.Logger.axon('Status setup!');

        this.AxonUtils.triggerWebhook('status', {
            color: 2067276,
            timestamp: new Date(),
            description: '**Instance Ready!**',
        });
    }

    /**
     * Initialize error listeners and webhooks.
     * This method can be overriden in child.
     *
     * @memberof AxonClient
     */
    initErrorListeners() {
        process.on('uncaughtException', (err) => {
            this.Logger.emerg(err.stack);

            this.AxonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length < 1950) ? err.stack : err.message,
            }, `Exception${this.client.user ? ` - ${this.client.user.username}` : ''}`);
        });

        process.on('unhandledRejection', (err) => {
            this.Logger.emerg(err.stack);

            this.AxonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length < 1950) ? err.stack : err.message,
            }, `Rejection${this.client.user ? ` - ${this.client.user.username}` : ''}`);
        });

        this.client.on('error', (err) => {
            this.Logger.error(err.stack);

            this.AxonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length < 1950) ? err.stack : err.message,
            });
        });

        this.client.on('warn', (msg) => {
            this.Logger.warn(msg);

            this.AxonUtils.triggerWebhook('error', {
                color: 15105570,
                timestamp: new Date(),
                description: msg,
            }, `Warn${this.client.user ? ` - ${this.client.user.username}` : ''}`);
        });

        this.Logger.axon('Error listeners bound!');
    }

    /**
     * Init and create instances of all modules.
     * Modules are imported from index.js as a global Object.
     *
     * @param {Object} modules - Object of Modules file
     * @memberof AxonClient
     */
    _initAllModules(modules) {
        for (const Value of Object.values(modules)) {
            const newModule = new Value(this);
            this.registerModule(newModule);
        }
        this.Logger.init(`Initialised! | [AxonClient] | Modules loaded -${this.modules.size}-`);
    }

    /**
     * Register a new module.
     * Init module in the client + commands + aliases.
     *
     * @param {Object<Module>} module
     * @memberof AxonClient
     */
    registerModule(module) {
        // init instance module and add it to the Map
        if (this.modules.has(module.label)) {
            throw new AxonError(`AxonClient - Module: ${module.label} already registered!`, 'INIT');
        }

        for (const [label, cmd] of module.commands) {
            if (this.commands.has(label)) {
                throw new AxonError(`${module.label} - Command: ${label} already registered!`, 'INIT');
            }
            this.commands.set(label, cmd); // Add the command in the commands Collection (references to module.commands.get(label))

            for (const alias of cmd.aliases) {
                if (this.commandAliases.has(alias)) {
                    throw new AxonError(`${module.label}(Command: ${label}) - Alias: ${alias} already registered!`, 'INIT');
                }
                this.commandAliases.set(alias, label); // Add the commands aliases in aliases Map (references to the command label)
            }
        }

        for (const [label, schema] of module.schemas) {  // Add the schemas in schemas Collection (references to module object)
            if (this.schemas.has(label)) {
                throw new AxonError(`${module.label} - Schema: ${label} already registered!`, 'INIT');
            }
            this.schemas.set(label, schema);
        }

        this.modules.set(module.label, module); // Add the module in modules Collection (references to module object)

        for (const event of module.events.values()) {
            this.EventManager.registerListener(event);
        }


        this.Logger.initModule(module);
    }

    /**
     * Unregister a module.
     * Remove the module of the client + commands + aliases + events + schemas.
     *
     * @param {String} label - Label of the module to unregister
     * @memberof AxonClient
     */
    unregisterModule(label) {
        const module = this.modules.get(label);
        // init instance module and add it to the Map
        if (!module) {
            throw new AxonError(`AxonClient - Module: ${module.label} not registered!`, 'INIT');
        }

        for (const [label, cmd] of module.commands) {
            for (const alias of cmd.aliases) {
                this.commandAliases.delete(alias); // Remove the commands aliases of aliases Map (references to the command label)
            }

            this.commands.delete(label); // Remove the command of the commands Collection (references to module.commands.get(label))
        }

        for (const label of module.schemas.keys()) {
            this.schemas.delete(label); // Remove the schemas of schemas Collection (references to module object)
        }

        for (const event of module.events.values()) {
            this.EventManager.unregisterListener(event.eventName, event.label);
        }

        this.modules.delete(module.label); // Remove the module of modules Collection (references to module object)

        this.Logger.info(`Module: ${module.label} unregistered!`);
    }

    /**
     * Retrieve all guild schemas, initialise the client with values from the DB (blacklisted users/guilds).
     *
     * @async
     * @memberof AxonClient
     */
    async initAxon() {
        let axonSchema;
        try {
            axonSchema = await this.fetchAxonConf();
        } catch (err) {
            throw new AxonError('Can\'t retrieve AxonSchema', 'INIT', 'DB ERROR', err);
        }

        for (const user of axonSchema.bannedUsers) { // init blacklisted users
            this.blacklistedUsers.add(user);
        }
        for (const guild of axonSchema.bannedGuilds) { // init blacklisted guilds
            this.blacklistedGuilds.add(guild);
        }

        this.Logger.init('[INIT] Axon config initialised!');
    }

    /**
     * Set the bot status.
     * Default method. Overridden by initStatus in child.
     *
     * @memberof AxonClient
     */
    initStatus() {
        this.client.editStatus(null, {
            name: `AxonCore | ${this.params.prefix[0]}help`,
            type: 0,
        });
    }

    //
    // ****** CORE -- EVENT LISTENER -- ONMESSAGE / EXEC ******
    //

    /**
     * Handler when a message is created.
     * Do all test and then either:
     *   - call execDm
     *   - call execAdmin
     *   - call execCommand
     *   - return (do nothing)
     *
     * @async
     * @param {Object<Message>} msg - The message object
     * @memberof AxonClient
     */
    async _onMessageCreate(msg) {
        if (!this.client.ready) {
            return;
        }

        /** msg.author error + ignore self + ignore bots */
        if (!msg.author || msg.author.bot) {
            return;
        }

        /** ignore cached blacklisted users */
        if (this.blacklistedUsers.has(msg.author.id)) {
            return;
        }

        /** execDM if not in a guild */
        if (!msg.channel.guild) {
            return this._execDM(msg);
        }

        /** ignore cached blacklisted guilds */
        if (this.blacklistedGuilds.has(msg.channel.guild.id)) {
            return;
        }

        msg.command = false;

        /**
         * Get guild Conf from cache or DB
         * Raise error eventually
         */
        let guildConf;
        try {
            guildConf = await this.getGuildConf(msg.channel.guild.id);
        } catch (err) {
            return this.Logger.error(err, { guild: msg.channel.guild });
        }

        /** Admin override */
        if (msg.content.startsWith(this.params.ownerPrefix) && this.AxonUtils.isBotOwner(msg.author.id)) { // Owner override everything
            return this._execAdmin(msg, guildConf, true);
        } else if (msg.content.startsWith(this.params.adminPrefix) && this.AxonUtils.isBotAdmin(msg.author.id)) { // ADMIN override everything except owner
            return this._execAdmin(msg, guildConf, false);
        }

        msg.content = msg.content.replace(/<@!/g, '<@'); // formatting mention

        /** Resolve prefix and proceed to command */
        const prefix = this.resolvePrefix(msg);
        if (prefix) {
            msg.prefix = prefix;

            /** Check if the user/role/channel is ignored in the guild */
            if (this._isGuildIgnored(msg, guildConf)) {
                return;
            }

            const args = msg.content.substring(msg.prefix.length).split(' ');
            const label = args.shift().toLowerCase();

            /** Call Help if first arg = 'help' */
            if (label === 'help') { // send Help message
                return this._execHelp(msg, args, guildConf);
            }

            /** Resolve command (and subcommand if needed) - exec command if the command was resolved */
            const command = this.resolveCommand(label, args, guildConf);
            if (!command) { // command doesn't exist or not globally enabled
                return;
            }

            msg.command = command;

            return this._execCommand(msg, args, command, guildConf);
        }
    }

    /**
     * Default execution of a command.
     *
     * @param {Object<Message>} msg - Message Object
     * @param {Array<String>} args  - Array of args
     * @param {Object<Command>} command  - Command object resolved
     * @param {Object} guildConf - Guild Config from the DB
     * @memberof AxonClient
     */
    _execCommand(msg, args, command, guildConf) {
        if (this.params.debugMode) {
            this.Logger.verbose(`Execution of ${command.label}`);
            console.time('- Net');
            console.time('- Node');

            command._execute({ msg, args, guildConf })
                .then(() => {
                    this.emit('axonCommandSuccess', { msg, guildConf });
                    console.timeEnd('- Net');
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack, { guild: msg.channel.guild, cmd: command.label });
                    this.emit('axonCommandError', { msg, guildConf, err });
                    console.timeEnd('- Net');
                    return;
                });
            console.timeEnd('- Node');
        } else {
            command._execute({ msg, args, guildConf })
                .then(() => {
                    this.emit('axonCommandSuccess', { msg, guildConf });
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack, { guild: msg.channel.guild, cmd: command.label });
                    this.emit('axonCommandError', { msg, guildConf, err });
                    return;
                });
        }
    }

    /**
     * Executes a command with admin overrides.
     *
     * @param {Object<Message>} msg - Message Object
     * @param {Oject} guildConf - Guild config
     * @param {Boolean} isOwner - Whether the user is bot owner
     * @memberof AxonClient
     */
    _execAdmin(msg, guildConf, isOwner) {
        msg.prefix = this.params.adminPrefix;

        const args = msg.content.replace(/<@!/g, '<@').substring(msg.prefix.length).split(' ');
        const label = args.shift().toLowerCase();

        /** Call Help if first arg = 'help' */
        if (label === 'help') { // send Help message
            return this._execHelp(msg, args, guildConf);
        }

        /** Resolve command (and subcommand if needed) - exec command if the command was resolved */
        const command = this.resolveCommand(label, args); // doesn't pass guildConf so it doesn't check for server disabled
        if (!command) { // command doesn't exist or not globally enabled
            return;
        }
        msg.command = command;

        /**
         * Execution with/without debugMode
         * Logging/Error handling
         */
        if (this.params.debugMode) {
            this.Logger.verbose(`Admin Execution of ${command.label}`);
            console.time('- Net');
            console.time('- Node');

            command._executeAdmin({ msg, args, guildConf, isOwner })
                .then(() => {
                    this.emit('axonCommandSuccess', { msg, guildConf });
                    console.timeEnd('- Net');
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack, { guild: msg.channel.guild, cmd: command.label });
                    this.emit('axonCommandError', { msg, guildConf, err });
                    return;
                });
            console.timeEnd('- Node');
        } else {
            command._executeAdmin({ msg, args, guildConf, isOwner })
                .then(() => {
                    this.emit('axonCommandSuccess', { msg, guildConf });
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack, { guild: msg.channel.guild, cmd: command.label });
                    this.emit('axonCommandError', { msg, guildConf, err });
                    return;
                });
        }
    }

    /**
     * Executes a command in DM, has no guildConfig.
     *
     * @param {Object<Message>} msg
     * @memberof AxonClient
     */
    _execDM(msg) {
        msg.content = msg.content.replace(/<@!/g, '<@'); // formatting mention

        /** Resolve prefix (can only be default bot prefix) */
        const prefix = this.resolvePrefix(msg);
        if (prefix) {
            msg.prefix = prefix;

            const args = msg.content.substring(msg.prefix.length).split(' ');
            const label = args.shift().toLowerCase();

            /** Call Help if first arg = 'help' */
            if (label === 'help') { // send Help message
                return this._execHelp(msg, args);
            }

            /** Resolve command (and subcommand if needed) - exec command if the command was resolved */
            const command = this.resolveCommand(label, args);
            if (!command) { // command doesn't exist or not globally enabled
                return;
            }
            msg.command = command;

            /**
             * Execution with/without debugMode
             * Logging/Error handling
             */
            if (this.params.debugMode) {
                this.Logger.verbose(`DM Execution of ${command.label}`);
                console.time('- Net');
                console.time('- Node');

                command._executeDM({ msg, args })
                    .then(() => {
                        console.timeEnd('- Net');
                        this.emit('axonCommandSuccess', { msg, guildConf: null });
                    })
                    .catch(err => {
                        this.Logger.error(new AxonCommandError(command.module, command, `DM: ${msg.author.id}`, err).stack, { cmd: command.label, user: msg.user });
                        this.emit('axonCommandError', { msg, guildConf: null, err });
                        return;
                    });
                console.timeEnd('- Node');
            } else {
                command._executeDM({ msg, args })
                    .then(() => {
                        this.emit('axonCommandSuccess', { msg, guildConf: null });
                    })
                    .catch(err => {
                        this.Logger.error(new AxonCommandError(command.module, command, `DM: ${msg.author.id}`, err).stack, { cmd: command.label, user: msg.user });
                        this.emit('axonCommandError', { msg, guildConf: null, err });
                        return;
                    });
            }
        }
    }

    /**
     * Executes the help command.
     *
     * @param {Object<Message>} msg - The message object
     * @param {Array<String>} args - Array of argument
     * @param {Object} guildConf - GuildConfig from the DB
     * @memberof AxonClient
     */
    _execHelp(msg, args, guildConf) {
        if (args.length === 0) {
            return this.sendFullHelp(msg);
        }

        /**
         * Resolve actual Command to get the help for.
         */
        const label = args.shift();
        const command = this.resolveCommand(label, args);
        if (!command) { // command doesn't exist or not globally enabled
            return;
        }
        msg.command = command;

        command.sendHelp({ msg, args, guildConf })
            .then(() => {
                command._cooldown[msg.author.id] = Date.now();
            });
    }

    /**
     * Send full help in DM.
     * Doesn't show commands that the user can't execute.
     * This method can be overridden in child.
     *
     * @param {Object<Message>} msg - The message object
     * @return {Promise<Message>} Message Object
     * @memberof AxonClient
     */
    async sendFullHelp(msg) {
        const guildConfig = msg.channel.guild ? await this.getGuildConf(msg.channel.guild.id) : null;
        const prefix = (guildConfig && guildConfig.prefix.length > 0)
            ? guildConfig.prefix[0]
            : this.params.prefix[0];

        const embed = {};

        embed.author = {
            name: `Help for ${this.client.user.username}`,
            icon_url: this.client.user.avatarURL,
        };
        embed.description = this.infos.description;
        embed.footer = {
            text: 'Runs with AxonCore',
        };

        embed.color = this.template.embed.colors.help.length > 0 ? this.template.embed.colors.help : null;

        let commandList = '';
        if (guildConfig) {
            for (const module of this.modules.values()) {
                const commands = module.commands.filter(c => c.canExecute(msg.channel, msg.member, guildConfig));
                if (commands.length > 0) {
                    commandList += `**${module.label}**\n${commands.map(c => `\`${prefix}${c.label}\` - ${c.infos.description}`).join('\n')}\n`;
                }
            }
        } else {
            for (const module of this.modules.values()) {
                commandList += `**${module.label}**\n${module.commands.map(c => `\`${prefix}${c.label}\` - ${c.infos.description}`).join('\n')}\n`;
            }
        }

        try {
            const chan = await this.client.getDMChannel(msg.author.id);

            /** Split commandList */
            if (commandList.length > 1800) {
                commandList = commandList.match(/[\s\S]{1,1800}[\n\r]/g) || [];
                for (const match of commandList) {
                    embed.description = match;
                    await this.client.createMessage(chan.id, { embed });
                }
            } else {
                embed.description = commandList;
                await this.client.createMessage(chan.id, { embed });
            }
        } catch (err) {
            //
        }
    }

    //
    // ****** CHECKERS ******
    //

    /**
     * Check if the user/role/channel is ignored on the specified guild.
     *
     * @param {Object<Message>} msg
     * @param {Object} guildConf
     * @returns {Boolean} True if either one of the three is ignored / False if none
     * @memberof AxonClient
     */
    _isGuildIgnored(msg, guildConf) {
        return guildConf.ignoredUsers.find(u => u === msg.author.id) // User is ignored
            || guildConf.ignoredRoles.find(r => msg.member.roles && msg.member.roles.includes(r)) // Role is ignored
            || guildConf.ignoredChannels.find(c => c === msg.channel.id); // Channel is ignored
    }

    /**
     * Check if the module is disabled on the specified guild.
     *
     * @param {Object<Command>} command - The command object
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} True if disabled / Undefined if not
     * @memberof AxonClient
     */
    _isModuleDisabled(command, guildConf) {
        return guildConf.modules.find(m => m === command.module.label);
    }

    /**
     * Check if the command is disabled on the specified guild.
     *
     * @param {Object<Command>} command - The command object
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} True if disabled / Undefined if not
     * @memberof AxonClient
     */
    _isCommandDisabled(command, guildConf) {
        return guildConf.commands.find(c => c === command.label);
    }

    //
    // ****** DATABASE ******
    // Initialisation/fetch
    //

    /**
     * Fetch and resolve the axon config from the DB with all default params, creates a schema if none was found or there was an error.
     *
     * @returns {Promise<Object>} Axon schema from the DB / error
     * @memberof AxonClient
     */
    async fetchAxonConf() {
        try {
            let axonConf = await this.DBprovider.fetchAxon();
            if (!axonConf) {
                axonConf = await this.DBprovider.initAxon();
            }
            return axonConf;
        } catch (err) {
            try {
                const newAxonConf = await this.DBprovider.initAxon();
                return newAxonConf;
            } catch (e) {
                throw e;
            }
        }
    }

    /**
     * Fetches and resolves the guild config of the given ID from the DB, creates a schema if none was found or there was an error.
     *
     * @param {String} gID - The guild ID to fetch the DB
     * @returns {Promise<Object>} Guild schema from the DB / Error
     * @memberof AxonClient
     */
    async fetchGuildConf(gID) {
        try {
            let guildConf = await this.DBprovider.fetchGuild(gID);
            if (!guildConf) {
                guildConf = await this.DBprovider.initGuild(gID);
            }
            return guildConf;
        } catch (err) {
            try {
                const newGuildConf = await this.DBprovider.initGuild(gID);
                return newGuildConf;
            } catch (e) {
                throw e;
            }
        }
    }

    //
    // ****** INTERNAL (Resolvers) ******
    //

    /**
     * Resolves the prefix for the guild of the message.
     * If the message starts with one of the guild prefixes it returns the prefix, otherwise it returns undefined.
     *
     * @param {Object<Message>} msg - the message object
     * @returns {String?} The prefix if found / Undefined if not
     * @memberof AxonClient
     */
    resolvePrefix(msg) {
        let prefixes = this.params.prefix;
        if (msg.channel.guild && this.guildConfigs.has(msg.channel.guild.id) && this.guildConfigs.get(msg.channel.guild.id).prefix.length) {
            prefixes = this.guildConfigs.get(msg.channel.guild.id).prefix;
        }
        return (msg.content.startsWith(`${this.client.user.mention} `) && `${this.client.user.mention} `) || prefixes.find(prefix => msg.content.startsWith(prefix));
    }

    /**
     * Resolves the command Object. Only resolves the command if it's not disabled.
     *
     * @param {String} label - the command label/ command alias
     * @param {Array<String>} args - Array of arguments
     * @param {Object} [guildConf=false] - Guild config from DB
     * @returns {Object?} The command object or undefined if the command doesn't exist or is not enabled
     * @memberof AxonClient
     */
    resolveCommand(label, args, guildConf = false) {
        label = this.commandAliases.get(label);

        let command = this.commands.get(label);

        if (!command || !command.module.enabled || !command.enabled) {
            return undefined;
        }

        if (guildConf
            && (
                (this._isModuleDisabled(command, guildConf) && !command.module.serverBypass) // check module/command server disabled
                || (this._isCommandDisabled(command, guildConf) && !command.serverBypass)
            )
        ) {
            return undefined;
        }

        if (command.hasSubcmd) {
            while (command.hasSubcmd) {
                const subLabel = args[0] ? command.subCommandsAliases.get(args[0].toLowerCase()) : null;
                if (subLabel) {
                    args.shift();
                    command = command.subCommands.get(subLabel.toLowerCase());
                    if (!command || !command.module.enabled || !command.enabled) {
                        return undefined;
                    }
                } else {
                    break;
                }
            }
        }
        return command;
    }

    /**
     * Get (or create) the guildConfig of the given ID from cache or DB.
     * Cache the guildConfig if it's not already cached.
     *
     * @param {String} gID
     * @returns {Promise<Object>} GuildConf fetched
     * @memberof AxonClient
     */
    async getGuildConf(gID) {
        let guildConf = this.guildConfigs.get(gID);
        if (!guildConf) {
            try {
                guildConf =  await this.fetchGuildConf(gID); // retrieve DB, get guildConf
            } catch (err) {
                throw new AxonCommandError('OnMessage', 'DB ERROR - guildConfig', `Guild: ${gID}`, err);
            }
            this.guildConfigs.set(gID, guildConf);
        }
        return guildConf;
    }

    /**
     * Get a module from AxonClient with the given label.
     *
     * @param {String} module - Module label
     * @returns {Object<Module>|null}
     * @memberof Base
     */
    getModule(module) {
        return this.modules.get(module) || null;
    }

    /**
     * Get a command/subcommand from AxonClient with the given full label.
     *
     * @param {String} fullLabel - Full command (or subcommand) label
     * @returns {Object<Command>|null}
     * @memberof Base
     */
    getCommand(fullLabel) {
        const splitLabel = fullLabel.split(' ');

        const label = this.commandAliases.get(splitLabel[0].toLowerCase());
        let command = this.commands.get(label);
        if (!command) {
            return null;
        }

        splitLabel.shift();
        for (const sub of splitLabel) {
            if (command.hasSubcmd) {
                const subLabel = command.subCommandsAliases.get(sub.toLowerCase());
                command = command.subCommands.get(subLabel);
            }
        }
        return command || null;
    }

    /**
     * Update the guild config in the cache and DB.
     *
     * @param {String} gID - Guild id
     * @param {Object} guildSchema - Guild schema Object
     * @returns {Promise<Object>} Updated guildSchema
     * @memberof AxonClient
     */
    updateGuildConf(gID, guildSchema) {
        return this.DBprovider.saveGuildSchema(gID, guildSchema)
            .then(() => {
                this.guildConfigs.set(gID, guildSchema);
            });
    }

    //
    // ****** EXTERNAL ******
    //

    /**
     * Register a guild prefix.
     * External method that can be called to update the cached prefix with the prefix registered in the DB.
     *
     * @param {String} gID - The guild ID
     * @param {Array<String>} prefixArr - The array of prefix
     * @returns {Promise<Object>} The guild Schema from the DB / Error if error
     * @memberof AxonClient
     */
    registerGuildPrefix(gID, prefixArr) {
        return this.DBprovider.updateGuildPrefix(gID, prefixArr)
            .then((guildSchema) => {
                if (!this.guildConfigs.has(gID)) {
                    this.guildConfigs.set(gID, guildSchema);
                } else {
                    const conf = this.guildConfigs.get(gID);
                    conf.prefix = prefixArr;
                }

                return guildSchema;
            });
    }

    /**
     * Add/Remove a blacklisted user.
     * External method that can be called to add a user to the blacklist.
     *
     * @async
     * @param {String} userID - The id of the user to blacklist
     * @param {Boolean} [boolean=true] - Whether to add(true) or remove(false) the user to blacklist
     * @returns {Promise<Object>} The Axon Schema from the DB / Error
     * @memberof AxonClient
     */
    async updateBlacklistUser(userID, boolean = true) {
        if (boolean) {
            !this.blacklistedUsers.has(userID) && this.blacklistedUsers.add(userID);
        } else {
            this.blacklistedUsers.has(userID) && this.blacklistedUsers.delete(userID);
        }
        const blacklist = Array.from(this.blacklistedUsers);
        try {
            const axon = await this.DBprovider.updateBlacklistUser(blacklist);
            return axon;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Add/Remove a blacklisted guild.
     * External method that can be called to add a guild to the blacklist
     *
     * @async
     * @param {String} guildID - The id of the guild to blacklist
     * @param {Boolean} [boolean=true] - if add(true) or remove(false) the guild to blacklist
     * @returns {Promise<Object>} The Axon Schema from the DB / Error
     * @memberof AxonClient
     */
    async updateBlacklistGuild(userID, boolean = true) {
        if (boolean) {
            !this.blacklistedGuilds.has(userID) && this.blacklistedGuilds.add(userID);
        } else {
            this.blacklistedGuilds.has(userID) && this.blacklistedGuilds.delete(userID);
        }
        const blacklist = Array.from(this.blacklistedUsers);
        try {
            const axon = await this.DBprovider.updateBlacklistGuild(blacklist);
            return axon;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates the state of a module.
     * true = disable the module, false = enable the module
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The module label
     * @param {Boolean} [boolean=true] - If disable the module (false) or enable (true)
     * @returns {Promise<Object>} Updated guildSchema / Error
     * @memberof AxonClient
     */
    async updateGuildStateModule(guildID, label, boolean = true) {
        let conf;
        try {
            conf = await this.getGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean
            ? conf.modules.includes(label) && (conf.modules = conf.modules.filter(c => c !== label))
            : !conf.modules.includes(label) && conf.modules.push(label);

        try {
            const newConf = await this.DBprovider.updateModule(guildID, conf.modules);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates the state of a command.
     * true = disable the command, false = enable the command.
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The command label
     * @param {Boolean} [boolean=true] - If disable the command (false) or enable (true)
     * @returns {Promise<Object>} Updated guildSchema / Error
     * @memberof AxonClient
     */
    async updateGuildStateCommand(guildID, label, boolean = true) {
        let conf;
        try {
            conf = await this.getGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean
            ? conf.commands.includes(label) && (conf.commands = conf.commands.filter(c => c !== label))
            : !conf.commands.includes(label) && conf.commands.push(label);

        try {
            const newConf = await this.DBprovider.updateCommand(guildID, conf.commands);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates the state of an event.
     * true = disable the event, false = enable the event.
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The event label
     * @param {Boolean} [boolean=true] - If disable the event (false) or enable (true)
     * @returns {Promise<Object>} Updated guildSchema / Error
     * @memberof AxonClient
     */
    async updateStateEvent(guildID, label, boolean = true) {
        let conf;
        try {
            conf = await this.getGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean
            ? conf.events.includes(label) && (conf.events = conf.events.filter(c => c !== label))
            : !conf.events.includes(label) && conf.events.push(label);

        try {
            const newConf = await this.DBprovider.updateEvent(guildID, conf.events);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Enables or disables a module globally.
     *
     * @param {String} module - Module name
     * @param {Boolean} [state=true] - Whether to enable or disable
     * @memberof AxonClient
     */
    updateGlobalStateModule(module, state = true) {
        this.modules.get(module).enabled = state;
        this.Logger.info(`Globally ${state ? 'enabled' : 'disabled'} module: ${module}.`);
    }

    /**
     * Enables or disables a command globally.
     *
     * @param {String} command - Command name
     * @param {Boolean} [state=true] - Whether to enable or disable
     * @memberof AxonClient
     */
    updateGlobalStateCommand(command, state = true) {
        this.commands.get(command).enabled = state;
        this.Logger.info(`Globally ${state ? 'enabled' : 'disabled'} command: ${command}.`);
    }

    /**
     * ToString method.
     *
     * @returns {String}
     * @memberof AxonClient
     */
    toString() {
        return this.constructor.name;
    }

    /**
     * ToJSON method.
     * (Taken from eris.)
     *
     * @returns {Object} JSON-like Object
     * @memberof AxonClient
     */
    toJSON() {
        const base = {};
        for (const key in this) {
            if (!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_')) {
                if (!this[key]) {
                    base[key] = this[key];
                } else if (this[key] instanceof Set) {
                    base[key] = Array.from(this[key]);
                } else if (this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values());
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
     * Inspect method.
     * Doesn't list prefixed property and undefined property.
     * (Taken from eris.)
     *
     * @returns {Object} Object to inspect
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
