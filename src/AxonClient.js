'use strict';

// Lib - Modules
import Eris from 'eris';

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
import EventF from './Structures/EventF';

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
 */
class AxonClient {
    /**
     * Creates an instance of AxonClient.
     *
     * @param {String} token
     * @param {Object} options - Eris options
     * @param {Object} axonOptions - Axon options
     * @param {Object} modules - Object with all modules to add in the bot
     *
     * @prop {Object} Logger - Default Logger/Chalk Logger/Signale Logger
     * @prop {Object} DBprovider - JSON(default)/Mongoose
     * @prop {Object} AxonUtil - Util methods Axon
     * @prop {Object} Resolver - Resolver
     * @prop {Object} Utils - Utils methods general
     * @prop {Object} _configs - configs (axon, template, _tokens) [GETTER: configs]
     * @prop {Collection<Module>} modules - All modules in the client [key: label, value: module]
     * @prop {Collection<Command>} commands - All commands in the client [key: label, value: command]
     * @prop {Map<String>} commandAliases - All aliases in the client [key: alias, value: commandLabel]
     * @prop {Collection<EventF>} events - All events in the client [key: label, value: event]
     * @prop {Collection<Object>} models - All models in client (global models) [key: schemaLabel, value: schema]
     * @prop {Collection<Object>} guildConfigs - Guild configs [key: guildID, value: {guild config Object}]
     * @prop {Object} AxonClient - Object with AxonClient specifications (versions, author). Define BASE for the bot
     * @prop {Set<String>} blacklistedUsers - Cached black listed users
     * @prop {Set<String>} blacklistedGuilds - Cached black listed guilds
     * @prop {Object<Eris.Client>} _client - Eris Client [GETER: client]
     * @prop {Object} staff - Object of bot staff (user IDs) (owners, admins, ..+)
     * @prop {Object} params - Bot params
     * - debugMode (boolean)  : enable to show commands latency
     * - prefix (Array)       : default bot prefix
     * - ownerPrefix (string) : owner prefix - override perms/cd
     * - adminPrefix (string) : admins prefix - override perms/cd
     * @prop {Object} infos - Default infos about the bot: owners/name/links etc (misc)
     * @prop {Object} axonInfos - Infos about Client (AxonClient)
     *
     * @memberof AxonClient
     */
    constructor(token, erisOptions, axonOptions, modules) {
        /** Cool logging */
        console.log(logo);

        /**
         * Initialise Handler,
         * Internal cache, Major compenents
         */
        /** Logger */
        this.initLogger(axonOptions); // this.Logger
        /** DB */
        this.initDB(axonOptions); // this.DBprovider
        /** Utility */
        this.AxonUtils = new AxonUtils(this);
        this.Utils = axonOptions.utils ? new axonOptions.utils() : new Utils(); // eslint-disable-line
        this.Resolver = axonOptions.resolver || Resolver;

        /**
         * Initialise Configs
         * - axon
         * - template
         * - _tokens
         */
        this.initConfigs(axonOptions); // this._configs [GETTER - this.configs]

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
        this.events = new Collection(EventF); // Event Label => ref EventF function
        /** DataModels */
        this.models = new Collection(); // Schema label => Schema Object
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
        this.initOwners(axonOptions); // this.staff

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
            github: packageJSON.repository.url,
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

    //
    // ****** INSTANCE INIT METHOD (AXONCLIENT CREATION) ******
    //

    initLogger(axonOptions) {
        this.Logger = axonOptions.logger || LoggerHandler.pickLogger(axonOptions.axonConf);
        this.Logger.axon('Logger ready');

        /** LOGGER TESTING */
        console.log(' ');
        this.Logger.emerg('- Test EMERG -');
        this.Logger.error('- Test ERROR -');
        this.Logger.warn('- Test WARN -');
        this.Logger.debug('- Test DEBUG -');
        this.Logger.notice('- Test notice -');
        this.Logger.info('- Test info -');
        this.Logger.verbose('- Test verbose -');
        this.Logger.axon('- Test AXON -');
        this.Logger.init('- Test INIT -');
        // this.Logger.module('- Test module -');
        // this.Logger.command('- Test command -');
        console.log(' ');
    }

    initDB(axonOptions) {
        this.DBprovider = axonOptions.db || DBHandler.pickDBService(axonOptions.axonConf, this.Logger);
        this.Logger.axon('DB ready');
    }

    initConfigs({ axonConf, templateConf, tokenConf }) {
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

    initOwners({ axonConf: config }) {
        this.staff = {};

        this.staff.owners = config.staff.owners.map(o => o.id);
        if (config.staff.admins) {
            this.staff.admins = config.staff.admins.map(o => o.id);
        }

        this.Logger.init('Owners engaged!');

        /** Init Bot Staff (custom) */
        if (this.initStaff) {
            this.initStaff();
            this.Logger.init('Staff engaged!');
        }
    }

    //
    // ****** INIT ******
    //

    /**
     * START METHOD
     * AxonClient class already created
     *
     * @memberof AxonClient
     */
    start() {
        this.client.connect()
            .then(() => {
                this.Logger.axon('=== BotClient Connected! ===');
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
        this.client.once('ready', this.onReady.bind(this));

        this.client.on('messageCreate', this.onMessageCreate.bind(this));
    }

    _init() {
        return new Promise(async(resolve, reject) => {
            try {
                /** Init Error listeners */
                this.initListener();

                /** Init modules, commands */
                this.initAllModules(this._tempModules); // load modules
                delete this._tempModules;

                /** Axon init (blacklist/global cache) */
                await this.initAxon(); // load blacklisted users - guild

                /** Additional */
                if (this.init) { // if child class has init
                    await this.init();
                    this.Logger.init('Personal init');
                }

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Call Init Method on Ready event
     *
     * @memberof AxonClient
     */
    onReady() {
        this.Logger.axon('=== BotClient Ready! ===');
        this.client.ready = true;
        /** Status */
        this.initStatus(); // execute default status function in Axon or override

        this.AxonUtils.triggerWebhook('status', {
            color: 2067276,
            timestamp: new Date(),
            description: '**Instance Ready!**',
        });
    }

    /**
     * Initialize error listeners + webhooks
     *
     * @memberof AxonClient
     */
    initListener() {
        process.on('uncaughtException', (err) => {
            this.Logger.emerg(err.stack);

            this.AxonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length > 1950) ? err.message : err.stack,
            }, `Exception - ${this.client.user.username}`);
        });

        process.on('unhandledRejection', (err) => {
            this.Logger.emerg(err.stack);

            this.AxonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length > 1950) ? err.message : err.stack,
            }, `Rejection - ${this.client.user.username}`);
        });

        this.client.on('error', (err) => {
            this.Logger.error(err.stack);

            this.AxonUtils.triggerWebhook('error', {
                color: 15158332,
                timestamp: new Date(),
                description: (err.stack && err.stack.length > 1950) ? err.message : err.stack,
            });
        });

        this.client.on('warn', (msg) => {
            this.Logger.warn(msg);

            this.AxonUtils.triggerWebhook('error', {
                color: 15105570,
                timestamp: new Date(),
                description: msg,
            }, `Warn - ${this.client.user.username}`);
        });

        this.Logger.axon('Error listeners bound!');
    }

    /**
     * Init and create instance of all modules
     * Modules are imported from index.js as a global Object
     *
     * @param {Object} modules - Object of Modules file
     * @memberof AxonClient
     */
    initAllModules(modules) {
        for (const [, Value] of Object.entries(modules)) {
            const newModule = new Value(this);
            this.registerModule(newModule);
        }
        this.Logger.init(`[AxonClient] Initialised! Modules loaded -${this.modules.size}-`);
    }

    /**
     * Register a new Module
     * Init module in the client + commands + aliases
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
            this.commands.set(label, cmd); // add the command in the commands Map (references to module.commands.get(label))

            for (const alias of cmd.aliases) {
                if (this.commandAliases.has(alias)) {
                    throw new AxonError(`${module.label}(Command: ${label}) - Alias: ${alias} already registered!`, 'INIT');
                }
                this.commandAliases.set(alias, label); // add the commands aliases in aliases Map (references to the command label)
            }
        }
        this.modules.set(module.label, module); // add the module in modules Map (references to module object)

        this.Logger.initModule(module);
    }

    /**
     * Retrieve Guild schema
     * Init the client with value from DB (blacklisted users/guilds)
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

        this.Logger.init('Axon config initialised!');
    }

    /**
     * Init Bot status
     * Default method. Overridden by initStatus in child.
     *
     * @memberof AxonClient
     */
    initStatus() {
        this.client.editStatus(null, {
            name: `AxonCore | ${this.params.prefix[0]}help`,
            type: 0,
        });

        this.Logger.axon('Status setup!');
    }

    //
    // ****** CORE -- EVENT LISTENER -- ONMESSAGE / EXEC ******
    //

    /**
     * Handler when a message is created
     * do all test and then either:
     *   - call execDm
     *   - call execAdmin
     *   - call execCommand
     *   - returns (do nothing)
     *
     * @async
     * @param {Object<Message>} msg - the message object
     * @memberof AxonClient
     */
    async onMessageCreate(msg) {
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
         * Get guild Conf from cache || DB
         * Raise error eventually
         */
        let guildConf;
        try {
            guildConf = await this.getGuildConf(msg.channel.guild.id);
        } catch (err) {
            return this.Logger.error(err);
        }

        /** Admin override */
        if ((msg.content.startsWith(this.params.ownerPrefix) && this.AxonUtils.isBotOwner(msg.author.id)) || (msg.content.startsWith(this.params.adminPrefix) && this.AxonUtils.isBotAdmin(msg.author.id))) { // ADMIN override everything
            return this._execAdmin(msg, guildConf);
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
     * Default execute the command
     * Logging / Debug Mode
     * Error handling and logging
     * Call Command._execute
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
                    console.timeEnd('- Net');
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack);
                    console.timeEnd('- Net');
                    return;
                });
            console.timeEnd('- Node');
        } else {
            command._execute({ msg, args, guildConf })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack);
                    return;
                });
        }
    }

    /**
     * Execute the command with global Admin override
     * Logging / Debug Mode
     * Error handling and logging
     * Call command._executeAdmin
     *
     * @param {Object<Message>} msg - Message Object
     * @param {Oject} guildConf - guild config
     * @memberof AxonClient
     */
    _execAdmin(msg, guildConf) {
        msg.prefix = this.params.adminPrefix;

        const args = msg.content.replace(/<@!/g, '<@').substring(msg.prefix.length).split(' ');
        const label = args.shift().toLowerCase();

        /** Call Help if first arg = 'help' */
        if (label === 'help') { // send Help message
            return this._execHelp(msg, args, guildConf);
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
            this.Logger.verbose(`Admin Execution of ${command.label}`);
            console.time('- Net');
            console.time('- Node');

            command._executeAdmin({ msg, args, guildConf })
                .then(() => {
                    console.timeEnd('- Net');
                })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack);
                    return;
                });
            console.timeEnd('- Node');
        } else {
            command._executeAdmin({ msg, args, guildConf })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, `Guild: ${msg.channel.guild.id}`, err).stack);
                    return;
                });
        }
    }

    /**
     * Execute command in DM.
     * No guildConfig
     * Logging / Debug Mode
     * Error handling and logging
     * Call Command._executeDM
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
                    })
                    .catch(err => {
                        this.Logger.error(new AxonCommandError(command.module, command, `DM: ${msg.author.id}`, err).stack);
                        return;
                    });
                console.timeEnd('- Node');
            } else {
                command._executeDM({ msg, args })
                    .catch(err => {
                        this.Logger.error(new AxonCommandError(command.module, command, `DM: ${msg.author.id}`, err).stack);
                        return;
                    });
            }
        }
    }

    /**
     * Exec Help command (general)
     * Do all necessary checker too (label resolved was help)
     *
     * @param {Object<Message>} msg - The message object
     * @param {Array<String>} args - Array of argument
     * @param {Object} guildConf - guildConfig from the DB
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
     * Send full help in DM
     * Respecting permissions
     *
     * @param {Object<Message>} msg
     * @return {Promise<Message>}
     * @memberof AxonClient
     */
    sendFullHelp(msg) {
        try {
            return this.client.createMessage(msg.channel.id, 'full help msg');
        } catch (err) {
            console.log(err);
        }
    }

    //
    // ****** CHECKERS ******
    //

    /**
     * Check if the user/role/channel is guild ignored
     *
     * @param {Object<Message>} msg
     * @param {Object} guildConf
     * @returns {Boolean} true if either one of the three is ignored / false if none
     * @memberof AxonClient
     */
    _isGuildIgnored(msg, guildConf) {
        return guildConf.ignoredUsers.find(u => u === msg.author.id) // User is ignored
            || guildConf.ignoredRoles.find(r => msg.member.roles && msg.member.roles.includes(r)) // Role is ignored
            || guildConf.ignoredChannels.find(c => c === msg.channel.id); // Channel is ignored
    }

    /**
     * Check if the command is server disabled
     *
     * @param {Object<Command>} command - The command object
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} true if disabled / undefined if not
     * @memberof AxonClient
     */
    _isCommandDisabled(command, guildConf) {
        return guildConf.commands.find(c => c === command.label);
    }

    /**
     * Check if the module is server disabled
     *
     * @param {Object<Command>} command - The command object
     * @param {Object} guildConf - The guild Config object
     * @returns {Boolean} true if disabled / undefined if not
     * @memberof AxonClient
     */
    _isModuleDisabled(command, guildConf) {
        return guildConf.modules.find(m => m === command.module.label);
    }

    /**
     * Get guildConfig from cache || DB
     * Cache it if not cached
     *
     * @param {String} gID
     * @returns {Promise} guildConf object fetched
     * @memberof AxonClient
     */
    async getGuildConf(gID) {
        let guildConf = this.guildConfigs.get(gID);
        if (!guildConf) {
            try {
                guildConf =  await this.fetchGuildConf(gID); // retrieve DB get guildConf
            } catch (err) {
                throw new AxonCommandError('OnMessage', 'DB ERROR - guildConfig', `Guild: ${gID}`, err);
            }
            this.guildConfigs.set(gID, guildConf);
        }
        return guildConf;
    }

    //
    // ****** DATABASE ******
    // initialisation/fetch
    //

    /**
     * Fetch and resolve Axon config from the DB with all default params
     * Create a schema if none found or error
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
     * Fetch and resolve guild Config from Database
     * Create a schema if none found or error
     *
     * @param {String} gID - The guild ID to fetch the DB
     * @returns {Promise<Object>} - Guild schema from the DB / error
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
     * Resolve the prefix for the following guild
     * If the message starts with one of the guild prefix it return the prefix
     * Else it return undefined (no guild prefix used)
     *
     * @param {Object<Message>} msg - the message object
     * @returns {String} The prefix if found / undefined if not
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
     * Resolve the command Object
     *
     * @param {String} label - the command label/ command alias
     * @param {Array<String>} args - Array of arguments
     * @param {Object} guildConf - Guild config from DB
     * @returns {Object} - the command object / undefined if the command doesn't exist
     * @memberof AxonClient
     */
    resolveCommand(label, args, guildConf) {
        label = this.commandAliases.get(label);

        let command = this.commands.get(label);

        if (!command || !command.module.enabled || !command.enabled) {
            return undefined;
        }

        if (guildConf && ((this._isModuleDisabled(command, guildConf) && !command.module.serverBypass) || (this._isCommandDisabled(command, guildConf) && !command.serverBypass))) { // check module/command server disabled
            return;
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

    //
    // ****** EXTERNAL ******
    //

    /**
     * Register Guild Prefix
     * External method that can be call to update cached prefix with prefix registered in th DB
     *
     * @param {String} gID - The guild ID
     * @param {Array<String>} prefixArr - The array of prefix
     * @returns {Promise<Object>} - The guild Schema from the DB / error if error
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
     * Add/Remove a blacklisted User
     * External method that can be called to add a user to blacklist
     *
     * @async
     * @param {String} userID - The id of the user to blacklist
     * @param {Boolean} boolean - if add(true) or remove(false) the user to blacklist
     * @returns {Promise<Object>} - The Axon Schema from the DB / error if error
     * @memberof AxonClient
     */
    async updateBlacklistUser(userID, boolean) {
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
     * Add/Remove a blacklisted Guild
     * External method that can be called to add a user to blacklist
     *
     * @async
     * @param {String} guildID - The id of the guild to blacklist
     * @param {Boolean} boolean - if add(true) or remove(false) the guild to blacklist
     * @returns {Promise<Object>} - The Axon Schema from the DB / error if error
     * @memberof AxonClient
     */
    async updateBlacklistGuild(userID, boolean) {
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
     * Update state of a Module
     * Checkers were done before calling updateStateModule
     * the module exist/is not a serverBypass module
     * boolean true = disable module / false = enable
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The module label
     * @param {Boolean} boolean - If disable the module (false) or enable (true)
     * @returns {Promise<Object>} return updated guildSchema / error if error
     * @memberof AxonClient
     */
    async updateStateModule(guildID, label, boolean) {
        let conf;
        try {
            conf = this.guildConfigs.get(guildID) || this.fetchGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean ? conf.modules.includes(label) && (conf.modules = conf.modules.filter(c => c !== label)) : !conf.modules.includes(label) && conf.modules.push(label);

        try {
            const newConf = await this.DBprovider.updateModule(guildID, conf.modules);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update sate of a Command
     * Checkers were done before calling updateStateCommand
     * the command exist/is not a serverBypass command
     * boolean true = disable command / false = enable
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The command label
     * @param {Boolean} boolean - If disable the command (false) or enable (true)
     * @returns {Promise<Object>} return updated guildSchema / error if error
     * @memberof AxonClient
     */
    async updateStateCommand(guildID, label, boolean) {
        let conf;
        try {
            conf = this.guildConfigs.get(guildID) || this.fetchGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean ? conf.commands.includes(label) && (conf.commands = conf.commands.filter(c => c !== label)) : !conf.commands.includes(label) && conf.commands.push(label);

        try {
            const newConf = await this.DBprovider.updateCommand(guildID, conf.commands);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update state of an Event
     * Checkers were done before calling updateStateEvent
     * the event exist/is not a serverBypass event
     * boolean true = disable event / false = enable
     *
     * @param {String} guildID - The guild ID
     * @param {String} label - The event label
     * @param {Boolean} boolean - If disable the event (false) or enable (true)
     * @returns {Promise<Object>} return updated guildSchema / error if error
     * @memberof AxonClient
     */
    async updateStateEvent(guildID, label, boolean) {
        let conf;
        try {
            conf = this.guildConfigs.get(guildID) || this.fetchGuildConf(guildID); // get from cache or from DB if not found
        } catch (err) {
            throw err;
        }

        boolean ? conf.events.includes(label) && (conf.events = conf.events.filter(c => c !== label)) : !conf.events.includes(label) && conf.events.push(label);

        try {
            const newConf = await this.DBprovider.updateEvent(guildID, conf.events);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw err;
        }
    }

    toString() {
        return this.constructor.name;
    }

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
