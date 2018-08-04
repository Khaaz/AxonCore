'use strict';

// Lib - Modules
import Eris from 'eris';

// misc
import logo from './Conf/logo';

import packageJSON from '../package.json';

// Core
import Module from './Structures/Module';
import Command from './Structures/Command';
import EventF from './Structures/EventF';

// Configs
import defConf from './Conf/defConf.json';
import generalConf from './Conf/generalConf.json';
import templateConf from './Conf/templateConf.json';
import tokenConf from './Conf/tokenConf.json';

// Database
import JsonService from './Database/JsonService';
import MongoService from './Database/MongoService';

// Utility
import Collection from './Utility/Collection';
import AxonUtil from './Utility/AxonUtil';

// Loggers
import Logger from './Loggers/Logger';
import DefLogger from './Loggers/DefLogger';

// Errors
import AxonError from './Errors/AxonError';
import AxonCommandError from './Errors/AxonCommandError';

// Key verifier

import Util from './Utility/Utils';

const keyCompare = Util.keyCompare;

/**
 * AxonCore - Client constructor
 *
 * @author KhaaZ
 * 
 * @class AxonClient
 * @extends {Eris.Client}
 */
class AxonClient extends Eris.Client {

    /**
     * Creates an instance of EaseClient.
     *
     * @param {String} token
     * @param {Object} options
     * @param {Object} config - Axon options
     * @param {Object} generalConfig - Axon options
     * @param {Object} templateConfig - Axon options
     * @param {Object} tokenConfig - Axon options
     * @param {Object} modules - Object with all modules to add in the bot
     *
     * @prop {Collection<Module>} modules - All modules in the client [key: label, value: module]
     * @prop {Collection<Command>} commands - All commands in the client [key: label, value: command]
     * @prop {Collection<EventF>} events - All events in the client [key: label, value: event]
     * @prop {Map<String>} commandAliases - All aliases in the client [key: alias, value: commandLabel]
     * @prop {Set<String>} blacklistedUsers - Cached black listed users
     * @prop {Set<String>} blacklistedGuilds - Cached black listed guilds
     * @prop {Collection<Object>} guildConfigs - Guild configs [key: guildID, value: {guild config Object}
     * @prop {Boolean} _customLogger - Use Custom logger or default logger
     * @prop {Object} Logger - Custom Logger => default with console extends or colored chalk/winston
     * @prop {Boolean} _customDB - Use MongoDB (mongoose) or JsonDB (default)
     * @prop {Object} DBprovider - DBService (mongoose or JSON)
     * @prop {Object} _Util - Util methods for Axon
     * @prop {Object} staff - Users id for staff members (updated with current roles)
     * @prop {Object} params - Bot params
     * - debugMode (boolean)  : enable to show commands latency
     * - prefix (Array)       : default bot prefix
     * - ownerPrefix (string) : owner prefix - override perms/cd
     * - adminPrefix (srting) : admins prefix - override perms/cd
     * @prop {Object} _configs - configs (general, template)
     * @prop {Object} infos - Default infos about the bot: owners/name/links etc (misc)
     *
     * EXTERNAL METHOD
     * Promise<Object> registerGuildPrefix(gID, prefixArr) : Promise
     *
     * @memberof AxonClient
     */
    constructor(token, options, AxonOptionObject, modules) {
        super(token, options);

        /** Cool logging */
        console.log(logo);
        const config = AxonOptionObject.AxonConfig;
        /**
         * Client specification
         * version/base/author/url
         */
        
        this.client = {
            name: packageJSON.name,
            version: packageJSON.version,
            author: packageJSON.author,
            github: packageJSON.repository.url
        };
        /**
         * Collection of Modules
         * Module Label => Module Object
         */
        this._tempModules = modules; // deleted after modules are initialised
        this.modules = new Collection(Module);

        /**
         * Commands and events
         * Command Label => ref Command Object
         * Command Alias => Command label
         * 
         * Event Label => ref EventF function
         */
        this.commands = new Collection(Command);
        this.commandAliases = new Map();
        this.events = new Collection(EventF);

        /**
         * Blacklisted users and guilds
         */
        this.blacklistedUsers = new Set();
        this.blacklistedGuilds = new Set();

        /**
         * Cache of GuildConfigs from the DB
         * Guild ID => guildConfig
         */
        this.guildConfigs = new Collection(Object);

        /**
         * Private - internal 
         * 
         * Use Custom Logger or default console
         * Use MongoDB (mongoose) or default jsonDB
         * Utility for AxonClient
         */
        /** Logger */
        this._customLogger = config.customLogger || defConf.customLogger || false;
        this.Logger = this._customLogger ? Logger : new DefLogger();
        /** DB */
        this._customDB = config.customDB || defConf.customDB || false;
        this.DBprovider = this._customDB ? MongoService : JsonService;
        /** Axon Util */
        this._Util = AxonUtil;
        

        /**
         * Bot Staff
         * - Owners
         * - Admins
         * - Contributors
         * - Moderators
         * - Members
         */
        this.staff = {};

        /**
         * Custom settings
         * Prefixes - debug - misc
         */
        this.params = {
            debugMode: config.debugMode || defConf.debugMode || false,
            prefix: [
                config.prefix.general || defConf.prefix.general || 'e!',
            ],
            ownerPrefix: config.prefix.owner || defConf.prefix.owner || '!!', // meant to be same prefix on all AxonClient instance (global override)
            adminPrefix: config.prefix.admin || defConf.prefix.admin || 'e.', // meant to be different prefix on all AxonClient instanc (global override)
        };

        /**
         * Init config Object from json configs
         * configs.general
         * configs.template
         */
        this._configs = {};
        

        /**
         * General infos - Description
         * 
         * Init from initConfigs():
         * infos.owners - Array
         * infos.links - Object
         */
        this.infos = {
            name: config.general.name || defConf.general.name || 'AxonClient',
            description: config.general.description || defConf.general.description || 'AxonClient - Discord Bot Client for Eris [KhaaZ#0001]'
        };

        this.initConfigs(config); // this._configs => cache Template, General configs
        this.initOwners(config); // this.staff => Load and cache staff Owners + Admins

        /**
         * - Global events -
         */
        this.once('ready', this.onReady.bind(this));
        this.once('shardPreReady', this.onShardPreReady.bind(this));

        this.on('messageCreate', this.onMessageCreate.bind(this));

    }

    //
    // ****** INIT ******
    //

    /**
     * Call Init Method on Ready event
     *
     * @memberof AxonClient
     */
    onReady() {
        this.Logger.notice('=== Instance Ready! ===');
        this._init().then(() => {
            this.ready = true;
            this.Logger.notice('=== Initialisation over - Bot Ready! ===');
        });
    }

    /**
     * init prefix on shard ready event?
     *
     * @memberof AxonClient
     */
    onShardPreReady() { // ???????????????????????????????????????? needed ???????????????????????
        this.preReady = true;
        this.Logger.notice('=== Pre-ready! ===');
    }

    /**
     * Init configs files
     * Init this.infos
     *
     * @memberof AxonClient
     */

    initConfigs(AxonOptionObject) {
        const generalConfig = AxonOptionObject.generalConfig;
        const templateConfig = AxonOptionObject.templateConfig;
        const tokenConfig = AxonOptionObject.tokenConfig;
        const generalConfig2 = AxonOptionObject.generalConfig;
        generalConfig2.owners = {};

        if (generalConfig && keyCompare(generalConf, generalConfig2)) {
            this._configs.general = generalConfig;
        }
        else {
            this._configs.general = generalConf;
            this.Logger.warn(new AxonError('Couldn\'t init custom general config (default values)', 'INIT', 'Configs').stack);
        }

        if (templateConfig && keyCompare(templateConf, templateConfig)) {
            this._configs.template = templateConfig;
            
        }
        else {
            this._configs.template = templateConf;
            this.Logger.warn(new AxonError('Couldn\'t init custom template config (default values)', 'INIT', 'Configs').stack);
        }

        if (tokenConfig && keyCompare(tokenConf, tokenConfig)) {
            this._configs._tokens = tokenConfig;
        }
        else {
            this._configs.tokens = tokenConf;
            this.Logger.warn(new AxonError('Couldn\'t init custom token config (default values)', 'INIT', 'Configs').stack);
        }

        this.infos.owners = Object.values(this._configs.general.owners).map(o => o.name);
        this.infos.links = this._configs.general.links;
        this.Logger.info('Configs initialized!');
    }

    /**
     * Init Bot staff
     * Create Bot staff object according to roles in Ease server
     *
     * @memberof AxonClient
     */
    initOwners(AxonOptionObject){

        const config = AxonOptionObject.generalConfig;

        this.staff.owners = Object.values(config.ids.owners);
        this.staff.admins = Object.values(config.ids.admins);

        this.Logger.info('Owners initialized!');
    }
    
    /**
     * Init all other Client modules - methods - content
     * Run after ready event.
     *
     * Child methods (build it support:
     * - initStaff() => initialise staff regarding all parameters you want - run before Modules initialisation
     * - init() => Other initialisation - run after creating of commands etc
     * 
     * @memberof AxonClient
     */
    _init() {
        return new Promise(async(resolve, reject) => {
            try {
                /** check if there is an initStaff method in child + run it */
                this.initStaff && await this.initStaff(); // init bot staff (custom) before init modules
                
                /** Init modules/ commands */
                this.initAllModules(this._tempModules); // load modules
                delete this._tempModules;
                /** Axon init (blacklist/global cache) */
                await this.initAxon(); // load blacklisted users - guild
                
                /** Status */
                this.initStatus(); // execute default status function in Axon or override

                /** Additional */
                this.init && await this.init(); // if child class has init method - run it.
                
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Register a new Module
     * Init module in the client + commands + aliases
     *
     * @param {Object<Module>} module
     * @memberof AxonClient
     */
    registerModule(module) {
        //init instance module and add it to the Map
        if (this.modules.has(module.label)) {
            throw new AxonError(`Module: ${module} already registered!`, 'INIT');
        }

        for (const [label, cmd] of module.commands) {

            if (this.commands.has(label)) {
                throw new AxonError(`${module.label} - Command: ${label} already registered!`, 'INIT',);
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
        this.Logger.info(`*Module*  : ${module.label} - Commands loaded and initialised. [${module.commands.size}]`);
    }

    /**
     * Init and create instance of all modules
     * Modules are imported from index.js as a global Object
     *
     * @param {Object} modules - Object of Modules file
     * @memberof AxonClient
     */
    initAllModules(modules) {
        for (const [, value] of Object.entries(modules)) {
            const newModule = new value(this);
            this.registerModule(newModule);
        }
        this.Logger.info(`AxonClient: All Modules loaded and ready! [${this.modules.size}]`);
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

        for(const user of axonSchema.bannedUsers) { // init blacklisted users
            this.blacklistedUsers.add(user);
        }
        for(const guild of axonSchema.bannedGuilds) { // init blacklisted guilds
            this.blacklistedGuilds.add(guild);
        }

        this.Logger.info('Axon config initialized!');
    }

    /**
     * Init Bot status
     * Default method. Overridden by initStatus in child.
     *
     * @memberof AxonClient
     */
    initStatus() {
        this.editStatus(null, {
            name: `AxonCore | ${this.params.prefix[0]}help`,
            type: 0
        });
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
        if (!this.ready) {
            return;
        }

        /** msg.author error + ignore self + ignore bots */
        if (!msg.author || msg.author.bot) {
            return;
        }

        /** ignore cached blacklisted users */
        if (this.blacklistedUsers.has(msg.author.id) ) {
            return;
        }

        /** execDM if not in a guild */
        if (!msg.channel.guild) {
            return this._execDM(msg);
        }
        
        /** ignore cached blacklisted guilds */
        if(this.blacklistedGuilds.has(msg.channel.guild.id)) {
            return;
        }

        msg.command = false;

        /**
         * Get guild Conf from DB
         * Cache in this.guildConfigs (only on first messageCreate in this guild)
         * 
         * Mongo dependant (or local DB)
         */
        let guildConf = this.guildConfigs.get(msg.channel.guild.id);
        if (!guildConf) {
            try {
                guildConf =  await this.fetchGuildConf(msg.channel.guild.id); // retrieve DB get guildConf  
            } catch(err) {
                throw new AxonError('OnMessage - Can\'t retrieve Guild Config', 'DB ERROR', `Guild: ${msg.channel.guild.id}`, err);
            }
            this.guildConfigs.set(msg.channel.guild.id, guildConf);
        }

        /** Admin override */
        if (msg.content.startsWith(this.params.ownerPrefix) && this._isOwner(msg) || msg.content.startsWith(this.params.adminPrefix) && this._isAdmin(msg)) { // ADMIN override everything
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
                    this.Logger.error(new AxonCommandError(command.module, command, 'Guild: ' + msg.channel.guild.id ,err).stack);
                    console.timeEnd('- Net');
                    return;
                });
            console.timeEnd('- Node');
        } else {
            command._execute({ msg, args, guildConf })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, 'Guild: ' + msg.channel.guild.id, err).stack);
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
                    this.Logger.error(new AxonCommandError(command.module, command, 'Guild: ' + msg.channel.guild.id, err).stack);
                    return;
                });
            console.timeEnd('- Node');
        } else {
            command._executeAdmin({ msg, args, guildConf })
                .catch(err => {
                    this.Logger.error(new AxonCommandError(command.module, command, 'Guild: ' + msg.channel.guild.id, err).stack);
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
                        this.Logger.error(new AxonCommandError(command.module, command, 'DM: ' + msg.author.id, err).stack);
                        return;
                    });
                console.timeEnd('- Node');
            } else {
                command._executeDM({ msg, args })
                    .catch(err => {
                        this.Logger.error(new AxonCommandError(command.module, command, 'DM: ' + msg.author.id, err).stack);
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

        command.sendHelp({msg, args, guildConf});
    }
    
    /**
     * Send full help in DM 
     * Respecting permissions
     *
     * @param {Object<Message>} msg
     * @memberof AxonClient
     */
    sendFullHelp(msg) {
        try {
            this.createMessage(msg.channel.id, 'full help msg');
        } catch (err) {
            console.log(err);
        }
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
                return e;
            }
        }
    }

    /**
     * Fetch and resolve guild Config
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
                return e;
            }
        }
    }

    //
    //****** INTERNAL (Resolvers)
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
        return (msg.content.startsWith(`${this.user.mention} `) && `${this.user.mention} `) || prefixes.find(prefix => msg.content.startsWith(prefix));
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

        if ( guildConf && ( (this._isModuleDisabled(command, guildConf) && !command.module.serverBypass) || (this._isCommandDisabled(command, guildConf) && !command.serverBypass) ) ) { // check module/command server disabled
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
    // ****** CHECKERS ******
    //

    /**
     * Check if the user is an owner or an admin
     *
     * @param {Object<Message>} msg
     * @returns {boolean} the value if found / undefined if not
     * @memberof AxonClient
     */
    _isStaff(msg) {
        return this._isOwner(msg) || this._isAdmin(msg);
    }

    /**
     * Check if the user is an owner
     *
     * @param {Object<Message>} msg
     * @returns {boolean} the value if found / undefined if not (act as boolean)
     * @memberof AxonClient
     */
    _isOwner(msg) {
        return this.staff.owners.find(u => u === msg.author.id);
    }

    /**
     * Check if the user is an admin
     *
     * @param {Object<Message>} msg
     * @returns {boolean} the value if found / undefined if not
     * @memberof AxonClient
     */
    _isAdmin(msg) {
        return this.staff.admins.find(u => u === msg.author.id);
    }

    /**
     * Check if the user/role/channel is guild ignored
     *
     * @param {Object<Message>} msg
     * @param {Object} guildConf
     * @returns {Boolean} true if either one of the three is ignored / false if none
     * @memberof AxonClient
     */
    _isGuildIgnored(msg, guildConf) {
        return guildConf.ignoredUsers.find(u => u === msg.author.id) || // User is ignored
            guildConf.ignoredRoles.find(r => msg.member.roles && msg.member.roles.includes(r)) || // Role is ignored
            guildConf.ignoredChannels.find(c => c === msg.channel.id); // Channel is ignored
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

                if(!this.guildConfigs.has(gID)) {
                    this.guildConfigs.set(gID, guildSchema);
                } else {
                    const conf = this.guildConfigs.get(gID);
                    conf.prefix = prefixArr;
                }

                return guildSchema;
            })
            .catch((err) => {
                return new AxonError('Couldn\'t retrieve prefix','DB', 'guild: ' + gID, err);
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
            throw new AxonError('Cannot update blacklisted users.', 'DB ERROR', 'BlacklistUser', err);
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
            throw new AxonError('Cannot update blacklisted guilds.', 'DB ERROR', 'BlacklistGuild', err);
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
        } catch(err) {
            throw new AxonError('UpdateStateModule - Can\'t retrieve Guild Config', 'DB ERROR', `Guild: ${guildID}` , err);
        }

        boolean ? conf.modules.includes(label) && (conf.modules = conf.modules.filter(c => c != label)) : !conf.modules.includes(label) && conf.modules.push(label);
        
        try {
            const newConf = await this.DBprovider.updateModule(guildID, conf.modules);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw new AxonError('UpdateStateModule - Cannot update state Module.', 'DB ERROR', `Guild: ${guildID}`, err);
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
        } catch(err) {
            throw new AxonError('UpdateStateCommand - Can\'t retrieve Guild Config', 'DB ERROR', `Guild: ${guildID}` , err);
        }

        boolean ? conf.commands.includes(label) && (conf.commands = conf.commands.filter(c => c != label)) : !conf.commands.includes(label) && conf.commands.push(label);
        
        try {
            const newConf = await this.DBprovider.updateCommand(guildID, conf.commands);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw new AxonError('UpdateStateCommand - Cannot update state Command.', 'DB ERROR', `Guild: ${guildID}`, err);
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
        } catch(err) {
            throw new AxonError('UpdateStateEvent - Can\'t retrieve Guild Config', 'DB ERROR', `Guild: ${guildID}` , err);
        }

        boolean ? conf.events.includes(label) && (conf.events = conf.events.filter(c => c != label)) : !conf.events.includes(label) && conf.events.push(label);
        
        try {
            const newConf = await this.DBprovider.updateEvent(guildID, conf.events);
            this.guildConfigs.set(guildID, newConf);
            return newConf;
        } catch (err) {
            throw new AxonError('UpdateStateEvent - Cannot update state Event.', 'DB ERROR', `Guild: ${guildID}`, err);
        }
    }

    toString() {
        return this.constructor.name;
    }

    toJSON() {
        const base = {};
        for(const key in this) {
            if(!base.hasOwnProperty(key) && this.hasOwnProperty(key) && !key.startsWith('_')) {
                if(!this[key]) {
                    base[key] = this[key];
                } else if(this[key] instanceof Set) {
                    base[key] = Array.from(this[key]);
                } else if(this[key] instanceof Map) {
                    base[key] = Array.from(this[key].values());
                } else if(typeof this[key].toJSON === 'function') {
                    base[key] = this[key].toJSON();
                } else {
                    base[key] = this[key];
                }
            }
        }
        return base;
    }

    inspect() {
        // http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new (new Function(`return function ${this.constructor.name}(){}`)());
        for(const key in this) {
            if(this.hasOwnProperty(key) && !key.startsWith('_') && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
}

export default AxonClient;
