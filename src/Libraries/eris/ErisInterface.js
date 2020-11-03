import LibraryInterface from '../definitions/LibraryInterface';

import * as HANDLERS from './handlers/index';

import ErisEnums from './lib/ErisEnums';

import ErisClient from './lib/ErisClient';
import ErisUser from './lib/ErisUser';
import ErisMember from './lib/ErisMember';
import ErisMessage from './lib/ErisMessage';
import ErisChannel from './lib/ErisChannel';
import ErisGuild from './lib/ErisGuild';
import ErisResolver from './lib/ErisResolver';

/**
 * @typedef {import('eris').Client} Client
 * @typedef {import('eris').Message} Message
 */

class ErisInterface extends LibraryInterface {
    /**
     * @param {Client} botClient
     */
    constructor(botClient) {
        super(botClient, {
            User: ErisUser,
            Member: ErisMember,
            Message: ErisMessage,
            Channel: ErisChannel,
            Guild: ErisGuild,
            Resolver: ErisResolver,
        } );

        this.client = new ErisClient(this);
        this.type = 0;
    }

    get enums() {
        return ErisEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }

    /**
     * @param {(msg: Message) => void} func
     * @returns {void}
     * @memberof ErisInterface
     */
    onMessageCreate(func) {
        this.botClient.on(this.enums.EVENTS.MESSAGE_CREATE, (msg) => {
            func(msg);
        } );
    }

    /**
     * @param {() => void} func
     * @returns {void}
     * @memberof ErisInterface
     */
    onceReady(func) {
        this.botClient.once('ready', () => {
            func();
        } );
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {(msg: Message) => void}
     * @memberof ErisInterface
     */
    getMessageCreate(func) {
        return (msg) => func(msg);
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {(msg: Message, oldMsg: Message) => void}
     * @memberof ErisInterface
     */
    getMessageUpdate(func) {
        return (msg, oldMsg) => func(oldMsg, msg);
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {(msg: Message) => void}
     * @memberof ErisInterface
     */
    getMessageDelete(func) {
        return (msg) => func(msg);
    }

    getMessageReactionAdd(func) {
        return (msg, emoji, userID) => func(msg, emoji, typeof userID === 'string' ? userID : userID.id);
    }

    getMessageReactionRemove(func) {
        return (msg, emoji, userID) => func(msg, emoji, typeof userID === 'string' ? userID : userID.id);
    }

    getMessageReactionRemoveAll(func) {
        return (msg) => func(msg);
    }

    getMessageReactionRemoveEmoji(func) {
        return (msg, emoji) => func(msg, emoji);
    }

    onReactionAdd(f, on = true) {
        on
            ? this.botClient.on(this.enums.EVENTS.MESSAGE_REACTION_ADD, f)
            : this.botClient.off(this.enums.EVENTS.MESSAGE_REACTION_ADD, f);
    }

    onReactionRemove(f, on = true) {
        on
            ? this.botClient.on(this.enums.EVENTS.MESSAGE_REACTION_REMOVE, f)
            : this.botClient.off(this.enums.EVENTS.MESSAGE_REACTION_REMOVE, f);
    }

    onReactionRemoveAll(f, on = true) {
        on
            ? this.botClient.on(this.enums.EVENTS.MESSAGE_REACTION_REMOVE_ALL, f)
            : this.botClient.off(this.enums.EVENTS.MESSAGE_REACTION_REMOVE_ALL, f);
    }

    onReactionRemoveEmoji(f, on = true) {
        on
            ? this.botClient.on(this.enums.EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, f)
            : this.botClient.off(this.enums.EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, f);
    }
}

export default ErisInterface;
