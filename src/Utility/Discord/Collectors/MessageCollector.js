import Collector from './Collector';

/**
 * @typedef {import('../../../AxonClient').default} AxonClient
 */

/**
 * Collect bunch of message object according to chosen options
 *
 * @author VoidNull, KhaaZ
 *
 * @class MessageCollector
 * @extends Collector<Message>
 *
 * @prop {Object} options
 * @prop {Number} options.timeout - Number of ms before timing out
 * @prop {Number} options.count - Number of messages to collect
 * @prop {Boolean} options.ignoreBots - Whether to ignore bots
 * @prop {String} options.userID - Specify a userID to only collect message from this user
 */
class MessageCollector extends Collector {
    /**
     * Creates an instance of MessageCollector
     *
     * @param {AxonClient} client - The axon client object
     * @param {Object} [options] - The default options for the message collector instance
     * @param {Number} [options.timeout=10000] - The time before the collector times out in milliseconds
     * @param {Number} [options.count=10] - The amount of messages to collect before automatically ending
     * @param {Boolean} [options.ignoreBots=true] - Whether or not to ignore bots
     * @param {String} [options.userID] - The user id to listen for (listens to all messages if not specified)
     * @memberof MessageCollector
     * @example
     * const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
     */
    constructor(axonClient, options = {} ) {
        super(axonClient);
        this.options = {
            timeout: options.timeout || 10000, // eslint-disable-line no-magic-numbers
            count: options.count || 10,
            ignoreBots: options.ignoreBots === undefined ? true : !!options.ignoreBots,
            userID: options.userID || null,
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
     * Runs the message collector
     *
     * @param {Channel} channel - The channel object to listen to
     * @param {Object} [options] - The options for the message collector
     * @param {Number} [options.timeout] - The time before the collector times out in milliseconds
     * @param {Number} [options.count] - The amount of messages to collect before automatically ending
     * @param {Boolean} [options.ignoreBots] - Whether or not to ignore bots
     * @param {String} [options.userID] - The user id to listen for (listens to all messages if not specified)
     * @returns {Promise<Map<String, Message>>} Map of messages collected.
     * @memberof MessageCollector
     * @example
     * const messages = await collector.run(msg.channel, { caseInsensitive: false });
     */
    run(channel, options = {} ) {
        return this._run( {
            channel,
            timeout: options.timeout !== undefined ? options.timeout : this.options.timeout,
            count: options.count !== undefined ? options.count : this.options.count,
            ignoreBots: options.ignoreBots !== undefined ? options.ignoreBots : this.options.ignoreBots,
            userID: options.userID !== undefined ? options.userID : this.options.userID,
            
        } );
    }

    /**
     * Get all CollectorContainers that will collect from this particular message
     *
     * @param {Message} message
     * @returns {Array<CollectorContainer>}
     * @memberof MessageCollector
     */
    getCollectors(message) {
        if (message.author.id === this.lib.client.getID() ) {
            return [];
        }

        return this.collectors
            .filter(e => (
                e.options.channel.id === message.channel.id
                && (message.author.bot ? !e.options.ignoreBots : true)
                && (e.options.userID ? message.author.id === e.options.userID : true)
            ) );
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
     * Remove the message from all collector that collected this message
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
     * Updates the message from all collector that collected this message
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
