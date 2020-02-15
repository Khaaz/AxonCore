import { EventEmitter } from 'events';

import Collection  from '../Collection';

/**
 * Collects reaction objects from a message.
 * 
 * @author Neuheit
 * @class ReactionCollector
 * @extends EventEmitter
 * 
 */

class ReactionCollector extends EventEmitter {
    /**
     * 
     * @param {AxonClient} client - The axon client object.
     * @param {Message} message - The message object to listen for reactions.
     * @param {Object} [options] - The default options for this reaction collector instance.
     * @param {Array} [options.filteredReactions] - An array of reactions to search from.
     * @param {Number} [options.timeout] - How long this collector should be active.
     * @param {Number} [options.count] - The maximum amount of reactions to collect.
     * @param {Boolean} [options.ignoreBots] - Whether to collect reactions from bots.
     * 
     */

    constructor(client, options = {}) {
        super();
        this._axon = client;

        this.options = Object.assign({
            filteredReactions: null,
            timeout: 60000, // eslint-disable-line no-magic-numbers
            count: 100,
            ignoreBots: true, // Ignore bots by default
        }, options);

        this._reactionAddListener = this._onReactionAdd.bind(this);
        this._reactionRemoveListener = this._onReactionRemove.bind(this);
        this._reactionRemoveAllListener = this._onReactionRemoveAll.bind(this);
        //Will need to add handling for the MessageReactionRemoveEmoji event when it is implemented.

        this._collectListener = this._onCollect.bind(this);

        this.reactions = new Collection();
    }

    get axon() {
        return this._axon;
    }

    get client() {
        return this._axon.botClient;
    }

    run(msg, options = {}) {
        this._message = msg;

        this.options = Object.assign({
            filteredReactions: null,
            timeout: 60000, // eslint-disable-line no-magic-numbers
            count: 100,
            ignoreBots: true, // Ignore bots by default
        }, options);

        this.client.on("messageReactionAdd", this._reactionAddListener);
        this.client.on("messageReactionRemove", this._reactionRemoveListener);
        this.client.on("messageReactionRemoveAll", this._reactionRemoveAllListener);

        this.on("collect", this._collectListener);

        return new Promise((res, rej) => {
            this.once('end', () => {
                this._onEnd();
                return res(this.reactions); // Resolve with a collection of reactions.
            });

            this.once('timedOut', () => {
                this._onEnd();
                return rej('TIMEOUT');
            });

            this._startTimeout();
        });
    }

    /**
    * Removes a reaction from the reactions collected
    *
    * @param {String} rID The id of the reaction you want to remove
    *
    * @returns {Collection} Collection of reactions collected, now excluding the removed reaction.
    *
    * @example
    *
    * collector.delete('542164538347225118');
    */
    delete(reaction) {
        const found = this.reactions.find(r => r.id == reaction.id || r.name == reaction.name);
        if (!found) {
            throw new Error(`REACTION ${rID} NOT FOUND`);
        }
        this.reactions.remove(found); // Remove the reaction
        return this.reactions; // Return the new map
    }

    _onEnd() {
        this.client.off("messageReactionAdd", this._reactionAddListener); // Stop listening to the eris message events
        this.client.off("messageReactionRemove", this._reactionRemoveListener);
        this.client.off("messageReactionRemoveAll", this._reactionRemoveAllListener);
        this.off("collect", this._collectListener); // Stop listening to the collect event in this class
    }

    _startTimeout() {
        setTimeout(() => {
            this.emit("timedOut");
        }, this.options.timeout);
    }

    _onReactionAdd(msg, emoji, userId) {
        if (msg.id !== this._message.id) return;

        if (this.options.ignoreBots && msg.author.bot) return;

        if (this.options.filteredReactions && !this.filteredReactions.prototype.some(r => r.id == emoji.id)) return;

        let users = this.reactions.get(emoji);

        if (users)
            users.add(userId);
        else {
            users = new Collection();
            users.add(userId);
            this.reactions.add(emoji, users);
        }

        this.emit("collect");
    }

    _onReactionRemove(msg, emoji, userId) {

        const users = this.reactions.get(emoji);

        if (users) {
            const user = users.remove(userId);
            if (!user || users.size <= 0)
                this.reactions.remove(emoji);

            this.emit("delete", emoji);
        }
    }

    _onReactionRemoveAll(msg) {

        if (this.reactions.has(emoji)) {
            this.reactions.remove(emoji);

            this.emit("deleteAll", emoji);
        }
    }

    _onCollectEvent() {
        if (this.reactions.size >= this.options.count) {
            this.end();
        }
    }

    end() {
        this.emit('end');
    }
}

export default ReactionCollector;
