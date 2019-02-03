// For emitting events
import { EventEmitter } from 'eventemitter3';

// For collection
import Collection from './Collection';

/**
 * @author VoidNulll
 *
 * @class MessageCollector
 */
class MessageCollector extends EventEmitter {
    /**
     * @param {Object} client The axon client object
     *
     * @param {Object} [options] The default options for the message collector instance
     * @param {Number} [options.timeout=60000] The time before the collector times out in milliseconds
     * @param {Number} [options.count=100] The amount of messages to collect before automatically ending
     * @param {Boolean} [options.ignoreBots=true] Whether or not to ignore bots
     * @param {String} [options.uID] The user id to listen for (listens to all messages if not specified)
     * @param {Boolean} [options.caseInsensitive] Whether or not to return messages with content lowercased
     *
     * @example
     * const collector = new MessageCollector(this.axon, { count: 10, ignoreBots: false });
     */
    constructor(client, options = {}) {
        super(client, options);
        this._options = {
            timeout: options.timeout || 60000,
            count: options.count || 100,
            ignoreBots: options.ignoreBots || true,
        };
        this._axon = client;

        this._actualOptions = {};

        this.boundMsgEvent = this._onMsgCreate.bind(this);
        this.boundCollectEvent = this._onCollectEvent.bind(this);
    }

    get axon() {
        return this._axon;
    }

    get client() {
        return this._axon.client;
    }

    /**
     * Runs the message collector
     *
     * @param {Object} channel The channel object to listen to
     *
     * @param {Object} [options] The options for the message collector
     * @param {Number} [options.timeout=60000] The time before the collector times out in milliseconds
     * @param {Number} [options.count=100] The amount of messages to collect before automatically ending
     * @param {Boolean} [options.ignoreBots=true] Whether or not to ignore bots
     * @param {String} [options.uID] The user id to listen for (listens to all messages if not specified)
     * @param {Boolean} [options.caseInsensitive] Whether or not to return messages with content lowercased
     *
     * @returns {Promise} Map of messages collected.
     *
     * @example
     * const messages = await run(msg.channel, { caseInsensitive: true });
     */
    run(channel, options = {}) {
        return new Promise((resolve, reject) => {
            this._channel = channel;
            this._actualOptions = options;
            for (const value in this._options) {
                if (!options || !options[value]) {
                    this._actualOptions[value] = this._options[value];
                }
            }
            // Bind events
            this.client.on('messageCreate', this.boundMsgEvent);
            this._messages = new Collection();

            this.on('collect', this.boundCollectEvent);

            this.once('end', () => {
                this._onEnd();
                return resolve(this._messages); // Resolve with a collection of messages
            });

            this.once('timedOut', () => {
                this._onEnd();
                return reject('TIMEOUT');
            });

            this._startTimeout();
        });
    }

    _onEnd() {
        this.client.off('messageCreate', this.boundMsgEvent); // Stop listening to the eris create message event
        this.off('collect', this.boundCollectEvent); // Stop listening to the collect event in this class
    }

    _startTimeout() {
        setTimeout(() => {
            this.emit('timedOut');
        }, this._actualOptions.timeout);
    }

    _onCollectEvent() {
        if (this._messages.size >= this._actualOptions.count) {
            this.end();
        }
    }

    end() {
        this.emit('end');
    }

    _onMsgCreate(msg) {
        console.log('Recivied Collector message create event.');
        // Checks for values to match up before continuing.
        if (msg.channel.id !== this._channel.id) {
            return;
        } else if (msg.author.id === this.client.user.id) {
            return;
        } else if (this._actualOptions.ignoreBots && msg.author.bot) {
            return;
        } else if (this._actualOptions.uID && msg.author.id !== this._actualOptions.uID) {
            return;
        }
        if (this._actualOptions.caseInsensitive) { // If caseInsensitive
            msg.content = msg.content.toLowerCase(); // Make the content lowercased
        }
        this._messages.add(msg.id, msg);
        this.emit('collect', msg);
    }


    /**
     * Removes a message from the messages collected
     *
     * @param {String} mID The id of the message you want to remove
     *
     * @returns {Promise} Map of messages collected, now excluding the removed message.
     */
    delete(mID) {
        return new Promise((resolve, reject) => {
            if (!this._messages.has(mID)) { // If messages does not contain the message id
                return reject(`MESSAGE ${mID} NOT FOUND`);
            }
            this._messages.remove(mID); // Remove the message
            return resolve(this._messages); // Return the new map
        });
    }
}

export default MessageCollector;
