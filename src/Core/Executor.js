import { performance } from 'perf_hooks';
import { DEBUG_FLAGS } from '../Utility/Constants/AxonEnums';

/**
 * @typedef {import('../AxonClient').default} AxonClient
 */

/**
 * Executor class. Execute and handle execution of listeners and command in the framework
 * Will emit events depending on the execution
 *
 * @class Executor
 * @prop {AxonClient} axon
 */
class Executor {
    /**
     * Creates an instance of Executor.
     *
     * @param {AxonClient} axonClient
     * @memberof Executor
     */
    constructor(axonClient) {
        this._axon = axonClient;
    }

    /**
     * Fired when a debug message need to be sent
     * @event AxonClient#debug
     * @prop {DEBUG_FLAGS} flags - debug flags used used to have more information about the event
     * @prop {String} debugMessage - debug message with information about the situation
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
     * @prop {Boolean} status - Whereas the listener was successfully executed or not
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

    /**
     * @param {Listener} listener
     * @param {GuildConfig} guildConfig
     * @param {...any} args
     */
    listener(listener, guildConfig, ...args) {
        this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.LISTENER, `Execution of ${listener.label} for ${listener.eventName}`);
        let startTime;
        if (this._axon.settings.debugMode) {
            startTime = performance.now();
        }

        listener._execute(guildConfig, ...args)
            .then( () => {
                if (this._axon.settings.debugMode) {
                    const endTime = performance.now();
                    this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.LISTENER, `TIME: ${endTime - startTime}`);
                }
                this._axon.emit('listenerExecution', true, listener.eventName, listener.label, { listener, guildConfig } );
            } )
            .catch(err => {
                this._axon.emit('listenerError', listener.eventName, listener.label, { listener, guildConfig, error: err } );

                if (this._axon.settings.debugMode) {
                    const endTime = performance.now();
                    this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.LISTENER, `NET: ${endTime - startTime}`);
                }
                this._axon.log('ERROR', `[EVENT](${listener.eventName}) - ${listener.label}\n${err}`);
            } );
    }

    /**
     * @param {Command} command
     * @param {CommandEnvironment} env
     */
    command(command, env) {
        const { msg, guildConfig } = env;
        
        this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `${guildConfig ? '[GUILD]' : '[DM]'} ${env.isAdmin || env.isOwner ? 'Admin' : 'Regular'} execution of ${command.fullLabel}`);
        let startTime;
        if (this._axon.settings.debugMode) {
            startTime = performance.now();
        }
        
        command._process(env)
            .then( (context) => {
                this._axon.emit('commandExecution', context.executed, command.fullLabel, { msg, command, guildConfig, context } );
                
                if (this._axon.settings.debugMode) {
                    const endTime = performance.now();
                    this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `NET: ${endTime - startTime}`);
                }
            } )
            .catch(err => {
                this._axon.emit('commandError', command.fullLabel, { msg, command, guildConfig, error: err } );
                
                if (this._axon.settings.debugMode) {
                    const endTime = performance.now();
                    this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `NET: ${endTime - startTime}`);
                }
                
                this._axon.log('ERROR', err);
            } );

        if (this._axon.settings.debugMode) {
            const endTime = performance.now();
            this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `NODE: ${endTime - startTime}`);
        }
    }

    /**
     * @param {Command} command
     * @param {CommandEnvironment} env
     */
    help(command, env) {
        const { msg, guildConfig } = env;
        if (!command) {
            this._axon.sendFullHelp(msg, guildConfig);
            return;
        }

        this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `${guildConfig ? '[GUILD]' : '[DM]'} ${env.isAdmin || env.isOwner ? 'Admin' : 'Regular'} -HELP- execution of ${command.fullLabel}`);
        let startTime;
        if (this._axon.settings.debugMode) {
            startTime = performance.now();
        }

        command.sendHelp(env)
            .then( (context) => {
                this._axon.emit('commandExecution', true, command.label, { msg, command, guildConfig, context } );
                if (this._axon.settings.debugMode) {
                    const endTime = performance.now();
                    this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `NET: ${endTime - startTime}`);
                }
            } )
            .catch(err => {
                this._axon.emit('commandError', command.label, { msg, command, guildConfig, err } );
                if (this._axon.settings.debugMode) {
                    const endTime = performance.now();
                    this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `NET: ${endTime - startTime}`);
                }

                this._axon.log('ERROR', err);
            } );

        if (this._axon.settings.debugMode) {
            const endTime = performance.now();
            this._axon.emit('debug', DEBUG_FLAGS.INFO | DEBUG_FLAGS.COMMAND, `NODE: ${endTime - startTime}`);
        }
    }
}

export default Executor;
