import Collector from './Collector';

/**
 * @typedef {import('../../../AxonClient').default} AxonClient
 */

/**
 * Collect bunch of message object according to chosen options
 *
 * @author Bsian, KhaaZ
 *
 * @class ReactionCollector
 * @extends Collector<Message>
 *
 * @prop {Object} options
 * @prop {Number} options.timeout - Number of ms before timing out
 * @prop {Number} options.count - Number of reactions to collect
 * @prop {Boolean} options.ignoreBots - Whether to ignore bots
 * @prop {String} options.userID - Specify a userID to only collect message from this user
 */
class ReactionCollector extends Collector {
    /**
     * Creates an instance of ReactionCollector
     *
     * @param {AxonClient} client - The axon client object
     * @param {Object} [options] - The default options for the reaction collector instance
     * @param {Number} [options.timeout=10000] - The time before the collector times out in milliseconds
     * @param {Number} [options.count=10] - The amount of reactions to collect before automatically ending
     * @param {Boolean} [options.ignoreBots=true] - Whether or not to ignore bots
     * @param {String} [options.userID] - The user id to listen for (listens to all reactions if not specified)
     * @param {Array<String>} [options.emojis] - The specific reactions to collect (collects all reactions if not specified)
     * @memberof ReactionCollector
     * @example
     * const collector = new ReactionCollector(this.axon, { count: 10, ignoreBots: false });
     */
    constructor(axonClient, options = {} ) {
        super(axonClient);
        this.options = {
            timeout: options.timeout || 10000, // eslint-disable-line no-magic-numbers
            count: options.count || 10,
            ignoreBots: options.ignoreBots === undefined ? true : !!options.ignoreBots,
            userID: options.userID || null,
            emojis: options.emojis && options.emojis.length ? options.emojis : null,
        };

        this.onMessageReactionAdd = this.lib.getMessageReactionAdd(this._onMessageReactionAdd.bind(this) );
        this.onMessageReactionRemove = this.lib.getMessageReactionRemove(this._onMessageReactionRemove.bind(this) );
        this.onMessageReactionRemoveAll = this.lib.getMessageReactionRemoveAll(this._onMessageReactionRemoveAll.bind(this) );
        this.onMessageReactionRemoveEmoji = this.lib.getMessageReactionRemoveEmoji(this._onMessageReactionRemoveEmoji.bind(this) );
    }

    setListeners() {
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_REACTION_ADD, this.onMessageReactionAdd);
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_REACTION_REMOVE, this.onMessageReactionRemove);
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_REACTION_REMOVE_ALL, this.onMessageReactionRemoveAll);
        this.bot.on(this.lib.enums.EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, this.onMessageReactionRemoveEmoji);
    }

    unsetListeners() {
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_REACTION_ADD, this.onMessageReactionAdd);
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_REACTION_REMOVE, this.onMessageReactionRemove);
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_REACTION_REMOVE_ALL, this.onMessageReactionRemoveAll);
        this.bot.off(this.lib.enums.EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, this.onMessageReactionRemoveEmoji);
    }

    /**
     * Runs the message collector
     *
     * @param {Message} message - The message object to listen to
     * @param {Object} [options] - The options for the reaction collector
     * @param {Number} [options.timeout] - The time before the collector times out in milliseconds
     * @param {Number} [options.count] - The amount of reactions to collect before automatically ending
     * @param {Boolean} [options.ignoreBots] - Whether or not to ignore bots
     * @param {String} [options.userID] - The user id to listen for (listens to all messages if not specified)
     * @param {Array<String>} [options.emojis] - The specific reactions to collect (collects all reactions if not specified)
     * @returns {Promise<Map<String, Message>>} Map of messages collected.
     * @memberof ReactionCollector
     * @example
     * const reactions = await collector.run(msg, { count: 10 });
     */
    run(message, options = {} ) {
        return this._run( {
            channel: message,
            timeout: options.timeout !== undefined ? options.timeout : this.options.timeout,
            count: options.count !== undefined ? options.count : this.options.count,
            ignoreBots: options.ignoreBots !== undefined ? options.ignoreBots : this.options.ignoreBots,
            userID: options.userID !== undefined ? options.userID : this.options.userID,
            emojis: options.emojis !== undefined ? options.emojis : this.options.emojis,
        } );
    }

    /**
     * Get all CollectorContainers that will collect from this particular message
     *
     * @param {Message} message
     * @returns {Array<CollectorContainer<Message>>}
     * @memberof ReactionCollector
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
     * Function bound to messageReactionAdd event.
     * Collect the reaction for all collectors that respond to the criteria
     * Emits collect event.
     *
     * @param {Message} msg
     * @param {Emoji} emoji
     * @param {String} userID
     * @memberof ReactionCollector
     */
    _onMessageReactionAdd(msg, emoji, userID) {
        const collectors = this.getCollectors(msg);
        this.emit('collect', collectors, { id: `${msg.id}-${emoji.id || emoji.name}-${userID}`, collected: { msg, emoji, userID } } );
    }

    /**
     * Function bound to messageReactionRemove event.
     * Remove the reaction from all collectors that collected this reaction
     *
     * @param {Message} msg
     * @param {Emoji} emoji
     * @param {String} userID
     * @memberof ReactionCollector
     */
    _onMessageReactionRemove(msg, emoji, userID) {
        const collectors = this.getCollectors(msg);

        for (const c of collectors) {
            if (c.collected.has(`${msg.id}-${emoji.id || emoji.name}-${userID}`) ) {
                c.collected.delete(`${msg.id}-${emoji.id || emoji.name}-${userID}`);
            }
        }
    }

    /**
     * Function bound to messageReactionRemoveAll event.
     * Updates the reaction from all collectors that collected this reaction
     *
     * @param {Message} msg
     * @memberof ReactionCollector
     */
    _onMessageReactionRemoveAll(msg) {
        const collectors = this.getCollectors(msg);

        for (const c of collectors) {
            c.collected.forEach( ( { msg: m, emoji, userID } ) => {
                if (c.collected.has(`${m.id}-${emoji.id || emoji.name}-${userID}`) ) {
                    c.collected.delete(`${m.id}-${emoji.id || emoji.name}-${userID}`);
                }
            } );
        }
    }

    /**
     * Function bound to messageReactionRemoveEmoji event.
     * Updates the reaction from all collectors that collected this reaction
     *
     * @param {Message} msg
     * @param {Emoji} emoji
     * @memberof ReactionCollector
     */
    _onMessageReactionRemoveEmoji(msg, emoji) {
        const collectors = this.getCollectors(msg);

        for (const c of collectors) {
            c.collected.forEach( ( { msg: m, userID } ) => {
                if (c.collected.has(`${m.id}-${emoji.id || emoji.name}-${userID}`) ) {
                    c.collected.delete(`${m.id}-${emoji.id || emoji.name}-${userID}`);
                }
            } );
        }
    }
}

export default ReactionCollector;
