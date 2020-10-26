import AxonError from '../../Errors/AxonError';

/**
 * Builder / Helper around collectors
 *
 * @author KhaaZ
 *
 * @class NextMessage
 *
 * @prop {MessageCollector} collector - The message collector instance
 * @prop {Object} options - Default options
 */
class NextMessage {
    /**
     * Creates an instance of NextMessage.
     * @param {MessageCollector} collector
     * @memberof NextMessage
     */
    constructor(collector) {
        this.collector = collector;
        
        this.options = {
            count: 1,
            timeout: 10000,
            channels: [],
            users: [],
        };
        this._build = Object.assign( {}, this.options);
    }

    /**
     * Run a collector with the given options and return the first message found.
     *
     * @static
     * @param {MessageCollector} collector
     * @param {Object} [options={}]
     * @param {Array<String>|String} [options.channels]
     * @param {Array<String>|String} [options.users]
     * @param {Array<String>|String} [options.filter]
     * @param {Number} [options.timeout]
     *
     * @returns {Promise<Message>}
     * @memberof NextMessage
     */
    static for(collector, options = {} ) {
        if (options.channels && typeof options.channels !== 'string' && !Array.isArray(options.channels) ) {
            throw new AxonError('Invalid Argument: channels should be of type string or array.', 'NextMessage');
        }
        if (options.users && typeof options.users !== 'string' && !Array.isArray(options.users) ) {
            throw new AxonError('Invalid Argument: users should be of type string or array.', 'NextMessage');
        }
        if (options.filter && typeof options.filter !== 'function') {
            throw new AxonError('Invalid Argument: filter should be of type function.', 'NextMessage');
        }
        options.count = 1;
        if (options.timeout === undefined) {
            options.timeout = 10000;
        }

        return collector.run(options)
            .then(res => [...res][0] )
            .catch( (res) => [...res][0] );
    }
    
    /**
     * The channels to listen in
     * @param {Array<String>|String} users
     * @returns {NextMessage} This NextMessage
     * @memberof NextMessage
     */
    in(channels) {
        if (typeof channels === 'string') {
            this._build.channels.push(channels);
        } else if (Array.isArray(channels) ) {
            channels.forEach(e => this._build.channels.push(e) );
        } else {
            throw new AxonError('Invalid Argument: channels should be of type string or array.', 'NextMessage');
        }
        return this;
    }

    /**
     * The users to listen from
     * @param {Array<String>|String} users
     * @returns {NextMessage} This NextMessage
     * @memberof NextMessage
     */
    from(users) {
        if (typeof users === 'string') {
            this._build.users.push(users);
        } else if (Array.isArray(users) ) {
            users.forEach(e => this._build.users.push(e) );
        } else {
            throw new AxonError('Invalid Argument: users should be of type string or array.', 'NextMessage');
        }
        return this;
    }

    /**
     * The filter to listen with
     * @param {Function} filter
     * @returns {NextMessage} This NextMessage
     * @memberof NextMessage
     */
    with(filter) {
        if (typeof filter !== 'function') {
            throw new AxonError('Invalid Argument: filter should be of type function .', 'NextMessage');
        }
        this._build.filter = filter;
        return this;
    }

    /**
     * The timeout after which the collector will ends
     * @param {Number} timeout
     * @returns {NextMessage} This NextMessage
     * @memberof NextMessage
     */
    expires(timeout) {
        this._build.timeout = timeout;
        return this;
    }

    /**
     * Executes the collector and returns the next message collected
     * @returns {Promise<Message>} The next message collected
     * @memberof NextMessage
     */
    exec() {
        const options = Object.assign( {}, this._build);
        this._build = Object.assign( {}, this.options);

        return this.collector.run(options)
            .then(res => [...res.values()][0] )
            .catch( (res) => [...res.values()][0] );
    }
}

export default NextMessage;
