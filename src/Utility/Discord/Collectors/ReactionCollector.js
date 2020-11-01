import Collector from './Collector';

/**
 * @typedef {import('../../../AxonClient').default} AxonClient
 * @typedef {{message: Message, emote: Emoji, userID: String}} CollectedItem
 */

/**
 * Collect bunch of items object according to chosen options
 * The collected item is from the following format:
 * { message: Message, emote: Emoji, userID: String}
 * ID of the item in the container is formatted as: `messageID-emojiID-userID`. If the emojiID is undefined (default emote), emojiName is used instead.
 *
 * @author Bsian, KhaaZ
 *
 * @class ReactionCollector
 * @extends Collector<CollectedItem>
 *
 * @prop {Object} options
 * @prop {Number} options.timeout - Number of ms before timing out
 * @prop {Number} options.count - Number of reactions to collect
 * @prop {Number} options.filter - Custom filter function that the reaction need to validate in order to be collected
 * @prop {Boolean} options.ignoreBots - Whether to ignore bots
 * @prop {Boolean} options.ignoreSelf - Whether or not to ignore self (the bot itself)
 */
class ReactionCollector extends Collector {
    /**
     * Creates an instance of ReactionCollector
     *
     * @param {AxonClient} client - The axon client object
     * @param {Object} [options] - The default options for the reaction collector instance
     * @param {Number} [options.timeout=10000] - The time before the collector times out in milliseconds
     * @param {Number} [options.count=10] - The amount of reactions to collect before automatically ending
     * @param {Number} [options.filter] - A custom filter function that the Message need to validate in order to be collected
     * @param {Boolean} [options.ignoreSelf=true] - Whether or not to ignore self (the bot itself)
     * @memberof ReactionCollector
     * @example
     * const collector = new ReactionCollector(this.axon, { count: 10, ignoreBots: false });
     */
    constructor(axonClient, options = {} ) {
        super(axonClient);
        this.options = {
            timeout: options.timeout || 10000,
            count: options.count || 10,
            filter: options.filter,
            
            ignoreSelf: options.ignoreSelf === undefined ? true : !!options.ignoreSelf,
        };

        this.onMessageReactionAdd = this.lib.getMessageReactionAdd(this._onMessageReactionAdd.bind(this) );
        this.onMessageReactionRemove = this.lib.getMessageReactionRemove(this._onMessageReactionRemove.bind(this) );
        this.onMessageReactionRemoveAll = this.lib.getMessageReactionRemoveAll(this._onMessageReactionRemoveAll.bind(this) );
        this.onMessageReactionRemoveEmoji = this.lib.getMessageReactionRemoveEmoji(this._onMessageReactionRemoveEmoji.bind(this) );
    }

    setListeners() {
        this.lib.onReactionAdd(this.onMessageReactionAdd, true);
        this.lib.onReactionRemove(this.onMessageReactionRemove, true);
        this.lib.onReactionRemoveAll(this.onMessageReactionRemoveAll, true);
        this.lib.onReactionRemoveEmoji(this.onMessageReactionRemoveEmoji, true);
    }

    unsetListeners() {
        this.lib.onReactionAdd(this.onMessageReactionAdd, false);
        this.lib.onReactionRemove(this.onMessageReactionRemove, false);
        this.lib.onReactionRemoveAll(this.onMessageReactionRemoveAll, false);
        this.lib.onReactionRemoveEmoji(this.onMessageReactionRemoveEmoji, false);
    }

    /**
     * Runs the Collector with the given options and resolve once the task is finished with a Map of CollectedItems collected.
     * If a timeout is provided, will resolve with all Messages collectors until the timeout.
     * If no timeout is provided, will only resolve when enough element have been collected
     *
     * @param {Object} [options] - The options for the reaction collector
     * @param {Number} [options.timeout] - The time before the collector times out in milliseconds
     * @param {Number} [options.count] - The amount of reactions to collect before automatically ending
     * @param {Boolean} [options.ignoreBots] - Whether or not to ignore bots
     * @param {Boolean} [options.ignoreSelf] - Whether or not to ignore self
     * @param {Array<String>|String} [options.channels] - The channel ids to listen for (listens to all reactions if not specified)
     * @param {Array<String>|String} [options.messages] - The message ids to listen for (listens to all reactions if not specified)
     * @param {Array<String>|String} [options.users] - The user ids to listen for (listens to all reactions if not specified)
     * @param {Array<String>|String} [options.emotes] - The emoji ids or names to collect (collects all reactions if not specified)
     * @returns {Promise<Map<String, CollectedItem>>} Map of messages collected.
     * @memberof ReactionCollector
     * @example
     * const reactions = await collector.run({ count: 10 });
     */
    run(options = {} ) {
        return this._run( {
            timeout: options.timeout !== undefined ? options.timeout : this.options.timeout,
            count: options.count !== undefined ? options.count : this.options.count,
            filter: options.filter !== undefined ? options.filter : this.options.filter,
        },
        {
            messages: this._makeArray(options.messages),
            channels: this._makeArray(options.channels),
            users: this._makeArray(options.users),
            emotes: this._makeArray(options.emotes),
            ignoreBots: options.ignoreBots !== undefined ? options.ignoreBots : this.options.ignoreBots,
            ignoreSelf: options.ignoreSelf !== undefined ? options.ignoreSelf : this.options.ignoreSelf,
        } );
    }

    /**
     * Runs the Collector with the given options and return a container object that can be used to manually control Reactions collected.
     * If no timeout nor count is provided, will run forever until the user manually stops the collector.
     *
     * @param {Object} [options] - The options for the reaction collector
     * @param {Number} [options.timeout] - The time before the collector times out in milliseconds
     * @param {Number} [options.count] - The amount of reactions to collect before automatically ending
     * @param {Boolean} [options.ignoreBots] - Whether or not to ignore bots
     * @param {Boolean} [options.ignoreSelf] - Whether or not to ignore self
     * @param {Array<String>|String} [options.channels] - The channel ids to listen for (listens to all reactions if not specified)
     * @param {Array<String>|String} [options.messages] - The message ids to listen for (listens to all reactions if not specified)
     * @param {Array<String>|String} [options.users] - The user ids to listen for (listens to all reactions if not specified)
     * @param {Array<String>|String} [options.emotes] - The emoji ids or names to collect (collects all reactions if not specified)
     * @returns {CollectorContainer<CollectedItem>} CollectorContainer
     * @memberof ReactionCollector
     * @example
     * const reactions = await collector.run({ count: 10 });
     */
    collect(options = {} ) {
        return this._collect( {
            timeout: options.timeout !== undefined ? options.timeout : this.options.timeout,
            count: options.count !== undefined ? options.count : this.options.count,
            filter: options.filter !== undefined ? options.filter : this.options.filter,
        },
        {
            messages: this._makeArray(options.messages),
            channels: this._makeArray(options.channels),
            users: this._makeArray(options.users),
            emotes: this._makeArray(options.emotes),
            ignoreSelf: options.ignoreSelf !== undefined ? options.ignoreSelf : this.options.ignoreSelf,
        } );
    }

    /**
     * Get all CollectorContainers that will collect from this particular message
     *
     * @param {Message} message
     * @param {Emoji} emoji
     * @returns {Array<CollectorContainer<CollectedItem>>}
     * @memberof ReactionCollector
     */
    getCollectors(message, emoji, userID) {
        return this.containers
            .filter(e => {
                if (userID && e.options.ignoreSelf && userID === this.lib.client.getID() ) {
                    return false;
                }
                if (e.options.channels.length > 0 && !e.options.channels.includes(this.lib.message.getChannelID(message) ) ) {
                    return false;
                }
                if (e.options.messages.length > 0 && !e.options.messages.includes(this.lib.message.getID(message) ) ) {
                    return false;
                }
                if (userID && e.options.users.length > 0 && !e.options.users.includes(userID) ) {
                    return false;
                }
                if (emoji && e.options.emotes.length > 0 && !e.options.emotes.includes(emoji.id || emoji.name) ) {
                    return false;
                }
                return true;
            } );
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
        const collectors = this.getCollectors(msg, emoji, userID);
        this.emit('collect', collectors, { id: `${msg.id}-${emoji.id || emoji.name}-${userID}`, collected: { message: msg, emoji, userID } } );
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
        const collectors = this.getCollectors(msg, emoji, userID);

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
        const collectors = this.getCollectors(msg, emoji);

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
