import Collector from './Collector';

/**
 * @typedef {import('../../../AxonClient').default} AxonClient
 */

/**
 * Collect bunch of message object according to chosen options
 *
 * @author KhaaZ, VoidNull
 *
 * @class MessageCollector
 * @extends Collector<Message>
 *
 * @prop {Object} options
 * @prop {Number} options.timeout - Number of ms before timing out
 * @prop {Number} options.count - Number of messages to collect
 * @prop {Number} options.filter - Custom filter function that the Message need to validate in order to be collected
 * @prop {Boolean} options.ignoreBots - Whether to ignore bots
 * @prop {Boolean} options.ignoreSelf - Whether or not to ignore self (the bot itself)
 */
class MessageCollector extends Collector {
    /**
     * Creates an instance of MessageCollector
     *
     * @param {AxonClient} client - The axon client object
     * @param {Object} [options] - The default options for the message collector instance
     * @param {Number} [options.timeout=10000] - The time before the collector times out in milliseconds
     * @param {Number} [options.count=10] - The amount of messages to collect before automatically ending
     * @param {Number} [options.filter] - A custom filter function that the Message need to validate in order to be collected
     * @param {Boolean} [options.ignoreBots=true] - Whether or not to ignore bots
     * @param {Boolean} [options.ignoreSelf=true] - Whether or not to ignore self (the bot itself)
     * @memberof MessageCollector
     * @example
     * const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
     */
    constructor(axonClient, options = {} ) {
        super(axonClient);
        this.options = {
            timeout: options.timeout || 10000,
            count: options.count || 10,
            filter: options.filter,
            
            ignoreBots: options.ignoreBots === undefined ? true : !!options.ignoreBots,
            ignoreSelf: options.ignoreSelf === undefined ? true : !!options.ignoreSelf,
        };

        this.onMessageCreate = this.lib.getMessageCreate(this._onMessageCreate.bind(this) );
        this.onMessageDelete = this.lib.getMessageDelete(this._onMessageDelete.bind(this) );
        this.onMessageUpdate = this.lib.getMessageUpdate(this._onMessageUpdate.bind(this) );
    }

    setListeners() {
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_CREATE, this.onMessageCreate);
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_DELETE, this.onMessageDelete);
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_UPDATE, this.onMessageUpdate);
    }

    unsetListeners() {
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_CREATE, this.onMessageCreate);
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_UPDATE, this.onMessageUpdate);
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_DELETE, this.onMessageDelete);
    }

    /**
     * Runs the Collector with the given options and resolve once the task is finished with a Map of Messages collected.
     * If a timeout is provided, will resolve with all Messages collectors until the timeout.
     * If no timeout is provided, will only resolve when enough element have been collected
     *
     * @param {Object} [options] - The options for the message collector, use default options if not specified
     * @param {Number} [options.timeout] - The time before the collector times out in milliseconds
     * @param {Number} [options.count] - The amount of messages to collect before automatically ending
     * @param {Boolean} [options.ignoreBots] - Whether or not to ignore bots
     * @param {Boolean} [options.ignoreSelf] - Whether or not to ignore self
     * @param {String} [options.channels=[]] - The channel ids to listen for (listens to all messages if not specified)
     * @param {String} [options.users=[]] - The user ids to listen for (listens to all messages if not specified)
     * @returns {Promise<Map<String, Message>>} Map of messages collected.
     * @memberof MessageCollector
     * @example
     * const messages = await collector.run({ channels: msg.channel.id, caseInsensitive: false });
     */
    run(options = {} ) {
        return this._run( {
            timeout: options.timeout !== undefined ? options.timeout : this.options.timeout,
            count: options.count !== undefined ? options.count : this.options.count,
            filter: options.filter !== undefined ? options.filter : this.options.filter,
        },
        {
            channels: this._makeArray(options.channels),
            users: this._makeArray(options.users),
            ignoreBots: options.ignoreBots !== undefined ? options.ignoreBots : this.options.ignoreBots,
            ignoreSelf: options.ignoreSelf !== undefined ? options.ignoreSelf : this.options.ignoreSelf,
        } );
    }

    /**
    * Runs the Collector with the given options and return a container object that can be used to manually control Messages collected.
    * If no timeout nor count is provided, will run forever until the user manually stops the collector.
    *
    * @param {Object} [options] - The options for the message collector, use default options if not specified
    * @param {Number} [options.timeout] - The time before the collector times out in milliseconds
    * @param {Number} [options.count] - The amount of messages to collect before automatically ending
    * @param {Boolean} [options.ignoreBots] - Whether or not to ignore bots
    * @param {Boolean} [options.ignoreSelf] - Whether or not to ignore self
    * @param {Array<String>|String} [options.channels=[]] - The channel ids to listen for (listens to all messages if not specified)
    * @param {Array<String>|String} [options.users=[]] - The user ids to listen for (listens to all messages if not specified)
    * @returns {CollectorContainer<Message>} CollectorContainer
    * @memberof MessageCollector
    * @example
    * const container = await collector.collect({ channels: [msg.channel.id], caseInsensitive: false });
    */
    collect(options = {} ) {
        return this._collect( {
            timeout: options.timeout !== undefined ? options.timeout : this.options.timeout,
            count: options.count !== undefined ? options.count : this.options.count,
            filter: options.filter !== undefined ? options.filter : this.options.filter,
        },
        {
            channels: this._makeArray(options.channels),
            users: this._makeArray(options.users),
            ignoreBots: options.ignoreBots !== undefined ? options.ignoreBots : this.options.ignoreBots,
            ignoreSelf: options.ignoreSelf !== undefined ? options.ignoreSelf : this.options.ignoreSelf,
        } );
    }

    /**
     * Get all CollectorContainers that will collect from this particular message
     *
     * @param {Message} message
     * @returns {Array<CollectorContainer<Message>>}
     * @memberof MessageCollector
     */
    getCollectors(message) {
        return this.containers
            .filter(e => {
                if (e.options.ignoreSelf && this.lib.message.getAuthorID(message) === this.lib.client.getID() ) {
                    return false;
                }
                if (e.options.ignoreBots && message.author.bot) {
                    return false;
                }
                if (e.options.channels.length > 0 && !e.options.channels.includes(this.lib.message.getChannelID(message) ) ) {
                    return false;
                }
                if (e.options.users.length > 0 && !e.options.users.includes(this.lib.message.getAuthorID(message) ) ) {
                    return false;
                }
                return true;
            } );
    }

    /**
     * Function bound to messageCreate event.
     * Collect the message for all collectors that respond to the criteria
     * Emits collect event.
     *
     * @param {Message} msg
     * @memberof MessageCollector
     */
    _onMessageCreate(msg) {
        const collectors = this.getCollectors(msg);
        this.emit('collect', collectors, { id: msg.id, collected: msg } );
    }

    /**
     * Function bound to messageDelete event.
     * Remove the message from all collectors that collected this message
     *
     * @param {Message} msg
     * @memberof MessageCollector
     */
    _onMessageDelete(msg) {
        const collectors = this.getCollectors(msg);

        for (const c of collectors) {
            if (c.collected.has(msg.id) ) {
                c.collected.delete(msg.id);
            }
        }
    }

    /**
     * Function bound to messageUpdate event.
     * Updates the message from all collectors that collected this message
     *
     * @param {Message} oldMsg
     * @param {Message} msg
     * @memberof MessageCollector
     */
    _onMessageUpdate(oldMsg, msg) {
        if (!oldMsg) {
            return;
        }
        const collectors = this.getCollectors(msg);

        for (const c of collectors) {
            if (c.collected.has(msg.id) ) {
                c.collected.set(msg.id, msg);
            }
        }
    }
}

export default MessageCollector;
