import LibraryInterface from '../definitions/LibraryInterface';

import * as HANDLERS from './handlers/index';

import DjsEnums from './lib/DjsEnums';

import DjsClient from './lib/DjsClient';
import DjsUser from './lib/DjsUser';
import DjsMember from './lib/DjsMember';
import DjsMessage from './lib/DjsMessage';
import DjsChannel from './lib/DjsChannel';
import DjsGuild from './lib/DjsGuild';
import DjsResolver from './lib/DjsResolver';

/**
 * @typedef {import('discord.js').Client} Client
 * @typedef {import('discord.js').Message} Message
 */

const LIST_PAYLOADS = ['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'];

const RAW_LISTENERS = {};

class DjsInterface extends LibraryInterface {
    /**
     * @param {Client} botClient
     * @param {String} token
     * @memberof DjsInterface
     */
    constructor(botClient, token) {
        super(botClient, {
            User: DjsUser,
            Member: DjsMember,
            Message: DjsMessage,
            Channel: DjsChannel,
            Guild: DjsGuild,
            Resolver: DjsResolver,
        } );

        this.client = new DjsClient(this, token);
        this.type = 1;

        this._handleRaw();
    }

    get enums() {
        return DjsEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }

    /**
     * @param {(msg: Message) => void} func
     * @returns {void}
     * @memberof DjsInterface
     */
    onMessageCreate(func) {
        this.botClient.on(this.enums.EVENTS.MESSAGE_CREATE, (msg) => {
            func(msg);
        } );
    }

    /**
     * @param {() => void} func
     * @returns {void}
     * @memberof DjsInterface
     */
    onceReady(func) {
        this.botClient.once('ready', () => {
            func();
        } );
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {(msg: Message) => void}
     * @memberof DjsInterface
     */
    getMessageCreate(func) {
        return (msg) => func(msg);
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {(oldMsg: Message, msg: Message) => void}
     * @memberof DjsInterface
     */
    getMessageUpdate(func) {
        return (oldMsg, msg) => func(oldMsg, msg);
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {(msg: Message) => void}
     * @memberof DjsInterface
     */
    getMessageDelete(func) {
        return (msg) => func(msg);
    }


    _addRawListener(t, f) {
        if (!RAW_LISTENERS[t] ) {
            RAW_LISTENERS[t] = [];
        }
        RAW_LISTENERS[t].push(f);
    }

    _removeRawListener(t, f) {
        if (RAW_LISTENERS[t] ) {
            const index = RAW_LISTENERS[t].findIndex( (e) => e === f);
            if (index !== -1) {
                RAW_LISTENERS[t].splice(index, 1);
            }
        }
    }
    
    _handleRaw() {
        this.botClient.on('raw', (packet) => {
            if (LIST_PAYLOADS.includes(packet.t) ) {
                for (const l of RAW_LISTENERS[packet.t] ) {
                    l(packet.d);
                }
            }
        } );
    }

    getMessageReactionAdd(func) {
        return (payload) => {
            let message;
            const channel =  this.botClient.channels.cache.get(payload.channel_id);
            if (channel) {
                message = channel.messages.cache.get(payload.message_id);
            }
            
            if (!message) {
                message = {
                    id: payload.message_id,
                    channel: channel || {
                        id: payload.channel_id,
                    },
                };
            }
            
            func(message, payload.emoji, payload.user_id);
        };
    }

    getMessageReactionRemove(func) {
        return (payload) => {
            let message;
            const channel =  this.botClient.channels.cache.get(payload.channel_id);
            if (channel) {
                message = channel.messages.cache.get(payload.message_id);
            }
            
            if (!message) {
                message = {
                    id: payload.message_id,
                    channel: channel || {
                        id: payload.channel_id,
                    },
                };
            }
            
            func(message, payload.emoji, payload.user_id);
        };
    }

    getMessageReactionRemoveAll(func) {
        return (payload) => {
            let message;
            const channel =  this.botClient.channels.cache.get(payload.channel_id);
            if (channel) {
                message = channel.messages.cache.get(payload.message_id);
            }
            
            if (!message) {
                message = {
                    id: payload.message_id,
                    channel: channel || {
                        id: payload.channel_id,
                    },
                };
            }
            
            func(message);
        };
    }

    getMessageReactionRemoveEmoji(func) {
        return (payload) => {
            let message;
            const channel =  this.botClient.channels.cache.get(payload.channel_id);
            if (channel) {
                message = channel.messages.cache.get(payload.message_id);
            }
            
            if (!message) {
                message = {
                    id: payload.message_id,
                    channel: channel || {
                        id: payload.channel_id,
                    },
                };
            }
            
            func(message, payload.emoji);
        };
    }

    onReactionAdd(f, on = true) {
        on
            ? this._addRawListener('MESSAGE_REACTION_ADD', f)
            : this._removeRawListener('MESSAGE_REACTION_ADD', f);
    }

    onReactionRemove(f, on = true) {
        on
            ? this._addRawListener('MESSAGE_REACTION_REMOVE', f)
            : this._removeRawListener('MESSAGE_REACTION_REMOVE', f);
    }

    onReactionRemoveAll(f, on = true) {
        on
            ? this._addRawListener('MESSAGE_REACTION_REMOVE_ALL', f)
            : this._removeRawListener('MESSAGE_REACTION_REMOVE_ALL', f);
    }

    onReactionRemoveEmoji(f, on = true) {
        on
            ? this._addRawListener('MESSAGE_REACTION_REMOVE_EMOJI', f)
            : this._removeRawListener('MESSAGE_REACTION_REMOVE_EMOJI', f);
    }
}

export default DjsInterface;
