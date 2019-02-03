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

// Core - Structures
import Module from './Structures/Module';
import Command from './Structures/Command';
import EventManager from './Structures/EventManager';
import MessageHandler from './Structures/MessageHandler';

// Utility
import Collection from './Utility/Collection';
import AxonUtils from './Utility/AxonUtils';
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
     * @param {Object} [erisOptions={}] - Eris options
     * @param {Object} [axonOptions={}] - Axon options
     * @param {Object} [axonOptions.axonConf] - General Axon config
     * @param {Object} [axonOptions.templateConf] - Template config
     * @param {Object} [axonOptions.tokenConf] - Token config
     * @param {Object<Utils>} [axonOptions.utils] - Utils class, needs to be an instance of AxonCore.Utils
     * @param {Object} [axonOptions.logger] - Custom logger
     * @param {Object} [axonOptions.db] - DB Service. Needs to be an instance of DB Service
     * @param {Object} [axonOptions.axonSchema] - Custom AxonSchema
     * @param {Object} [axonOptions.guildSchema] - Custom GuildSchema
     * @param {Object} [modules={}] - Object with all modules to add in the bot
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
    constructor(token, erisOptions = {}, axonOptions = {}, modules = {}) {
        super();
        /** Cool logging */
        axonOptions.logo ? axonOptions.logo() : logo();

        /**
         * Initialise Handler,
         * Internal cache, Major compenents
         */
        /** Logger */
        this.Logger = axonOptions.logger || axonOptions.axonConf
            ? LoggerHandler.pickLogger((axonOptions.axonConf.debugMode || defAxonConf.debugMode || false), axonOptions.axonConf)
            : LoggerHandler.pickLogger(false, 0);

        /** DataModels */
        this.schemas = new Collection(); // Schema label => Schema Object

        /** Utility */
        this.AxonUtils = new AxonUtils(this);

        if (axonOptions.utils && axonOptions.utils instanceof Utils) {
            this.Utils = new axonOptions.utils(this); // eslint-disable-line
        } else {
            this.Utils = new Utils(this);
        }

        /**
         * Initialise Configs
         * - axon
         * - template
         * - _tokens
         */
        this._initConfigs(axonOptions); // this._configs [GETTER - this.configs]

        /** DB */
        this.DBprovider = axonOptions.db || DBHandler.pickDBService(axonOptions, this);

        /**
         * Initialise CORE
         * Collections/Containers/Structures
         */

        /** Modules */
        this._tempModules = modules || {}; // deleted after modules are initialised
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
        this._initStaff(this.axonConf); // this.staff

        /**
         * Bot settings
         * Prefixes - debug - misc
         */
        this.params = {
            debugMode: this.axonConf.debugMode || false,
            prefix: [
                this.axonConf.prefix.general,
            ],
            ownerPrefix: this.axonConf.prefix.owner, // meant to be same prefix on all AxonClient instance (global override)
            adminPrefix: this.axonConf.prefix.admin, // meant to be different prefix on all AxonClient instance (global override)
        };

        /**
         * General infos
         */

        /** Bot informations */
        this.infos = {
            name: this.axonConf.general.name,
            description: this.axonConf.general.description,
            version: this.axonConf.general.version,
            library: this.axonConf.general.library,
            owners: Object.values(this.axonConf.staff.owners).map(o => o.name),
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

    get axonConf() {
        return this._configs.axon;
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
            this.Logger.error(new AxonError('Couldn\'t init custom axon config (used default values)', 'INIT', 'Configs').stack);
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

    _initStaff(axonConf) {
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

        const messageHandler = new MessageHandler(this);
        this.client.on('messageCreate', messageHandler._onMessageCreate.bind(messageHandler));
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
                await this._initAxon(); // load blacklisted users - guild

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
        return Promise.resolve();
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
        if (Object.keys(modules).length === 0) {
            this.Logger.warn('No modules given.');
        }

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
    async _initAxon() {
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
     * Default execution of a command.
     *
     * @param {Object<Message>} msg - Message Object
     * @param {Array<String>} args  - Array of args
     * @param {Object<Command>} command  - Command object resolved
     * @param {Object} guildConf - Guild Config from the DB
     * @memberof AxonClient
     */
    _execCommand(msg, args, command, guildConf) {
        const context = guildConf  ? 'Guild' : 'DM';
        if (this.params.debugMode) {
            this.Logger.verbose(`${context} execution of ${command.label}`);
            console.time('- Net');
            console.time('- Node');

            command._execute({ msg, args, guildConf })
                .then(() => {
                    this.emit('axonCommandSuccess', { msg, guildConf });
                    console.timeEnd('- Net');
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `${context}: ${msg.channel.guild.id}`, err).stack, { guild: msg.channel.guild, cmd: command.label });
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
                    this.Logger.error(new AxonCommandError(command.module, command, `${context}: ${msg.channel.guild.id}`, err).stack, { guild: msg.channel.guild, cmd: command.label });
                    this.emit('axonCommandError', { msg, guildConf, err });
                    return;
                });
        }
    }

    /**
     * Admin execution of a command.
     *
     * @param {Object<Message>} msg - Message Object
     * @param {Array<String>} args  - Array of args
     * @param {Object<Command>} command  - Command object resolved
     * @param {Object} guildConf - Guild Config from the DB
     * @param {Boolean} isOwner - Whether the user is an owner or not
     * @memberof AxonClient
     */
    _execAdminCommand(msg, args, command, guildConf, isOwner) {
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

        command.sendHelp({ msg, args, guildConf });
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
    isGuildIgnored(msg, guildConf) {
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
    isModuleDisabled(command, guildConf) {
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
    isCommandDisabled(command, guildConf) {
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
                (this.isModuleDisabled(command, guildConf) && !command.module.serverBypass) // check module/command server disabled
                || (this.isCommandDisabled(command, guildConf) && !command.serverBypass)
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

    //
    // ****** GENERAL METHODS ******
    //

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
