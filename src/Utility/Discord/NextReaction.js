import AxonError from '../../Errors/AxonError';

/**
 * Builder / Helper around collectors
 *
 * @author KhaaZ
 *
 * @class NextReaction
 *
 * @prop {ReactionCollector} collector - The reaction collector instance
 * @prop {Object} options - Default options
 */
class NextReaction {
    /**
     * Creates an instance of NextReaction.
     * @param {ReactionCollector} collector
     * @memberof NextReaction
     */
    constructor(collector) {
        this.collector = collector;
        
        this.options = {
            count: 1,
            timeout: 10000,
            messages: [],
            channels: [],
            users: [],
            emotes: [],
        };
        this._build = Object.assign( {}, this.options);
    }

    /**
     * Run a collector with the given options and return the first reaction found.
     *
     * @static
     * @param {ReactionCollector} collector
     * @param {Object} [options={}]
     * @param {Array<String>|String} [options.messages]
     * @param {Array<String>|String} [options.channels]
     * @param {Array<String>|String} [options.users]
     * @param {Array<String>|String} [options.emotes]
     * @param {Array<String>|String} [options.filter]
     * @param {Number} [options.timeout]
     *
     * @returns {Promise<Message>}
     * @memberof NextReaction
     */
    static for(collector, options = {} ) {
        if (options.messages && typeof options.messages !== 'string' && !Array.isArray(options.messages) ) {
            throw new AxonError('Invalid Argument: messages should be of type string or array.', 'NextReaction');
        }
        if (options.channels && typeof options.channels !== 'string' && !Array.isArray(options.channels) ) {
            throw new AxonError('Invalid Argument: channels should be of type string or array.', 'NextReaction');
        }
        if (options.users && typeof options.users !== 'string' && !Array.isArray(options.users) ) {
            throw new AxonError('Invalid Argument: users should be of type string or array.', 'NextReaction');
        }
        if (options.emotes && typeof options.emotes !== 'string' && !Array.isArray(options.emotes) ) {
            throw new AxonError('Invalid Argument: emotes should be of type string or array.', 'NextReaction');
        }
        if (options.filter && typeof options.filter !== 'function') {
            throw new AxonError('Invalid Argument: filter should be of type function.', 'NextReaction');
        }
        options.count = 1;
        if (options.timeout === undefined) {
            options.timeout = 10000;
        }

        return collector.run(options)
            .then( (res) => [...res][0] )
            .catch( (res) => [...res][0] );
    }
    
    /**
     * The messages to listen
     * @param {Array<String>|String} messages
     * @returns {NextReaction} This NextReaction
     * @memberof NextReaction
     */
    for(messages) {
        if (typeof messages === 'string') {
            this._build.messages.push(messages);
        } else if (Array.isArray(messages) ) {
            messages.forEach(e => this._build.messages.push(e) );
        } else {
            throw new AxonError('Invalid Argument: messages should be of type string or array.', 'NextReaction');
        }
        return this;
    }

    /**
     * The channels to listen in
     * @param {Array<String>|String} channels
     * @returns {NextReaction} This NextReaction
     * @memberof NextReaction
     */
    in(channels) {
        if (typeof channels === 'string') {
            this._build.channels.push(channels);
        } else if (Array.isArray(channels) ) {
            channels.forEach(e => this._build.channels.push(e) );
        } else {
            throw new AxonError('Invalid Argument: channels should be of type string or array.', 'NextReaction');
        }
        return this;
    }

    /**
     * The users to listen from
     * @param {Array<String>|String} users
     * @returns {NextReaction} This NextReaction
     * @memberof NextReaction
     */
    from(users) {
        if (typeof users === 'string') {
            this._build.users.push(users);
        } else if (Array.isArray(users) ) {
            users.forEach(e => this._build.users.push(e) );
        } else {
            throw new AxonError('Invalid Argument: users should be of type string or array.', 'NextReaction');
        }
        return this;
    }
    
    /**
     * The emotes to listen
     * @param {Array<String>|String} emotes
     * @returns {NextReaction} This NextReaction
     * @memberof NextReaction
     */
    about(emotes) {
        if (typeof emotes === 'string') {
            this._build.emotes.push(emotes);
        } else if (Array.isArray(emotes) ) {
            emotes.forEach(e => this._build.emotes.push(e) );
        } else {
            throw new AxonError('Invalid Argument: emotes should be of type string or array.', 'NextReaction');
        }
        return this;
    }

    /**
     * The filter to listen with
     * @param {Function} filter
     * @returns {NextReaction} This NextReaction
     * @memberof NextReaction
     */
    with(filter) {
        if (typeof filter !== 'function') {
            throw new AxonError('Invalid Argument: filter should be of type function .', 'NextReaction');
        }
        this._build.filter = filter;
        return this;
    }

    /**
     * The timeout after which the collector will ends
     * @param {Number} timeout
     * @returns {NextReaction} This NextReaction
     * @memberof NextReaction
     */
    expires(timeout) {
        this._build.timeout = timeout;
        return this;
    }

    /**
     * Executes the collector and returns the next reaction collected
     * @returns {Promise<Reaction>} The next reaction collected
     * @memberof NextReaction
     */
    exec() {
        const options = Object.assign( {}, this._build);
        this._build = Object.assign( {}, this.options);

        return this.collector.run(options)
            .then( (res) => [...res.values()][0] )
            .catch( (res) => [...res.values()][0] );
    }
}

export default NextReaction;
